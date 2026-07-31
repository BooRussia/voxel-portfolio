import type {
  GlobalPricingSettings,
  PricingService,
  TravelSettings,
} from '../data/pricingServices'
import { DEFAULT_GLOBAL, DEFAULT_SERVICES, DEFAULT_TRAVEL } from '../data/pricingServices'
import type { LatLng } from '../lib/geo'
import { AddressSearch } from './AddressSearch'
import type { GeocodeResult } from '../lib/geocode'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
  services: PricingService[]
  onServicesChange: (services: PricingService[]) => void
  travel: TravelSettings
  onTravelChange: (travel: TravelSettings) => void
  global: GlobalPricingSettings
  onGlobalChange: (global: GlobalPricingSettings) => void
  homeBase: LatLng | null
  homeLabel: string
  onHomeChange: (point: LatLng | null, label: string) => void
}

export function SettingsDrawer({
  open,
  onClose,
  services,
  onServicesChange,
  travel,
  onTravelChange,
  global,
  onGlobalChange,
  homeBase,
  homeLabel,
  onHomeChange,
}: SettingsDrawerProps) {
  if (!open) return null

  const updateService = (id: string, patch: Partial<PricingService>) => {
    onServicesChange(services.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const onPickHome = (result: GeocodeResult) => {
    onHomeChange({ lat: result.lat, lng: result.lng }, result.label)
  }

  return (
    <div className="pq-drawer-root" role="dialog" aria-modal="true" aria-label="Pricing settings">
      <button type="button" className="pq-drawer__scrim" onClick={onClose} aria-label="Close settings" />
      <div className="pq-drawer">
        <header className="pq-drawer__head">
          <div>
            <p className="pq-eyebrow">Configure</p>
            <h2>Rates & home base</h2>
          </div>
          <button type="button" className="pq-icon-btn" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="pq-drawer__body">
          <section className="pq-drawer__section">
            <h3>Home location</h3>
            <p className="pq-muted">
              Used to estimate drive distance and time to the job site.
            </p>
            <AddressSearch
              placeholder="Set home base address…"
              onSelect={onPickHome}
            />
            {homeBase && (
              <div className="pq-home-chip">
                <span>{homeLabel || `${homeBase.lat.toFixed(4)}, ${homeBase.lng.toFixed(4)}`}</span>
                <button type="button" onClick={() => onHomeChange(null, '')}>
                  Clear
                </button>
              </div>
            )}
          </section>

          <section className="pq-drawer__section">
            <h3>Travel pricing</h3>
            <label className="pq-check-row">
              <input
                type="checkbox"
                checked={travel.enabled}
                onChange={(e) => onTravelChange({ ...travel, enabled: e.target.checked })}
              />
              Include travel in quotes
            </label>
            <div className="pq-form-grid">
              <label>
                Free radius (mi)
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={travel.freeRadiusMiles}
                  onChange={(e) =>
                    onTravelChange({ ...travel, freeRadiusMiles: Number(e.target.value) || 0 })
                  }
                />
              </label>
              <label>
                $/mile (round-trip billable)
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={travel.ratePerMile}
                  onChange={(e) =>
                    onTravelChange({ ...travel, ratePerMile: Number(e.target.value) || 0 })
                  }
                />
              </label>
              <label>
                $/hour drive time
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={travel.ratePerHour}
                  onChange={(e) =>
                    onTravelChange({ ...travel, ratePerHour: Number(e.target.value) || 0 })
                  }
                />
              </label>
            </div>
            <div className="pq-inline-checks">
              <label className="pq-check-row">
                <input
                  type="checkbox"
                  checked={travel.useMileage}
                  onChange={(e) => onTravelChange({ ...travel, useMileage: e.target.checked })}
                />
                Bill mileage
              </label>
              <label className="pq-check-row">
                <input
                  type="checkbox"
                  checked={travel.useDriveTime}
                  onChange={(e) => onTravelChange({ ...travel, useDriveTime: e.target.checked })}
                />
                Bill drive time
              </label>
            </div>
          </section>

          <section className="pq-drawer__section">
            <h3>Company & tax</h3>
            <div className="pq-form-grid">
              <label>
                Company name
                <input
                  type="text"
                  value={global.companyName}
                  onChange={(e) => onGlobalChange({ ...global, companyName: e.target.value })}
                />
              </label>
              <label>
                Tax %
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={global.taxRatePercent}
                  onChange={(e) =>
                    onGlobalChange({
                      ...global,
                      taxRatePercent: Number(e.target.value) || 0,
                    })
                  }
                />
              </label>
              <label>
                Quote validity (days)
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={global.quoteValidityDays}
                  onChange={(e) =>
                    onGlobalChange({
                      ...global,
                      quoteValidityDays: Number(e.target.value) || 30,
                    })
                  }
                />
              </label>
              <label>
                Rush multiplier
                <input
                  type="number"
                  min={1}
                  step={0.05}
                  value={global.rushMultiplier}
                  onChange={(e) =>
                    onGlobalChange({
                      ...global,
                      rushMultiplier: Number(e.target.value) || 1.25,
                    })
                  }
                />
              </label>
            </div>
          </section>

          <section className="pq-drawer__section">
            <div className="pq-panel__title-row">
              <h3>Service rates</h3>
              <button
                type="button"
                className="pq-text-btn"
                onClick={() => {
                  onServicesChange(DEFAULT_SERVICES)
                  onTravelChange(DEFAULT_TRAVEL)
                  onGlobalChange(DEFAULT_GLOBAL)
                }}
              >
                Reset defaults
              </button>
            </div>
            <div className="pq-rate-list">
              {services.map((s) => (
                <details key={s.id} className="pq-rate-card">
                  <summary>
                    <span style={{ color: s.accent }}>●</span> {s.name}
                  </summary>
                  <div className="pq-form-grid">
                    <label>
                      Base fee
                      <input
                        type="number"
                        value={s.baseFee}
                        onChange={(e) =>
                          updateService(s.id, { baseFee: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                    <label>
                      Minimum
                      <input
                        type="number"
                        value={s.minimumFee}
                        onChange={(e) =>
                          updateService(s.id, { minimumFee: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                    <label>
                      $/sq ft
                      <input
                        type="number"
                        step="0.001"
                        value={s.ratePerSqft}
                        onChange={(e) =>
                          updateService(s.id, { ratePerSqft: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                    <label>
                      $/acre
                      <input
                        type="number"
                        step="0.1"
                        value={s.ratePerAcre}
                        onChange={(e) =>
                          updateService(s.id, { ratePerAcre: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                    <label>
                      Processing fee
                      <input
                        type="number"
                        value={s.processingFee}
                        onChange={(e) =>
                          updateService(s.id, { processingFee: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
