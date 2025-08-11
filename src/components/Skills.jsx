import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const skills = [
  { name: 'React.js', level: 92 },
  { name: 'Angular', level: 80 },
  { name: 'Vue 3', level: 75 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'HTML5', level: 95 },
  { name: 'CSS3 / SCSS', level: 90 },
  { name: 'Bootstrap', level: 85 },
  { name: 'Node.js', level: 70 },
  { name: 'Express.js', level: 65 },
  { name: 'REST APIs', level: 85 },
  { name: 'MongoDB', level: 60 },
  { name: 'Git', level: 80 },
  { name: 'CI/CD', level: 65 },
  { name: 'Agile / Jira', level: 80 },
  { name: 'Webpack', level: 70 },
  { name: 'Mocha / Chai / Karma', level: 70 },
  { name: 'RxJS', level: 60 },
  { name: 'Redux / Vuex', level: 75 },
  { name: 'Debugging', level: 85 }
]

function getAbbr(name) {
  const parts = name.split(/\s+/)
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default function Skills() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const skillEls = gsap.utils.toArray('[data-skill]')
      ScrollTrigger.batch(skillEls, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 16, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06 },
          ),
        onLeaveBack: (batch) =>
          gsap.to(batch, { opacity: 0, y: 16, scale: 0.96, duration: 0.35, ease: 'power2.inOut' }),
      })

      // Animate progress bars to their target level
      const bars = gsap.utils.toArray('[data-skillbar]')
      bars.forEach((bar) => {
        const level = Number(bar.getAttribute('data-level') || '0')
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%' },
          },
        )
      })

      // 3D tilt on hover
      if (!prefersReducedMotion()) {
        const cards = gsap.utils.toArray('[data-skill]')
        cards.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            const relX = (e.clientX - rect.left) / rect.width
            const relY = (e.clientY - rect.top) / rect.height
            gsap.to(el, {
              rotateY: (relX - 0.5) * 8,
              rotateX: -(relY - 0.5) * 8,
              transformPerspective: 700,
              transformOrigin: 'center',
              duration: 0.18,
            })
          }
          const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.35 })
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
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Core technologies and tools I use to craft robust web applications.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map(({ name, level }) => (
            <div
              key={name}
              className="relative card p-4 will-change-transform group"
              data-skill
              aria-label={`${name} proficiency ${level}%`}
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-500/0 via-fuchsia-500/0 to-cyan-400/0 opacity-0 group-hover:opacity-100 group-hover:from-brand-500/15 group-hover:via-fuchsia-500/15 group-hover:to-cyan-400/15 transition-opacity blur" />

              <div className="relative flex items-center gap-3">
                <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-fuchsia-600 text-white text-xs font-bold ring-1 ring-white/10">
                  {getAbbr(name)}
                </div>
                <div className="font-medium text-slate-900 dark:text-slate-100">{name}</div>
                <div className="ml-auto text-xs text-slate-600 dark:text-slate-400">{level}%</div>
              </div>

              <div className="relative mt-3 h-2 rounded-full bg-slate-900/10 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500"
                  data-skillbar
                  data-level={level}
                  style={{ width: '0%' }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(60%_60%_at_20%_50%,rgba(255,255,255,.15),transparent),radial-gradient(40%_40%_at_80%_50%,rgba(255,255,255,.08),transparent)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


