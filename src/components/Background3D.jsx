import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * A fixed, full-viewport animated 3D particle field rendered with vanilla
 * Three.js. It reacts to mouse movement (parallax) and page scroll, adapts its
 * palette to light/dark mode, caps the pixel ratio for performance, and pauses
 * when the tab is hidden. Fully skipped when the user prefers reduced motion.
 */
export default function Background3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mount = mountRef.current
    if (!mount) return

    let width = window.innerWidth
    let height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // ---- Palette (updated on theme change) ------------------------------
    const palette = {
      a: new THREE.Color('#6366f1'), // brand indigo
      b: new THREE.Color('#d946ef'), // fuchsia
      c: new THREE.Color('#22d3ee'), // cyan
    }

    // ---- Particle field --------------------------------------------------
    const COUNT = window.innerWidth < 640 ? 1400 : 2600
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const RADIUS = 16

    for (let i = 0; i < COUNT; i++) {
      // Distribute points in a soft spherical shell with some depth jitter.
      const r = RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      const mixed = t < 0.5
        ? palette.a.clone().lerp(palette.b, t * 2)
        : palette.b.clone().lerp(palette.c, (t - 0.5) * 2)
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Round soft sprite so points look like glowing dots, not squares.
    const sprite = makeCircleTexture()
    const material = new THREE.PointsMaterial({
      size: 0.13,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // A couple of slow wireframe shapes for depth / "engineered" feel.
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.5, 1),
      new THREE.MeshBasicMaterial({ color: palette.a, wireframe: true, transparent: true, opacity: 0.12 }),
    )
    ico.position.set(-7, 3, -4)
    scene.add(ico)

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.7, 16, 60),
      new THREE.MeshBasicMaterial({ color: palette.c, wireframe: true, transparent: true, opacity: 0.1 }),
    )
    torus.position.set(8, -4, -6)
    scene.add(torus)

    const applyThemeOpacity = () => {
      const dark = document.documentElement.classList.contains('dark')
      material.opacity = dark ? 0.9 : 0.55
      ico.material.opacity = dark ? 0.12 : 0.09
      torus.material.opacity = dark ? 0.1 : 0.07
    }
    applyThemeOpacity()
    const themeObserver = new MutationObserver(applyThemeOpacity)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // ---- Interaction state ----------------------------------------------
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let scrollY = window.scrollY

    const onMouse = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scrollY = window.scrollY }
    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // ---- Render loop -----------------------------------------------------
    const clock = new THREE.Clock()
    let raf = 0
    let running = true

    const tick = () => {
      const el = clock.getElapsedTime()
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04

      points.rotation.y = el * 0.03 + mouse.x * 0.35
      points.rotation.x = mouse.y * 0.25
      // Gentle drift downward as you scroll the page.
      const scrollNorm = scrollY / (document.body.scrollHeight - window.innerHeight || 1)
      points.position.y = scrollNorm * 6
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05
      camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      ico.rotation.x = el * 0.1
      ico.rotation.y = el * 0.14
      torus.rotation.x = el * 0.12
      torus.rotation.z = el * 0.08

      renderer.render(scene, camera)
      if (running) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Pause when the tab is hidden to save battery/CPU.
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        clock.getDelta()
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // ---- Cleanup ---------------------------------------------------------
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      themeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      sprite.dispose()
      ico.geometry.dispose(); ico.material.dispose()
      torus.geometry.dispose(); torus.material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}

/** Builds a soft radial-gradient circle texture for round, glowing points. */
function makeCircleTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}
