import type { LatLng } from './geo'

export interface GeocodeResult {
  label: string
  lat: number
  lng: number
  boundingBox?: [number, number, number, number] // south, north, west, east
}

const NOMINATIM = 'https://nominatim.openstreetmap.org'

async function nominatimFetch(path: string): Promise<unknown> {
  const res = await fetch(`${NOMINATIM}${path}`, {
    headers: {
      Accept: 'application/json',
      // Nominatim usage policy requires a valid identifying User-Agent;
      // browsers override UA, so we also identify via query email param when possible.
    },
  })
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`)
  return res.json()
}

export async function searchAddress(
  query: string,
  limit = 5,
): Promise<GeocodeResult[]> {
  const q = query.trim()
  if (q.length < 3) return []

  const params = new URLSearchParams({
    q,
    format: 'json',
    addressdetails: '0',
    limit: String(limit),
  })

  const data = (await nominatimFetch(`/search?${params}`)) as Array<{
    display_name: string
    lat: string
    lon: string
    boundingbox?: [string, string, string, string]
  }>

  return data.map((item) => {
    const bb = item.boundingbox
    return {
      label: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
      boundingBox: bb
        ? [Number(bb[0]), Number(bb[1]), Number(bb[2]), Number(bb[3])]
        : undefined,
    }
  })
}

export async function reverseGeocode(point: LatLng): Promise<string> {
  const params = new URLSearchParams({
    lat: String(point.lat),
    lon: String(point.lng),
    format: 'json',
  })
  const data = (await nominatimFetch(`/reverse?${params}`)) as {
    display_name?: string
  }
  return data.display_name ?? `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`
}
