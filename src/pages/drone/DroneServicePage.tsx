import type { CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { droneServices, getDroneService } from '../../data/droneServices'
import './DroneServicePage.css'

export function DroneServicePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const service = getDroneService(slug)

  if (!service) {
    return <Navigate to="/drone" replace />
  }

  const others = droneServices.filter((s) => s.id !== service.id)

  return (
    <article
      className="svc"
      style={{ '--svc-accent': service.accent } as CSSProperties}
    >
      {/* Hero */}
      <header className="svc-hero">
        <div className="svc-hero__media" aria-hidden="true">
          <img src={service.image} alt="" />
          <div className="svc-hero__scrim" />
        </div>
        <div className="svc-hero__content dx-shell">
          <p className="dx-eyebrow">
            {service.number} — Drone services
          </p>
          <h1 className="dx-display">{service.name}</h1>
          <p className="svc-hero__line">{service.heroLine}</p>
          <p className="dx-lede">{service.description}</p>
          <div className="svc-hero__actions">
            <Link to="/#contact" className="dx-btn dx-btn--solid">
              Book this service
            </Link>
            <a href="#use-cases" className="dx-btn dx-btn--ghost">
              See use cases
            </a>
          </div>
        </div>
      </header>

      {/* Specs strip */}
      <section className="svc-specs" aria-label={`${service.name} specifications`}>
        <div className="dx-shell">
          <dl className="svc-specs__list">
            {service.specs.map((spec) => (
              <div key={spec.label} className="svc-specs__row">
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Hardware + Ideal for */}
      <section className="dx-section dx-shell svc-split" aria-labelledby="capability-heading">
        <div>
          <header className="dx-section__head">
            <p className="dx-eyebrow">Capability</p>
            <h2 id="capability-heading">What flies</h2>
            <p>{service.capability}</p>
          </header>
          <ul className="svc-list">
            {service.hardware.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <header className="dx-section__head">
            <p className="dx-eyebrow">Fit</p>
            <h2>Ideal for</h2>
            <p>Teams that get the most from this platform class.</p>
          </header>
          <ul className="svc-chips">
            {service.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="dx-section dx-shell" aria-labelledby="benefits-heading">
        <header className="dx-section__head">
          <p className="dx-eyebrow">Why it matters</p>
          <h2 id="benefits-heading">Benefits</h2>
          <p>
            Outcomes your team actually feels — not feature lists for their own sake.
          </p>
        </header>
        <ul className="svc-benefits">
          {service.benefits.map((b, i) => (
            <li key={b.title} className="svc-benefit">
              <span className="svc-benefit__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Use cases */}
      <section
        id="use-cases"
        className="dx-section dx-shell"
        aria-labelledby="usecases-heading"
      >
        <header className="dx-section__head">
          <p className="dx-eyebrow">Applications</p>
          <h2 id="usecases-heading">Use cases</h2>
          <p>
            How this platform is typically deployed — and what you walk away with.
          </p>
        </header>
        <ul className="svc-usecases">
          {service.useCases.map((uc) => (
            <li key={uc.title} className="svc-usecase">
              <h3>{uc.title}</h3>
              <p className="svc-usecase__summary">{uc.summary}</p>
              <div className="svc-usecase__outcomes">
                <p className="svc-usecase__label">What you get</p>
                <ul>
                  {uc.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="dx-section dx-shell" aria-labelledby="process-heading">
        <header className="dx-section__head">
          <p className="dx-eyebrow">Workflow</p>
          <h2 id="process-heading">How we handle it</h2>
          <p>A predictable path from brief to deliverable for every mission.</p>
        </header>
        <ol className="svc-process">
          {service.process.map((p) => (
            <li key={p.step}>
              <span className="svc-process__step">{p.step}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Deliverables */}
      <section className="dx-section dx-shell" aria-labelledby="deliver-heading">
        <header className="dx-section__head">
          <p className="dx-eyebrow">Package</p>
          <h2 id="deliver-heading">Deliverables</h2>
          <p>Standard package — scoped tighter or wider based on the brief.</p>
        </header>
        <ul className="svc-deliverables">
          {service.deliverables.map((d, i) => (
            <li key={d}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* Other services */}
      <section className="dx-section dx-shell" aria-labelledby="more-heading">
        <header className="dx-section__head">
          <p className="dx-eyebrow">Also available</p>
          <h2 id="more-heading">Other platforms</h2>
        </header>
        <ul className="svc-more">
          {others.map((s) => (
            <li key={s.id}>
              <Link to={`/drone/${s.slug}`} className="svc-more__card">
                <span className="svc-more__num">{s.number}</span>
                <span className="svc-more__name">{s.name}</span>
                <span className="svc-more__tag">{s.tagline}</span>
                <span className="svc-more__go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/drone" className="svc-more__card svc-more__card--all">
              <span className="svc-more__num">00</span>
              <span className="svc-more__name">All services</span>
              <span className="svc-more__tag">Back to overview</span>
              <span className="svc-more__go" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Bottom CTA */}
      <section className="svc-cta dx-shell" aria-labelledby="svc-cta-heading">
        <div className="svc-cta__panel">
          <p className="dx-eyebrow">{service.shortName}</p>
          <h2 id="svc-cta-heading" className="dx-display-md">
            Ready to fly this mission?
          </h2>
          <p className="dx-lede">
            Share the site, timeline, and decision you need to support. We&apos;ll
            confirm fit and send a clear scope.
          </p>
          <div className="svc-hero__actions">
            <Link to="/#contact" className="dx-btn dx-btn--solid">
              Start a project
            </Link>
            <a href="mailto:hello@voxel.design" className="dx-btn dx-btn--ghost">
              Email aerial
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}
