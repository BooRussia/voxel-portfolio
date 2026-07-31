import { useEffect, useRef, useState } from 'react'
import type { MediumSectionConfig } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './WebMediumSection.css'

/** Fast → crawl at center → fast out (spatial progress 0→1). */
function slowCenter(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return 0.5 + 0.5 * Math.sin((c - 0.5) * Math.PI)
}

function peakOpacity(s: number): number {
  const d = Math.abs(s - 0.5) * 2
  return Math.max(0.12, 1 - Math.pow(d, 1.55))
}

const CYCLE_MS = 4800

interface Props {
  config: MediumSectionConfig
  /** Alternate entry side so consecutive web sections feel different */
  browserFrom?: 'left' | 'right'
}

/**
 * Fullscreen web medium: browser mockup + giant caps title
 * with opposing speed-ramp slides (loops while section is in view).
 */
export function WebMediumSection({ config, browserFrom = 'left' }: Props) {
  const { ref, inView } = useInView<HTMLElement>(0.45)
  const [t, setT] = useState(0.5)
  const raf = useRef(0)
  const start = useRef(0)

  useEffect(() => {
    if (!inView) {
      cancelAnimationFrame(raf.current)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(0.5)
      return
    }
    start.current = performance.now()
    const tick = (now: number) => {
      setT(((now - start.current) % CYCLE_MS) / CYCLE_MS)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView])

  const s = slowCenter(t)
  const opacity = peakOpacity(s)
  const fromLeft = browserFrom === 'left'
  const browserX = fromLeft ? -125 + s * 250 : 125 - s * 250
  const titleX = fromLeft ? 125 - s * 250 : -125 + s * 250
  const zoom = 1 + (1 - Math.abs(s - 0.5) * 2) * 0.045

  return (
    <section
      id={config.id}
      ref={ref}
      className="snap-section web-medium"
      aria-label={config.title}
      style={{ ['--accent' as string]: config.accent }}
    >
      <div className="web-medium__bg" aria-hidden="true" />

      <header className="web-medium__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
      </header>

      <div className="web-medium__stage">
        <div
          className="web-medium__title"
          style={{
            transform: `translate3d(${titleX}%, -50%, 0)`,
            opacity,
            color: config.accent,
          }}
        >
          {config.title}
        </div>

        <div
          className="web-medium__browser"
          style={{
            transform: `translate3d(${browserX}%, -50%, 0) scale(${zoom})`,
            opacity: Math.max(0.25, opacity),
          }}
        >
          <div className="web-medium__chrome">
            <span className="web-medium__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="web-medium__url">
              {config.browserUrl ?? 'voxel.design'}
            </span>
          </div>
          <div className="web-medium__viewport">
            <img src={config.image} alt="" draggable={false} />
            <div className="web-medium__scan" aria-hidden="true" />
          </div>
        </div>
      </div>

      <footer className="web-medium__footer">
        <p className="web-medium__body">{config.body}</p>
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </footer>
    </section>
  )
}
