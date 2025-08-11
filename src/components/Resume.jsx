import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Resume({ compact = false, className = '' }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-resume]', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#resume', start: 'top 85%' },
      })
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

  if (compact) {
    return (
      <div id="resume" className={`card p-6 ${className}`}>
        <h2 className="section-title">Resume</h2>
        <p className="section-subtitle">Download a copy of my resume, or view it online.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4" data-resume>
          <a ref={btnRef} href="/assets/Resume_Jai_Frontend_2025.pdf" download className="btn-primary">Download PDF</a>
          <a href="/assets/Resume_Jai_Frontend_2025.pdf" target="_blank" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">View Online</a>
        </div>
      </div>
    )
  }

  return (
    <section id="resume" className="section">
      <div className="container-pro">
        <h2 className="section-title">Resume</h2>
        <p className="section-subtitle">Download a copy of my resume, or view it online.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4" data-resume>
          <a ref={btnRef} href="/assets/Resume_Jai_Frontend_2025.pdf" download className="btn-primary">Download PDF</a>
          <a href="/assets/Resume_Jai_Frontend_2025.pdf" target="_blank" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">View Online</a>
        </div>
      </div>
    </section>
  )
}


