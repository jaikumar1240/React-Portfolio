import { useRef } from 'react'
import resumePdf from '../assets/Resume_Jai_Frontend_2025.pdf'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Resume({ compact = false, className = '' }) {
  const btnRef = useRef(null)
  useRevealOnScroll('[data-resume-card]')
  const header = (
    <>
      <h2 className="section-title">Resume</h2>
      <p className="section-subtitle">Download a copy of my resume, or view it online.</p>
    </>
  )

  const actionsClassName = compact
    ? 'mt-6 flex flex-wrap items-center gap-4'
    : 'mt-8 flex flex-wrap items-center gap-4'

  const actions = (
    <div className={actionsClassName} data-resume>
      <a ref={btnRef} href={resumePdf} download className="btn-primary">Download PDF</a>
      <a href={resumePdf} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">View Online</a>
    </div>
  )

  if (compact) {
    return (
      <div id="resume" className={`card p-6 will-change-transform ${className}`} data-resume-card>
        {header}
        {actions}
      </div>
    )
  }

  return (
    <section id="resume" className="section">
      <div className="container-pro">
        {header}
        {actions}
      </div>
    </section>
  )
}


