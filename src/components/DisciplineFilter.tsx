import { DISCIPLINES, type Discipline } from '../types/project'
import './DisciplineFilter.css'

export type FilterValue = 'all' | Discipline

interface Props {
  value: FilterValue
  onChange: (value: FilterValue) => void
  counts?: Partial<Record<FilterValue, number>>
}

const options: { id: FilterValue; label: string }[] = [
  { id: 'all', label: 'All work' },
  ...DISCIPLINES.map((d) => ({ id: d.id as FilterValue, label: d.short })),
]

export function DisciplineFilter({ value, onChange, counts }: Props) {
  return (
    <div
      className="discipline-filter"
      role="radiogroup"
      aria-label="Filter by discipline"
    >
      {options.map((opt) => {
        const selected = value === opt.id
        const count = counts?.[opt.id]
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`discipline-filter__chip ${selected ? 'is-selected' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
            {typeof count === 'number' && (
              <span className="discipline-filter__count">{count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
