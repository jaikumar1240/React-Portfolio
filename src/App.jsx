import './index.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Resume from './components/Resume.jsx'
import Socials from './components/Socials.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="space-y-2">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <section className="section">
          <div className="container-pro grid gap-6 md:grid-cols-2 items-stretch">
            <Contact compact className="h-full" />
            <div className="grid gap-6 grid-rows-[1fr_auto] h-full">
              <Resume compact className="h-full" />
              <div className="card p-6">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Find me online</h3>
                <Socials compact />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-10">
        <div className="container-pro text-sm text-slate-500">© {new Date().getFullYear()} Jai Kumar. All rights reserved.</div>
      </footer>
    </div>
  )
}
