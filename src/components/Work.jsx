import BeforeAfterSlider from './BeforeAfterSlider.jsx'

// --- Placeholder before/after tiles (swap for real photo pairs later) -------
// Both tiles share identical text geometry so they line up exactly under the
// slider. Replace `before`/`after` below with paths to your own photos in
// /public/work (e.g. '/work/walkway-before.jpg').
function makeTile({ name, word, bg0, bg1, bg2, accent, wordFill, nameFill, frame }) {
  // XML-escape the label so names containing & < > don't break the SVG
  const safeName = String(name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg0}"/><stop offset="0.6" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M0 60 L60 0" stroke="${accent}" stroke-width="1" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="1280" height="800" fill="url(#g)"/>
  <rect width="1280" height="800" fill="url(#p)"/>
  ${frame ? `<rect x="26" y="26" width="1228" height="748" rx="14" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>` : ''}
  <text x="640" y="430" text-anchor="middle" font-family="Cinzel, serif" font-size="118" letter-spacing="6" fill="${wordFill}">${word}</text>
  <text x="640" y="500" text-anchor="middle" font-family="Inter, sans-serif" font-size="26" letter-spacing="3" fill="${nameFill}">${safeName}</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
const makeBefore = (name) =>
  makeTile({ name, word: 'BEFORE', bg0: '#33322d', bg1: '#23231f', bg2: '#1b1b18', accent: '#6b6757', wordFill: '#54514733', nameFill: '#8a857a', frame: false })
const makeAfter = (name) =>
  makeTile({ name, word: 'AFTER', bg0: '#21402a', bg1: '#13271a', bg2: '#0c140f', accent: '#c9a24a', wordFill: '#e3c486', nameFill: '#cfc6b3', frame: true })

const JOBS = [
  { title: 'Pool Cleaning & Upgrade', town: 'Town Four', caption: 'Algae-green water and a torn-up deck brought back to a crisp blue pool with fresh paver decking and stonework.', before: '/work/pool-before.jpg', after: '/work/pool-after.jpg' },
  { title: 'Full Lawn Makeover & Mow', town: 'Town One', caption: 'Patchy turf cut back, cleaned up, and brought to a crisp green finish.' },
  { title: 'Front Walkway & Steps', town: 'Town Three', caption: 'New paver walkway and steps that reset the whole curb appeal.' },
  { title: 'Outdoor Quality Lighting', town: 'Town Six', caption: 'Low-voltage landscape lighting that keeps the property sharp after dark.' },
  { title: 'Garden Mulch & Makeover', town: 'Town Five', caption: 'Overgrown beds cleared, replanted, and finished with fresh mulch.' },
  { title: 'Full Landscape Install', town: 'Town Two', caption: 'A complete front-yard transformation, planted and graded start to finish.' },
]

export default function Work() {
  return (
    <section className="section-pad" id="work">
      <div className="wrap">
        <div className="section-head reveal" style={{ marginInline: 'auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Our Work</span>
          <h2 style={{ color: '#fff' }}>Recent jobs around the county.</h2>
          <p style={{ color: 'var(--muted-light)' }}>
            Drag each slider to see the before and after. Real project photos are dropping in soon.
          </p>
        </div>

        <div className="jobs">
          {JOBS.map((job, i) => (
            <article className="job reveal" key={job.title}>
              <div className="job-head">
                <span className="job-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{job.title}</h3>
                  <p>
                    <span className="job-town">{job.town}</span> — {job.caption}
                  </p>
                </div>
              </div>
              <BeforeAfterSlider
                before={job.before || makeBefore(job.title)}
                after={job.after || makeAfter(job.title)}
                alt={job.title}
              />
              <p className="job-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Drag the handle to reveal the after
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
