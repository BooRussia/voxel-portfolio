import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mediumSections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './Tour360Section.css'
import { asset } from '../lib/asset'

const config = mediumSections.find((s) => s.id === 'tours')!
const PANORAMA = asset('/media/tour/panorama.jpg')

export function Tour360Section() {
  const { ref, inView } = useInView<HTMLElement>(0.4)
  const inViewRef = useRef(inView)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const hintRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    camera.position.set(0, 0, 0.1)

    // Inward-facing sphere for equirectangular tour
    const geo = new THREE.SphereGeometry(50, 64, 40)
    // invert so we see the inside
    geo.scale(-1, 1, 1)

    const mat = new THREE.MeshBasicMaterial({ color: 0x222222 })
    const sphere = new THREE.Mesh(geo, mat)
    scene.add(sphere)

    const loader = new THREE.TextureLoader()
    loader.load(PANORAMA, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.mapping = THREE.EquirectangularReflectionMapping
      mat.map = tex
      mat.color.set(0xffffff)
      mat.needsUpdate = true
    })

    let lon = 180
    let lat = 0
    let targetLon = lon
    let targetLat = lat
    let dragging = false
    let prevX = 0
    let prevY = 0
    let shownHint = true

    const setFromSpherical = () => {
      lat = Math.max(-85, Math.min(85, lat))
      const phi = THREE.MathUtils.degToRad(90 - lat)
      const theta = THREE.MathUtils.degToRad(lon)
      const target = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      )
      camera.lookAt(target)
    }
    setFromSpherical()

    const onDown = (e: PointerEvent) => {
      dragging = true
      prevX = e.clientX
      prevY = e.clientY
      canvas.setPointerCapture(e.pointerId)
      if (shownHint && hintRef.current) {
        hintRef.current.classList.add('is-hidden')
        shownHint = false
      }
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      prevX = e.clientX
      prevY = e.clientY
      targetLon -= dx * 0.18
      targetLat += dy * 0.16
      targetLat = Math.max(-85, Math.min(85, targetLat))
    }
    const onUp = (e: PointerEvent) => {
      dragging = false
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    // Touch-friendly: prevent page scroll while dragging inside tour
    canvas.addEventListener(
      'touchmove',
      (e) => {
        if (dragging) e.preventDefault()
      },
      { passive: false },
    )

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

    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!inViewRef.current) return

      // smooth follow
      lon += (targetLon - lon) * 0.12
      lat += (targetLat - lat) * 0.12

      if (!dragging) {
        targetLon += 0.04 // gentle idle orbit
      }

      setFromSpherical()
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
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
      id="tours"
      ref={ref}
      className="snap-section tour-section"
      aria-label="360 degree tour"
    >
      <canvas
        ref={canvasRef}
        className="tour-section__canvas"
        aria-label="360 tour — drag to look around"
      />

      <div className="tour-section__veil" aria-hidden="true" />

      <header className="tour-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body tour-section__body">{config.body}</p>
      </header>

      <p ref={hintRef} className="tour-section__hint">
        DRAG TO LOOK AROUND
      </p>

      {/* CTA docked bottom-right — out of primary drag center */}
      <div className="tour-section__cta-dock">
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
