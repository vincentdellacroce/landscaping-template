import { useOutletContext, Link } from 'react-router-dom'
import Contact from '../components/Contact.jsx'
import useSeo from '../hooks/useSeo.js'
import { SITE_URL } from '../data/towns.js'
import { PHONE } from '../App.jsx'

const URL = `${SITE_URL}/paver-patio-cost`

// Q&A reused for both the visible content and the FAQPage schema.
const FAQ = [
  {
    q: 'How much does a 300 square foot paver patio cost?',
    a: 'A 300-square-foot paver patio in Your Area typically costs between $4,500 and $9,000 installed, depending on the paver material, the amount of site prep and grading, and any features like steps, walls, or lighting.',
  },
  {
    q: 'Are pavers cheaper than a concrete patio?',
    a: 'Poured concrete usually has a lower upfront cost than pavers, but pavers last longer, resist cracking, and are easier to repair — so pavers often cost less over the life of the patio.',
  },
  {
    q: 'What is the most expensive part of building a paver patio?',
    a: 'The base preparation — excavation, grading, and a compacted gravel-and-sand base — is the most labor-intensive and important cost. A proper base is what keeps a paver patio level and crack-free for decades.',
  },
]

export default function PaverPatioCost() {
  const { onCall } = useOutletContext()

  useSeo({
    title: 'How Much Does a Paver Patio Cost in Your Area? (2026)',
    description:
      'A clear breakdown of paver patio costs in Your Area — price per square foot, cost by size, what drives the price, and pavers vs. concrete. Free local quotes.',
    canonical: URL,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How Much Does a Paver Patio Cost in Your Area? (2026 Guide)',
        description:
          'A clear breakdown of paver patio costs in Your Area — price per square foot, cost by size, and what drives the price.',
        image: `${SITE_URL}/landscape/lsp2.jpg`,
        datePublished: '2026-06-23',
        dateModified: '2026-06-23',
        author: { '@type': 'Organization', name: 'Your Company Landscaping and Construction' },
        publisher: {
          '@type': 'Organization',
          name: 'Your Company Landscaping and Construction',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-mark.png` },
        },
        mainEntityOfPage: URL,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  })

  return (
    <main className="article-page">
      <article className="article">
        <p className="article-kicker">Guide · Hardscaping</p>
        <h1>How Much Does a Paver Patio Cost in Your Area?</h1>
        <p className="article-lead">
          A straight answer with no fluff: here's what homeowners across Town One, Town Two, Town Three and
          the rest of Your Area actually pay for a paver patio in 2026 — and what makes the number go up or down.
        </p>

        <img className="article-hero" src="/landscape/lsp2.jpg" alt="Finished paver patio and walkway in Your Area" width="1200" height="675" />

        <h2>The short answer</h2>
        <p>
          Most paver patios in the Your Area area run <strong>$15 to $30 per square foot installed</strong>.
          That range covers the pavers themselves plus the labor and base work that make them last. A standard
          <strong> 300-square-foot patio typically lands between $4,500 and $9,000</strong>.
        </p>

        <h2>Paver patio cost by size</h2>
        <div className="article-table-wrap">
          <table className="article-table">
            <thead>
              <tr><th>Patio size</th><th>Typical installed cost</th><th>Good for</th></tr>
            </thead>
            <tbody>
              <tr><td>150 sq ft</td><td>$2,250 – $4,500</td><td>Small seating area or grill nook</td></tr>
              <tr><td>300 sq ft</td><td>$4,500 – $9,000</td><td>Dining table + seating</td></tr>
              <tr><td>500 sq ft</td><td>$7,500 – $15,000</td><td>Full outdoor living space</td></tr>
              <tr><td>800+ sq ft</td><td>$12,000+</td><td>Patio with walls, steps, or fire feature</td></tr>
            </tbody>
          </table>
        </div>
        <p className="article-note">
          Ranges are general guidance for Your Area — your exact price depends on the factors below.
          The only way to know your number is a free on-site quote.
        </p>

        <h2>What drives the price</h2>
        <ul className="article-list">
          <li><strong>Base preparation.</strong> Excavation, grading, and a compacted gravel-and-sand base are the most important — and most labor-intensive — part. Skimping here is why cheap patios sink and crack.</li>
          <li><strong>Paver material.</strong> Standard concrete pavers cost less; premium, natural stone, or large-format porcelain pavers cost more.</li>
          <li><strong>Site access &amp; conditions.</strong> Slopes, drainage, tree roots, and tight backyard access all add labor.</li>
          <li><strong>Patterns &amp; borders.</strong> Herringbone layouts, contrasting borders, and curves take more cutting and time than a simple running bond.</li>
          <li><strong>Extras.</strong> Steps, retaining walls, seat walls, fire pits, and low-voltage lighting each add to the total — but also the most value.</li>
        </ul>

        <h2>Pavers vs. a concrete patio</h2>
        <p>
          Poured concrete usually wins on upfront price. But concrete cracks with Your Area's freeze-thaw winters,
          and a crack means replacing a whole section. Pavers flex with the ground, and a damaged paver can be swapped
          out individually. Over the life of the patio, pavers often come out <strong>cheaper to own</strong> — and
          they look far better doing it.
        </p>

        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>
                <span>{f.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="faq-a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>

        <div className="article-cta">
          <h2>Get an exact price for your patio</h2>
          <p>
            Your Company Landscaping builds paver patios across Your Area — and every quote is free.
            Send your project details below or call <a href={`tel:+15555555555`}>{PHONE}</a>.
          </p>
          <p className="article-areas">
            Planning a patio in a specific town? See{' '}
            <Link to="/landscaping-town-one">Town One</Link>,{' '}
            <Link to="/landscaping-town-two">Town Two</Link>,{' '}
            <Link to="/landscaping-town-three">Town Three</Link>,{' '}
            <Link to="/landscaping-town-four">Town Four</Link>,{' '}
            <Link to="/landscaping-town-five">Town Five</Link>, or{' '}
            <Link to="/landscaping-town-six">Town Six</Link>.
          </p>
        </div>
      </article>

      <Contact onCall={onCall} defaultTown="Town One" />
    </main>
  )
}
