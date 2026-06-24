import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoMark from './LogoMark.jsx'

export default function Header({ onCall }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  // Home has a dark hero behind a transparent header; inner pages can have light
  // tops, so keep the header solid there to stay legible.
  const solid = scrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      <header id="site-header" className={solid ? 'scrolled' : undefined}>
        <span id="top" aria-hidden="true" />
        <div className="wrap nav">
          <Link className="brand" to="/" aria-label="Your Company Landscaping and Construction — home">
            <LogoMark size={40} />
            <span className="bname"><b>YOUR COMPANY</b><span>Landscaping &amp; Construction</span></span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#work">Our Work</a>
            <a href="#about">About</a>
            <a href="#areas">Areas</a>
            <a href="#reviews">Reviews</a>
          </nav>
          <div className="nav-cta">
            <button className="btn btn-outline nav-call" onClick={onCall} aria-label="Call us">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"/></svg>
              {' '}Call
            </button>
            <a className="btn btn-gold desktop-quote" href="#quote">Get a Free Quote</a>
            <button
              className="menu-btn"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
        <a href="#work" onClick={() => setMobileOpen(false)}>Our Work</a>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="#areas" onClick={() => setMobileOpen(false)}>Areas</a>
        <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
        <button className="btn btn-outline" onClick={() => { setMobileOpen(false); onCall(); }}>Call 555-555-5555</button>
        <a className="btn btn-gold" href="#quote" onClick={() => setMobileOpen(false)}>Get a Free Quote</a>
      </div>
    </>
  )
}
