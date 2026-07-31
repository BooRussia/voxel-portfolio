import { useEffect, useRef, useState } from 'react'

/** True when the element covers a meaningful portion of the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.55) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= threshold * 0.8),
      { threshold: [0, threshold, 0.75, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}
