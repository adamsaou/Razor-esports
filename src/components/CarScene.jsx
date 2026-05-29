import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { kickoffVideo } from '../assets'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

const VIDEO_CLASS =
  'absolute inset-0 w-full h-full object-cover pointer-events-none select-none'
const VIDEO_STYLE = {
  willChange: 'transform',
  transform: 'translateZ(0)',
}

// ───────── Mobile: title → video → tagline, choreographed by phase ─────────
const MOBILE_PLAYBACK_RATE = 2.5
const TITLE_HOLD_MS = 1800 // how long the title stays on black before video starts

function MobileCarScene() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleTimerRef = useRef(null)
  const [phase, setPhase] = useState('idle') // 'idle' | 'title' | 'video' | 'tagline'

  // Drive phase transitions from viewport visibility
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(
      entries => {
        const inView = entries[0].isIntersecting
        if (inView) {
          setPhase('title')
          clearTimeout(titleTimerRef.current)
          titleTimerRef.current = setTimeout(() => {
            setPhase('video')
            const v = videoRef.current
            if (v) {
              v.currentTime = 0
              v.playbackRate = MOBILE_PLAYBACK_RATE
              v.play().catch(() => {})
            }
          }, TITLE_HOLD_MS)
        } else {
          clearTimeout(titleTimerRef.current)
          setPhase('idle')
          const v = videoRef.current
          if (v) {
            v.pause()
            v.currentTime = 0
          }
        }
      },
      { threshold: 0.4 }
    )
    io.observe(section)
    return () => {
      io.disconnect()
      clearTimeout(titleTimerRef.current)
    }
  }, [])

  // When the video finishes playing, advance to the tagline phase
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onEnded = () => setPhase(p => (p === 'video' ? 'tagline' : p))
    v.addEventListener('ended', onEnded)
    return () => v.removeEventListener('ended', onEnded)
  }, [])

  // Safety: if the network/browser stalls and 'ended' never fires, force
  // the tagline phase after the expected play duration so the scene still
  // resolves visually.
  useEffect(() => {
    if (phase !== 'video') return
    const v = videoRef.current
    const dur = v && v.duration && !Number.isNaN(v.duration) ? v.duration : 2.5
    const expectedMs = (dur / MOBILE_PLAYBACK_RATE) * 1000 + 700
    const t = setTimeout(() => {
      setPhase(p => (p === 'video' ? 'tagline' : p))
    }, expectedMs)
    return () => clearTimeout(t)
  }, [phase])

  const showTitle = phase === 'title'
  const showTagline = phase === 'tagline'
  // Black overlay also covers the video in 'idle' so it never flashes before the title appears
  const blackoutOpacity =
    phase === 'idle' || phase === 'title' ? 1 :
    phase === 'tagline' ? 0.55 :
    0

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'min(56vw, 30vh)',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={kickoffVideo}
        muted playsInline preload="auto" disableRemotePlayback
        className={VIDEO_CLASS}
        style={{
          ...VIDEO_STYLE,
          filter: showTagline ? 'blur(8px) contrast(1.18) brightness(0.95)' : 'contrast(1.18) brightness(0.95)',
          transition: 'filter 0.7s ease-out',
        }}
      />

      {/* Black overlay — drives the title-then-video reveal and the tagline darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#000',
          opacity: blackoutOpacity,
          transition: 'opacity 0.7s ease-out',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 90%)',
        }}
      />

      {/* Title — JOIN RAZOR */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 px-4"
        initial="hidden"
        animate={showTitle ? 'visible' : 'exit'}
        variants={titleContainer}
      >
        <motion.div
          variants={titleWord}
          className="text-[9px] uppercase tracking-[0.5em] text-gray-500 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The Call
        </motion.div>
        <h2
          className="font-bold uppercase leading-none flex items-baseline justify-center gap-x-3"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em', fontSize: 'clamp(1.5rem, 8vw, 2.75rem)', color: '#fff' }}
        >
          <motion.span variants={titleWord} className="inline-block">Join</motion.span>
          <motion.span variants={titleWord} className="inline-block">
            Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
          </motion.span>
        </h2>
      </motion.div>

      {/* Tagline — Represent the blade */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 px-4"
        initial="hidden"
        animate={showTagline ? 'visible' : 'hidden'}
        variants={taglineContainer}
      >
        <div
          className="font-bold uppercase flex flex-wrap items-baseline justify-center gap-x-2"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.14em', fontSize: 'clamp(1rem, 5.5vw, 1.75rem)', color: '#fff' }}
        >
          <motion.span variants={taglineWord} className="inline-block">Represent</motion.span>
          <motion.span variants={taglineWord} className="inline-block">the</motion.span>
          <motion.span variants={taglineWord} className="inline-block" style={{ color: 'var(--color-accent)' }}>
            blade
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}

// Stagger reveal — words drop in from below with blur fade
const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
}
const titleWord = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, filter: 'blur(6px)', transition: { duration: 0.4 } },
}
const taglineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const taglineWord = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

// ───────── Desktop: scroll-scrubbed ─────────
function DesktopCarScene() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  const targetProgress = useRef(0)
  const rafId = useRef(0)
  const visible = useRef(false)

  const [showTitle, setShowTitle] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const VIDEO_START = 0.40
  const VIDEO_END = 0.70

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const range = VIDEO_END - VIDEO_START
    targetProgress.current = Math.min(Math.max((latest - VIDEO_START) / range, 0), 1)

    // Title gets ~32% of scroll on pitch black, tagline gets ~28% at the end
    setShowTitle(latest > 0.02 && latest < 0.34)
    setShowTagline(latest > 0.72)
  })

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      entries => { visible.current = entries[0].isIntersecting },
      { rootMargin: '200px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const tick = () => {
      if (visible.current) {
        const v = videoRef.current
        if (v && v.duration && !Number.isNaN(v.duration)) {
          // Allow the scrub to reach the actual final frame
          const t = Math.min(targetProgress.current * v.duration, v.duration - 0.01)
          if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  // Black holds while title is shown (0 → 0.34),
  // fades out as title exits and video reveals (0.34 → 0.42),
  // returns gradually as the tagline takes over (0.85 → 1)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.34, 0.42, 0.85, 1],
    [1, 1,    0,    0,    1]
  )

  // Video blurs as the tagline reveals — depth-of-field shift, text comes forward
  const videoBlur = useTransform(scrollYProgress, [0.68, 0.80], [0, 10])
  const videoFilter = useTransform(videoBlur, v => `blur(${v}px)`)

  const initVideo = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <section ref={ref} style={{ height: '500vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: '#000', contain: 'strict' }}
      >
        <motion.video
          ref={videoRef}
          src={kickoffVideo}
          muted playsInline preload="auto" disableRemotePlayback
          onLoadedMetadata={initVideo}
          className={VIDEO_CLASS}
          style={{ ...VIDEO_STYLE, filter: videoFilter }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: '#000', opacity: overlayOpacity }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* ─── Entry title: JOIN RAZOR ─── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 px-6"
          initial="hidden"
          animate={showTitle ? 'visible' : 'exit'}
          variants={titleContainer}
        >
          <motion.div
            variants={titleWord}
            className="text-[11px] uppercase tracking-[0.6em] text-gray-500 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Call
          </motion.div>
          <h2
            className="font-bold uppercase leading-none flex flex-wrap items-baseline justify-center gap-x-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.14em', fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#fff' }}
          >
            <motion.span variants={titleWord} className="inline-block">Join</motion.span>
            <motion.span variants={titleWord} className="inline-block">
              Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
            </motion.span>
          </h2>
          <motion.div
            variants={titleWord}
            className="flex items-center gap-3 mt-6"
          >
            <span className="h-px w-16" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
            <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="h-px w-16" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
          </motion.div>
        </motion.div>

        {/* ─── Exit tagline: Represent the blade ─── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 px-6"
          initial="hidden"
          animate={showTagline ? 'visible' : 'hidden'}
          variants={taglineContainer}
        >
          <motion.div
            variants={taglineWord}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-16" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
            <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="h-px w-16" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
          </motion.div>
          <div
            className="font-bold uppercase flex flex-wrap items-baseline justify-center gap-x-5"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.16em', fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', color: '#fff' }}
          >
            <motion.span variants={taglineWord} className="inline-block">Represent</motion.span>
            <motion.span variants={taglineWord} className="inline-block">the</motion.span>
            <motion.span variants={taglineWord} className="inline-block" style={{ color: 'var(--color-accent)' }}>
              blade
            </motion.span>
          </div>
          <motion.div
            variants={taglineWord}
            className="mt-5 text-[10px] uppercase tracking-[0.5em] text-gray-500"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Join the Squad
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function CarScene() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileCarScene /> : <DesktopCarScene />
}

export default CarScene
