import type { Project } from '../types/project'
import './CoverArt.css'

interface Props {
  project: Pick<Project, 'title' | 'cover' | 'discipline' | 'cardLabel'>
  className?: string
}

/** Decorative project cover until real photography is wired in. */
export function CoverArt({ project, className = '' }: Props) {
  const pattern = project.cover.pattern ?? 'grid'

  return (
    <div
      className={`cover-art cover-art--${pattern} ${className}`}
      style={{ backgroundImage: project.cover.gradient }}
      role="img"
      aria-label={`${project.title} — ${project.cardLabel}`}
    >
      <div className="cover-art__pattern" aria-hidden="true" />
      <div className="cover-art__shine" aria-hidden="true" />
      <div className="cover-art__label">
        <span>{project.cardLabel}</span>
      </div>
    </div>
  )
}
