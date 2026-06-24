import { PHONE } from '../App.jsx'

// Static hero for town pages (no scroll-hijack — these pages scroll normally
// so content is immediately reachable for users and crawlers).
export default function TownHero({ town, onCall }) {
  return (
    <section className="town-hero">
      <img className="town-hero-bg" src={town.heroImg} alt={`Landscaping in ${town.name}`} fetchpriority="high" />
      <div className="town-hero-overlay" />
      <div className="wrap town-hero-inner">
        <span className="eyebrow">{town.name} · {town.zip}</span>
        <h1>Landscaping &amp; Hardscaping in {town.name}</h1>
        <p>
          Lawn care, paver patios, landscape installation, and snow removal for {town.name} homeowners —
          from one dependable local crew that actually shows up.
        </p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#quote">Get a Free Quote</a>
          <button className="btn btn-outline" onClick={onCall} aria-label="Call Your Company Landscaping">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z" /></svg>
          {' '}{PHONE}
        </button>
        </div>
      </div>
    </section>
  )
}
