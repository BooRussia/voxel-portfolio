import type { Project } from '../types/project'

/**
 * Seed portfolio. Replace cover gradients / live URLs with real media as you photograph
 * and ship work. Structure is deliberately data-driven so adding a project never means
 * redesigning the page.
 */
export const projects: Project[] = [
  {
    id: '1',
    slug: 'anchor-quoting',
    title: 'AnchorQuoting',
    client: 'AnchorQuoting',
    year: 2026,
    discipline: 'web',
    mediaKinds: ['website', 'business'],
    summary:
      'A precision quoting platform for window & door dealers — calm UI over dense configuration.',
    description:
      'Designed and built a full-stack quoting experience for window and door businesses. The product reduces cognitive load on complex configurations through progressive disclosure, smart defaults, and a persistent live total — so dealers can quote faster without sacrificing accuracy.',
    cardLabel: 'Product UI · Web app',
    cover: {
      gradient: 'linear-gradient(145deg, #1a1410 0%, #3d2e1a 40%, #c9a227 100%)',
      pattern: 'grid',
    },
    featured: true,
    featuredSize: 'hero',
    tags: ['SaaS', 'CPQ', 'Dark UI'],
    services: ['Product design', 'Frontend engineering', 'Design system'],
    outcomes: [
      'Guided quoting flow for multi-brand product catalogs',
      'Live line-item totals that update as options change',
      'Resources & help content kept in sync with real product rules',
    ],
    liveUrl: 'https://anchorquoting.com',
  },
  {
    id: '2',
    slug: 'aoa-window-solutions',
    title: 'AOA Window Solutions',
    client: 'AOA Window Solutions',
    year: 2026,
    discipline: 'web',
    mediaKinds: ['website', 'business'],
    summary:
      'Florida hurricane-impact authority site for a founder-led window & door company.',
    description:
      'A complete redesign for a regional window and door business: hurricane-impact education, brand partner pages, project gallery, service-area SEO, and a clear path to contact. Built to feel trustworthy for homeowners making a high-stakes purchase.',
    cardLabel: 'Business site · Local SEO',
    cover: {
      gradient: 'linear-gradient(160deg, #0c1a24 0%, #1a3a4a 45%, #4a8fa8 100%)',
      pattern: 'beams',
    },
    featured: true,
    featuredSize: 'wide',
    tags: ['Local business', 'Hurricane impact', 'Gallery'],
    services: ['Web design', 'Copy structure', 'SEO pages'],
    outcomes: [
      'Standalone hurricane-impact guide for organic search',
      'Filterable project gallery with lightbox',
      'LocalBusiness schema and service-area coverage',
    ],
  },
  {
    id: '3',
    slug: 'estate-spatial-tour',
    title: 'Estate Spatial Tour',
    year: 2025,
    discipline: 'spatial',
    mediaKinds: ['3d-tour', 'gaussian-splat'],
    summary:
      'Walk-through experience of a luxury residence using photogrammetry and splat capture.',
    description:
      'Combined drone orbits, interior capture, and Gaussian splat reconstruction into a browser-ready spatial tour. Visitors can move through rooms, open annotations for finishes, and share a link that loads without a native app.',
    cardLabel: '3D tour · Gaussian splat',
    cover: {
      gradient: 'linear-gradient(135deg, #0e0e14 0%, #2a2438 50%, #8b7ec8 100%)',
      pattern: 'orbit',
    },
    featured: true,
    featuredSize: 'tall',
    tags: ['Real estate', 'Immersive', 'WebGL'],
    services: ['Capture planning', 'Splat processing', 'Web player UX'],
    outcomes: [
      'Browser-native tour with progressive loading',
      'Hotspots for materials and dimensions',
      'Shareable link for agents and clients',
    ],
  },
  {
    id: '4',
    slug: 'coastal-commerce',
    title: 'Coastal Commerce',
    year: 2025,
    discipline: 'web',
    mediaKinds: ['ecommerce', 'website'],
    summary:
      'E-commerce storefront for a lifestyle brand — product story first, friction last.',
    description:
      'Designed a product-forward commerce experience with editorial merchandising, mobile-first checkout, and photography direction that keeps the brand distinct from template storefronts.',
    cardLabel: 'E-commerce · Brand',
    cover: {
      gradient: 'linear-gradient(150deg, #12100e 0%, #3a2820 40%, #d4a574 100%)',
      pattern: 'mesh',
    },
    featured: true,
    featuredSize: 'standard',
    tags: ['Shopify', 'Merchandising', 'Mobile'],
    services: ['UX design', 'Visual design', 'Conversion polish'],
    outcomes: [
      'Editorial product storytelling above the fold',
      'Thumb-friendly cart and checkout path',
      'Consistent brand system across PLP, PDP, and cart',
    ],
  },
  {
    id: '5',
    slug: 'ridge-drone-survey',
    title: 'Ridge Property Aerials',
    year: 2025,
    discipline: 'aerial',
    mediaKinds: ['drone-photo', 'drone-video'],
    summary:
      'Cinematic property package: stills, orbit video, and marketing-ready selects.',
    description:
      'Full aerial package for a hillside property listing — golden-hour stills, smooth orbit cinematography, and vertical cuts for social. Delivered as a curated set ready for web, MLS, and ads.',
    cardLabel: 'Drone photo · Video',
    cover: {
      gradient: 'linear-gradient(170deg, #0a1210 0%, #1a3028 45%, #5a9e7a 100%)',
      pattern: 'rings',
    },
    featured: true,
    featuredSize: 'standard',
    tags: ['Real estate', 'Cinematography', 'Social cuts'],
    services: ['Flight planning', 'Color grade', 'Edit package'],
    outcomes: [
      'Hero stills optimized for listing sites',
      '15s and 45s cinematic cuts',
      'Vertical crops for Reels / Stories',
    ],
  },
  {
    id: '6',
    slug: 'voxel-mark-system',
    title: 'Voxel Mark System',
    client: 'Voxel Design',
    year: 2025,
    discipline: 'craft',
    mediaKinds: ['logo'],
    summary:
      'Geometric identity: hex vessel, gold V, and a mark that holds from favicon to signage.',
    description:
      'Crafted a durable logo system around a hexagonal vessel and a precise V form. The mark works in gold on black, single-color reverse, and tiny digital sizes without losing structure.',
    cardLabel: 'Logo · Identity',
    cover: {
      gradient: 'linear-gradient(145deg, #0a0a0a 0%, #1a1608 40%, #c9a227 95%)',
      pattern: 'shards',
    },
    featured: true,
    featuredSize: 'standard',
    tags: ['Brand', 'Wordmark', 'Guidelines'],
    services: ['Logo design', 'Brand marks', 'Usage rules'],
    outcomes: [
      'Primary mark + simplified monogram',
      'Clear space and minimum size rules',
      'Light / dark application set',
    ],
  },
  {
    id: '7',
    slug: 'product-config-3d',
    title: 'Product Configurator Model',
    year: 2025,
    discipline: 'spatial',
    mediaKinds: ['3d-model'],
    summary:
      'Real-time 3D product model with material swaps for a hardware catalog.',
    description:
      'Built a lightweight, web-ready 3D model pipeline for a product line — clean topology, PBR materials, and UI hooks for finish selection so customers can configure before they buy.',
    cardLabel: '3D model · Configurator',
    cover: {
      gradient: 'linear-gradient(140deg, #101018 0%, #1e2438 50%, #6a8cbf 100%)',
      pattern: 'grid',
    },
    tags: ['WebGL', 'PBR', 'Catalog'],
    services: ['Modeling', 'Material setup', 'Web integration'],
    outcomes: [
      'Sub-second material swaps in-browser',
      'Optimized LODs for mobile GPUs',
      'Consistent lighting across SKUs',
    ],
  },
  {
    id: '8',
    slug: 'studio-portfolio-site',
    title: 'Studio Portfolio Framework',
    year: 2025,
    discipline: 'web',
    mediaKinds: ['portfolio', 'website'],
    summary:
      'A calm, filter-first portfolio architecture for multi-discipline studios.',
    description:
      'Designed a navigation model that holds many media types without overwhelming visitors: four disciplines, progressive filters, and case studies that lead with outcome, not decoration.',
    cardLabel: 'Portfolio site · IA',
    cover: {
      gradient: 'linear-gradient(155deg, #0c0c10 0%, #222028 50%, #a09080 100%)',
      pattern: 'mesh',
    },
    tags: ['IA', 'Editorial', 'Responsive'],
    services: ['Information architecture', 'Visual design', 'Frontend'],
    outcomes: [
      'Four-pillar discipline model',
      'Featured bento + archive grid',
      'Accessible, keyboard-first filters',
    ],
  },
  {
    id: '9',
    slug: 'prototype-print-series',
    title: 'Prototype Print Series',
    year: 2024,
    discipline: 'craft',
    mediaKinds: ['3d-print'],
    summary:
      'Functional prototypes and presentation pieces printed for client reviews.',
    description:
      'Rapid 3D-printed mockups for form studies and client presentations — from small fixture details to scaled architectural elements. Finish work included sanding, paint, and photographic presentation.',
    cardLabel: '3D print · Prototype',
    cover: {
      gradient: 'linear-gradient(160deg, #121210 0%, #2a2820 45%, #8a8070 100%)',
      pattern: 'beams',
    },
    tags: ['FDM', 'SLA', 'Presentation'],
    services: ['CAD prep', 'Print & finish', 'Photo set'],
    outcomes: [
      'Same-week turnaround on form studies',
      'Client-ready finish samples',
      'Photo package for pitch decks',
    ],
  },
  {
    id: '10',
    slug: 'harbor-gaussian-scan',
    title: 'Harbor Gaussian Scan',
    year: 2024,
    discipline: 'spatial',
    mediaKinds: ['gaussian-splat', 'drone-photo'],
    summary:
      'Outdoor splat of a waterfront site combining aerial and ground capture.',
    description:
      'Multi-pass capture of a harbor-side site fused into a navigable Gaussian splat. Used for remote stakeholder walkthroughs before construction planning sessions.',
    cardLabel: 'Gaussian splat · Site',
    cover: {
      gradient: 'linear-gradient(135deg, #0a1018 0%, #142838 50%, #3a7a9a 100%)',
      pattern: 'orbit',
    },
    tags: ['Site survey', 'Stakeholders', 'Web viewer'],
    services: ['Multi-pass capture', 'Splat fusion', 'Viewer embed'],
    outcomes: [
      'Remote walkthrough without travel',
      'Annotated viewpoints for the design team',
      'Exportable stills for documentation',
    ],
  },
  {
    id: '11',
    slug: 'trail-cinematic-reel',
    title: 'Trail Cinematic Reel',
    year: 2024,
    discipline: 'aerial',
    mediaKinds: ['drone-video'],
    summary:
      'Short-form aerial film for a hospitality brand’s seasonal campaign.',
    description:
      'A tightly edited aerial reel emphasizing motion, terrain texture, and golden-hour light. Delivered master, social crops, and still frames pulled from peak moments.',
    cardLabel: 'Drone video · Campaign',
    cover: {
      gradient: 'linear-gradient(150deg, #100c0a 0%, #3a2818 45%, #c47840 100%)',
      pattern: 'rings',
    },
    tags: ['Hospitality', 'Campaign', 'Color'],
    services: ['Aerial direction', 'Edit', 'Color'],
    outcomes: [
      '60s hero reel + 15s cutdowns',
      'Matched grade across stills and motion',
      'Platform-ready aspect ratios',
    ],
  },
  {
    id: '12',
    slug: 'monogram-lockups',
    title: 'Monogram Lockup Set',
    year: 2024,
    discipline: 'craft',
    mediaKinds: ['logo'],
    summary:
      'Secondary monograms and lockups for a multi-brand family of companies.',
    description:
      'Extended a primary identity into a family of monograms that stay related without becoming interchangeable — useful for sub-brands, app icons, and embroidery.',
    cardLabel: 'Logo · Lockups',
    cover: {
      gradient: 'linear-gradient(145deg, #0e0e12 0%, #1c1a24 50%, #b8a060 100%)',
      pattern: 'shards',
    },
    tags: ['Sub-brands', 'Icon', 'Print'],
    services: ['Monogram design', 'Lockup system', 'Export pack'],
    outcomes: [
      'Icon-safe monograms at 16px',
      'Horizontal and stacked lockups',
      'Print and embroidery files',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectsByDiscipline(discipline: string | null): Project[] {
  if (!discipline || discipline === 'all') return projects
  return projects.filter((p) => p.discipline === discipline)
}
