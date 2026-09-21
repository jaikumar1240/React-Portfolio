import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * A two-part custom cursor: a small solid dot that tracks the pointer 1:1 and a
 * larger ring that lags behind for a smooth trailing feel. The ring grows and
 * highlights when hovering interactive elements. Skipped on touch devices and
 * when the user prefers reduced motion (the native cursor stays in place).
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover || prefersReducedMotion()) return

    document.documentElement.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })
    const dxTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2' })
    const dyTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2' })

    let visible = false
    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      xTo(e.clientX); yTo(e.clientY)
      dxTo(e.clientX); dyTo(e.clientY)
    }

    const setHover = (active) => {
      gsap.to(ring, {
        scale: active ? 1.8 : 1,
        backgroundColor: active ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0)',
        borderColor: active ? 'rgba(99,102,241,0.9)' : 'rgba(148,163,184,0.6)',
        duration: 0.25,
      })
      gsap.to(dot, { scale: active ? 0.5 : 1, duration: 0.25 })
    }

    const interactiveSel = 'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
    const onOver = (e) => { if (e.target.closest(interactiveSel)) setHover(true) }
    const onOut = (e) => { if (e.target.closest(interactiveSel)) setHover(false) }
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0 mix-blend-difference"
        style={{ borderColor: 'rgba(148,163,184,0.6)' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 opacity-0"
      />
    </>
  )
}
