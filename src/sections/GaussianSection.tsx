import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mediumSections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './GaussianSection.css'

const config = mediumSections.find((s) => s.id === 'gaussian')!

export function GaussianSection() {
  const { ref, inView } = useInView<HTMLElement>(0.4)
  const inViewRef = useRef(inView)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.set(0, 0.2, 3.2)

    // Dense gaussian-like point field
    const COUNT = 14000
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const c1 = new THREE.Color('#c084fc')
    const c2 = new THREE.Color('#22d3ee')
    const c3 = new THREE.Color('#c9a227')

    for (let i = 0; i < COUNT; i++) {
      // Room-like volume: denser walls / furniture blobs
      const room = Math.random()
      let x: number, y: number, z: number
      if (room < 0.35) {
        // floor / furniture slab
        x = (Math.random() - 0.5) * 3.2
        y = (Math.random() - 0.5) * 0.35 - 0.5
        z = (Math.random() - 0.5) * 2.4
      } else if (room < 0.55) {
        // vertical wall strip
        x = (Math.random() > 0.5 ? 1 : -1) * (1.4 + Math.random() * 0.2)
        y = (Math.random() - 0.3) * 1.8
        z = (Math.random() - 0.5) * 2.2
      } else {
        // ambient cloud
        const r = Math.pow(Math.random(), 0.55) * 1.6
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        x = r * Math.sin(phi) * Math.cos(theta)
        y = r * Math.sin(phi) * Math.sin(theta) * 0.7
        z = r * Math.cos(phi)
      }
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const pick = Math.random()
      const col = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let dragging = false
    let prevX = 0
    let prevY = 0
    let rotY = 0
    let rotX = 0.15
    let auto = true

    const onDown = (e: PointerEvent) => {
      dragging = true
      auto = false
      prevX = e.clientX
      prevY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      rotY += (e.clientX - prevX) * 0.006
      rotX = Math.max(
        -0.7,
        Math.min(0.7, rotX + (e.clientY - prevY) * 0.005),
      )
      prevX = e.clientX
      prevY = e.clientY
    }
    const onUp = (e: PointerEvent) => {
      dragging = false
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* */
      }
      window.setTimeout(() => {
        if (!dragging) auto = true
      }, 1400)
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let frame = 0
    const loop = () => {
      frame = requestAnimationFrame(loop)
      if (!inViewRef.current) return
      if (auto && !dragging) rotY += 0.0035
      points.rotation.y = rotY
      points.rotation.x = rotX
      // subtle pulse
      mat.size = 0.024 + Math.sin(performance.now() * 0.002) * 0.006
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      id="gaussian"
      ref={ref}
      className="snap-section gaussian-section"
      aria-label="Gaussian splats"
    >
      <div
        className="gaussian-section__bg"
        style={{ backgroundImage: `url(${config.image})` }}
        aria-hidden="true"
      />
      <div className="gaussian-section__veil" aria-hidden="true" />

      <header className="gaussian-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body">{config.body}</p>
      </header>

      <canvas
        ref={canvasRef}
        className="gaussian-section__canvas"
        aria-label="Gaussian splat field — drag to orbit"
      />

      <div className="gaussian-section__footer">
        <p className="gaussian-section__hint">DRAG THE FIELD</p>
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
