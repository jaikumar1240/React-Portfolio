import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { scrollToTarget } from '../lib/smoothScroll'
import profileImg from '../assets/propic_new.jpg'

const ROLES = ['Senior Software Engineer', 'Full-Stack Engineer', 'React & Angular Dev', 'Electron & SaaS Builder']

const STATS = [
  { value: 5, suffix: '+', label: 'Years experience' },
  { value: 40, suffix: '%', label: 'Peak engagement lift' },
  { value: 15, suffix: '+', label: 'Products shipped' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)
  const parallaxRef = useRef(null)
  const roleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into words then chars for a staggered reveal.
      const chars = containerRef.current?.querySelectorAll('[data-char]')
      gsap.fromTo(
        chars,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out', delay: 0.15 },
      )

      gsap.fromTo(
        containerRef.current?.querySelectorAll('[data-hero]'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.5 },
      )

      gsap.fromTo(
        badgeRef.current,
        { scale: 0.85, opacity: 0, rotate: -4 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out', delay: 0.3 },
      )

      // Idle float on the portrait.
      gsap.to(badgeRef.current, { y: -12, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }

      // Animated count-up for stats when hero enters view.
      const counters = gsap.utils.toArray('[data-counter]')
      counters.forEach((el) => {
        const end = Number(el.getAttribute('data-counter'))
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.8,
          onUpdate: () => { el.textContent = Math.round(obj.v) },
        })
      })

      // Rotating role text.
      if (!prefersReducedMotion() && roleRef.current) {
        let i = 0
        const swap = () => {
          i = (i + 1) % ROLES.length
          gsap.to(roleRef.current, {
            yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.in',
            onComplete: () => {
              roleRef.current.textContent = ROLES[i]
              gsap.fromTo(roleRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
            },
          })
        }
        const id = setInterval(swap, 2600)
        return () => clearInterval(id)
      }

      // Pointer tilt on the portrait.
      if (!prefersReducedMotion() && containerRef.current && badgeRef.current) {
        const onMove = (e) => {
          const rect = containerRef.current.getBoundingClientRect()
          const relX = (e.clientX - rect.left) / rect.width
          const relY = (e.clientY - rect.top) / rect.height
          gsap.to(badgeRef.current, {
            rotateY: (relX - 0.5) * 14,
            rotateX: -(relY - 0.5) * 14,
            transformPerspective: 700,
            transformOrigin: 'center',
            duration: 0.4,
          })
        }
        const onLeave = () => gsap.to(badgeRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
        containerRef.current.addEventListener('mousemove', onMove)
        containerRef.current.addEventListener('mouseleave', onLeave)
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const renderHeadline = (text, gradient = false) => {
    // The gradient variant is rendered as a single clipped unit — splitting it
    // into nested char spans breaks background-clip:text (the background sits on
    // the ancestor but the transparent glyphs live in children).
    if (gradient) {
      return (
        <span className="inline-block overflow-hidden align-bottom">
          <span data-char className="text-gradient animate-gradient inline-block">{text}</span>
        </span>
      )
    }
    return text.split(' ').map((word, wi) => (
      <span key={wi} className="inline-block overflow-hidden align-bottom">
        <span className="inline-block">
          {word.split('').map((ch, ci) => (
            <span key={ci} data-char className="inline-block">{ch}</span>
          ))}
        </span>
        {' '}
      </span>
    ))
  }

  return (
    <section id="profile" className="section overflow-hidden pt-20 sm:pt-28">
      <div ref={containerRef} className="container-pro grid gap-12 md:grid-cols-2 md:items-center relative">
        <div className="order-2 md:order-1">
          <div data-hero className="eyebrow mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            {renderHeadline("Hi, I'm")}
            <span className="block">{renderHeadline('Jai Kumar', true)}</span>
          </h1>

          <div data-hero className="mt-3 h-8 overflow-hidden">
            <p ref={roleRef} className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400">
              {ROLES[0]}
            </p>
          </div>

          <p data-hero className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl">
            I build scalable SaaS applications that move the numbers that matter — engagement, conversions,
            and performance. 5+ years turning product ideas into fast, polished, measurable web experiences.
          </p>

          <div data-hero className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget('#contact') }} className="btn-primary">
              Let's work together
            </a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToTarget('#projects') }} className="btn-ghost">
              View my work
            </a>
          </div>

          <dl data-hero className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  <span data-counter={s.value}>0</span>{s.suffix}
                </dd>
                <dt className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-tight">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 md:order-2 justify-self-center md:justify-self-end relative">
          {/* Glowing aurora behind the portrait */}
          <div ref={parallaxRef} className="absolute -inset-8 -z-10 blur-3xl opacity-40 bg-gradient-to-br from-brand-600 via-fuchsia-600 to-cyan-500 rounded-[40%] animate-float" />
          {/* Rotating dashed ring */}
          <div className="absolute -inset-4 rounded-[36px] border border-dashed border-brand-500/30 dark:border-white/15" style={{ animation: 'spin 24s linear infinite' }} />
          <div ref={badgeRef} className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-soft bg-slate-800 will-change-transform">
            <img
              src={profileImg}
              alt="Jai Kumar portrait"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-transparent to-white/10 mix-blend-overlay" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hero className="mt-16 flex justify-center">
        <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToTarget('#experience') }} aria-label="Scroll to experience" className="group flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <span className="flex h-9 w-6 justify-center rounded-full border border-current pt-1.5">
            <span className="h-2 w-1 rounded-full bg-current animate-bob" />
          </span>
        </a>
      </div>
    </section>
  )
}
