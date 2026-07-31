import { Link } from 'react-router-dom'
import './Footer.css'
import { asset } from '../lib/asset'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <img src={asset("/brand/logo.png")} alt="" width={40} height={40} />
          <div>
            <p className="site-footer__name">Voxel Design</p>
            <p className="site-footer__tag">
              Web · Spatial · Aerial · Craft
            </p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className="site-footer__copy">
          © {year} Voxel Design · Neythaniel Johns
        </p>
      </div>
    </footer>
  )
}
