import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { logoFlat } from '../assets'

const socials = [
  { label: 'YouTube',   href: 'https://youtube.com/@frictionesport?si=H8IMM56icH3C1bck' },
  { label: 'Instagram', href: 'https://www.instagram.com/_razor_esports' },
  { label: 'TikTok',   href: 'https://www.tiktok.com/@razoresports' },
  { label: 'Discord',  href: 'https://discord.com/invite/razoresports' },
]

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Roster', to: '/roster' },
  { label: 'Matches', to: '/matches' },
  { label: 'About', to: '/about' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ backgroundColor: '#080810', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '6rem' }}>
      {/* Main footer grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-12"
        style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem' }}
      >

        {/* Logo */}
        <div className="flex flex-col gap-4" style={{ minWidth: 0, overflow: 'hidden' }}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoFlat}
              alt="RaZor"
              className="h-10 w-auto shrink-0"
              style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg)', opacity: 0.9 }}
            />
            <div className="h-7 w-px shrink-0" style={{ backgroundColor: 'rgba(0,245,255,0.2)' }} />
            <div className="flex flex-col leading-none">
              <span
                className="text-xl font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
              >
                Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.35em] mt-0.5"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(0,245,255,0.45)' }}
              >
                Esports
              </span>
            </div>
          </Link>
          <p
            className="text-xs text-gray-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Compete at the highest level.<br />Represent the blade.
          </p>
        </div>

        {/* Socials column */}
        <div className="flex flex-col gap-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.3em] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            RaZor
          </span>
          <ul className="flex flex-col gap-3">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav links column */}
        <div className="flex flex-col gap-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.3em] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pages
          </span>
          <ul className="flex flex-col gap-3">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.3em] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Newsletter
          </span>
          <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-heading)' }}>
            Stay up to date with RaZor news, match results and announcements.
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex items-stretch mt-1"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <input
              type="email"
              placeholder="Your e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 outline-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            />
            <button
              type="submit"
              className="px-4 flex items-center justify-center transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] text-gray-500"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem 1.5rem' }}
        >
        <span
          className="text-xs text-gray-700 uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          © {new Date().getFullYear()} RaZor Esports
        </span>
        <span
          className="text-xs text-gray-700 uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          All rights reserved
        </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
