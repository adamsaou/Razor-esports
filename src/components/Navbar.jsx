import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { logoFlat } from '../assets'

const links = [
  { to: '/', label: 'Home' },
  { to: '/roster', label: 'Roster' },
  { to: '/matches', label: 'Matches' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto h-28 grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr', padding: '0 2.5rem' }}>

        {/* Left — logo */}
        <Link to="/" className="flex items-center gap-4 shrink-0 group">
          <img
            src={logoFlat}
            alt="RaZor"
            className="w-auto transition-transform duration-300 group-hover:scale-105"
            style={{
              height: '2.5rem',
              filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg)',
              opacity: 0.9,
            }}
          />
          <div className="w-px" style={{ height: '2.75rem', backgroundColor: 'rgba(0,245,255,0.2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              className="text-3xl font-bold uppercase leading-none"
              style={{ fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.18em' }}
            >
              Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'rgba(0,245,255,0.45)',
                fontSize: '10px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Esports
            </span>
          </div>
        </Link>

        {/* Center — nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-base tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--color-accent)]'
                      : 'text-gray-400 hover:text-white'
                  }`
                }
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right — icons */}
        <div className="hidden md:flex items-center gap-4 justify-end">
          <button className="text-gray-500 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <a
            href="/roster"
            className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110"
            style={{
              fontFamily: 'var(--font-heading)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
            }}
          >
            Join Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setOpen(o => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{ backgroundColor: 'rgba(10,10,15,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm tracking-widest uppercase ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-gray-400'
                }`
              }
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
