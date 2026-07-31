import { Link } from 'react-router-dom'
import type { Project } from '../types/project'
import { DISCIPLINES } from '../types/project'
import { CoverArt } from './CoverArt'
import './ProjectCard.css'

interface Props {
  project: Project
  size?: 'hero' | 'wide' | 'tall' | 'standard'
}

export function ProjectCard({ project, size = 'standard' }: Props) {
  const discipline = DISCIPLINES.find((d) => d.id === project.discipline)

  return (
    <article className={`project-card project-card--${size}`}>
      <Link to={`/work/${project.slug}`} className="project-card__link">
        <div className="project-card__media">
          <CoverArt project={project} />
        </div>
        <div className="project-card__body">
          <div className="project-card__meta">
            <span>{discipline?.short ?? project.discipline}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <span className="project-card__cta">
            View project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
