import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { carAnimation } from '../assets'

export function CarScene() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Video only scrubs during the MIDDLE portion of the section.
  //   0.00 – 0.20  →  intro space (video held on first frame, room for entry text)
  //   0.20 – 0.80  →  video scrubs through start → end
  //   0.80 – 1.00  →  outro space (video held on last frame, room for exit text)
  const VIDEO_START = 0.20
  const VIDEO_END   = 0.80

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const v = videoRef.current
    if (!v || !v.duration || Number.isNaN(v.duration)) return
    const range = VIDEO_END - VIDEO_START
    const mapped = Math.min(Math.max((latest - VIDEO_START) / range, 0), 0.999)
    const t = mapped * v.duration
    if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [1, 0, 0, 1])

  return (
    <section ref={ref} style={{ height: '500vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: '#000' }}
      >
        <video
          ref={videoRef}
          src={carAnimation}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          onLoadedMetadata={() => {
            // Pause so we control playback via scroll
            const v = videoRef.current
            if (v) {
              v.pause()
              v.currentTime = 0
            }
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Fade-in/out edges so the cut between sections is clean */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: '#000', opacity: overlayOpacity }}
        />

        {/* Subtle vignette for cinema feel */}
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
