import { Link } from 'react-router-dom'
import './SectionMore.css'

export type MoreVariant = 'gold' | 'chrome' | 'glass' | 'outline' | 'light'

interface Props {
  href?: string
  onClick?: () => void
  label?: string
  variant?: MoreVariant
  /** Placement class hook from parent */
  className?: string
}

/**
 * Per-section "see more" control. Styled variants blend into each medium;
 * parents position it so it never fights drag/orbit interactions.
 */
export function SectionMore({
  href = '#contact',
  onClick,
  label = 'SEE MORE',
  variant = 'gold',
  className = '',
}: Props) {
  const cls = `section-more section-more--${variant} ${className}`.trim()
  const content = (
    <>
      <span>{label}</span>
      <span className="section-more__arrow" aria-hidden="true">
        →
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {content}
      </button>
    )
  }

  // SPA route (e.g. /drone) — use React Router; hashes stay native.
  if (href.startsWith('/') && !href.startsWith('/#')) {
    return (
      <Link className={cls} to={href}>
        {content}
      </Link>
    )
  }

  return (
    <a className={cls} href={href}>
      {content}
    </a>
  )
}
