import { useEffect, useMemo, useRef, useState } from 'react'
import {
  MapContainer,
  Marker,
  Polygon,
  Rectangle,
  TileLayer,
  Polyline,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import type { LatLng } from '../lib/geo'
import { boundsOfRing } from '../lib/geo'
import type { GeocodeResult } from '../lib/geocode'
import 'leaflet/dist/leaflet.css'

export type DrawMode = 'pan' | 'box' | 'polygon'

export type AreaShape =
  | { type: 'box'; ring: LatLng[] }
  | { type: 'polygon'; ring: LatLng[] }
  | null

interface MapWorkspaceProps {
  mode: DrawMode
  shape: AreaShape
  onShapeChange: (shape: AreaShape) => void
  flyTo: GeocodeResult | null
  homeBase: LatLng | null
  routeGeometry: LatLng[] | null
  siteMarker: LatLng | null
}

const satelliteUrl =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const labelsUrl =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'

const homeIcon = new L.DivIcon({
  className: 'pq-marker pq-marker--home',
  html: '<span>H</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

const siteIcon = new L.DivIcon({
  className: 'pq-marker pq-marker--site',
  html: '<span>S</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function FlyToTarget({ target }: { target: GeocodeResult | null }) {
  const map = useMap()
  useEffect(() => {
    if (!target) return
    if (target.boundingBox) {
      const [south, north, west, east] = target.boundingBox
      map.fitBounds(
        [
          [south, west],
          [north, east],
        ],
        { padding: [48, 48], maxZoom: 19 },
      )
    } else {
      map.setView([target.lat, target.lng], 18, { animate: true })
    }
  }, [target, map])
  return null
}

function FitShape({ shape }: { shape: AreaShape }) {
  const map = useMap()
  const fitted = useRef<string | null>(null)
  useEffect(() => {
    if (!shape || shape.ring.length < 2) return
    const key = JSON.stringify(shape.ring)
    if (fitted.current === key) return
    const b = boundsOfRing(shape.ring)
    if (!b) return
    map.fitBounds(
      [
        [b.south, b.west],
        [b.north, b.east],
      ],
      { padding: [60, 60], maxZoom: 20 },
    )
    fitted.current = key
  }, [shape, map])
  return null
}

function DrawController({
  mode,
  shape,
  onShapeChange,
}: {
  mode: DrawMode
  shape: AreaShape
  onShapeChange: (shape: AreaShape) => void
}) {
  const map = useMap()
  const [draftCorners, setDraftCorners] = useState<LatLng[]>([])
  const [boxStart, setBoxStart] = useState<LatLng | null>(null)
  const [boxCurrent, setBoxCurrent] = useState<LatLng | null>(null)
  const [cursor, setCursor] = useState<LatLng | null>(null)

  useEffect(() => {
    setDraftCorners([])
    setBoxStart(null)
    setBoxCurrent(null)
    setCursor(null)
  }, [mode])

  useEffect(() => {
    const el = map.getContainer()
    el.classList.toggle('pq-map--drawing', mode !== 'pan')
    el.classList.toggle('pq-map--polygon', mode === 'polygon')
    el.classList.toggle('pq-map--box', mode === 'box')
    map.dragging.enable()
    if (mode === 'box' || mode === 'polygon') {
      // Keep drag for pan with two fingers / middle; click draw uses mouseup
      map.doubleClickZoom.disable()
    } else {
      map.doubleClickZoom.enable()
    }
    return () => {
      map.doubleClickZoom.enable()
      el.classList.remove('pq-map--drawing', 'pq-map--polygon', 'pq-map--box')
    }
  }, [mode, map])

  useMapEvents({
    mousemove(e) {
      if (mode === 'pan') return
      setCursor({ lat: e.latlng.lat, lng: e.latlng.lng })
      if (mode === 'box' && boxStart) {
        setBoxCurrent({ lat: e.latlng.lat, lng: e.latlng.lng })
      }
    },
    click(e) {
      if (mode !== 'polygon') return
      const point = { lat: e.latlng.lat, lng: e.latlng.lng }
      setDraftCorners((prev) => [...prev, point])
    },
    dblclick(e) {
      if (mode !== 'polygon') return
      L.DomEvent.stop(e)
      setDraftCorners((prev) => {
        if (prev.length >= 3) {
          onShapeChange({ type: 'polygon', ring: prev })
          return []
        }
        return prev
      })
    },
    mousedown(e) {
      if (mode !== 'box' || e.originalEvent.button !== 0) return
      // Avoid starting a box when interacting with overlays
      if ((e.originalEvent.target as HTMLElement)?.closest('.leaflet-marker-icon')) {
        return
      }
      map.dragging.disable()
      const point = { lat: e.latlng.lat, lng: e.latlng.lng }
      setBoxStart(point)
      setBoxCurrent(point)
    },
    mouseup(e) {
      if (mode !== 'box' || !boxStart) return
      map.dragging.enable()
      const end = { lat: e.latlng.lat, lng: e.latlng.lng }
      const ring = boxToRing(boxStart, end)
      const areaish =
        Math.abs(boxStart.lat - end.lat) * Math.abs(boxStart.lng - end.lng)
      setBoxStart(null)
      setBoxCurrent(null)
      if (areaish > 1e-12) {
        onShapeChange({ type: 'box', ring })
      }
    },
  })

  const previewRing = useMemo(() => {
    if (mode === 'box' && boxStart && boxCurrent) {
      return boxToRing(boxStart, boxCurrent)
    }
    if (mode === 'polygon' && draftCorners.length) {
      const ring = [...draftCorners]
      if (cursor) ring.push(cursor)
      return ring
    }
    return null
  }, [mode, boxStart, boxCurrent, draftCorners, cursor])

  const committedPositions = useMemo(() => {
    if (!shape) return null
    return shape.ring.map((p) => [p.lat, p.lng] as [number, number])
  }, [shape])

  const previewPositions = useMemo(() => {
    if (!previewRing || previewRing.length < 2) return null
    return previewRing.map((p) => [p.lat, p.lng] as [number, number])
  }, [previewRing])

  return (
    <>
      {committedPositions && committedPositions.length >= 3 && (
        <Polygon
          positions={committedPositions}
          pathOptions={{
            color: '#5eead4',
            weight: 2,
            fillColor: '#14b8a6',
            fillOpacity: 0.28,
          }}
        />
      )}
      {previewPositions && (
        <Polygon
          positions={
            previewPositions.length >= 3
              ? previewPositions
              : [
                  ...previewPositions,
                  previewPositions[0] ?? previewPositions[previewPositions.length - 1],
                ]
          }
          pathOptions={{
            color: '#99f6e4',
            weight: 2,
            dashArray: '6 6',
            fillColor: '#2dd4bf',
            fillOpacity: 0.18,
          }}
        />
      )}
      {mode === 'polygon' &&
        draftCorners.map((p, i) => (
          <Marker
            key={`v-${i}`}
            position={[p.lat, p.lng]}
            icon={
              new L.DivIcon({
                className: 'pq-vertex',
                html: '<span></span>',
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              })
            }
            interactive={false}
          />
        ))}
      {shape?.type === 'box' && committedPositions && (
        <Rectangle
          bounds={L.latLngBounds(committedPositions)}
          pathOptions={{ opacity: 0, fillOpacity: 0 }}
        />
      )}
    </>
  )
}

function boxToRing(a: LatLng, b: LatLng): LatLng[] {
  const south = Math.min(a.lat, b.lat)
  const north = Math.max(a.lat, b.lat)
  const west = Math.min(a.lng, b.lng)
  const east = Math.max(a.lng, b.lng)
  return [
    { lat: south, lng: west },
    { lat: south, lng: east },
    { lat: north, lng: east },
    { lat: north, lng: west },
  ]
}

export function MapWorkspace({
  mode,
  shape,
  onShapeChange,
  flyTo,
  homeBase,
  routeGeometry,
  siteMarker,
}: MapWorkspaceProps) {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={5}
      className="pq-map"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url={satelliteUrl} maxZoom={19} />
      <TileLayer url={labelsUrl} maxZoom={19} opacity={0.85} />
      <FlyToTarget target={flyTo} />
      <FitShape shape={shape} />
      <DrawController mode={mode} shape={shape} onShapeChange={onShapeChange} />
      {homeBase && (
        <Marker position={[homeBase.lat, homeBase.lng]} icon={homeIcon} />
      )}
      {siteMarker && (
        <Marker position={[siteMarker.lat, siteMarker.lng]} icon={siteIcon} />
      )}
      {routeGeometry && routeGeometry.length > 1 && (
        <Polyline
          positions={routeGeometry.map((p) => [p.lat, p.lng] as [number, number])}
          pathOptions={{ color: '#fbbf24', weight: 3, opacity: 0.85 }}
        />
      )}
    </MapContainer>
  )
}
