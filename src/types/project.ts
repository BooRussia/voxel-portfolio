export type Discipline =
  | 'web'
  | 'spatial'
  | 'aerial'
  | 'craft'

export type MediaKind =
  | 'website'
  | 'ecommerce'
  | 'business'
  | 'portfolio'
  | '3d-model'
  | '3d-tour'
  | 'gaussian-splat'
  | 'drone-photo'
  | 'drone-video'
  | '3d-print'
  | 'logo'

export interface Project {
  id: string
  slug: string
  title: string
  client?: string
  year: number
  discipline: Discipline
  mediaKinds: MediaKind[]
  summary: string
  description: string
  /** Short label shown on cards, e.g. "E-commerce · Brand" */
  cardLabel: string
  /** Accent gradient for placeholder covers until real media is added */
  cover: {
    gradient: string
    pattern?: 'grid' | 'orbit' | 'beams' | 'mesh' | 'rings' | 'shards'
  }
  featured?: boolean
  featuredSize?: 'hero' | 'wide' | 'tall' | 'standard'
  tags: string[]
  services: string[]
  outcomes?: string[]
  liveUrl?: string
  /** Optional gallery captions for the case study */
  gallery?: { caption: string; gradient: string }[]
}

export const DISCIPLINES: {
  id: Discipline
  label: string
  short: string
  blurb: string
}[] = [
  {
    id: 'web',
    label: 'Web Design',
    short: 'Web',
    blurb: 'E-commerce, business sites, and portfolio experiences built to convert and endure.',
  },
  {
    id: 'spatial',
    label: 'Spatial & 3D',
    short: 'Spatial',
    blurb: 'Models, immersive tours, and Gaussian splats that put people inside the space.',
  },
  {
    id: 'aerial',
    label: 'Aerial Capture',
    short: 'Aerial',
    blurb: 'Drone photography and cinematography for property, product, and place.',
  },
  {
    id: 'craft',
    label: 'Craft & Identity',
    short: 'Craft',
    blurb: 'Logo systems, visual identity, and 3D-printed forms that make a brand tangible.',
  },
]
