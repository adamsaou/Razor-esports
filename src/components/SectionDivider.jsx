// Each flame: x = center, w = half-base width, tipY = where the tip sits, lean = horizontal drift at tip
const FLAMES = [
  { x: 55,   w: 38, tipY: 28,  lean: 6  },
  { x: 130,  w: 22, tipY: 110, lean: -3 },
  { x: 200,  w: 42, tipY: 12,  lean: 9  },
  { x: 285,  w: 26, tipY: 82,  lean: -6 },
  { x: 365,  w: 40, tipY: 38,  lean: 7  },
  { x: 450,  w: 24, tipY: 118, lean: -2 },
  { x: 525,  w: 44, tipY: 18,  lean: 11 },
  { x: 625,  w: 30, tipY: 88,  lean: -5 },
  { x: 715,  w: 40, tipY: 42,  lean: 8  },
  { x: 800,  w: 22, tipY: 120, lean: -3 },
  { x: 875,  w: 42, tipY: 22,  lean: 10 },
  { x: 970,  w: 28, tipY: 86,  lean: -6 },
  { x: 1055, w: 40, tipY: 32,  lean: 7  },
  { x: 1145, w: 24, tipY: 108, lean: -2 },
  { x: 1220, w: 42, tipY: 14,  lean: 9  },
  { x: 1315, w: 30, tipY: 95,  lean: -5 },
  { x: 1405, w: 38, tipY: 44,  lean: 7  },
]

// Build a single flame path: wide curved base narrowing to a sharp asymmetric tip
function flamePath({ x, w, tipY, lean }, baseY) {
  const tipX = x + lean
  const h = baseY - tipY
  const leftX = x - w
  const rightX = x + w

  // Left side: bulges out near base, pinches in near tip
  const cl1x = leftX + w * 0.45
  const cl1y = baseY - h * 0.22
  const cl2x = tipX - w * 0.22
  const cl2y = tipY + h * 0.18

  // Right side: mirror
  const cr1x = tipX + w * 0.22
  const cr1y = tipY + h * 0.18
  const cr2x = rightX - w * 0.45
  const cr2y = baseY - h * 0.22

  return `M ${leftX} ${baseY} C ${cl1x} ${cl1y} ${cl2x} ${cl2y} ${tipX} ${tipY} C ${cr1x} ${cr1y} ${cr2x} ${cr2y} ${rightX} ${baseY} Z`
}

export function SectionDivider({ from = '#0a0a0f', flip = false, height = 200 }) {
  const baseY = height - 30 // where the solid black base meets the flames

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
        viewBox={`0 0 1440 ${height}`}
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
        {/* Solid black base — anchors the flames */}
        <rect x="0" y={baseY} width="1440" height={height - baseY} fill="#000" />

        {/* Flame silhouettes */}
        {FLAMES.map((f, i) => (
          <path key={i} d={flamePath(f, baseY)} fill="#000" />
        ))}
      </svg>
    </div>
  )
}

export default SectionDivider
