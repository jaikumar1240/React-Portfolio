import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const education = [
  {
    title: "Bachelor's of Technology",
    institution: 'Guru Gobind Singh Indraprastha University',
    period: '08/2017 — 07/2021',
    location: 'Delhi, India',
  },
  {
    title: '12th',
    institution: 'S.D. Public School',
    period: '04/2015 — 02/2016',
    location: 'Delhi, India',
    score: '73%'
  },
]

export default function Education() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-education-card]')
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
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="section">
      <div className="container-pro">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic background and qualifications.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <article
              key={e.title + e.institution}
              className="card p-6 will-change-transform"
              data-education-card
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{e.title}</h3>
                  <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">{e.institution}</p>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{e.period}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                <span>{e.location}</span>
                {e.score ? <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 ring-slate-900/10 dark:ring-white/10 bg-slate-900/5 dark:bg-white/5">{e.score}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


