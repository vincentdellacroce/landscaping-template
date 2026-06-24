import { useEffect } from 'react'

// Keeps <head> in sync as the user navigates between client-side routes:
// title, meta description, canonical, Open Graph, and an optional per-page
// JSON-LD block (id="page-jsonld"). Google renders these on crawl.
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function useSeo({ title, description, canonical, jsonLd }) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    if (title) {
      document.title = title
      upsertMeta('property', 'og:title', title)
      upsertMeta('name', 'twitter:title', title)
    }
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
    if (canonical) {
      upsertMeta('property', 'og:url', canonical)
      let link = document.head.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
    let script = document.getElementById('page-jsonld')
    if (jsonLdStr) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'page-jsonld'
        document.head.appendChild(script)
      }
      script.textContent = jsonLdStr
    } else if (script) {
      script.remove()
    }
  }, [title, description, canonical, jsonLdStr])
}
