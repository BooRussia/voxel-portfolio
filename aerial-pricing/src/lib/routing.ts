import type { LatLng } from './geo'
import { haversineMiles, METERS_PER_MILE } from './geo'

export interface RouteEstimate {
  oneWayMiles: number
  oneWayMinutes: number
  source: 'osrm' | 'haversine'
  geometry?: LatLng[]
}

/** Public OSRM demo server — fine for quoting prototypes; swap for your own later. */
const OSRM = 'https://router.project-osrm.org'

export async function estimateDrive(
  from: LatLng,
  to: LatLng,
): Promise<RouteEstimate> {
  const fallbackMiles = haversineMiles(from, to)
  // Approximate drive time: ~35 mph average over road distance ≈ haversine * 1.3
  const fallback: RouteEstimate = {
    oneWayMiles: fallbackMiles * 1.3,
    oneWayMinutes: ((fallbackMiles * 1.3) / 35) * 60,
    source: 'haversine',
  }

  try {
    const url =
      `${OSRM}/route/v1/driving/` +
      `${from.lng},${from.lat};${to.lng},${to.lat}` +
      `?overview=simplified&geometries=geojson`

    const res = await fetch(url)
    if (!res.ok) return fallback
    const data = (await res.json()) as {
      code?: string
      routes?: Array<{
        distance: number
        duration: number
        geometry?: { coordinates: [number, number][] }
      }>
    }
    const route = data.routes?.[0]
    if (!route || data.code !== 'Ok') return fallback

    const geometry =
      route.geometry?.coordinates.map(([lng, lat]) => ({ lat, lng })) ?? undefined

    return {
      oneWayMiles: route.distance / METERS_PER_MILE,
      oneWayMinutes: route.duration / 60,
      source: 'osrm',
      geometry,
    }
  } catch {
    return fallback
  }
}
