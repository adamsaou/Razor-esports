// Placeholder section after "How to Join RaZor". Swap the STEPS array
// for real onboarding steps when ready.
const STEPS = [
  { title: 'Step 01', body: 'Coming soon' },
  { title: 'Step 02', body: 'Coming soon' },
  { title: 'Step 03', body: 'Coming soon' },
  { title: 'Step 04', body: 'Coming soon' },
]

export function JoinSteps() {
  return (
    <section style={{ backgroundColor: 'var(--color-bg)', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Heading block */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            02 / The Process
          </div>
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.14em',
              color: '#fff',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1,
            }}
          >
            How to Join
          </h2>
          <div className="flex items-center gap-3 mt-7">
            <span className="h-px w-14" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
            <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="h-px w-14" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
          </div>
        </div>

        {/* Numbered step list — TODO: replace placeholders */}
        <ol className="flex flex-col gap-4">
          {STEPS.map((step, i) => (
            <li
              key={i}
              className="flex items-center gap-8 py-6 px-7 transition-colors hover:border-[rgba(0,245,255,0.25)]"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <span
                className="text-4xl font-bold tabular-nums shrink-0"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm uppercase tracking-[0.4em] text-white mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.title}
                </div>
                <div
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default JoinSteps
