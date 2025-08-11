import { useEffect } from 'react'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/jaikumar1240',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.545 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.854 0 1.337-.012 2.417-.012 2.744 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaikumar1240',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V24h-4V8z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_jairajput_',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2.5A2.5 2.5 0 1 1 12 14a2.5 2.5 0 0 1 0-5.5zM18 6.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
      </svg>
    ),
  },
]

export default function Socials({ compact = false, className = '' }) {
  useEffect(() => {
  }, [])

  if (compact) {
    return (
      <div aria-label="Social links" className={`flex flex-wrap items-center gap-4 ${className}`}>
        {socials.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="h-10 w-10 grid place-items-center rounded-xl transition bg-slate-900/10 ring-1 ring-slate-900/10 hover:bg-slate-900/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10"
            title={name}
            data-social
          >
            <Icon className="h-5 w-5 text-slate-700 dark:text-white/80" />
          </a>
        ))}
      </div>
    )
  }

  return (
    <section id="links" className="section">
      <div className="container-pro">
        <h2 className="section-title">Links</h2>
        <p className="section-subtitle">Connect with me across the web.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="card p-5 flex items-center gap-3 transition-colors group hover:bg-slate-900/5 dark:hover:bg-slate-900/80"
              data-social
            >
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-slate-900/10 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
                <Icon className="h-5 w-5 text-slate-700 group-hover:text-slate-900 dark:text-white/80 dark:group-hover:text-white" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{name}</div>
                <div className="text-sm text-slate-600 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-300">{href.replace(/^https?:\/\//, '')}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


