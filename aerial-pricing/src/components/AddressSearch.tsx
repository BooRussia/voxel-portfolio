import { useEffect, useId, useRef, useState } from 'react'
import { searchAddress, type GeocodeResult } from '../lib/geocode'

interface AddressSearchProps {
  placeholder?: string
  onSelect: (result: GeocodeResult) => void
  className?: string
}

export function AddressSearch({
  placeholder = 'Search address or place…',
  onSelect,
  className = '',
}: AddressSearchProps) {
  const listId = useId()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeocodeResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const handle = window.setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()
      try {
        const found = await searchAddress(query, 6)
        setResults(found)
        setOpen(true)
      } catch {
        setError('Address search unavailable')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)

    return () => window.clearTimeout(handle)
  }, [query])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className={`pq-search ${className}`} ref={wrapRef}>
      <div className="pq-search__field">
        <svg className="pq-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          autoComplete="off"
        />
        {loading && <span className="pq-search__spinner" aria-hidden="true" />}
      </div>
      {error && <p className="pq-search__error">{error}</p>}
      {open && results.length > 0 && (
        <ul id={listId} className="pq-search__list" role="listbox">
          {results.map((r) => (
            <li key={`${r.lat}-${r.lng}-${r.label}`}>
              <button
                type="button"
                role="option"
                onClick={() => {
                  onSelect(r)
                  setQuery(r.label)
                  setOpen(false)
                }}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
