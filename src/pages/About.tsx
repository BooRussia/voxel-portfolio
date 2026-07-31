import { Link } from 'react-router-dom'
import { DISCIPLINES } from '../types/project'
import './About.css'

const principles = [
  {
    title: 'Calm over clutter',
    body: 'Complex work deserves a simple path. We group by discipline, not by every tool we own — so visitors never face a wall of options.',
  },
  {
    title: 'One coherent vision',
    body: 'A site, a splat tour, a drone reel, and a mark should feel like the same studio. Continuity is the product.',
  },
  {
    title: 'Craft in the details',
    body: 'Typography, spacing, and motion are load-bearing — not decoration. If it doesn’t serve clarity or trust, it doesn’t ship.',
  },
]

export function About() {
  return (
    <div className="page about">
      <header className="about-hero shell">
        <p className="eyebrow">Studio</p>
        <h1 className="display">
          Voxel Design is a multi-discipline practice for brands that live in more than one medium.
        </h1>
        <p className="lede">
          Led by Neythaniel Johns. We design and ship web products, spatial
          experiences, aerial media, and identity systems — with the same
          restraint whether the deliverable is a quoting app or a Gaussian splat.
        </p>
      </header>

      <section className="about-story shell" aria-labelledby="story-heading">
        <div className="about-story__grid">
          <div>
            <h2 id="story-heading" className="display-sm">
              Why “voxel”
            </h2>
          </div>
          <div className="prose">
            <p>
              A voxel is a volume element — the 3D counterpart of a pixel. It’s
              a fitting metaphor for work that has depth: interfaces you use,
              spaces you walk through, landscapes you fly over, objects you hold.
            </p>
            <p>
              This portfolio is structured so each volume is easy to enter. Four
              disciplines. Progressive filters. Case studies that lead with
              outcomes. Beautiful, but never overwhelming.
            </p>
          </div>
        </div>
      </section>

      <section className="about-capabilities shell" aria-labelledby="cap-heading">
        <div className="section-head">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 id="cap-heading">What we take on</h2>
          </div>
        </div>
        <ul className="cap-list">
          {DISCIPLINES.map((d) => (
            <li key={d.id} className="cap-item">
              <h3>{d.label}</h3>
              <p>{d.blurb}</p>
              <ul className="cap-item__tags">
                {d.id === 'web' && (
                  <>
                    <li>E-commerce</li>
                    <li>Business sites</li>
                    <li>Product UI</li>
                    <li>Portfolio sites</li>
                  </>
                )}
                {d.id === 'spatial' && (
                  <>
                    <li>3D models</li>
                    <li>Interactive tours</li>
                    <li>Gaussian splats</li>
                    <li>WebGL viewers</li>
                  </>
                )}
                {d.id === 'aerial' && (
                  <>
                    <li>Drone photography</li>
                    <li>Cinematography</li>
                    <li>Property packages</li>
                    <li>Social cutdowns</li>
                  </>
                )}
                {d.id === 'craft' && (
                  <>
                    <li>Logo systems</li>
                    <li>Brand marks</li>
                    <li>3D printing</li>
                    <li>Prototypes</li>
                  </>
                )}
              </ul>
              <Link to={`/work?discipline=${d.id}`} className="cap-item__link">
                See {d.short} work →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-principles shell" aria-labelledby="principles-heading">
        <div className="section-head">
          <div>
            <p className="eyebrow">Approach</p>
            <h2 id="principles-heading">How we work</h2>
          </div>
        </div>
        <ol className="principle-list">
          {principles.map((p, i) => (
            <li key={p.title}>
              <span className="principle-list__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-cta shell">
        <div className="about-cta__panel">
          <h2 className="display-sm">Let’s build something dimensional</h2>
          <p className="lede">
            Whether you need a conversion-ready site, an immersive tour, aerial
            assets, or a mark that lasts — start with a short note.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
