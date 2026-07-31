import { useEffect, useRef, useState } from 'react'
import { STYLE_CYCLE_MS, webStyles } from '../data/webStyles'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './WebDesignSection.css'

/**
 * Spatial progress 0→1 with velocity that peaks at the ends and bottoms at center.
 * sin-based: fast enter, crawl through center, fast exit.
 */
function slowCenterProgress(t: number): number {
  const clamped = Math.min(1, Math.max(0, t))
  return 0.5 + 0.5 * Math.sin((clamped - 0.5) * Math.PI)
}

/** Opacity peaks while near center. */
function centerOpacity(s: number): number {
  // s is slowCenterProgress; near 0.5 is bright
  const d = Math.abs(s - 0.5) * 2 // 0 at center, 1 at ends
  return Math.max(0, 1 - Math.pow(d, 1.6))
}

export function WebDesignSection() {
  const { ref, inView } = useInView<HTMLElement>(0.45)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    if (!inView) {
      cancelAnimationFrame(rafRef.current)
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(0.5)
      return
    }

    startRef.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const t = (elapsed % STYLE_CYCLE_MS) / STYLE_CYCLE_MS
      setProgress(t)

      const cycle = Math.floor(elapsed / STYLE_CYCLE_MS)
      const nextIndex = cycle % webStyles.length
      if (nextIndex !== indexRef.current) {
        setIndex(nextIndex)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView])

  const style = webStyles[index]
  const s = slowCenterProgress(progress)
  const opacity = centerOpacity(s)

  // Browser travels full path; title mirrors opposite
  const fromLeft = style.browserFrom === 'left'
  const browserX = fromLeft
    ? -120 + s * 240 // -120% → +120%
    : 120 - s * 240
  const titleX = fromLeft
    ? 120 - s * 240
    : -120 + s * 240

  // Subtle zoom on the "recording" while centered
  const zoom = 1 + (1 - Math.abs(s - 0.5) * 2) * 0.04

  return (
    <section
      id="web"
      ref={ref}
      className="snap-section web-section"
      aria-label="Web design"
    >
      <div className="web-section__bg" aria-hidden="true" />

      <header className="web-section__header">
        <p className="section-label">01 — WEB DESIGN</p>
        <h2 className="section-title web-section__heading">WEB</h2>
      </header>

      <div className="web-stage">
        {/* Style title — opposite side slide */}
        <div
          className="web-stage__title"
          style={{
            transform: `translate3d(${titleX}%, -50%, 0)`,
            opacity: Math.max(0.15, opacity),
            color: style.accent,
          }}
          aria-live="polite"
        >
          {style.label}
        </div>

        {/* Browser "screen recording" */}
        <div
          className="web-browser"
          style={{
            transform: `translate3d(${browserX}%, -50%, 0) scale(${zoom})`,
            opacity: Math.max(0.2, opacity),
          }}
        >
          <div className="web-browser__chrome">
            <span className="web-browser__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="web-browser__url">
              voxel.design/{style.id}
            </span>
          </div>
          <div className="web-browser__viewport">
            {webStyles.map((w, i) => (
              <img
                key={w.id}
                src={w.image}
                alt=""
                className={`web-browser__shot ${i === index ? 'is-active' : ''}`}
                draggable={false}
              />
            ))}
            <div className="web-browser__scan" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="web-section__footer">
        <p className="web-section__hint">
          Browser slides one way. Title the other. Speed ramps through center.
        </p>
        <div className="web-section__pips" aria-hidden="true">
          {webStyles.map((w, i) => (
            <span
              key={w.id}
              className={`web-section__pip ${i === index ? 'is-active' : ''}`}
              style={i === index ? { background: style.accent } : undefined}
            />
          ))}
        </div>
        <SectionMore
          href="#contact"
          label="MORE WEB WORK"
          variant="gold"
          className="web-section__more"
        />
      </div>
    </section>
  )
}
