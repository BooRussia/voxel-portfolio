import type { CSSProperties } from 'react'
import {
  CATEGORY_LABELS,
  type Complexity,
  type PricingService,
} from '../data/pricingServices'
import { formatArea } from '../lib/geo'
import {
  formatMoney,
  formatMoneyPrecise,
  type QuoteBreakdown,
} from '../lib/pricing'

interface ServiceSidebarProps {
  services: PricingService[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  areaSqFt: number
  quote: QuoteBreakdown | null
  complexity: Complexity
  onComplexity: (c: Complexity) => void
  rush: boolean
  onRush: (v: boolean) => void
  siteLabel: string
  homeLabel: string
  onOpenSettings: () => void
  onExport: () => void
  onClearArea: () => void
}

const CATEGORY_ORDER: PricingService['category'][] = [
  'media',
  'mapping',
  'inspection',
  'survey',
]

export function ServiceSidebar({
  services,
  selectedIds,
  onToggle,
  areaSqFt,
  quote,
  complexity,
  onComplexity,
  rush,
  onRush,
  siteLabel,
  homeLabel,
  onOpenSettings,
  onExport,
  onClearArea,
}: ServiceSidebarProps) {
  const area = formatArea(areaSqFt)
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: services.filter((s) => s.category === cat),
  })).filter((g) => g.items.length)

  return (
    <aside className="pq-sidebar">
      <header className="pq-sidebar__head">
        <div>
          <p className="pq-eyebrow">Drone job quote</p>
          <h1>Pricing</h1>
        </div>
        <button type="button" className="pq-icon-btn" onClick={onOpenSettings} title="Rates & settings">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.82 14.16a.5.5 0 0 0-.12.64l1.92 3.32c.13.23.4.32.64.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.8c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.24.1.51 0 .64-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
            />
          </svg>
          <span className="sr-only">Settings</span>
        </button>
      </header>

      <section className="pq-panel">
        <div className="pq-panel__title-row">
          <h2>Coverage area</h2>
          {areaSqFt > 0 && (
            <button type="button" className="pq-text-btn" onClick={onClearArea}>
              Clear
            </button>
          )}
        </div>
        {areaSqFt > 0 ? (
          <div className="pq-area-stats">
            <div>
              <span className="pq-stat__value">{area.sqFtLabel}</span>
              <span className="pq-stat__label">sq ft</span>
            </div>
            <div>
              <span className="pq-stat__value">{area.acresLabel}</span>
              <span className="pq-stat__label">acres</span>
            </div>
          </div>
        ) : (
          <p className="pq-muted">
            Search an address, then draw a box or polygon on the satellite map.
          </p>
        )}
        {siteLabel && (
          <p className="pq-site-label" title={siteLabel}>
            <strong>Site</strong> {siteLabel}
          </p>
        )}
        {homeLabel && (
          <p className="pq-site-label" title={homeLabel}>
            <strong>Home</strong> {homeLabel}
          </p>
        )}
      </section>

      <section className="pq-panel pq-panel--grow">
        <h2>Services</h2>
        <p className="pq-muted pq-muted--tight">
          Each selected service is priced from the area you drew, then summed.
        </p>
        <div className="pq-service-groups">
          {grouped.map(({ cat, items }) => (
            <div key={cat} className="pq-service-group">
              <h3>{CATEGORY_LABELS[cat]}</h3>
              <ul>
                {items.map((service) => {
                  const checked = selectedIds.has(service.id)
                  const line = quote?.services.find((s) => s.serviceId === service.id)
                  return (
                    <li key={service.id}>
                      <label
                        className={`pq-service ${checked ? 'is-checked' : ''}`}
                        style={{ '--svc-accent': service.accent } as CSSProperties}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(service.id)}
                          disabled={areaSqFt <= 0}
                        />
                        <span className="pq-service__body">
                          <span className="pq-service__name">{service.name}</span>
                          <span className="pq-service__desc">{service.description}</span>
                          <span className="pq-service__meta">
                            min {formatMoney(service.minimumFee)}
                            {service.ratePerSqft > 0 &&
                              ` · ${formatMoneyPrecise(service.ratePerSqft)}/sqft`}
                            {service.ratePerAcre > 0 &&
                              ` · ${formatMoneyPrecise(service.ratePerAcre)}/acre`}
                          </span>
                        </span>
                        {checked && line && (
                          <span className="pq-service__price">{formatMoney(line.total)}</span>
                        )}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pq-panel">
        <h2>Job factors</h2>
        <div className="pq-factors">
          <label>
            Site complexity
            <select
              value={complexity}
              onChange={(e) => onComplexity(e.target.value as Complexity)}
            >
              <option value="standard">Standard (1.0×)</option>
              <option value="moderate">Moderate (1.15×)</option>
              <option value="complex">Complex (1.35×)</option>
            </select>
          </label>
          <label className="pq-check-row">
            <input
              type="checkbox"
              checked={rush}
              onChange={(e) => onRush(e.target.checked)}
            />
            Rush delivery (+25%)
          </label>
        </div>
      </section>

      <section className="pq-totals">
        {quote && selectedIds.size > 0 ? (
          <>
            <div className="pq-totals__rows">
              <div>
                <span>Services</span>
                <span>{formatMoney(quote.servicesSubtotal)}</span>
              </div>
              {quote.travel.total > 0 && (
                <div>
                  <span>
                    Travel
                    <small>
                      {quote.travel.roundTripMiles.toFixed(1)} mi RT
                      {quote.travel.roundTripMinutes > 0 &&
                        ` · ${Math.round(quote.travel.roundTripMinutes)} min`}
                    </small>
                  </span>
                  <span>{formatMoney(quote.travel.total)}</span>
                </div>
              )}
              {quote.complexityMultiplier !== 1 && (
                <div>
                  <span>Complexity</span>
                  <span>{quote.complexityMultiplier.toFixed(2)}×</span>
                </div>
              )}
              {quote.rush && (
                <div>
                  <span>Rush</span>
                  <span>{quote.rushMultiplier.toFixed(2)}×</span>
                </div>
              )}
              {quote.tax > 0 && (
                <div>
                  <span>Tax</span>
                  <span>{formatMoney(quote.tax)}</span>
                </div>
              )}
            </div>
            <div className="pq-totals__grand">
              <span>Job total</span>
              <strong>{formatMoney(quote.grandTotal)}</strong>
            </div>
            <button type="button" className="pq-btn pq-btn--primary" onClick={onExport}>
              Export quote
            </button>
          </>
        ) : (
          <p className="pq-muted">
            Draw an area and select services to see a live job total.
          </p>
        )}
      </section>
    </aside>
  )
}
