import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  type Complexity,
  type GlobalPricingSettings,
  type PricingService,
  type TravelSettings,
} from './data/pricingServices'
import { AddressSearch } from './components/AddressSearch'
import { MapWorkspace, type AreaShape, type DrawMode } from './components/MapWorkspace'
import { ServiceSidebar } from './components/ServiceSidebar'
import { SettingsDrawer } from './components/SettingsDrawer'
import { centroidOfRing, polygonAreaSqFt, type LatLng } from './lib/geo'
import type { GeocodeResult } from './lib/geocode'
import {
  buildQuote,
  formatMoney,
  priceTravel,
  type TravelLineItem,
} from './lib/pricing'
import { estimateDrive } from './lib/routing'
import { loadPersisted, savePersisted } from './lib/storage'
import './pricing.css'

export function PricingApp() {
  const initial = useMemo(() => loadPersisted(), [])

  const [services, setServices] = useState<PricingService[]>(initial.services)
  const [travel, setTravel] = useState<TravelSettings>(initial.travel)
  const [global, setGlobal] = useState<GlobalPricingSettings>(initial.global)
  const [homeBase, setHomeBase] = useState<LatLng | null>(initial.homeBase)
  const [homeLabel, setHomeLabel] = useState(initial.homeLabel)

  const [mode, setMode] = useState<DrawMode>('pan')
  const [shape, setShape] = useState<AreaShape>(null)
  const [flyTo, setFlyTo] = useState<GeocodeResult | null>(null)
  const [siteLabel, setSiteLabel] = useState('')
  const [sitePoint, setSitePoint] = useState<LatLng | null>(null)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [complexity, setComplexity] = useState<Complexity>('standard')
  const [rush, setRush] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [routeGeometry, setRouteGeometry] = useState<LatLng[] | null>(null)
  const [travelLine, setTravelLine] = useState<TravelLineItem>(
    priceTravel(travel, 0, 0, 'none'),
  )

  const areaSqFt = useMemo(
    () => (shape ? polygonAreaSqFt(shape.ring) : 0),
    [shape],
  )

  const siteCentroid = useMemo(
    () => (shape ? centroidOfRing(shape.ring) : sitePoint),
    [shape, sitePoint],
  )

  useEffect(() => {
    savePersisted({ services, travel, global, homeBase, homeLabel })
  }, [services, travel, global, homeBase, homeLabel])

  useEffect(() => {
    const html = document.documentElement
    const prevSnap = html.style.scrollSnapType
    html.style.scrollSnapType = 'none'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.scrollSnapType = prevSnap
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!homeBase || !siteCentroid || !travel.enabled) {
        if (!cancelled) {
          setRouteGeometry(null)
          setTravelLine(priceTravel(travel, 0, 0, 'none'))
        }
        return
      }
      const est = await estimateDrive(homeBase, siteCentroid)
      if (cancelled) return
      setRouteGeometry(est.geometry ?? [homeBase, siteCentroid])
      setTravelLine(
        priceTravel(travel, est.oneWayMiles, est.oneWayMinutes, est.source),
      )
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [homeBase, siteCentroid, travel])

  const selectedServices = useMemo(
    () => services.filter((s) => selectedIds.has(s.id)),
    [services, selectedIds],
  )

  const quote = useMemo(() => {
    if (areaSqFt <= 0 || selectedServices.length === 0) return null
    return buildQuote({
      selectedServices,
      areaSqFt,
      travel: travelLine,
      complexity,
      rush,
      global,
    })
  }, [selectedServices, areaSqFt, travelLine, complexity, rush, global])

  const onToggleService = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const onSelectSite = (result: GeocodeResult) => {
    setFlyTo(result)
    setSiteLabel(result.label)
    setSitePoint({ lat: result.lat, lng: result.lng })
    setMode('box')
  }

  const onExport = () => {
    if (!quote) return
    const lines = [
      `${global.companyName} — Drone Job Quote`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Valid: ${global.quoteValidityDays} days`,
      '',
      `Site: ${siteLabel || 'Drawn area'}`,
      `Home: ${homeLabel || 'Not set'}`,
      `Area: ${Math.round(quote.areaSqFt).toLocaleString()} sq ft (${quote.areaAcres.toFixed(3)} acres)`,
      `Complexity: ${quote.complexity}${quote.rush ? ' · Rush' : ''}`,
      '',
      'Services:',
      ...quote.services.map(
        (s) =>
          `  - ${s.name}: ${formatMoney(s.total)}${s.appliedMinimum ? ' (minimum applied)' : ''}`,
      ),
      `Services subtotal: ${formatMoney(quote.servicesSubtotal)}`,
      quote.travel.total > 0
        ? `Travel: ${formatMoney(quote.travel.total)} (${quote.travel.roundTripMiles.toFixed(1)} mi RT, ${Math.round(quote.travel.roundTripMinutes)} min)`
        : 'Travel: $0',
      quote.tax > 0 ? `Tax: ${formatMoney(quote.tax)}` : null,
      `JOB TOTAL: ${formatMoney(quote.grandTotal)}`,
      '',
      'Rate notes: area-based defaults are editable in Settings. Mapping often uses $/acre; inspections often use $/sqft.',
    ]
      .filter(Boolean)
      .join('\n')

    void navigator.clipboard.writeText(lines).then(
      () => {
        window.alert('Quote copied to clipboard.')
      },
      () => {
        const blob = new Blob([lines], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `drone-quote-${Date.now()}.txt`
        a.click()
        URL.revokeObjectURL(url)
      },
    )
  }

  return (
    <div className="pq-app">
      <div className="pq-map-stage">
        <MapWorkspace
          mode={mode}
          shape={shape}
          onShapeChange={(s) => {
            setShape(s)
            if (s) setMode('pan')
          }}
          flyTo={flyTo}
          homeBase={homeBase}
          routeGeometry={routeGeometry}
          siteMarker={sitePoint}
        />

        <div className="pq-map-chrome">
          <div className="pq-map-chrome__top">
            <Link to="/" className="pq-brand-chip">
              Voxel · Pricing
            </Link>
            <AddressSearch onSelect={onSelectSite} className="pq-map-search" />
          </div>

          <div className="pq-toolbar" role="toolbar" aria-label="Draw tools">
            <ToolButton
              active={mode === 'pan'}
              onClick={() => setMode('pan')}
              label="Pan"
              title="Pan / navigate"
            >
              <HandIcon />
            </ToolButton>
            <ToolButton
              active={mode === 'box'}
              onClick={() => setMode('box')}
              label="Box"
              title="Draw bounding box"
            >
              <BoxIcon />
            </ToolButton>
            <ToolButton
              active={mode === 'polygon'}
              onClick={() => setMode('polygon')}
              label="Polygon"
              title="Pen / polygon: click points, double-click to finish"
            >
              <PenIcon />
            </ToolButton>
            <button
              type="button"
              className="pq-tool"
              onClick={() => {
                setShape(null)
                setRouteGeometry(null)
              }}
              title="Clear area"
            >
              <TrashIcon />
              <span>Clear</span>
            </button>
          </div>

          <div className="pq-map-hint">
            {mode === 'box' && <span>Click and drag to draw a bounding box over the site.</span>}
            {mode === 'polygon' && (
              <span>Click to place vertices · double-click to close the shape.</span>
            )}
            {mode === 'pan' && areaSqFt > 0 && (
              <span>
                {Math.round(areaSqFt).toLocaleString()} sq ft
                {travelLine.oneWayMiles > 0 &&
                  ` · ${travelLine.oneWayMiles.toFixed(1)} mi / ${Math.round(travelLine.oneWayMinutes)} min one-way`}
              </span>
            )}
            {mode === 'pan' && areaSqFt <= 0 && (
              <span>Satellite map · search an address, then draw the capture area.</span>
            )}
          </div>
        </div>
      </div>

      <ServiceSidebar
        services={services}
        selectedIds={selectedIds}
        onToggle={onToggleService}
        areaSqFt={areaSqFt}
        quote={quote}
        complexity={complexity}
        onComplexity={setComplexity}
        rush={rush}
        onRush={setRush}
        siteLabel={siteLabel}
        homeLabel={homeLabel}
        onOpenSettings={() => setSettingsOpen(true)}
        onExport={onExport}
        onClearArea={() => setShape(null)}
      />

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        services={services}
        onServicesChange={setServices}
        travel={travel}
        onTravelChange={setTravel}
        global={global}
        onGlobalChange={setGlobal}
        homeBase={homeBase}
        homeLabel={homeLabel}
        onHomeChange={(point, label) => {
          setHomeBase(point)
          setHomeLabel(label)
        }}
      />
    </div>
  )
}

function ToolButton({
  active,
  onClick,
  label,
  title,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`pq-tool ${active ? 'is-active' : ''}`}
      onClick={onClick}
      title={title}
      aria-pressed={active}
    >
      {children}
      <span>{label}</span>
    </button>
  )
}

function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13 2a2 2 0 0 0-2 2v7.2l-1.2-.8a2 2 0 0 0-2.8.4l-.4.6 4.9 6.4A4 4 0 0 0 14.7 19H18a3 3 0 0 0 3-3V9a2 2 0 1 0-4 0v1h-1V4a2 2 0 0 0-2-2h-1Z"
      />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4Z"
      />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 7h12v2H6V7Zm2 3h8l-1 11H9L8 10Zm3-6h2l1 2H10l1-2Z"
      />
    </svg>
  )
}
