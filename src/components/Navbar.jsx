import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Navbar() {
  const barRef = useRef(null)
  const headerRef = useRef(null)
  const ctaRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 },
      )

      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
      })
    })

    // Magnetic CTA
    const onMove = (e) => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const strength = 12
      gsap.to(ctaRef.current, {
        x: (dx / rect.width) * strength,
        y: (dy / rect.height) * strength,
        duration: 0.2,
        overwrite: 'auto',
      })
    }
    const onLeave = () => {
      if (!ctaRef.current) return
      gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' })
    }
    ctaRef.current?.addEventListener('mousemove', onMove)
    ctaRef.current?.addEventListener('mouseleave', onLeave)

    return () => {
      ctx.revert()
      ctaRef.current?.removeEventListener('mousemove', onMove)
      ctaRef.current?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    gsap.to(window, { duration: 0.8, ease: 'power2.out', scrollTo: { y: target, offsetY: 72 } })
  }

  const links = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume' },
  ]

  return (
    <>
      <div ref={barRef} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-fuchsia-500 to-cyan-400 z-[60]" />
      <header ref={headerRef} className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-900/10 dark:supports-[backdrop-filter]:bg-slate-950/60 dark:bg-slate-950/80 dark:border-white/10">
        <div className="container-pro flex items-center justify-between py-4">
          <a href="#profile" className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">JK</a>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleNavClick(e, l.id)}
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              ref={toggleRef}
              aria-label="Toggle dark mode"
              aria-pressed={typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false}
              className="h-9 w-9 grid place-items-center rounded-xl transition-colors bg-slate-900/5 ring-1 ring-slate-900/10 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:ring-white/10 dark:text-white/80 dark:hover:text-white"
              onClick={() => {
                const root = document.documentElement
                const isDark = root.classList.toggle('dark')
                localStorage.theme = isDark ? 'dark' : 'light'
                toggleRef.current?.setAttribute('aria-pressed', String(isDark))
                // Smooth theme transition
                root.classList.add('theme-transition')
                window.setTimeout(() => root.classList.remove('theme-transition'), 250)
              }}
            >
              {/* Sun (light) – outline 24x24 using currentColor */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 block dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M12 18.75V21M21 12h-2.25M5.25 12H3m13.364 6.364-1.591-1.591M7.227 7.227 5.636 5.636m12.728 0-1.591 1.591M7.227 16.773l-1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
              </svg>
              {/* Moon (dark) */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 hidden dark:block" fill="currentColor" aria-hidden>
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45A1 1 0 0 0 11 2a10 10 0 1 0 10.64 10.64 1 1 0 0 0 0-.28z" />
              </svg>
            </button>
            <a ref={ctaRef} href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary">Let’s Talk</a>
          </div>
        </div>
      </header>
    </>
  )
}


