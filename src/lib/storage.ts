import {
  DEFAULT_GLOBAL,
  DEFAULT_SERVICES,
  DEFAULT_TRAVEL,
  type GlobalPricingSettings,
  type PricingService,
  type TravelSettings,
} from '../data/pricingServices'
import type { LatLng } from './geo'

const KEY = 'aerial-pricing-v1'

export interface PersistedPricingState {
  services: PricingService[]
  travel: TravelSettings
  global: GlobalPricingSettings
  homeBase: LatLng | null
  homeLabel: string
}

export function loadPersisted(): PersistedPricingState {
  const fallback: PersistedPricingState = {
    services: DEFAULT_SERVICES,
    travel: DEFAULT_TRAVEL,
    global: DEFAULT_GLOBAL,
    homeBase: null,
    homeLabel: '',
  }

  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<PersistedPricingState>
    return {
      services: mergeServices(parsed.services),
      travel: { ...DEFAULT_TRAVEL, ...parsed.travel },
      global: {
        ...DEFAULT_GLOBAL,
        ...parsed.global,
        complexityMultipliers: {
          ...DEFAULT_GLOBAL.complexityMultipliers,
          ...parsed.global?.complexityMultipliers,
        },
      },
      homeBase: parsed.homeBase ?? null,
      homeLabel: parsed.homeLabel ?? '',
    }
  } catch {
    return fallback
  }
}

function mergeServices(saved?: PricingService[]): PricingService[] {
  if (!saved?.length) return DEFAULT_SERVICES
  const byId = new Map(saved.map((s) => [s.id, s]))
  return DEFAULT_SERVICES.map((def) => {
    const prev = byId.get(def.id)
    return prev ? { ...def, ...prev, id: def.id } : def
  })
}

export function savePersisted(state: PersistedPricingState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode
  }
}
