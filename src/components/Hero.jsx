import ScrollExpandMedia from './ScrollExpandMedia.jsx'
import LogoMark from './LogoMark.jsx'

export default function Hero() {
  return (
    <>
      {/* Single page-level H1 for SEO / semantics (visually hidden — the visible
          title is rendered inside the hero) */}
      <h1 className="sr-only">
        Your Company Landscaping and Construction — landscaping, hardscaping, and snow removal in Your Area
      </h1>
      <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/hero-video.mp4"
      posterSrc="/hero-bg.jpg"
      bgImageSrc="/hero-bg.jpg"
      title="Your Company Landscaping"
      date="Your Area"
      scrollToExpand="Scroll to expand"
      centerLogo={<LogoMark size={360} />}
    >
      <div className="sem-intro">
        <span className="eyebrow">Town One</span>
        <h2>Plant it. Pave it. Mow it.</h2>
        <p>
          Your Company handles the whole property — lawns and gardens, patios and driveways, and snow when
          winter shows up — for homeowners across Your Area. Years of experience, six towns, one crew that
          actually shows up.
        </p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#quote">Get a Free Quote</a>
          <a className="btn btn-outline" href="#services">See What We Do</a>
        </div>
      </div>
      </ScrollExpandMedia>
    </>
  )
}
