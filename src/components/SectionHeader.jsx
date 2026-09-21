import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Reusable animated section header: an eyebrow label, a title with an animated
 * gradient underline that draws in on scroll, and an optional subtitle.
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        els,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        },
      )
      const underline = ref.current?.querySelector('[data-underline]')
      if (underline) {
        gsap.fromTo(
          underline,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: 'power3.out', transformOrigin: align === 'center' ? 'center' : 'left center',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' },
          },
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [align])

  return (
    <div ref={ref} className={`flex flex-col ${align === 'center' ? 'text-center items-center' : 'items-start'}`}>
      {eyebrow && <span data-reveal className="eyebrow mb-3">{eyebrow}</span>}
      <h2 data-reveal className="section-title relative inline-block w-fit">
        {title}
        <span data-underline className="absolute -bottom-1.5 left-0 h-1 w-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300" />
      </h2>
      {subtitle && <p data-reveal className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  )
}
