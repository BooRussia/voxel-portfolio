import { Link } from 'react-router-dom'
import { getFeaturedProjects } from '../data/projects'
import { DISCIPLINES } from '../types/project'
import { ProjectCard } from '../components/ProjectCard'
import './Home.css'

export function Home() {
  const featured = getFeaturedProjects()

  return (
    <div className="page home">
      <section className="hero shell">
        <p className="eyebrow">Multi-discipline studio</p>
        <h1 className="display hero__title">
          Design that holds
          <br />
          <em>every dimension</em>
        </h1>
        <p className="lede hero__lede">
          Web experiences, spatial media, aerial capture, and crafted identity —
          organized so clients can find what they need without wading through noise.
        </p>
        <div className="hero__actions">
          <Link to="/work" className="btn btn--primary">
            Explore work
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Start a project
          </Link>
        </div>
      </section>

      <section className="disciplines shell" aria-labelledby="disciplines-heading">
        <div className="section-head">
          <div>
            <p className="eyebrow">Four pillars</p>
            <h2 id="disciplines-heading">Find the right kind of work</h2>
          </div>
          <p>
            Everything folds into four calm disciplines — not a dozen competing menus.
          </p>
        </div>
        <ul className="discipline-grid">
          {DISCIPLINES.map((d, i) => (
            <li key={d.id}>
              <Link to={`/work?discipline=${d.id}`} className="discipline-card">
                <span className="discipline-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{d.label}</h3>
                <p>{d.blurb}</p>
                <span className="discipline-card__go">
                  Browse {d.short}
                  <span aria-hidden="true"> →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="featured shell" aria-labelledby="featured-heading">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected</p>
            <h2 id="featured-heading">Featured projects</h2>
          </div>
          <Link to="/work" className="section-head__link">
            View all work →
          </Link>
        </div>
        <div className="bento">
          {featured.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              size={p.featuredSize ?? 'standard'}
            />
          ))}
        </div>
      </section>

      <section className="home-cta shell">
        <div className="home-cta__panel">
          <p className="eyebrow">Collaboration</p>
          <h2 className="display-sm">Need more than one medium?</h2>
          <p className="lede">
            Most studios specialize. We intentionally span web, space, air, and
            craft — so a brand site, a 3D tour, and a drone reel can share one
            coherent vision.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Tell us about your project
          </Link>
        </div>
      </section>
    </div>
  )
}
