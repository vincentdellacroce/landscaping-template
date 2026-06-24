// Town landing-page data. Each town gets a unique intro (no duplicate content),
// its own images, nearby-town links, and SEO fields.
// These are generic placeholders — replace the name, zip, county, coordinates,
// and intro copy with your real service areas.
// Image pool lives in /public/landscape (lsp* = scenery, lsw* = crew at work).

export const TOWNS = [
  {
    slug: 'town-one',
    name: 'Town One',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp1.jpg',
    intro:
      'Your Company Landscaping and Construction has cared for properties in this area for years — from older, established neighborhoods to newer builds. We handle weekly lawn maintenance, paver patios and walkways, full landscape installations, and dependable snow removal. One local crew, every season.',
    gallery: [
      { src: '/landscape/lsp2.jpg', alt: 'Paver patio and walkway landscaping' },
      { src: '/landscape/lsw1.jpg', alt: 'Your Company Landscaping crew at work' },
      { src: '/landscape/lsp3.jpg', alt: 'Manicured lawn and garden beds' },
    ],
    nearby: ['town-two', 'town-five', 'town-four'],
  },
  {
    slug: 'town-two',
    name: 'Town Two',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp4.jpg',
    intro:
      'In this community, Your Company keeps yards crisp with regular mowing, fresh sod, mulch and garden beds, and custom hardscaping. Our local crew covers the whole area and the surrounding neighborhoods, and we plow the same driveways all winter long.',
    gallery: [
      { src: '/landscape/lsp5.jpg', alt: 'Front-yard landscape installation' },
      { src: '/landscape/lsw2.jpg', alt: 'Your Company Landscaping crew installing sod' },
      { src: '/landscape/lsp8.jpg', alt: 'Stone walkway and planting beds' },
    ],
    nearby: ['town-three', 'town-one', 'town-six'],
  },
  {
    slug: 'town-three',
    name: 'Town Three',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp7.jpg',
    intro:
      'Homeowners here count on Your Company for clean, reliable landscaping — weekly maintenance, seasonal cleanups, paver walkways and patios, and snow plowing throughout the area. We show up when we say we will and stand behind the work.',
    gallery: [
      { src: '/landscape/lsp3.jpg', alt: 'Backyard paver patio' },
      { src: '/landscape/lsw3.jpg', alt: 'Your Company Landscaping crew building a walkway' },
      { src: '/landscape/lsp5.jpg', alt: 'Fresh landscape installation' },
    ],
    nearby: ['town-two', 'town-six', 'town-one'],
  },
  {
    slug: 'town-four',
    name: 'Town Four',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp10.jpg',
    intro:
      'Larger, wooded lots call for a crew that can do it all — estate lawn care, stone patios and steps, landscape grading, and winter snow service. Your Company has worked this area for years and treats every property like our own.',
    gallery: [
      { src: '/landscape/lsw4.jpg', alt: 'Your Company Landscaping crew grading a property' },
      { src: '/landscape/lsp1.jpg', alt: 'Estate lawn and landscaping' },
      { src: '/landscape/lsw5.jpg', alt: 'Stone patio construction' },
    ],
    nearby: ['town-one', 'town-five', 'town-two'],
  },
  {
    slug: 'town-five',
    name: 'Town Five',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp6.jpg',
    intro:
      "This area's spread-out, tree-lined properties are right in our wheelhouse. Your Company handles bed maintenance and mulch, full landscape installs, hardscaping, and snow removal — quietly keeping local homes sharp through all four seasons.",
    gallery: [
      { src: '/landscape/lsp2.jpg', alt: 'Mulched garden beds and lawn' },
      { src: '/landscape/lsw7.jpg', alt: 'Your Company Landscaping crew at work' },
      { src: '/landscape/lsw6.jpg', alt: 'Landscape installation' },
    ],
    nearby: ['town-four', 'town-one', 'town-two'],
  },
  {
    slug: 'town-six',
    name: 'Town Six',
    zip: '00000',
    county: 'Your Area',
    lat: 0,
    lng: 0,
    heroImg: '/landscape/lsp9.jpg',
    intro:
      'Homeowners here rely on Your Company for polished lawn maintenance, paver patios and walkways, and dependable winter snow service throughout the area. The same local crew, the same straight pricing.',
    gallery: [
      { src: '/landscape/lsp4.jpg', alt: 'Paver walkway and front landscaping' },
      { src: '/landscape/lsw9.jpg', alt: 'Your Company Landscaping crew planting' },
      { src: '/landscape/lsw8.jpg', alt: 'Lawn maintenance' },
    ],
    nearby: ['town-three', 'town-two', 'town-one'],
  },
]

export const TOWN_BY_SLUG = Object.fromEntries(TOWNS.map((t) => [t.slug, t]))

export const townPath = (slug) => `/landscaping-${slug}`
export const SITE_URL = 'https://example.com'
