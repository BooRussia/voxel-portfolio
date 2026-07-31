import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { DISCIPLINES, type Discipline } from '../types/project'
import {
  DisciplineFilter,
  type FilterValue,
} from '../components/DisciplineFilter'
import { ProjectCard } from '../components/ProjectCard'
import './Work.css'

function isDiscipline(v: string | null): v is Discipline {
  return DISCIPLINES.some((d) => d.id === v)
}

export function Work() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('discipline')
  const filter: FilterValue = isDiscipline(raw) ? raw : 'all'

  const counts = useMemo(() => {
    const base: Partial<Record<FilterValue, number>> = {
      all: projects.length,
    }
    for (const d of DISCIPLINES) {
      base[d.id] = projects.filter((p) => p.discipline === d.id).length
    }
    return base
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.discipline === filter)
  }, [filter])

  const activeDiscipline =
    filter === 'all' ? null : DISCIPLINES.find((d) => d.id === filter)

  const setFilter = (value: FilterValue) => {
    if (value === 'all') {
      setParams({}, { replace: true })
    } else {
      setParams({ discipline: value }, { replace: true })
    }
  }

  return (
    <div className="page work">
      <header className="work-header shell">
        <p className="eyebrow">Archive</p>
        <h1 className="display-sm">Work</h1>
        <p className="lede">
          {activeDiscipline
            ? activeDiscipline.blurb
            : 'Browse by discipline — web, spatial, aerial, and craft. One filter at a time keeps the grid readable.'}
        </p>
        <div className="work-header__filters">
          <DisciplineFilter
            value={filter}
            onChange={setFilter}
            counts={counts}
          />
        </div>
      </header>

      <div className="shell">
        <p className="work-count" aria-live="polite">
          {filtered.length} project{filtered.length === 1 ? '' : 's'}
          {activeDiscipline ? ` · ${activeDiscipline.label}` : ''}
        </p>

        {filtered.length === 0 ? (
          <p className="work-empty">No projects in this discipline yet.</p>
        ) : (
          <div className="work-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} size="standard" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
