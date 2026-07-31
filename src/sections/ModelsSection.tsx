import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mediumSections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './ModelsSection.css'

const config = mediumSections.find((s) => s.id === 'models')!

export function ModelsSection() {
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.4, 4.2)

    scene.add(new THREE.AmbientLight(0xffffff, 0.35))
    const key = new THREE.DirectionalLight(0xfff0dd, 2.4)
    key.position.set(3, 4, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x88aaff, 0.55)
    fill.position.set(-4, 1, 2)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 0.9)
    rim.position.set(-1, 2, -4)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    // Layered product-like assembly (no external GLB needed)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1c,
      metalness: 0.75,
      roughness: 0.28,
    })
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xc9d0d8,
      metalness: 0.95,
      roughness: 0.15,
    })
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x8ab4ff,
      metalness: 0.55,
      roughness: 0.25,
      emissive: 0x112244,
      emissiveIntensity: 0.35,
    })

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 1.0), bodyMat)
    body.position.y = 0.05
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.5, 0.22, 48),
      chromeMat,
    )
    top.position.y = 0.45
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.05, 16, 64),
      accentMat,
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.28
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.85, 0.12, 48),
      bodyMat,
    )
    base.position.y = -0.28

    // Detail studs
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const stud = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        chromeMat,
      )
      stud.position.set(Math.cos(a) * 0.55, 0.05, Math.sin(a) * 0.35)
      group.add(stud)
    }

    group.add(body, top, ring, base)

    // Floor shadow disc
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 48),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.5,
        roughness: 0.55,
      }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.4
    scene.add(floor)

    let dragging = false
    let prevX = 0
    let prevY = 0
    let rotY = 0.4
    let rotX = 0.2
    let velY = 0
    let velX = 0
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
      velY = (e.clientX - prevX) * 0.01
      velX = (e.clientY - prevY) * 0.008
      prevX = e.clientX
      prevY = e.clientY
      rotY += velY
      rotX = Math.max(-0.9, Math.min(0.9, rotX + velX))
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
      }, 1600)
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
      if (auto && !dragging) {
        rotY += 0.008
        rotX = 0.18 + Math.sin(performance.now() * 0.0007) * 0.08
      } else if (!dragging) {
        rotY += velY
        rotX += velX
        velY *= 0.93
        velX *= 0.93
      }
      group.rotation.y = rotY
      group.rotation.x = rotX
      ring.rotation.z += 0.01
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
      renderer.dispose()
    }
  }, [])

  return (
    <section
      id="models"
      ref={ref}
      className="snap-section models-section"
      aria-label="3D models"
    >
      <div
        className="models-section__photo"
        style={{ backgroundImage: `url(${config.image})` }}
        aria-hidden="true"
      />
      <div className="models-section__dim" aria-hidden="true" />

      <header className="models-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body">{config.body}</p>
      </header>

      <div className="models-section__stage">
        <canvas
          ref={canvasRef}
          className="models-section__canvas"
          aria-label="Interactive 3D model — drag to rotate"
        />
        <p className="models-section__hint">DRAG TO ORBIT</p>
      </div>

      <div className="models-section__footer">
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
