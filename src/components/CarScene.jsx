import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { carAnimation, otherCarAnimation, ballAnimation } from '../assets'

export function CarScene() {
  const ref = useRef(null)
  const carRef = useRef(null)
  const otherCarRef = useRef(null)
  const ballRef = useRef(null)

  // The target progress we WANT the videos to be at (set by scroll).
  // A rAF loop nudges currentTime toward this — never more than once per frame.
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

  // Pause the section's work when it's offscreen — saves a lot on long pages
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      entries => { visible.current = entries[0].isIntersecting },
      { rootMargin: '200px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Single rAF loop drives all 3 videos — at most one seek per video per frame
  useEffect(() => {
    const tick = () => {
      if (visible.current) {
        for (const v of [carRef.current, otherCarRef.current, ballRef.current]) {
          if (!v || !v.duration || Number.isNaN(v.duration)) continue
          const t = targetProgress.current * v.duration
          // Only seek if the gap is meaningful — avoids redundant decoder work
          if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [1, 0, 0, 1])

  const initVideo = videoRef => () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  const videoClasses =
    'absolute inset-0 w-full h-full object-cover pointer-events-none select-none'
  const videoStyle = {
    mixBlendMode: 'screen',
    willChange: 'transform',
    transform: 'translateZ(0)', // promote to its own GPU layer
  }

  return (
    <section ref={ref} style={{ height: '500vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: '#000', contain: 'strict' }}
      >
        <video
          ref={ballRef}
          src={ballAnimation}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          onLoadedMetadata={initVideo(ballRef)}
          className={videoClasses}
          style={videoStyle}
        />

        <video
          ref={carRef}
          src={carAnimation}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          onLoadedMetadata={initVideo(carRef)}
          className={videoClasses}
          style={videoStyle}
        />

        <video
          ref={otherCarRef}
          src={otherCarAnimation}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          onLoadedMetadata={initVideo(otherCarRef)}
          className={videoClasses}
          style={videoStyle}
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

export default CarScene
