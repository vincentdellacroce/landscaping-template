function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
  )
}

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5 stars">
      <Star /><Star /><Star /><Star /><Star />
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="light section-pad" id="reviews"><div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Reviews</span>
        <h2>Straight from customers.</h2>
        <p>A few words from homeowners around Your Area.</p>
      </div>
      <div className="rev-grid">
        <article className="rev reveal">
          <Stars />
          <p>“They redid our backyard — new paver patio and fresh sod — and showed up exactly when they said they would. Clean work, no surprises.”</p>
          <div className="who"><span className="av">★</span><div><b>Your Customer</b><span>Town Two · Replace with real review</span></div></div>
        </article>
        {/* card 2 */}
        <article className="rev reveal">
          <Stars />
          <p>“Your Company does our weekly maintenance and plows us out all winter. Reliable is the word. Couldn't ask for better.”</p>
          <div className="who"><span className="av">★</span><div><b>Your Customer</b><span>Town Three · Replace with real review</span></div></div>
        </article>
        {/* card 3 */}
        <article className="rev reveal">
          <Stars />
          <p>“Handled our whole landscape project start to finish and kept us in the loop the entire way. Highly recommend their crew.”</p>
          <div className="who"><span className="av">★</span><div><b>Your Customer</b><span>Town One · Replace with real review</span></div></div>
        </article>
      </div>
      <p className="rev-note">Got happy customers? Send us their reviews and we'll feature them right here.</p>
    </div></section>
  )
}
