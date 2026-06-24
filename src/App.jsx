import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import TownPage from './pages/TownPage.jsx'
import PaverPatioCost from './pages/PaverPatioCost.jsx'
import { TOWNS, townPath } from './data/towns.js'

// Shared business constants (imported by Contact, Footer, CallModal, etc.)
export const PHONE = '555-555-5555'
export const PHONE_TEL = '+15555555555'
export const EMAIL = 'hello@example.com'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/paver-patio-cost" element={<PaverPatioCost />} />
        {TOWNS.map((town) => (
          <Route key={town.slug} path={townPath(town.slug)} element={<TownPage slug={town.slug} />} />
        ))}
      </Route>
    </Routes>
  )
}
