/**
 * Default drone service rates informed by industry benchmarks (2025–2026):
 * - Aerial photo/video: often hourly ($150–$400) or project minimums
 * - Orthomosaic / mapping: commonly $5–$15/acre with small-site minimums
 * - Survey-grade / RTK: higher minimums + per-acre (often $150–$300/acre photogrammetry)
 * - Thermal / roof: frequently scales by square footage (~$0.01–$0.03/sqft commercial)
 * - Travel: mileage beyond a free radius is a common add-on
 *
 * All rates are editable in the app Settings panel.
 */

export type PricingUnit = 'sqft' | 'acre' | 'hybrid'

export interface PricingService {
  id: string
  name: string
  shortName: string
  description: string
  category: 'media' | 'mapping' | 'inspection' | 'survey'
  /** Flat amount always charged when selected (covers setup / processing). */
  baseFee: number
  /** Floor — never quote below this for the service alone. */
  minimumFee: number
  ratePerSqft: number
  ratePerAcre: number
  /** Extra processing fee (reports, stitching, delivery). */
  processingFee: number
  unitHint: PricingUnit
  accent: string
}

export interface TravelSettings {
  enabled: boolean
  /** Miles from home base included at no charge (one-way). */
  freeRadiusMiles: number
  /** Charged on round-trip miles beyond the free radius. */
  ratePerMile: number
  /** Optional hourly drive rate applied to round-trip drive time. */
  ratePerHour: number
  useMileage: boolean
  useDriveTime: boolean
}

export interface GlobalPricingSettings {
  rushMultiplier: number
  complexityMultipliers: {
    standard: number
    moderate: number
    complex: number
  }
  taxRatePercent: number
  currency: 'USD'
  companyName: string
  quoteValidityDays: number
}

export type Complexity = keyof GlobalPricingSettings['complexityMultipliers']

export const DEFAULT_SERVICES: PricingService[] = [
  {
    id: 'photos',
    name: 'Aerial Photos',
    shortName: 'Photos',
    description: 'High-res stills for marketing, listings, and documentation.',
    category: 'media',
    baseFee: 150,
    minimumFee: 250,
    ratePerSqft: 0.008,
    ratePerAcre: 0,
    processingFee: 50,
    unitHint: 'sqft',
    accent: '#3d8bfd',
  },
  {
    id: 'video',
    name: 'Aerial Video',
    shortName: 'Video',
    description: 'Cinematic flight paths with color-graded deliverables.',
    category: 'media',
    baseFee: 225,
    minimumFee: 400,
    ratePerSqft: 0.012,
    ratePerAcre: 0,
    processingFee: 100,
    unitHint: 'sqft',
    accent: '#5b9fd4',
  },
  {
    id: '360',
    name: '360° Aerial',
    shortName: '360°',
    description: 'Spherical / multi-orbit capture for immersive web experiences.',
    category: 'media',
    baseFee: 175,
    minimumFee: 300,
    ratePerSqft: 0.006,
    ratePerAcre: 0,
    processingFee: 75,
    unitHint: 'sqft',
    accent: '#6ec6ff',
  },
  {
    id: 'map',
    name: 'Orthomosaic Map',
    shortName: 'Map',
    description: '2D georeferenced orthomosaic from overlapping photo grid.',
    category: 'mapping',
    baseFee: 200,
    minimumFee: 500,
    ratePerSqft: 0,
    ratePerAcre: 12,
    processingFee: 150,
    unitHint: 'acre',
    accent: '#2bb673',
  },
  {
    id: 'model3d',
    name: '3D Model / Mesh',
    shortName: '3D Model',
    description: 'Photogrammetry mesh / textured model of the site.',
    category: 'mapping',
    baseFee: 300,
    minimumFee: 600,
    ratePerSqft: 0.01,
    ratePerAcre: 6,
    processingFee: 200,
    unitHint: 'hybrid',
    accent: '#34d399',
  },
  {
    id: 'progress',
    name: 'Construction Progress',
    shortName: 'Progress',
    description: 'Repeatable site documentation package for GCs and owners.',
    category: 'mapping',
    baseFee: 250,
    minimumFee: 450,
    ratePerSqft: 0,
    ratePerAcre: 15,
    processingFee: 75,
    unitHint: 'acre',
    accent: '#86efac',
  },
  {
    id: 'roof',
    name: 'Roof Inspection (Visual)',
    shortName: 'Roof Visual',
    description: 'Close-range roof plane photography with findings report.',
    category: 'inspection',
    baseFee: 100,
    minimumFee: 200,
    ratePerSqft: 0.015,
    ratePerAcre: 0,
    processingFee: 75,
    unitHint: 'sqft',
    accent: '#f59e0b',
  },
  {
    id: 'thermal',
    name: 'Thermal Photos',
    shortName: 'Thermal',
    description: 'Radiometric IR + RGB for moisture, solar, and envelope issues.',
    category: 'inspection',
    baseFee: 200,
    minimumFee: 350,
    ratePerSqft: 0.02,
    ratePerAcre: 0,
    processingFee: 125,
    unitHint: 'sqft',
    accent: '#e85d04',
  },
  {
    id: 'rtk',
    name: 'RTK Survey Mapping',
    shortName: 'RTK Survey',
    description: 'Survey-workflow orthos, DSM/DTM, and point cloud deliverables.',
    category: 'survey',
    baseFee: 500,
    minimumFee: 1500,
    ratePerSqft: 0,
    ratePerAcre: 200,
    processingFee: 350,
    unitHint: 'acre',
    accent: '#c9a227',
  },
]

export const DEFAULT_TRAVEL: TravelSettings = {
  enabled: true,
  freeRadiusMiles: 25,
  ratePerMile: 1.5,
  ratePerHour: 75,
  useMileage: true,
  useDriveTime: true,
}

export const DEFAULT_GLOBAL: GlobalPricingSettings = {
  rushMultiplier: 1.25,
  complexityMultipliers: {
    standard: 1,
    moderate: 1.15,
    complex: 1.35,
  },
  taxRatePercent: 0,
  currency: 'USD',
  companyName: 'Voxel Aerial',
  quoteValidityDays: 30,
}

export const CATEGORY_LABELS: Record<PricingService['category'], string> = {
  media: 'Media',
  mapping: 'Mapping',
  inspection: 'Inspection',
  survey: 'Survey',
}
