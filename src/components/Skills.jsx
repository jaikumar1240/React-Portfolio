import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import SectionHeader from './SectionHeader.jsx'

const categories = [
  { name: 'Frontend', icon: 'window', items: ['React.js', 'Angular', 'Vue 3', 'Electron', 'JavaScript (ES6+)', 'TypeScript'] },
  { name: 'Backend', icon: 'server', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
  { name: 'Styling & UI', icon: 'brush', items: ['HTML5', 'CSS3', 'SCSS', 'Bootstrap', 'Material UI'] },
  { name: 'State Management', icon: 'layers', items: ['Redux', 'Vuex', 'Redux Saga'] },
  { name: 'Tools & DevOps', icon: 'terminal', items: ['Git', 'Docker', 'Jenkins', 'CI/CD', 'Webpack'] },
  { name: 'Testing', icon: 'check', items: ['Mocha', 'Chai', 'Karma', 'Vitest'] },
  { name: 'Analytics', icon: 'chart', items: ['Google Analytics (GA4)', 'Meta Pixel'] },
  { name: 'Ways of working', icon: 'spark', items: ['Agile', 'JIRA', 'Performance Optimization'] },
]

const marquee = ['React', 'Angular', 'Vue', 'TypeScript', 'Node.js', 'Electron', 'Docker', 'GraphQL', 'MongoDB', 'Redux', 'Jenkins', 'Webpack', 'Vitest', 'Tailwind']

function Icon({ name, className }) {
  const paths = {
    window: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 6.75A1.5 1.5 0 0 1 5.25 5.25h13.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6.75Z" />,
    server: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5m-13.5 0v3.75a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5v-3.75M7.5 11.25h.008M7.5 5.25h9a1.5 1.5 0 0 1 1.5 1.5v1.5" />,
    brush: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-4.244 4.243c.53.53 1.4.68 2.13.442 1.68-.55 3.1-1.96 3.63-3.64a9 9 0 0 0 3.83-2.31l4.79-4.79a2.12 2.12 0 0 0-3-3l-4.79 4.79a9 9 0 0 0-2.31 3.83Z" />,
    layers: <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 8.25-4.5 8.25 4.5-8.25 4.5-8.25-4.5Zm0 4.5 8.25 4.5 8.25-4.5m-16.5 4.5 8.25 4.5 8.25-4.5" />,
    terminal: <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9-9h13.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5Z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5a.75.75 0 0 0 .75.75H21M7.5 15l3-3.75 3 2.25 4.5-6" />,
    spark: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      {paths[name]}
    </svg>
  )
}

export default function Skills() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-skill-cat]')
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }),
      })

      if (!prefersReducedMotion()) {
        cards.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            gsap.to(el, {
              rotateY: ((e.clientX - rect.left) / rect.width - 0.5) * 4,
              rotateX: -((e.clientY - rect.top) / rect.height - 0.5) * 4,
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
    <section id="skills" className="section">
      <div className="container-pro">
        <SectionHeader eyebrow="Toolbox" title="Skills" subtitle="A full-stack toolkit for building fast, scalable, and polished web products." />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.name} data-skill-cat className="card group p-6 will-change-transform">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white ring-1 ring-white/20 shadow-glow">
                  <Icon name={cat.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-900/[0.04] ring-1 ring-slate-900/10 transition-colors hover:bg-brand-500/10 hover:text-brand-700 hover:ring-brand-500/30 dark:text-slate-300 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-brand-500/20 dark:hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite scrolling tech ticker */}
      <div className="mt-14 relative overflow-hidden mask-fade-x py-4 border-y border-slate-900/5 dark:border-white/10">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...marquee, ...marquee].map((name, i) => (
            <span key={name + i} className="flex items-center gap-10 text-lg font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">
              {name}
              <span className="text-brand-500/60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
