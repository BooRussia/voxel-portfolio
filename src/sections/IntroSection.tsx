import './IntroSection.css'

export function IntroSection() {
  return (
    <section id="intro" className="snap-section intro" aria-label="Introduction">
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__content">
        <p className="section-label">VOXEL DESIGN</p>
        <h1 className="intro__title">
          EVERY
          <br />
          MEDIUM.
        </h1>
        <p className="section-body intro__body">
          Ecommerce. Windows &amp; doors. Portfolios. 3D models. Tours. Splats.
          Drone. Print. Logos. One full screen each — scroll the stack.
        </p>
        <ul className="intro__stack" aria-label="Mediums">
          <li>ECOMMERCE</li>
          <li>WINDOWS</li>
          <li>PORTFOLIO</li>
          <li>3D MODELS</li>
          <li>3D TOURS</li>
          <li>SPLATS</li>
          <li>DRONE</li>
          <li>PRINT</li>
          <li>LOGOS</li>
        </ul>
        <a className="intro__scroll" href="#ecommerce">
          <span>SCROLL</span>
          <span className="intro__chevron" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
