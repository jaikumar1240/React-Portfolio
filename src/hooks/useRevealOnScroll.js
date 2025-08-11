import { useEffect } from 'react'
import { gsap } from '../lib/gsap'

export default function useRevealOnScroll(selector, options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            ...options,
          },
        )
      })
    })
    return () => ctx.revert()
  }, [selector, options])
}


