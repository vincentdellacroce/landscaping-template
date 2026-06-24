import LogoMark from './LogoMark.jsx'

export default function About() {
  return (
    <section className="light section-pad" id="about">
      <div className="wrap about-grid">
        <div className="about-media reveal" aria-hidden="true">
          <div className="seal">
            <LogoMark size={160} />
            <b>Your Company Landscaping</b>
            <span>And Construction</span>
          </div>
        </div>
        <div className="about-copy reveal">
          <span className="eyebrow">About Your Company</span>
          <h2>Built by a crew that lives here.</h2>
          <p>
            Your Company Landscaping and Construction has worked Your Area properties for years — Town One,
            Town Two, Town Three, Town Four, Town Five, and Town Six. We're a small local crew, so the person who quotes your job
            is the same person who does it.
          </p>
          <p>
            A single mulch drop or a full patio-and-grading build, it's the same deal: we show up when we say we will,
            do the work right, and stand behind it.
          </p>
          <ul className="about-list">
            <li>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
              <div>
                <b>Years of experience on local properties</b>
                <span>Established and known around the area.</span>
              </div>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
              <div>
                <b>Landscaping, hardscaping, and snow</b>
                <span>One crew covering all four seasons.</span>
              </div>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
              <div>
                <b>Free, straight estimates</b>
                <span>Clear pricing — no runaround.</span>
              </div>
            </li>
          </ul>
          <a className="btn btn-dark" href="#quote" style={{ marginTop: '30px' }}>Start a Project</a>
        </div>
      </div>
    </section>
  )
}
