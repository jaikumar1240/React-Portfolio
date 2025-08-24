import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export default function Contact({ compact = false, className = '' }) {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const formAction = `https://formspree.io/f/xdkdyvkd`

  const validateClient = (formData) => {
    const errors = {}
    const name = (formData.get('name') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const message = (formData.get('message') || '').toString().trim()
    if (!name) errors.name = 'Required'
    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email) errors.email = 'Required'
    else if (!emailRegex.test(email)) errors.email = 'should be an email'
    if (!message) errors.message = 'Required'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    setFieldErrors({})
    try {
      const formData = new FormData(e.currentTarget)
      // Client-side validation first
      const clientErrors = validateClient(formData)
      if (Object.keys(clientErrors).length > 0) {
        setFieldErrors(clientErrors)
        setStatus('Please fix the highlighted fields.')
        return
      }
      const res = await fetch(formAction, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const contentType = res.headers.get('content-type') || ''
      const data = contentType.includes('application/json') ? await res.json().catch(() => ({})) : null
      if (res.ok) {
        setStatus('Thanks! Your message has been sent.')
        formRef.current?.reset()
      } else {
        if (data && Array.isArray(data.errors) && data.errors.length) {
          const next = {}
          data.errors.forEach((err) => {
            if (err.field) next[err.field] = err.message || 'Invalid'
          })
          setFieldErrors(next)
          setStatus(data.error || 'Please fix the highlighted fields.')
        } else {
          const message = (data && (data.error || data.message)) || `${res.status} ${res.statusText}`
          setStatus(message)
        }
      }
    } catch (err) {
      setStatus(`Network error: ${err?.message || 'Please try again later.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-contact-card]')
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

      gsap.fromTo(
        formRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      )
    })
    return () => ctx.revert()
  }, [])

  const header = (
    <>
      <h2 className="section-title">Contact</h2>
      <p className="section-subtitle">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
    </>
  )

  const formClassName = compact ? 'mt-6 grid gap-2' : 'mt-8 grid gap-4 max-w-xl'

  const formElement = (
    <form
      ref={formRef}
      className={formClassName}
      method="POST"
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="_subject" value="Portfolio contact from Jai Kumar" />
      <input
        name="name"
        type="text"
        placeholder="Your name"
        required
        className={`w-full rounded-xl bg-white border px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 ${fieldErrors.name ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-white/10'}`}
      />
      {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email address"
        required
        className={`w-full rounded-xl bg-white border px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 ${fieldErrors.email ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-white/10'}`}
      />
      {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
      <textarea
        name="message"
        rows="5"
        placeholder="Message"
        required
        className={`w-full rounded-xl bg-white border px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 ${fieldErrors.message ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-white/10'}`}
      />
      {fieldErrors.message && <p className="text-xs text-red-500">{fieldErrors.message}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary justify-center disabled:opacity-60">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {status && (
        <p aria-live="polite" className="text-sm text-slate-700 dark:text-slate-300">{status}</p>
      )}
    </form>
  )

  if (compact) {
    return (
      <div id="contact" className={`card p-6 will-change-transform ${className}`} data-contact-card>
        {header}
        {formElement}
      </div>
    )
  }

  return (
    <section id="contact" className="section">
      <div className="container-pro">
        {header}
        {formElement}
      </div>
    </section>
  )
}


