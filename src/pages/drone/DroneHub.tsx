import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { droneHub, droneServices } from '../../data/droneServices'
import './DroneHub.css'

export function DroneHub() {
  return (
    <div className="drone-hub">
      {/* Hero */}
      <section className="drone-hub__hero dx-shell" aria-labelledby="drone-hub-title">
        <p className="dx-eyebrow">{droneHub.eyebrow}</p>
        <h1 id="drone-hub-title" className="dx-display">
          {droneHub.title}
        </h1>
        <p className="dx-lede drone-hub__lede">{droneHub.lede}</p>
        <div className="drone-hub__actions">
          <a href="#platforms" className="dx-btn dx-btn--solid">
            View platforms
          </a>
          <Link to="/pricing" className="dx-btn dx-btn--ghost">
            Open pricing map
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="drone-hub__stats" aria-label="Service overview metrics">
        <div className="dx-shell drone-hub__stats-grid">
          {droneHub.stats.map((s) => (
            <div key={s.label} className="drone-hub__stat">
              <span className="drone-hub__stat-value">{s.value}</span>
              <span className="drone-hub__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform cards */}
      <section
        id="platforms"
        className="dx-section dx-shell"
        aria-labelledby="platforms-heading"
      >
        <header className="dx-section__head">
          <p className="dx-eyebrow">Platforms</p>
          <h2 id="platforms-heading">Choose the right system</h2>
          <p>
            Each platform is purpose-built. Pick the mission class that matches
            your outcome — then go deep on use cases, benefits, and deliverables.
          </p>
        </header>

        <ul className="drone-hub__platforms">
          {droneServices.map((service) => (
            <li key={service.id}>
              <Link
                to={`/drone/${service.slug}`}
                className="platform-card"
                style={{ '--platform-accent': service.accent } as CSSProperties}
              >
                <div className="platform-card__media" aria-hidden="true">
                  <img src={service.image} alt="" />
                  <div className="platform-card__scrim" />
                </div>
                <div className="platform-card__body">
                  <div className="platform-card__meta">
                    <span className="platform-card__num">{service.number}</span>
                    <span className="platform-card__tag">{service.tagline}</span>
                  </div>
                  <h3 className="platform-card__title">{service.name}</h3>
                  <p className="platform-card__desc">{service.description}</p>
                  <p className="platform-card__cap">{service.capability}</p>
                  <span className="platform-card__go">
                    Explore {service.shortName}
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison table */}
      <section
        className="dx-section dx-shell drone-hub__compare"
        aria-labelledby="compare-heading"
      >
        <header className="dx-section__head">
          <p className="dx-eyebrow">At a glance</p>
          <h2 id="compare-heading">Mission matrix</h2>
          <p>
            A quick read on when each platform wins. Full use cases live on each
            service page.
          </p>
        </header>

        <div className="compare-table-wrap" role="region" aria-label="Platform comparison" tabIndex={0}>
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                {droneServices.map((s) => (
                  <th key={s.id} scope="col">
                    <Link to={`/drone/${s.slug}`}>{s.shortName}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Best for</th>
                <td>Immersive marketing, tours, listings</td>
                <td>Inspections, roof, solar, electrical</td>
                <td>Survey maps, volumes, civil basemaps</td>
              </tr>
              <tr>
                <th scope="row">Primary output</th>
                <td>Panoramas, orbits, stills</td>
                <td>IR video, annotated reports</td>
                <td>Ortho, DSM, point cloud</td>
              </tr>
              <tr>
                <th scope="row">Decision support</th>
                <td>Visual + experiential</td>
                <td>Risk & condition flags</td>
                <td>Measurable geometry</td>
              </tr>
              <tr>
                <th scope="row">Typical stakeholders</th>
                <td>Marketing, sales, brand</td>
                <td>Facilities, EPC, insurance</td>
                <td>GC, civil, survey, ops</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How we fly */}
      <section className="dx-section dx-shell" aria-labelledby="ops-heading">
        <header className="dx-section__head">
          <p className="dx-eyebrow">Operations</p>
          <h2 id="ops-heading">How every mission runs</h2>
          <p>
            Same discipline across all three platforms — brief, plan, capture,
            deliver. No mystery process.
          </p>
        </header>

        <ol className="ops-grid">
          {[
            {
              n: '01',
              t: 'Brief',
              b: 'Goals, site constraints, airspace, and success criteria — locked before wheels up.',
            },
            {
              n: '02',
              t: 'Plan',
              b: 'Flight path, weather window, hardware loadout, and safety buffers documented.',
            },
            {
              n: '03',
              t: 'Capture',
              b: 'VLOS-first execution with redundant checks and on-site coverage validation.',
            },
            {
              n: '04',
              t: 'Deliver',
              b: 'Processed assets, reports, and formats your team can use the same week.',
            },
          ].map((step) => (
            <li key={step.n} className="ops-card">
              <span className="ops-card__n">{step.n}</span>
              <h3>{step.t}</h3>
              <p>{step.b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="drone-hub__cta dx-shell" aria-labelledby="hub-cta-heading">
        <div className="drone-hub__cta-panel">
          <p className="dx-eyebrow">Next step</p>
          <h2 id="hub-cta-heading" className="dx-display-md">
            Not sure which platform?
          </h2>
          <p className="dx-lede">
            Tell us the decision you need to make — market a property, find a
            roof leak, measure a stockpile — and we&apos;ll match the system.
          </p>
          <div className="drone-hub__actions">
            <Link to="/#contact" className="dx-btn dx-btn--solid">
              Talk to aerial
            </Link>
            <Link to={`/drone/${droneServices[0].slug}`} className="dx-btn dx-btn--ghost">
              Start with 360°
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
