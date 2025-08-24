import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import resumePdf from '../assets/Resume_Jai_Frontend_2025.pdf'

export default function Resume({ compact = false, className = '' }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-resume-card]')
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
          ),
        onLeaveBack: (batch) =>
          gsap.to(batch, { opacity: 0, y: 26, duration: 0.4, ease: 'power2.inOut' }),
      })

      if (!prefersReducedMotion()) {
        cards.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            const relX = (e.clientX - rect.left) / rect.width
            const relY = (e.clientY - rect.top) / rect.height
            gsap.to(el, {
              rotateY: (relX - 0.5) * 6,
              rotateX: -(relY - 0.5) * 6,
              transformPerspective: 800,
              transformOrigin: 'center',
              duration: 0.2,
            })
          }
          const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4 })
          el.addEventListener('mousemove', onMove)
          el.addEventListener('mouseleave', onLeave)
        })
      }

      gsap.fromTo(
        btnRef.current,
        { rotate: 0, y: 0 },
        {
          y: 4,
          duration: 0.2,
          repeat: 3,
          yoyo: true,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: '#resume', start: 'top 85%' },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  const header = (
    <>
      <h2 className="section-title">Resume</h2>
      <p className="section-subtitle">Download a copy of my resume, or view it online.</p>
    </>
  )

  const actionsClassName = compact
    ? 'mt-6 flex flex-wrap items-center gap-4'
    : 'mt-8 flex flex-wrap items-center gap-4'

  const actions = (
    <div className={actionsClassName} data-resume>
      <a ref={btnRef} href={resumePdf} download className="btn-primary">Download PDF</a>
      <a href={resumePdf} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">View Online</a>
    </div>
  )

  if (compact) {
    return (
      <div id="resume" className={`card p-6 will-change-transform ${className}`} data-resume-card>
        {header}
        {actions}
      </div>
    )
  }

  return (
    <section id="resume" className="section">
      <div className="container-pro">
        {header}
        {actions}
      </div>
    </section>
  )
}


