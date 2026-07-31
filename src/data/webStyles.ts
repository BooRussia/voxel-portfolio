import { asset } from '../lib/asset'

export interface WebStyle {
  id: string
  label: string
  /** Direction browser enters from: left means browser from left, title from right */
  browserFrom: 'left' | 'right'
  image: string
  /** Accent used for title + CTA on this style */
  accent: string
  titleColor?: string
  /** Optional muted loop video; falls back to still + ken burns */
  video?: string
}

export const webStyles: WebStyle[] = [
  {
    id: 'ecommerce',
    label: 'ECOMMERCE',
    browserFrom: 'left',
    image: asset('/media/web/ecommerce.jpg'),
    accent: '#c9a227',
  },
  {
    id: 'business',
    label: 'BUSINESS',
    browserFrom: 'right',
    image: asset('/media/web/business.jpg'),
    accent: '#3b82c4',
  },
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    browserFrom: 'left',
    image: asset('/media/web/portfolio.jpg'),
    accent: '#e6007a',
  },
  {
    id: 'saas',
    label: 'SAAS / APP',
    browserFrom: 'right',
    image: asset('/media/web/saas.jpg'),
    accent: '#a78bfa',
  },
]

/** Full enter → slow-center → exit duration per style (ms) */
export const STYLE_CYCLE_MS = 4200
