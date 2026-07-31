import { mediumSections } from '../data/sections'
import { SectionMore } from '../components/SectionMore'
import './PrintSection.css'

const config = mediumSections.find((s) => s.id === 'print')!

export function PrintSection() {
  return (
    <section
      id="print"
      className="snap-section print-section"
      aria-label="3D printing work"
    >
      <div
        className="print-section__bg"
        style={{ backgroundImage: `url(${config.image})` }}
        aria-hidden="true"
      />
      <div className="print-section__veil" aria-hidden="true" />

      <header className="print-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body">{config.body}</p>
      </header>

      <div className="print-section__tags" aria-hidden="true">
        <span>SLA</span>
        <span>FDM</span>
        <span>FINISH</span>
        <span>PROTOTYPE</span>
      </div>

      <div className="print-section__footer">
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
