import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollChrome } from './components/ScrollChrome'
import { mediumSections } from './data/sections'
import { IntroSection } from './sections/IntroSection'
import { WebMediumSection } from './sections/WebMediumSection'
import { DroneSection } from './sections/DroneSection'
import { PrintSection } from './sections/PrintSection'
import { ContactSection } from './sections/ContactSection'
import { DroneShell } from './pages/drone/DroneShell'
import { DroneHub } from './pages/drone/DroneHub'
import { DroneServicePage } from './pages/drone/DroneServicePage'

const ModelsSection = lazy(() =>
  import('./sections/ModelsSection').then((m) => ({ default: m.ModelsSection })),
)
const Tour360Section = lazy(() =>
  import('./sections/Tour360Section').then((m) => ({ default: m.Tour360Section })),
)
const GaussianSection = lazy(() =>
  import('./sections/GaussianSection').then((m) => ({ default: m.GaussianSection })),
)
const LogosSection = lazy(() =>
  import('./sections/LogosSection').then((m) => ({ default: m.LogosSection })),
)

function SectionFallback() {
  return (
    <section className="snap-section" style={{ background: '#080808' }} aria-hidden="true" />
  )
}

const webConfigs = mediumSections.filter((s) =>
  ['ecommerce', 'windows', 'portfolio-sites'].includes(s.id),
)

function ScrollPortfolio() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      // Allow paint after route mount
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [hash])

  return (
    <div className="scroll-portfolio">
      <a href="#intro" className="skip-link">
        Skip to content
      </a>
      <ScrollChrome />
      <main>
        <IntroSection />

        {webConfigs.map((cfg, i) => (
          <WebMediumSection
            key={cfg.id}
            config={cfg}
            browserFrom={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}

        <Suspense fallback={<SectionFallback />}>
          <ModelsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Tour360Section />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <GaussianSection />
        </Suspense>

        <DroneSection />

        <PrintSection />

        <Suspense fallback={<SectionFallback />}>
          <LogosSection />
        </Suspense>

        <ContactSection />
      </main>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname.startsWith('/drone')) {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

/** Vite injects BASE_URL from `base` (trailing slash). React Router wants no trailing slash. */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ScrollPortfolio />} />
        <Route path="/drone" element={<DroneShell />}>
          <Route index element={<DroneHub />} />
          <Route path=":slug" element={<DroneServicePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
