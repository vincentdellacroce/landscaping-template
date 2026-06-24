import { Link } from 'react-router-dom'
import { TOWNS, townPath } from '../data/towns.js'

export default function Areas() {
  return (
    <section className="areas section-pad" id="areas">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Where We Work</span>
          <h2>Six towns we cover.</h2>
        </div>
        <div className="area-grid">
          {TOWNS.map((town) => (
            <Link className="area reveal" to={townPath(town.slug)} key={town.slug} aria-label={`Landscaping in ${town.name}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <div>
                <b>{town.name}</b>
                <span>{town.zip}</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="areas-foot reveal">
          Just outside one of these? <a href="#quote">Get in touch</a> — we cover plenty of the nearby streets too.
        </p>
      </div>
    </section>
  )
}
