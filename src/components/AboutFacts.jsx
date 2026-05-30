// Placeholder section under "About RaZor". Swap the FACTS array below
// for real content when ready (icon optional, title required, description optional).
const FACTS = [
  { title: 'Fact 01', body: 'Coming soon' },
  { title: 'Fact 02', body: 'Coming soon' },
  { title: 'Fact 03', body: 'Coming soon' },
]

export function AboutFacts() {
  return (
    <section style={{ backgroundColor: 'var(--color-bg)', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Heading block */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            01 / The Team
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
            About Ra<span style={{ color: 'var(--color-accent)' }}>Z</span>or
          </h2>
          <div className="flex items-center gap-3 mt-7">
            <span className="h-px w-14" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
            <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="h-px w-14" style={{ backgroundColor: 'rgba(0,245,255,0.4)' }} />
          </div>
        </div>

        {/* Facts grid — TODO: replace placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FACTS.map((fact, i) => (
            <div
              key={i}
              className="aspect-[4/3] flex flex-col items-center justify-center text-center px-6 transition-colors hover:border-[rgba(0,245,255,0.25)]"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div
                className="text-3xl font-bold uppercase mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', letterSpacing: '0.1em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                className="text-xs uppercase tracking-[0.45em] text-gray-500 mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {fact.title}
              </div>
              <div
                className="text-sm text-gray-700"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {fact.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutFacts
