import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import profileImg from '../assets/propic.png'

export default function Hero() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.querySelectorAll('[data-hero]'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )

      gsap.to(badgeRef.current, {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }

      if (!prefersReducedMotion() && containerRef.current && badgeRef.current) {
        const onMove = (e) => {
          const rect = containerRef.current.getBoundingClientRect()
          const relX = (e.clientX - rect.left) / rect.width
          const relY = (e.clientY - rect.top) / rect.height
          gsap.to(badgeRef.current, {
            rotateY: (relX - 0.5) * 12,
            rotateX: -(relY - 0.5) * 12,
            transformPerspective: 600,
            transformOrigin: 'center',
            duration: 0.3,
          })
        }
        const onLeave = () => {
          gsap.to(badgeRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
        }
        containerRef.current.addEventListener('mousemove', onMove)
        containerRef.current.addEventListener('mouseleave', onLeave)
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="profile" className="section overflow-hidden">
      <div ref={containerRef} className="container-pro grid gap-10 md:grid-cols-2 md:items-center relative">
        <div className="order-2 md:order-1">
          <h1 data-hero className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Jai Kumar
          </h1>
          <p data-hero className="mt-2 text-brand-600 dark:text-brand-400 font-semibold">Software Engineer</p>
          <p data-hero className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-xl">
            Software Engineer with 4 years of experience. Strong foundation in HTML, CSS and JavaScript with production
            experience across React, Angular and Vue. I care about responsive design, performance, and building delightful
            interfaces with smooth animations.
          </p>
          <div data-hero className="mt-8 flex items-center gap-4">
            <a href="#contact" className="btn-primary">Contact Me</a>
          </div>
        </div>
        <div className="order-1 md:order-2 justify-self-center md:justify-self-end relative">
          <div ref={parallaxRef} className="absolute -inset-6 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-brand-600 to-fuchsia-600 rounded-[36px]" />
          <div ref={badgeRef} className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-soft bg-slate-800">
            <img
              src={profileImg}
              alt="Jai Kumar portrait"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  )
}


