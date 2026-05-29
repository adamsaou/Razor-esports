import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { logoFlat } from '../assets'

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', height: '100vh' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Cyan radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.055) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-5xl mx-auto gap-4">

        {/* Logo mark */}
        <motion.img
          src={logoFlat}
          alt="RaZor"
          className="w-16 md:w-20 mb-2"
          style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg)', opacity: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.6em] text-gray-600"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Esports Team
        </motion.span>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-bold uppercase leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 18vw, 12rem)',
            letterSpacing: '0.1em',
            color: '#fff',
          }}
        >
          Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
        </motion.h1>

        {/* Decorative rule */}
        <motion.div
          className="flex items-center gap-4 w-56"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0,245,255,0.2)' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.6 }} />
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0,245,255,0.2)' }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-sm uppercase tracking-[0.45em] text-gray-500"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Compete · Dominate · Win
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex gap-4 mt-3"
        >
          <Link
            to="/roster"
            className="btn-aurora px-10 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-colors"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-accent)',
            }}
          >
            Meet the Team
          </Link>
          <Link
            to="/matches"
            className="btn-aurora px-10 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-colors text-gray-500 hover:text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Matches
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.3)' }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ opacity: [0.08, 0.25, 0.08], scaleY: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-px h-7 origin-top"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </motion.div>
    </section>
  )
}

export default Hero
