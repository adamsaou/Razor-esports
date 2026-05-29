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

// ───────── Mobile: play once on entry, reset on exit, replay on re-entry ─────────
const MOBILE_PLAYBACK_RATE = 2.5

function MobileCarScene() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(
      entries => {
        const inView = entries[0].isIntersecting
        const v = videoRef.current
        if (!v) return
        if (inView) {
          v.currentTime = 0
          v.playbackRate = MOBILE_PLAYBACK_RATE
          v.play().catch(() => {})
        } else {
          v.pause()
          v.currentTime = 0
        }
      },
      { threshold: 0.4 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

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
        style={VIDEO_STYLE}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 90%)',
        }}
      />
    </section>
  )
}

// ───────── Desktop: scroll-scrubbed ─────────
function DesktopCarScene() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  const targetProgress = useRef(0)
  const rafId = useRef(0)
  const visible = useRef(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const VIDEO_START = 0.20
  const VIDEO_END = 0.80

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const range = VIDEO_END - VIDEO_START
    targetProgress.current = Math.min(Math.max((latest - VIDEO_START) / range, 0), 0.999)
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
          const t = targetProgress.current * v.duration
          if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [1, 0, 0, 1])

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
        <video
          ref={videoRef}
          src={kickoffVideo}
          muted playsInline preload="auto" disableRemotePlayback
          onLoadedMetadata={initVideo}
          className={VIDEO_CLASS}
          style={VIDEO_STYLE}
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
      </div>
    </section>
  )
}

export function CarScene() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileCarScene /> : <DesktopCarScene />
}

export default CarScene
