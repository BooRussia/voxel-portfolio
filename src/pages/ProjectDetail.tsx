import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, projects } from '../data/projects'
import { DISCIPLINES } from '../types/project'
import { CoverArt } from '../components/CoverArt'
import { ProjectCard } from '../components/ProjectCard'
import './ProjectDetail.css'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <div className="page shell">
        <p className="eyebrow">404</p>
        <h1 className="display-sm">Project not found</h1>
        <p className="lede" style={{ marginTop: '1rem' }}>
          That case study doesn’t exist — or the link is out of date.
        </p>
        <Link to="/work" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
          Back to work
        </Link>
      </div>
    )
  }

  const discipline = DISCIPLINES.find((d) => d.id === project.discipline)
  const related = projects
    .filter((p) => p.discipline === project.discipline && p.id !== project.id)
    .slice(0, 3)

  return (
    <article className="page project-detail">
      <header className="project-detail__hero shell">
        <nav className="project-detail__crumb" aria-label="Breadcrumb">
          <Link to="/work">Work</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/work?discipline=${project.discipline}`}>
            {discipline?.short ?? project.discipline}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <p className="eyebrow">
          {discipline?.label} · {project.year}
          {project.client ? ` · ${project.client}` : ''}
        </p>
        <h1 className="display project-detail__title">{project.title}</h1>
        <p className="lede">{project.summary}</p>
      </header>

      <div className="project-detail__cover shell">
        <div className="project-detail__cover-frame">
          <CoverArt project={project} />
        </div>
      </div>

      <div className="project-detail__body shell">
        <div className="project-detail__main">
          <h2>Overview</h2>
          <div className="prose">
            {project.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {project.outcomes && project.outcomes.length > 0 && (
            <>
              <h2>Outcomes</h2>
              <ul className="outcome-list">
                {project.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="project-detail__aside">
          <div className="meta-card">
            <h2 className="meta-card__title">Project details</h2>
            <dl className="meta-list">
              <div>
                <dt>Discipline</dt>
                <dd>{discipline?.label}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              {project.client && (
                <div>
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
              <div>
                <dt>Services</dt>
                <dd>
                  <ul className="tag-list">
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Tags</dt>
                <dd>
                  <ul className="tag-list tag-list--chips">
                    {project.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="btn btn--primary meta-card__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site
              </a>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="project-detail__related shell" aria-labelledby="related-heading">
          <div className="section-head">
            <h2 id="related-heading">More in {discipline?.short}</h2>
            <Link to={`/work?discipline=${project.discipline}`} className="section-head__link">
              See all →
            </Link>
          </div>
          <div className="related-grid">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
