import { useEffect, useState } from 'react'
import { navSections } from '../data/sections'
import './ScrollChrome.css'
import { asset } from '../lib/asset'

export function ScrollChrome() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            const idx = navSections.findIndex((s) => s.id === entry.target.id)
            if (idx >= 0) setActive(idx)
          }
        }
      },
      { threshold: [0.45, 0.6] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="chrome-logo" href="#intro" aria-label="Voxel Design — top">
        <img src={asset("/brand/logo.png")} alt="" width={36} height={36} />
        <span>VOXEL</span>
      </a>

      <nav className="chrome-dots" aria-label="Sections">
        {navSections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`chrome-dots__item ${i === active ? 'is-active' : ''}`}
            aria-label={s.label}
            aria-current={i === active ? 'true' : undefined}
            title={s.label}
          >
            <span className="chrome-dots__pip" />
            <span className="chrome-dots__label">{s.label}</span>
          </a>
        ))}
      </nav>

      <div className="chrome-progress" aria-hidden="true">
        <span
          className="chrome-progress__bar"
          style={{
            transform: `scaleX(${(active + 1) / navSections.length})`,
          }}
        />
      </div>
    </>
  )
}
