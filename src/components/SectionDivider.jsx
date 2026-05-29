// Razor cuts — multiple parallel diagonal slashes at the same angle,
// like the section was sliced by repeated blade strokes.
//
// All cuts share the same slope so they read as one "swipe sequence"
// rather than random angles. The main cut forms the actual color
// transition; the secondary slashes echo it with thin black bars.

export function SectionDivider({ from = '#0a0a0f', flip = false, height = 130 }) {
  const W = 1440

  // Main cut: bold diagonal that separates the lighter section from the dark.
  // Left edge sits low, right edge sits high — creates an upward sweep.
  const mainLeftY = height * 0.85
  const mainRightY = height * 0.20

  // Echo slashes — same slope, sitting above the main cut as thin bars.
  // Each echo has a top edge and bottom edge (thickness varies).
  const echoes = [
    { leftTop: height * 0.58, rightTop: -height * 0.07, thickness: 6, opacity: 0.55 },
    { leftTop: height * 0.42, rightTop: -height * 0.23, thickness: 3, opacity: 0.35 },
    { leftTop: height * 0.28, rightTop: -height * 0.37, thickness: 2, opacity: 0.22 },
  ]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height,
        backgroundColor: from,
        overflow: 'hidden',
        marginTop: flip ? 0 : -1,
        marginBottom: flip ? -1 : 0,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          transform: flip ? 'scaleY(-1)' : 'none',
        }}
      >
        {/* Main black region — angled top edge becomes the cut line */}
        <polygon
          points={`0,${height} ${W},${height} ${W},${mainRightY} 0,${mainLeftY}`}
          fill="#000"
        />

        {/* Echo slashes — thin black bars trailing above the main cut */}
        {echoes.map((e, i) => (
          <polygon
            key={i}
            points={`0,${e.leftTop} ${W},${e.rightTop} ${W},${e.rightTop + e.thickness} 0,${e.leftTop + e.thickness}`}
            fill="#000"
            opacity={e.opacity}
          />
        ))}

        {/* Cyan edge highlight — sits exactly on the main cut */}
        <line
          x1="0" y1={mainLeftY}
          x2={W} y2={mainRightY}
          stroke="var(--color-accent)"
          strokeWidth="1.8"
          opacity="0.55"
        />

        {/* Faint cyan ghost on the first echo slash */}
        <line
          x1="0" y1={echoes[0].leftTop}
          x2={W} y2={echoes[0].rightTop}
          stroke="var(--color-accent)"
          strokeWidth="0.8"
          opacity="0.25"
        />

        {/* Small angular blade-tip accent near the middle of the main cut */}
        <polygon
          points={`${W * 0.48},${mainLeftY + (mainRightY - mainLeftY) * 0.48 - 4} ${W * 0.55},${mainLeftY + (mainRightY - mainLeftY) * 0.55 - 6} ${W * 0.555},${mainLeftY + (mainRightY - mainLeftY) * 0.555 - 2} ${W * 0.485},${mainLeftY + (mainRightY - mainLeftY) * 0.485}`}
          fill="var(--color-accent)"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}

export default SectionDivider
