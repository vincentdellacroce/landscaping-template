import { useOutletContext, Link } from 'react-router-dom'
import TownHero from '../components/TownHero.jsx'
import Contact from '../components/Contact.jsx'
import useSeo from '../hooks/useSeo.js'
import { SERVICES } from '../data/services.js'
import { TOWN_BY_SLUG, townPath, SITE_URL } from '../data/towns.js'
import { PHONE } from '../App.jsx'

export default function TownPage({ slug }) {
  const { onCall } = useOutletContext()
  const town = TOWN_BY_SLUG[slug]

  const url = `${SITE_URL}${townPath(slug)}`
  useSeo({
    title: `Landscaping in ${town.name} | Your Company Landscaping & Construction`,
    description: `Professional landscaping, hardscaping & snow removal in ${town.name} (${town.zip}). Lawn care, paver patios, sod, mulch & more. years local — free quotes, call ${PHONE}.`,
    canonical: url,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Landscaping, hardscaping and snow removal',
        url,
        areaServed: { '@type': 'City', name: `${town.name}` },
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: 'Your Company Landscaping and Construction',
          telephone: '+1-555-555-5555',
          email: 'hello@example.com',
          url: `${SITE_URL}/`,
          areaServed: `${town.name}, ${town.county}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: `Landscaping in ${town.name}`, item: url },
        ],
      },
    ],
  })

  return (
    <main>
      <TownHero town={town} onCall={onCall} />

      {/* Intro / local copy */}
      <section className="section-pad town-intro">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '760px' }}>
            <span className="eyebrow">Serving {town.name}</span>
            <h2>Your local {town.name} landscaping crew.</h2>
            <p>{town.intro}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services section-pad" id="services">
        <div className="wrap">
          <div className="section-head reveal" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>What We Do in {town.name}</span>
            <h2>A complete range of outdoor craftsmanship.</h2>
            <p>Nine services, one local crew — from weekly mowing to full patio builds.</p>
          </div>
          <ul className="svc-list">
            {SERVICES.map((s) => (
              <li className="svc-card reveal" key={s.name}>
                <img
                  className="svc-thumb"
                  src={s.photo}
                  alt={`${s.altBase} in ${town.name}`}
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
        </div>
      </section>

      {/* Gallery */}
      <section className="light section-pad" id="work">
        <div className="wrap">
          <div className="section-head reveal" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Our Work</span>
            <h2>Recent projects near {town.name}.</h2>
          </div>
          <div className="town-gallery">
            {town.gallery.map((g) => (
              <figure className="town-shot reveal" key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why Your Company */}
      <section className="section-pad town-why" id="about">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '760px' }}>
            <span className="eyebrow">Why {town.name} Picks Your Company</span>
            <h2>Years of experience, one crew, every season.</h2>
          </div>
          <ul className="town-why-list">
            <li className="reveal"><b>Local &amp; dependable</b><span>The person who quotes your {town.name} job is the same one who does it.</span></li>
            <li className="reveal"><b>Four-season service</b><span>Landscaping, hardscaping, and snow removal — all year, all from one call.</span></li>
            <li className="reveal"><b>Free, straight estimates</b><span>Clear pricing with no runaround. We show up when we say we will.</span></li>
          </ul>
        </div>
      </section>

      {/* Nearby areas — internal links to the other town pages */}
      <section className="areas section-pad" id="areas">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Nearby</span>
            <h2>We also serve these towns.</h2>
          </div>
          <div className="area-grid">
            {town.nearby.map((s) => {
              const t = TOWN_BY_SLUG[s]
              return (
                <Link className="area" to={townPath(s)} key={s}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                  </svg>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.zip}</span>
                  </div>
                </Link>
              )
            })}
          </div>
          <p className="areas-foot reveal">
            See <Link to="/#areas">all six towns we cover</Link> across Your Area.
          </p>
        </div>
      </section>

      <Contact key={town.slug} onCall={onCall} defaultTown={town.name} />
    </main>
  )
}
