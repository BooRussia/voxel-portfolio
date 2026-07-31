import { useEffect, useState } from 'react'
import { mediumSections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './DroneSection.css'

const config = mediumSections.find((s) => s.id === 'drone')!

export function DroneSection() {
  const { ref, inView } = useInView<HTMLElement>(0.4)
  const [mode, setMode] = useState<'photo' | 'video'>('photo')

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setMode((m) => (m === 'photo' ? 'video' : 'photo'))
    }, 4500)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section
      id="drone"
      ref={ref}
      className="snap-section drone-section"
      aria-label="Drone photography and videography"
    >
      <div className="drone-section__media" aria-hidden="true">
        <img
          src={config.image}
          alt=""
          className={mode === 'photo' ? 'is-active' : ''}
        />
        <img
          src={config.imageAlt}
          alt=""
          className={mode === 'video' ? 'is-active' : ''}
        />
        <div className="drone-section__grain" />
      </div>

      <header className="drone-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body">{config.body}</p>
      </header>

      <div className="drone-section__modes" role="tablist" aria-label="Aerial type">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'photo'}
          className={mode === 'photo' ? 'is-active' : ''}
          onClick={() => setMode('photo')}
        >
          PHOTOGRAPHY
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'video'}
          className={mode === 'video' ? 'is-active' : ''}
          onClick={() => setMode('video')}
        >
          VIDEOGRAPHY
        </button>
      </div>

      <div className="drone-section__footer">
        <SectionMore
          href="/drone"
          label="DRONE SERVICES"
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
