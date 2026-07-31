import type {
  Complexity,
  GlobalPricingSettings,
  PricingService,
  TravelSettings,
} from '../data/pricingServices'
import { sqFtToAcres } from './geo'

export interface ServiceLineItem {
  serviceId: string
  name: string
  areaComponent: number
  baseFee: number
  processingFee: number
  rawSubtotal: number
  appliedMinimum: boolean
  total: number
}

export interface TravelLineItem {
  oneWayMiles: number
  roundTripMiles: number
  freeRadiusMiles: number
  billableMiles: number
  oneWayMinutes: number
  roundTripMinutes: number
  mileageCharge: number
  driveTimeCharge: number
  total: number
  source: 'osrm' | 'haversine' | 'none'
}

export interface QuoteBreakdown {
  services: ServiceLineItem[]
  servicesSubtotal: number
  travel: TravelLineItem
  complexity: Complexity
  complexityMultiplier: number
  rush: boolean
  rushMultiplier: number
  subtotalBeforeTax: number
  tax: number
  grandTotal: number
  areaSqFt: number
  areaAcres: number
}

export function priceService(
  service: PricingService,
  areaSqFt: number,
): ServiceLineItem {
  const acres = sqFtToAcres(areaSqFt)
  const areaComponent =
    areaSqFt * service.ratePerSqft + acres * service.ratePerAcre
  const rawSubtotal = service.baseFee + areaComponent + service.processingFee
  const appliedMinimum = rawSubtotal < service.minimumFee
  const total = Math.max(rawSubtotal, service.minimumFee)

  return {
    serviceId: service.id,
    name: service.name,
    areaComponent,
    baseFee: service.baseFee,
    processingFee: service.processingFee,
    rawSubtotal,
    appliedMinimum,
    total,
  }
}

export function priceTravel(
  settings: TravelSettings,
  oneWayMiles: number,
  oneWayMinutes: number,
  source: TravelLineItem['source'],
): TravelLineItem {
  if (!settings.enabled || oneWayMiles <= 0) {
    return {
      oneWayMiles: 0,
      roundTripMiles: 0,
      freeRadiusMiles: settings.freeRadiusMiles,
      billableMiles: 0,
      oneWayMinutes: 0,
      roundTripMinutes: 0,
      mileageCharge: 0,
      driveTimeCharge: 0,
      total: 0,
      source: 'none',
    }
  }

  const roundTripMiles = oneWayMiles * 2
  const roundTripMinutes = oneWayMinutes * 2
  const billableOneWay = Math.max(0, oneWayMiles - settings.freeRadiusMiles)
  const billableMiles = billableOneWay * 2

  const mileageCharge =
    settings.useMileage ? billableMiles * settings.ratePerMile : 0
  const driveTimeCharge = settings.useDriveTime
    ? (roundTripMinutes / 60) * settings.ratePerHour
    : 0

  return {
    oneWayMiles,
    roundTripMiles,
    freeRadiusMiles: settings.freeRadiusMiles,
    billableMiles,
    oneWayMinutes,
    roundTripMinutes,
    mileageCharge,
    driveTimeCharge,
    total: mileageCharge + driveTimeCharge,
    source,
  }
}

export function buildQuote(opts: {
  selectedServices: PricingService[]
  areaSqFt: number
  travel: TravelLineItem
  complexity: Complexity
  rush: boolean
  global: GlobalPricingSettings
}): QuoteBreakdown {
  const { selectedServices, areaSqFt, travel, complexity, rush, global } = opts
  const services = selectedServices.map((s) => priceService(s, areaSqFt))
  const servicesSubtotal = services.reduce((sum, s) => sum + s.total, 0)
  const complexityMultiplier = global.complexityMultipliers[complexity]
  const rushMultiplier = rush ? global.rushMultiplier : 1

  const adjustedServices = (servicesSubtotal + travel.total) * complexityMultiplier
  const subtotalBeforeTax = adjustedServices * rushMultiplier
  const tax = subtotalBeforeTax * (global.taxRatePercent / 100)
  const grandTotal = subtotalBeforeTax + tax

  return {
    services,
    servicesSubtotal,
    travel,
    complexity,
    complexityMultiplier,
    rush,
    rushMultiplier,
    subtotalBeforeTax,
    tax,
    grandTotal,
    areaSqFt,
    areaAcres: sqFtToAcres(areaSqFt),
  }
}

export function formatMoney(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatMoneyPrecise(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}
