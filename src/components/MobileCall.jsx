export default function MobileCall({ onCall }) {
  return (
    <div className="mobile-call">
      <button className="btn btn-outline" onClick={onCall}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"/></svg>
        {' '}Call
      </button>
      <a className="btn btn-gold" href="#quote">Free Quote</a>
    </div>
  )
}
