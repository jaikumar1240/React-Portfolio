import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Monotype',
    location: 'Noida, India',
    period: '05/2023 — Present',
    points: [
      'Developed the frontend of Monotype Foundry Platform, increasing user engagement by 40%.',
      'Designed and executed unit tests with Mocha, Chai, and Karma; improved coverage from 60% to 87% in 3 months.',
      'Led Agile ceremonies, resulting in a 15% boost in team productivity and delivery speed.',
      'Streamlined defect tracking with JIRA and Confluence, reducing resolution time by 25%.',
      'Integrated graphs, meters, and tables improving engagement by 25%.',
      'Improved page speed by 35% via lazy-loading and performance optimizations.',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Pristyn Care',
    location: 'Gurugram, India',
    period: '09/2021 — 05/2023',
    points: [
      'Built Hospital, Medical, Insurance, and Clinic dashboards from scratch; increased operational efficiency by 30%.',
      'Enhanced website speed by 25% through optimization and minification of assets.',
      'Integrated forms, maps, and charts, increasing engagement by 20%.',
      'Led API integrations with backend teams, cutting integration time by 35%.',
      'Shipped responsive designs with Bootstrap and MUI, increasing mobile traffic by 25% and engagement by 30%.',
    ],
  },
]

export default function Experience() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-experience-card]')
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
    <section id="experience" className="section">
      <div className="container-pro">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">A track record of shipping impactful products and leading frontend initiatives.</p>
        <div className="mt-10 grid gap-6">
          {experiences.map((exp) => (
            <article
              key={exp.role}
              className="card p-6 will-change-transform"
              data-experience-card
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{exp.role} · <span className="text-brand-400">{exp.company}</span></h3>
                <span className="text-sm text-slate-600 dark:text-slate-400">{exp.period}</span>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                {exp.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


