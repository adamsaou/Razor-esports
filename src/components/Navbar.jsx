import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { logoNav } from '../assets'

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
      <div className="max-w-7xl mx-auto px-6 h-16 grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* Left — logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src={logoNav}
            alt="RaZor"
            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg)', opacity: 0.9 }}
          />
          {/* vertical separator */}
          <div className="h-7 w-px mx-1" style={{ backgroundColor: 'rgba(0,245,255,0.2)' }} />
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

        {/* Center — nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors duration-200 ${
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
            <Search size={16} />
          </button>
          <a
            href="/roster"
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110"
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
