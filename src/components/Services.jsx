import { useState, useEffect } from 'react'
import CircularGallery from './CircularGallery.jsx'
import { SERVICES } from '../data/services.js'

// WebGL gallery items (Your Company's own photos in /public/photos).
const ITEMS = SERVICES.map((s) => ({ image: s.photo, text: s.name }))

export default function Services() {
  // Flatter arc on narrow/mobile screens, fuller curve on desktop.
  const [bend, setBend] = useState(3)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => setBend(mq.matches ? 1 : 3)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <section className="services section-pad" id="services">
      <div className="wrap">
        <div className="section-head reveal" style={{ marginInline: 'auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>What We Do</span>
          <h2>A complete range of outdoor craftsmanship.</h2>
          <p>Nine services, one local crew — from weekly mowing to full patio builds.</p>
        </div>
      </div>

      <div className="services-gallery">
        <CircularGallery
          items={ITEMS}
          bend={bend}
          textColor="#f3efe6"
          borderRadius={0.06}
          scrollEase={0.05}
          fontUrl="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap"
          font="600 34px 'Cormorant Garamond'"
        />
      </div>

      {/* Collapsible, crawlable service list. <details> keeps the text in the
          DOM (indexable) while staying visually tucked away until clicked. */}
      <div className="wrap">
        <details className="svc-details">
          <summary>
            <span>See all nine services</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <ul className="svc-list">
            {SERVICES.map((s) => (
              <li className="svc-card" key={s.name}>
                <img
                  className="svc-thumb"
                  src={s.photo}
                  alt={`${s.altBase} in Your Area`}
                  width="640"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />
                <div className="svc-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
