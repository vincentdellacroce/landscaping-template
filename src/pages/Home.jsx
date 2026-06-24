import { useOutletContext } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Services from '../components/Services.jsx'
import Work from '../components/Work.jsx'
import About from '../components/About.jsx'
import Areas from '../components/Areas.jsx'
import Reviews from '../components/Reviews.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'
import useSeo from '../hooks/useSeo.js'
import { SITE_URL } from '../data/towns.js'

export default function Home() {
  const { onCall } = useOutletContext()

  // Restore the homepage's <head> when navigating back from a town page.
  useSeo({
    title: 'Landscaping & Hardscaping in Your Area | Your Company',
    description:
      'Landscaping, hardscaping & snow removal in Your Area — serving Town One, Town Two, Town Three, Town Four, Town Five & Town Six. years, one local crew. Free quotes.',
    canonical: `${SITE_URL}/`,
  })

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Work />
      <About />
      <Areas />
      <Reviews />
      <FAQ />
      <Contact onCall={onCall} />
    </>
  )
}
