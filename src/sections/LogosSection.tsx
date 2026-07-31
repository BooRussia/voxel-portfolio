import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mediumSections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { SectionMore } from '../components/SectionMore'
import './LogosSection.css'
import { asset } from '../lib/asset'

const config = mediumSections.find((s) => s.id === 'logos')!

const LOGOS = [
  {
    id: 'voxel',
    name: 'VOXEL',
    image: asset('/media/logos/gold-v.jpg'),
    metal: 0xc9a227,
  },
  {
    id: 'flight',
    name: 'FLIGHT',
    image: asset('/media/logos/bird.jpg'),
    metal: 0xe8e8e8,
  },
  {
    id: 'link',
    name: 'LINK',
    image: asset('/media/logos/rings.jpg'),
    metal: 0xb8c0c8,
  },
] as const

function createLogoScene(
  canvas: HTMLCanvasElement,
  imageUrl: string,
  metalColor: number,
  active: () => boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
  camera.position.set(0, 0.15, 3.4)

  const amb = new THREE.AmbientLight(0xffffff, 0.35)
  scene.add(amb)

  const key = new THREE.DirectionalLight(0xfff2d6, 2.2)
  key.position.set(2.5, 3, 4)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xa8c4ff, 0.55)
  fill.position.set(-3, 0.5, 2)
  scene.add(fill)

  const rim = new THREE.DirectionalLight(0xffffff, 0.8)
  rim.position.set(0, 1, -3)
  scene.add(rim)

  // Soft ground disc
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(1.4, 48),
    new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.6,
      roughness: 0.4,
    }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.85
  scene.add(ground)

  const group = new THREE.Group()
  scene.add(group)

  const loader = new THREE.TextureLoader()
  loader.load(imageUrl, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    // Card with logo image — slight extrusion feel via back plate
    const aspect = 1
    const w = 1.55
    const h = w / aspect

    const front = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({
        map: tex,
        metalness: 0.35,
        roughness: 0.45,
      }),
    )
    front.position.z = 0.04

    const back = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, 0.08),
      new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: 0.85,
        roughness: 0.25,
      }),
    )
    back.position.z = 0

    group.add(back, front)
  })

  // Drag orbit (pointer)
  let dragging = false
  let prevX = 0
  let prevY = 0
  let rotY = 0.35
  let rotX = 0.12
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
    const dx = e.clientX - prevX
    const dy = e.clientY - prevY
    prevX = e.clientX
    prevY = e.clientY
    velY = dx * 0.008
    velX = dy * 0.006
    rotY += velY
    rotX += velX
    rotX = Math.max(-0.8, Math.min(0.8, rotX))
  }
  const onUp = (e: PointerEvent) => {
    dragging = false
    try {
      canvas.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    // resume auto after idle
    window.setTimeout(() => {
      if (!dragging) auto = true
    }, 1800)
  }

  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointercancel', onUp)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
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
    if (!active()) return

    if (auto && !dragging) {
      rotY += 0.006
      rotX += Math.sin(performance.now() * 0.0006) * 0.0004
    } else if (!dragging) {
      // inertia
      rotY += velY
      rotX += velX
      velY *= 0.94
      velX *= 0.94
      rotX = Math.max(-0.8, Math.min(0.8, rotX))
    }

    group.rotation.y = rotY
    group.rotation.x = rotX
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
    renderer.dispose()
  }
}

export function LogosSection() {
  const { ref, inView } = useInView<HTMLElement>(0.4)
  const inViewRef = useRef(inView)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    const cleanups = LOGOS.map((logo, i) => {
      const canvas = canvasRefs.current[i]
      if (!canvas) return () => {}
      return createLogoScene(
        canvas,
        logo.image,
        logo.metal,
        () => inViewRef.current,
      )
    })
    return () => cleanups.forEach((c) => c())
  }, [])

  return (
    <section
      id="logos"
      ref={ref}
      className="snap-section logos-section"
      aria-label="Logo design"
    >
      <header className="logos-section__header">
        <p className="section-label">
          {config.number} — {config.label}
        </p>
        <h2 className="section-title">{config.title}</h2>
        <p className="section-body">{config.body}</p>
      </header>

      <div className="logos-grid">
        {LOGOS.map((logo, i) => (
          <figure key={logo.id} className="logo-cell">
            <canvas
              ref={(el) => {
                canvasRefs.current[i] = el
              }}
              className="logo-cell__canvas"
              aria-label={`${logo.name} 3D logo — drag to rotate`}
            />
            <figcaption className="logo-cell__name">{logo.name}</figcaption>
          </figure>
        ))}
      </div>

      {/* CTA below stages so it never steals orbit gestures */}
      <div className="logos-section__footer">
        <SectionMore
          href="#contact"
          label={config.ctaLabel}
          variant={config.ctaVariant}
        />
      </div>
    </section>
  )
}
