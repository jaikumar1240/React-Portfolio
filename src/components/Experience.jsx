import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import SectionHeader from './SectionHeader.jsx'

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'SalaryBox',
    location: 'Gurgaon, India',
    period: '11/2025 — Present',
    points: [
      'Led frontend enhancements for a payroll & HR SaaS platform used by hundreds of businesses.',
      'Built a User Impersonation system, reducing support resolution time by 30%.',
      'Implemented subscription billing flows (monthly & quarterly), increasing conversions by 15%.',
      'Developed a Feature Request System, improving user engagement by 25% and aiding product prioritization.',
      'Integrated Google reCAPTCHA, reducing bot traffic and fraudulent attempts by 40%.',
      'Implemented GA4 & Meta Pixel tracking, enabling data-driven product and marketing decisions.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Monotype',
    location: 'Noida, India',
    period: '05/2023 — 11/2025',
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
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fill the timeline line as the section scrolls through the viewport.
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: { trigger: '#experience', start: 'top 60%', end: 'bottom 70%', scrub: 0.4 },
          },
        )
      }

      const items = gsap.utils.toArray('[data-exp-item]')
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })

      const dots = gsap.utils.toArray('[data-exp-dot]')
      dots.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: el, start: 'top 82%' } },
        )
      })

      if (!prefersReducedMotion()) {
        gsap.utils.toArray('[data-exp-card]').forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            gsap.to(el, {
              rotateY: ((e.clientX - rect.left) / rect.width - 0.5) * 5,
              rotateX: -((e.clientY - rect.top) / rect.height - 0.5) * 5,
              transformPerspective: 900, transformOrigin: 'center', duration: 0.25,
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
        <SectionHeader eyebrow="Career" title="Experience" subtitle="A track record of shipping impactful products and leading frontend initiatives." />

        <div className="relative mt-12 pl-8 sm:pl-12">
          {/* Track + animated fill */}
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-slate-900/10 dark:bg-white/10" />
          <div ref={lineRef} className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-fuchsia-500 to-cyan-400" />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.role + exp.company} data-exp-item className="relative">
                {/* Node */}
                <span
                  data-exp-dot
                  className="absolute -left-8 sm:-left-12 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 ring-4 ring-white dark:ring-slate-950"
                />
                <article data-exp-card className="card p-6 will-change-transform">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                      {exp.role} · <span className="text-gradient animate-gradient">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{exp.location}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {exp.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <svg className="mt-1 h-3.5 w-3.5 flex-none text-brand-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                        </svg>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
