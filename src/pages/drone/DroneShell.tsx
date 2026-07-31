import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { droneServices } from '../../data/droneServices'
import './DroneShell.css'
import { asset } from '../../lib/asset'

export function DroneShell() {
  const { pathname } = useLocation()

  return (
    <div className="drone-app">
      <a href="#drone-main" className="drone-skip">
        Skip to content
      </a>

      <header className="drone-top">
        <div className="drone-top__inner">
          <Link to="/" className="drone-top__brand" aria-label="Voxel Design — home">
            <img src={asset("/brand/logo.png")} alt="" width={28} height={28} />
            <span>VOXEL</span>
          </Link>

          <nav className="drone-top__nav" aria-label="Drone services">
            <NavLink
              to="/drone"
              end
              className={({ isActive }) =>
                `drone-top__link ${isActive ? 'is-active' : ''}`
              }
            >
              Overview
            </NavLink>
            {droneServices.map((s) => (
              <NavLink
                key={s.id}
                to={`/drone/${s.slug}`}
                className={({ isActive }) =>
                  `drone-top__link ${isActive ? 'is-active' : ''}`
                }
              >
                {s.shortName}
              </NavLink>
            ))}
          </nav>

          <Link to="/#contact" className="drone-top__cta">
            Book a flight
          </Link>
        </div>
        <div className="drone-top__rule" aria-hidden="true" />

        {/* Compact platform strip for small screens */}
        <nav className="drone-top__mobile" aria-label="Platforms">
          <NavLink to="/drone" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            All
          </NavLink>
          {droneServices.map((s) => (
            <NavLink
              key={s.id}
              to={`/drone/${s.slug}`}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {s.shortName}
            </NavLink>
          ))}
        </nav>
      </header>

      <main id="drone-main" className="drone-main" key={pathname}>
        <Outlet />
      </main>

      <footer className="drone-foot">
        <div className="drone-foot__inner">
          <div className="drone-foot__brand">
            <span className="drone-foot__mark">VOXEL AERIAL</span>
            <p>Precision capture. Clear deliverables. Disciplined ops.</p>
          </div>
          <nav className="drone-foot__links" aria-label="Service links">
            {droneServices.map((s) => (
              <Link key={s.id} to={`/drone/${s.slug}`}>
                {s.name}
              </Link>
            ))}
            <Link to="/">Portfolio</Link>
            <a href="mailto:hello@voxel.design">hello@voxel.design</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
