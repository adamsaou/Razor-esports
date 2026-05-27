import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

export default function Matches() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-5"
      >
        <div
          className="w-16 h-16 flex items-center justify-center"
          style={{ border: '1px solid rgba(0,245,255,0.2)', color: 'var(--color-accent)' }}
        >
          <Trophy size={28} strokeWidth={1.5} />
        </div>

        <div className="flex items-center gap-4 w-40">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0,245,255,0.15)' }} />
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0,245,255,0.15)' }} />
        </div>

        <h1
          className="text-5xl md:text-6xl font-bold uppercase tracking-widest text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Matches
        </h1>
        <p
          className="text-sm uppercase tracking-[0.4em] mt-1"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
        >
          Coming Soon
        </p>
        <p className="text-gray-600 text-sm max-w-xs mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Match history, upcoming fixtures and results will be tracked here.
        </p>
      </motion.div>
    </div>
  )
}
