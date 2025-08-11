import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const projects = [
  {
    title: 'RealTime Weather',
    description:
      'Responsive web app to display real-time weather data with location-based forecasts. Built with JavaScript, HTML and CSS.',
    tags: ['JavaScript', 'HTML', 'CSS', 'API'],
    repo: 'https://github.com/jaikumar1240/RealTime-Weather',
    image: 'src/assets/weather.jpg',
  },
  {
    title: 'Expense Tracker (React)',
    description:
      'Track expenses with a responsive UI and real-time updates, including charts for spending patterns.',
    tags: ['React', 'Chart.js', 'Vite'],
    repo: 'https://github.com/jaikumar1240/Expense-tracker-React',
    image: 'src/assets/expense.jpg',
  },
  {
    title: 'Shopping App (Angular + Firebase)',
    description:
      'Angular app with Firebase for real-time data and auth, managing shopping lists and recipes.',
    tags: ['Angular', 'Firebase', 'RxJS'],
    repo: 'https://github.com/jaikumar1240/Shopping-App',
    image: 'src/assets/shopping.jpg',
  },
]

export default function Projects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-project-card]')
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
    <section id="projects" className="section">
      <div className="container-pro">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">A few things I’ve built recently.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="card group overflow-hidden p-0 will-change-transform bg-white/70 dark:bg-slate-900/60"
              data-project-card
            >
              <div className="relative h-40 overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 to-fuchsia-600/40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


