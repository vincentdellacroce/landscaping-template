import { Link } from 'react-router-dom'
import { FAQS } from '../data/faq.js'

// Visible FAQ accordion (native <details> — accessible + crawlable) plus a
// matching FAQPage JSON-LD block for rich results and AI answer engines.
export default function FAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="light section-pad" id="faq">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: '720px' }}>
          <span className="eyebrow">FAQ</span>
          <h2>Questions homeowners ask.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item reveal" key={f.q}>
              <summary>
                <span>{f.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="faq-a">
                <p>{f.a}</p>
                {f.link && (
                  <p className="faq-link"><Link to={f.link.href}>{f.link.text}</Link></p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  )
}
