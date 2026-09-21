import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { scrollToTarget } from '../lib/smoothScroll'

const links = [
  { id: 'profile', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const barRef = useRef(null)
  const headerRef = useRef(null)
  const ctaRef = useRef(null)
  const [active, setActive] = useState('profile')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 })
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.to(barRef.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } })
    })

    // Scroll-spy: highlight the section currently in view.
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))

    // Magnetic CTA
    const onMove = (e) => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      gsap.to(ctaRef.current, { x: (dx / rect.width) * 12, y: (dy / rect.height) * 12, duration: 0.2, overwrite: 'auto' })
    }
    const onLeave = () => ctaRef.current && gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' })
    const cta = ctaRef.current
    cta?.addEventListener('mousemove', onMove)
    cta?.addEventListener('mouseleave', onLeave)

    return () => {
      ctx.revert()
      observer.disconnect()
      cta?.removeEventListener('mousemove', onMove)
      cta?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToTarget(`#${id}`)
  }

  const toggleTheme = () => {
    const root = document.documentElement
    const next = root.classList.toggle('dark')
    localStorage.theme = next ? 'dark' : 'light'
    setIsDark(next)
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 250)
  }

  return (
    <>
      <div ref={barRef} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300 z-[60]" />
      <header ref={headerRef} className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border-b border-slate-900/10 dark:supports-[backdrop-filter]:bg-slate-950/60 dark:bg-slate-950/85 dark:border-white/10">
        <div className="container-pro flex items-center justify-between py-4">
          <a href="#profile" onClick={(e) => go(e, 'profile')} className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            <span className="text-gradient animate-gradient">JK</span>
          </a>

          {/* Desktop nav with animated active pill */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className={`relative px-3 py-2 text-sm rounded-full transition-colors ${
                  active === l.id
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {active === l.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-slate-900/5 ring-1 ring-slate-900/10 dark:bg-white/10 dark:ring-white/10" />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle dark mode"
              aria-pressed={isDark}
              className="h-9 w-9 grid place-items-center rounded-xl transition-colors bg-slate-900/5 ring-1 ring-slate-900/10 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:ring-white/10 dark:text-white/80 dark:hover:text-white"
              onClick={toggleTheme}
            >
              {/* Moon shown in light mode (click → switch to dark) */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 block dark:hidden" fill="currentColor" aria-hidden>
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45A1 1 0 0 0 11 2a10 10 0 1 0 10.64 10.64 1 1 0 0 0 0-.28z" />
              </svg>
              {/* Sun shown in dark mode (click → switch to light) */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 hidden dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M12 18.75V21M21 12h-2.25M5.25 12H3m13.364 6.364-1.591-1.591M7.227 7.227 5.636 5.636m12.728 0-1.591 1.591M7.227 16.773l-1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
              </svg>
            </button>

            <a ref={ctaRef} href="#contact" onClick={(e) => go(e, 'contact')} className="hidden sm:inline-flex btn-primary">Let's Talk</a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden h-9 w-9 grid place-items-center rounded-xl bg-slate-900/5 ring-1 ring-slate-900/10 text-slate-700 dark:bg-white/5 dark:ring-white/10 dark:text-white/80"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="container-pro pb-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className={`px-3 py-2.5 rounded-lg text-sm ${active === l.id ? 'bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn-primary justify-center mt-2">Let's Talk</a>
          </nav>
        </div>
      </header>
    </>
  )
}
