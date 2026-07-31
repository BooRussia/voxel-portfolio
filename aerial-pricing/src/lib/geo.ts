import area from '@turf/area'
import { polygon as turfPolygon } from '@turf/helpers'

export type LatLng = { lat: number; lng: number }

export const SQFT_PER_SQ_METER = 10.76391041671
export const SQFT_PER_ACRE = 43560
export const METERS_PER_MILE = 1609.344

/** Geodesic polygon area in square feet (closed ring; first≠last ok). */
export function polygonAreaSqFt(ring: LatLng[]): number {
  if (ring.length < 3) return 0
  const coords = ring.map((p) => [p.lng, p.lat] as [number, number])
  const first = coords[0]
  const last = coords[coords.length - 1]
  if (first[0] !== last[0] || first[1] !== last[1]) {
    coords.push([first[0], first[1]])
  }
  try {
    const sqMeters = area(turfPolygon([coords]))
    return Math.abs(sqMeters) * SQFT_PER_SQ_METER
  } catch {
    return 0
  }
}

export function sqFtToAcres(sqFt: number): number {
  return sqFt / SQFT_PER_ACRE
}

export function formatArea(sqFt: number): { sqFtLabel: string; acresLabel: string } {
  const acres = sqFtToAcres(sqFt)
  return {
    sqFtLabel: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(sqFt),
    acresLabel: new Intl.NumberFormat('en-US', {
      maximumFractionDigits: acres >= 10 ? 2 : 3,
    }).format(acres),
  }
}

/** Haversine distance in miles. */
export function haversineMiles(a: LatLng, b: LatLng): number {
  const R = 3958.7613
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function centroidOfRing(ring: LatLng[]): LatLng | null {
  if (ring.length === 0) return null
  let lat = 0
  let lng = 0
  for (const p of ring) {
    lat += p.lat
    lng += p.lng
  }
  return { lat: lat / ring.length, lng: lng / ring.length }
}

export function boundsOfRing(ring: LatLng[]): {
  south: number
  west: number
  north: number
  east: number
} | null {
  if (ring.length === 0) return null
  let south = Infinity
  let west = Infinity
  let north = -Infinity
  let east = -Infinity
  for (const p of ring) {
    south = Math.min(south, p.lat)
    north = Math.max(north, p.lat)
    west = Math.min(west, p.lng)
    east = Math.max(east, p.lng)
  }
  return { south, west, north, east }
}
