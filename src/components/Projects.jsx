import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import SectionHeader from './SectionHeader.jsx'
import weatherImg from '../assets/weather.png'
import expenseImg from '../assets/expense.png'
import shoppingImg from '../assets/shopping.png'

const projects = [
  {
    title: 'RealTime Weather',
    description:
      'Responsive web app showing real-time weather with location-based forecasts, built from scratch with vanilla JavaScript and a live weather API.',
    tags: ['JavaScript', 'HTML', 'CSS', 'API'],
    repo: 'https://github.com/jaikumar1240/RealTime-Weather',
    // demo: 'https://your-live-demo-url.com',   // ← add a live URL to show a "Live Demo" button
    image: weatherImg,
    accent: 'from-cyan-500/40 to-blue-600/40',
  },
  {
    title: 'Expense Tracker',
    description:
      'Track expenses with a responsive React UI, real-time updates, and interactive charts that surface spending patterns at a glance.',
    tags: ['React', 'Chart.js', 'Vite'],
    repo: 'https://github.com/jaikumar1240/Expense-tracker-React',
    // demo: 'https://your-live-demo-url.com',
    image: expenseImg,
    accent: 'from-brand-500/40 to-fuchsia-600/40',
  },
  {
    title: 'Shopping App',
    description:
      'Angular app backed by Firebase for real-time data and authentication — manages shopping lists and recipes with reactive RxJS streams.',
    tags: ['Angular', 'Firebase', 'RxJS'],
    repo: 'https://github.com/jaikumar1240/Shopping-App',
    // demo: 'https://your-live-demo-url.com',
    image: shoppingImg,
    accent: 'from-fuchsia-500/40 to-rose-600/40',
  },
]

export default function Projects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-project-card]')
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }),
      })

      if (!prefersReducedMotion()) {
        cards.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            gsap.to(el, {
              rotateY: ((e.clientX - rect.left) / rect.width - 0.5) * 7,
              rotateX: -((e.clientY - rect.top) / rect.height - 0.5) * 7,
              transformPerspective: 800, transformOrigin: 'center', duration: 0.2,
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
    <section id="projects" className="section">
      <div className="container-pro">
        <SectionHeader eyebrow="Selected work" title="Projects" subtitle="A few things I've designed, built, and shipped." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="card group relative overflow-hidden p-0 will-change-transform"
              data-project-card
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                {/* Hover action overlay */}
                <div className="absolute inset-0 flex items-end justify-end gap-2 p-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer noopener" className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow hover:bg-slate-100">
                      Live Demo ↗
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noreferrer noopener" className="rounded-full bg-slate-900/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-slate-900">
                    Code ↗
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-slate-900/5 text-slate-600 ring-1 ring-slate-900/10 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
