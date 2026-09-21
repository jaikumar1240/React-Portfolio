import { useEffect, lazy, Suspense } from 'react'
import './index.css'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll } from './lib/smoothScroll'
import Cursor from './components/Cursor.jsx'
import BackToTop from './components/BackToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import SectionHeader from './components/SectionHeader.jsx'
import Contact from './components/Contact.jsx'
import Resume from './components/Resume.jsx'
import Socials from './components/Socials.jsx'

// Three.js is heavy; load the 3D background after first paint so it never
// blocks initial render.
const Background3D = lazy(() => import('./components/Background3D.jsx'))

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll()
    // Recalculate triggers once everything (fonts, images) settles.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 500)
    return () => {
      cleanup()
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <section id="contact-wrap" className="section">
          <div className="container-pro">
            <SectionHeader eyebrow="Say hello" title="Get in touch" subtitle="Have a project in mind or just want to connect? My inbox is always open." align="center" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
              <Contact compact className="h-full" />
              <div className="grid gap-6 grid-rows-[1fr_auto] h-full">
                <Resume compact className="h-full" />
                <div className="card p-6">
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Find me online</h3>
                  <Socials compact />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-900/10 dark:border-white/10 py-10">
        <div className="container-pro flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} Jai Kumar. Crafted with React, Three.js & GSAP.</span>
          <a href="#profile" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Back to top ↑</a>
        </div>
      </footer>
      <BackToTop />
    </div>
  )
}
