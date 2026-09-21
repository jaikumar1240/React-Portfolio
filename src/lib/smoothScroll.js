import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis = null

/**
 * Initialize Lenis momentum scrolling and keep GSAP ScrollTrigger in sync.
 * Safe to call once on mount; returns a cleanup function.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {}
  // Respect reduced-motion: skip momentum scrolling entirely.
  if (prefersReducedMotion()) return () => {}
  if (lenis) return () => {}

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  // Drive Lenis from GSAP's ticker for a single synced RAF loop.
  lenis.on('scroll', ScrollTrigger.update)
  const onTick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(onTick)
    lenis?.destroy()
    lenis = null
  }
}

/** Smoothly scroll to an element/selector, accounting for the sticky header. */
export function scrollToTarget(target, offset = -72) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
