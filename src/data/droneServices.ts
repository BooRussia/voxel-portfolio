import { asset } from '../lib/asset'

export type DroneServiceId = '360' | 'thermal' | 'rtk'

export interface DroneUseCase {
  title: string
  summary: string
  outcomes: string[]
}

export interface DroneSpec {
  label: string
  value: string
}

export interface DroneService {
  id: DroneServiceId
  number: string
  slug: string
  name: string
  shortName: string
  tagline: string
  heroLine: string
  description: string
  accent: string
  image: string
  imageAlt: string
  capability: string
  hardware: string[]
  specs: DroneSpec[]
  benefits: { title: string; body: string }[]
  useCases: DroneUseCase[]
  deliverables: string[]
  process: { step: string; title: string; body: string }[]
  idealFor: string[]
}

export const droneServices: DroneService[] = [
  {
    id: '360',
    number: '01',
    slug: '360',
    name: '360° Aerial',
    shortName: '360',
    tagline: 'Immersive capture from altitude',
    heroLine: 'Every direction. One flight.',
    description:
      'Spherical and multi-view aerial systems that turn sites into navigable experiences — not just still frames. Built for listings, facilities, events, and brand stories that need full spatial context.',
    accent: '#5b9fd4',
    image: asset('/media/drone/photo.jpg'),
    imageAlt: 'Aerial 360-degree capture over a property',
    capability: 'Spherical imaging · multi-angle orbit · web-ready panoramas',
    hardware: [
      '360° dual-lens aerial platforms',
      'Stabilized multi-gimbal rigs',
      'High-res equirectangular output',
      'Optional ground-level 360 pairing',
    ],
    specs: [
      { label: 'Field of view', value: 'Full sphere / multi-orbit' },
      { label: 'Output', value: 'Equirectangular · cube maps · stills' },
      { label: 'Delivery', value: 'Web embed · VR-ready · stills pack' },
      { label: 'Typical altitude', value: 'Site-safe VLOS profiles' },
      { label: 'Turnaround', value: '48–96 hrs for standard sites' },
    ],
    benefits: [
      {
        title: 'Context, not crops',
        body: 'Stakeholders see the full envelope of a site — approaches, neighbors, skyline, and scale — without flying back for “one more angle.”',
      },
      {
        title: 'One asset, many surfaces',
        body: 'A single capture feeds listings, websites, presentations, social, and immersive tours. Fewer shoots, more reach.',
      },
      {
        title: 'Remote walkthroughs',
        body: 'Buyers, investors, and remote teams inspect from anywhere. Reduce travel while increasing confidence before a site visit.',
      },
      {
        title: 'Brand-grade immersion',
        body: 'Orbit sequences and spherical stills elevate campaigns beyond flat stock — cinematic, interactive, and on-brand.',
      },
    ],
    useCases: [
      {
        title: 'Real estate & hospitality',
        summary:
          'Listings and resorts that sell on vibe and layout as much as square footage.',
        outcomes: [
          'Interactive aerial panorama for MLS / booking sites',
          'Orbit hero video for social and paid ads',
          'Context shots for landscape, parking, and access',
        ],
      },
      {
        title: 'Campus & facility tours',
        summary:
          'Schools, plants, and HQ campuses where orientation is half the sale.',
        outcomes: [
          'Wayfinding-ready 360 nodes for web tours',
          'Executive overview for board and investor decks',
          'Before/after documentation for expansions',
        ],
      },
      {
        title: 'Events & brand films',
        summary:
          'Festivals, openings, and product launches that need scale on camera.',
        outcomes: [
          '360 hero stills for key art and press',
          'Cinematic multi-angle b-roll packages',
          'Live-feel immersion without a full production unit',
        ],
      },
      {
        title: 'Construction progress',
        summary:
          'Owners and GCs who need spatial proof of progress, not just a drone snap.',
        outcomes: [
          'Periodic spherical archives of the full site',
          'Shareable links for off-site stakeholders',
          'Clear visual change over time',
        ],
      },
    ],
    deliverables: [
      'Equirectangular master files',
      'Web-optimized panorama embeds',
      'Optional orbit / multi-view video',
      'Still frame extracts (hero, social, print)',
      'Color-graded delivery package',
    ],
    process: [
      {
        step: '01',
        title: 'Site brief',
        body: 'Define altitude bands, restricted zones, key viewpoints, and delivery formats.',
      },
      {
        step: '02',
        title: 'Flight plan',
        body: 'VLOS-safe routes, weather windows, and capture checklist for full-sphere coverage.',
      },
      {
        step: '03',
        title: 'Capture',
        body: 'Stabilized spherical passes plus supporting stills for marketing and context.',
      },
      {
        step: '04',
        title: 'Process & deliver',
        body: 'Stitch, grade, optimize for web, and package assets for your CMS or tour player.',
      },
    ],
    idealFor: [
      'Property marketers',
      'Architects & developers',
      'Hospitality brands',
      'Universities & campuses',
      'Event producers',
    ],
  },
  {
    id: 'thermal',
    number: '02',
    slug: 'thermal',
    name: 'Thermal Imaging',
    shortName: 'Thermal',
    tagline: 'See heat. Find risk. Act early.',
    heroLine: 'Invisible problems, made visible.',
    description:
      'Radiometric thermal drones expose heat signatures that eyes and RGB cameras miss — moisture, insulation gaps, electrical hotspots, solar defects, and search-critical temperature deltas — with clear reports teams can act on.',
    accent: '#e85d04',
    image: asset('/media/drone/video.jpg'),
    imageAlt: 'Thermal aerial inspection visualization',
    capability: 'Radiometric thermal · dual RGB+IR · inspection reporting',
    hardware: [
      'Radiometric thermal payloads',
      'Dual-sensor RGB + IR platforms',
      'High-sensitivity IR for roof & solar',
      'Geo-tagged thermal stills & video',
    ],
    specs: [
      { label: 'Sensor', value: 'Radiometric thermal + RGB' },
      { label: 'Use windows', value: 'Dawn / dusk / night-capable' },
      { label: 'Output', value: 'IR video · stills · annotated reports' },
      { label: 'Analysis', value: 'Hotspot flags · temp deltas · overlays' },
      { label: 'Compliance', value: 'Site safety protocols · LOA as needed' },
    ],
    benefits: [
      {
        title: 'Find issues before failure',
        body: 'Catch roof moisture, overheating equipment, and insulation voids while they are still cheap to fix.',
      },
      {
        title: 'Safer inspections',
        body: 'Inspect roofs, lines, and industrial assets without putting people on ladders, lifts, or live equipment.',
      },
      {
        title: 'Evidence that travels',
        body: 'Annotated thermal frames and dual-sensor overlays give insurers, facilities, and engineers a shared truth set.',
      },
      {
        title: 'Faster facility coverage',
        body: 'Large roofs, solar fields, and campuses are scanned in a fraction of the time of handheld surveys.',
      },
    ],
    useCases: [
      {
        title: 'Roof & building envelope',
        summary:
          'Property managers and roofers validating moisture intrusion and heat loss.',
        outcomes: [
          'Thermal survey of full roof plane',
          'Marked anomaly map for repair crews',
          'Before/after verification after remediation',
        ],
      },
      {
        title: 'Solar PV inspection',
        summary:
          'Asset owners and EPCs hunting string faults, hot cells, and underperforming arrays.',
        outcomes: [
          'Module-level hotspot identification',
          'RGB + IR overlay packages',
          'Prioritized maintenance queue from findings',
        ],
      },
      {
        title: 'Electrical & industrial',
        summary:
          'Facilities and utilities checking substations, panels, and process heat.',
        outcomes: [
          'Safe standoff inspection of energized assets',
          'Temperature anomaly documentation',
          'Repeatable routes for condition monitoring',
        ],
      },
      {
        title: 'Search, safety & response',
        summary:
          'When heat signature is the signal — missing persons support, perimeter, wildlife (where permitted).',
        outcomes: [
          'Night-capable thermal reconnaissance',
          'Live or near-live situational awareness',
          'Archived IR footage for after-action review',
        ],
      },
    ],
    deliverables: [
      'Radiometric stills and IR video',
      'RGB dual-sensor reference frames',
      'Annotated anomaly report (PDF)',
      'Priority list of findings',
      'Optional GIS-tagged photo set',
    ],
    process: [
      {
        step: '01',
        title: 'Mission brief',
        body: 'Define asset type, access, thermal windows (sun load, weather), and reporting depth.',
      },
      {
        step: '02',
        title: 'Flight design',
        body: 'Grid or orbit patterns tuned for IR resolution, emissivity notes, and safety buffers.',
      },
      {
        step: '03',
        title: 'Capture',
        body: 'Coordinated RGB + thermal passes with consistent altitude and overlap for analysis.',
      },
      {
        step: '04',
        title: 'Analysis & report',
        body: 'Flag anomalies, annotate frames, and deliver a clear action-oriented package.',
      },
    ],
    idealFor: [
      'Facilities managers',
      'Roofing contractors',
      'Solar operators & EPCs',
      'Industrial maintenance',
      'Insurance & loss adjusters',
    ],
  },
  {
    id: 'rtk',
    number: '03',
    slug: 'rtk',
    name: 'RTK Mapping',
    shortName: 'RTK',
    tagline: 'Survey-grade aerial data',
    heroLine: 'Centimeter truth from the sky.',
    description:
      'RTK-enabled drones deliver high-accuracy orthomosaics, elevation models, and point clouds for construction, land development, agriculture, and civil work — maps you can measure, not just admire.',
    accent: '#c9a227',
    image: asset('/media/drone/photo.jpg'),
    imageAlt: 'RTK drone mapping over a development site',
    capability: 'RTK/PPK positioning · photogrammetry · survey deliverables',
    hardware: [
      'RTK / PPK multi-band platforms',
      'High-res mapping cameras',
      'Ground control optional workflows',
      'CORS / base-station supported',
    ],
    specs: [
      { label: 'Positioning', value: 'RTK / PPK centimeter-class' },
      { label: 'Products', value: 'Ortho · DSM/DTM · point cloud · contours' },
      { label: 'Formats', value: 'GeoTIFF · LAS/LAZ · DXF · PDF map books' },
      { label: 'GSD', value: 'Mission-tuned (cm/px as required)' },
      { label: 'Accuracy', value: 'Survey workflow + GCPs as specified' },
    ],
    benefits: [
      {
        title: 'Measure with confidence',
        body: 'Stockpiles, cut/fill, boundaries, and progress quantities backed by georeferenced data — not guesswork from pretty photos.',
      },
      {
        title: 'Faster than boots alone',
        body: 'Cover large parcels in hours. Update maps after every major phase without mobilizing a full traditional survey crew every time.',
      },
      {
        title: 'One dataset, many trades',
        body: 'Share orthos and models with architects, civil, GC, and owners — a single source of site truth across the project lifecycle.',
      },
      {
        title: 'Audit-ready history',
        body: 'Time-stamped flights create a living record of site conditions for claims, compliance, and as-built comparison.',
      },
    ],
    useCases: [
      {
        title: 'Construction progress mapping',
        summary:
          'GCs and owners tracking earthwork, pad readiness, and as-built conditions.',
        outcomes: [
          'Weekly/monthly orthomosaic updates',
          'Cut/fill and volume estimates',
          'Stakeholder-ready progress PDFs',
        ],
      },
      {
        title: 'Land development & civil',
        summary:
          'Developers and engineers planning roads, drainage, and lot layout.',
        outcomes: [
          'High-res base maps for design teams',
          'DSM/DTM for grading studies',
          'Contours and exportable CAD-friendly layers',
        ],
      },
      {
        title: 'Stockpile & materials',
        summary:
          'Quarries, plants, and yards reconciling inventory without walking every pile.',
        outcomes: [
          'Volume calculations with documented method',
          'Repeatable flight lines for month-over-month deltas',
          'Clear visuals for ops and finance',
        ],
      },
      {
        title: 'Agriculture & land management',
        summary:
          'Large acreage that needs accurate field maps and change detection.',
        outcomes: [
          'Georeferenced field orthos',
          'Boundary and feature extraction support',
          'Seasonal comparison datasets',
        ],
      },
    ],
    deliverables: [
      'Georeferenced orthomosaic',
      'Digital surface / terrain models',
      'Point cloud (LAS/LAZ)',
      'Contours & optional CAD exports',
      'Accuracy report / flight metadata',
    ],
    process: [
      {
        step: '01',
        title: 'Accuracy brief',
        body: 'Agree on GSD, coordinate system, GCP strategy, and required deliverable formats.',
      },
      {
        step: '02',
        title: 'Control & plan',
        body: 'RTK link or base setup, flight grid, overlap, and ground control if specified.',
      },
      {
        step: '03',
        title: 'Capture',
        body: 'Systematic mapping flight with log integrity checks and coverage validation.',
      },
      {
        step: '04',
        title: 'Process & QA',
        body: 'Photogrammetry pipeline, accuracy checks, and delivery of survey-ready products.',
      },
    ],
    idealFor: [
      'General contractors',
      'Civil engineers',
      'Land developers',
      'Quarry & materials ops',
      'Survey partners',
    ],
  },
]

export function getDroneService(slug: string): DroneService | undefined {
  return droneServices.find((s) => s.slug === slug)
}

export const droneHub = {
  eyebrow: 'Aerial systems',
  title: 'Drone Services',
  lede: 'Three mission-ready platforms. One disciplined flight practice. 360° immersion, thermal intelligence, and RTK mapping — engineered for clarity, safety, and deliverables you can use.',
  stats: [
    { value: '03', label: 'Platform classes' },
    { value: 'VLOS', label: 'Safety-first ops' },
    { value: '48h+', label: 'Typical turnaround' },
    { value: 'Full', label: 'Report packages' },
  ],
}
