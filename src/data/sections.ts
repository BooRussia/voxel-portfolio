import type { MoreVariant } from '../components/SectionMore'
import { asset } from '../lib/asset'

export interface MediumSectionConfig {
  id: string
  number: string
  label: string
  title: string
  body: string
  /** Full-bleed background image */
  image: string
  /** Optional second image (e.g. drone video still) */
  imageAlt?: string
  ctaLabel: string
  ctaVariant: MoreVariant
  /** Theme accent for title glow / pip */
  accent: string
  /** Layout treatment */
  layout: 'browser' | 'bleed' | 'split' | 'interactive'
  browserUrl?: string
  /** Nav short label */
  nav: string
}

/**
 * Every medium the studio ships — one fullscreen section each.
 * Order = scroll order after intro.
 */
export const mediumSections: MediumSectionConfig[] = [
  {
    id: 'ecommerce',
    number: '01',
    label: 'WEB DESIGN',
    title: 'ECOMMERCE',
    body: 'Product-first storefronts built to convert — editorial merchandising, mobile checkout, and brand systems that feel expensive.',
    image: asset('/media/web/ecommerce.jpg'),
    ctaLabel: 'MORE ECOMMERCE',
    ctaVariant: 'gold',
    accent: '#c9a227',
    layout: 'browser',
    browserUrl: 'voxel.design/ecommerce',
    nav: 'Shop',
  },
  {
    id: 'windows',
    number: '02',
    label: 'WEB DESIGN',
    title: 'WINDOWS & DOORS',
    body: 'Static business sites for window and door companies — hurricane authority, quote paths, galleries, and local trust.',
    image: asset('/media/web/business.jpg'),
    ctaLabel: 'MORE BUSINESS SITES',
    ctaVariant: 'light',
    accent: '#3b82c4',
    layout: 'browser',
    browserUrl: 'voxel.design/windows',
    nav: 'Biz',
  },
  {
    id: 'portfolio-sites',
    number: '03',
    label: 'WEB DESIGN',
    title: 'PORTFOLIO',
    body: 'Portfolio and personal brand sites with bold type, editorial grids, and work that leads the layout.',
    image: asset('/media/web/portfolio.jpg'),
    ctaLabel: 'MORE PORTFOLIOS',
    ctaVariant: 'outline',
    accent: '#e6007a',
    layout: 'browser',
    browserUrl: 'voxel.design/portfolio',
    nav: 'Port',
  },
  {
    id: 'models',
    number: '04',
    label: 'SPATIAL',
    title: '3D MODELS',
    body: 'Web-ready product models with real materials — orbit, inspect, configure. Built for catalogs and configurators.',
    image: asset('/media/models/product.jpg'),
    ctaLabel: 'MORE 3D MODELS',
    ctaVariant: 'chrome',
    accent: '#8ab4ff',
    layout: 'interactive',
    nav: '3D',
  },
  {
    id: 'tours',
    number: '05',
    label: 'SPATIAL',
    title: '3D TOURS',
    body: 'Immersive walkthroughs you can share in a link — drag to look, hotspots for details, no app install.',
    image: asset('/media/tour/panorama.jpg'),
    ctaLabel: 'BOOK A TOUR',
    ctaVariant: 'glass',
    accent: '#e8d5b0',
    layout: 'interactive',
    nav: 'Tour',
  },
  {
    id: 'gaussian',
    number: '06',
    label: 'SPATIAL',
    title: 'GAUSSIAN SPLATS',
    body: 'Photoreal capture as navigable splat fields — sites, interiors, and products reconstructed as living light.',
    image: asset('/media/gaussian/splat.jpg'),
    ctaLabel: 'MORE SPLATS',
    ctaVariant: 'outline',
    accent: '#c084fc',
    layout: 'interactive',
    nav: 'Splat',
  },
  {
    id: 'drone',
    number: '07',
    label: 'AERIAL',
    title: 'DRONE',
    body: '360° immersion, thermal intelligence, and RTK mapping — mission platforms for every aerial decision.',
    image: asset('/media/drone/photo.jpg'),
    imageAlt: asset('/media/drone/video.jpg'),
    ctaLabel: 'DRONE SERVICES',
    ctaVariant: 'gold',
    accent: '#f59e0b',
    layout: 'split',
    nav: 'Drone',
  },
  {
    id: 'print',
    number: '08',
    label: 'CRAFT',
    title: '3D PRINT',
    body: 'Prototypes and presentation pieces — SLA detail, FDM structure, finished samples clients can hold.',
    image: asset('/media/print/prototypes.jpg'),
    ctaLabel: 'MORE PRINT WORK',
    ctaVariant: 'chrome',
    accent: '#a3a3a3',
    layout: 'bleed',
    nav: 'Print',
  },
  {
    id: 'logos',
    number: '09',
    label: 'CRAFT',
    title: 'LOGOS',
    body: 'Marks built to last — monograms, lockups, and identity systems that work from favicon to signage.',
    image: asset('/media/logos/trio.jpg'),
    ctaLabel: 'MORE IDENTITY',
    ctaVariant: 'chrome',
    accent: '#c9a227',
    layout: 'interactive',
    nav: 'Logo',
  },
]

export const navSections = [
  { id: 'intro', label: 'Top' },
  ...mediumSections.map((s) => ({ id: s.id, label: s.nav })),
  { id: 'contact', label: 'Contact' },
] as const
