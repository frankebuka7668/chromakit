export type ShowcasePageId =
  | 'page-1-leica-mono'
  | 'page-2-guardbase-veyra'
  | 'page-3-motto-tennis'
  | 'page-4-olipop-zest'
  | 'page-5-kontour-arca';

export interface ShowcasePageConfig {
  id: ShowcasePageId;
  number: string;
  title: string;
  industry: string;
  subtitle: string;
  staticUrl: string;
  defaultPaletteId: string;
  recommendedPaletteIds: string[];
}

export const SHOWCASE_PAGES: ShowcasePageConfig[] = [
  {
    id: 'page-1-leica-mono',
    number: '01',
    title: 'Leica & Mono Flagship',
    industry: 'Optical & Acoustic Hardware',
    subtitle: 'Interactive Rangefinder, Direct-Drive Turntable & Technical Spec Bench',
    staticUrl: '/pages/01-leica-mono-hardware.html',
    defaultPaletteId: 'leica-look-closer',
    recommendedPaletteIds: [
      'leica-look-closer',
      'mono-porcelain-carbon-ultramarine',
      'solar-pool-cocoa-yellow',
      'afterhour-forest-coral'
    ]
  },
  {
    id: 'page-2-guardbase-veyra',
    number: '02',
    title: 'Guardbase AI Security',
    industry: 'Developer SaaS & Runtime Firewall',
    subtitle: 'Live Prompt-Injection Simulator, ASCII Telemetry & Multi-Language SDKs',
    staticUrl: '/pages/02-guardbase-ai-security.html',
    defaultPaletteId: 'guardbase-security',
    recommendedPaletteIds: [
      'guardbase-security',
      'veyra-tech-brand',
      'nightline-sapphire-jade',
      'prism-teal-navy-crimson',
      'good-company-sky-vermilion'
    ]
  },
  {
    id: 'page-3-motto-tennis',
    number: '03',
    title: 'Motto M-01 Mobility',
    industry: 'Electric Vehicles & Urban Cruiser',
    subtitle: 'Interactive Cruiser Customizer, Commute Range Calculator & City Hub Booking',
    staticUrl: '/pages/03-motto-electric-mobility.html',
    defaultPaletteId: 'motto-almond-petrol-violet',
    recommendedPaletteIds: [
      'motto-almond-petrol-violet',
      'mark-tennis-club',
      'atelier-law-firm',
      'oriel-skincare'
    ]
  },
  {
    id: 'page-4-olipop-zest',
    number: '04',
    title: 'Olipop & Zest Beverage',
    industry: 'Consumer D2C & Functional Drink',
    subtitle: 'Flavor Lab, 12-Can Custom Box Builder & Botanical Ingredient Explorer',
    staticUrl: '/pages/04-olipop-zest-beverage.html',
    defaultPaletteId: 'olipop-sip-happy',
    recommendedPaletteIds: [
      'olipop-sip-happy',
      'zest-mandarin-forest',
      'bonbon-violet-cream-cherry',
      'dotto-apricot-mulberry-mint',
      'little-crumb-cafe',
      'offscript-red-acid'
    ]
  },
  {
    id: 'page-5-kontour-arca',
    number: '05',
    title: 'Kontour & Arca Studio',
    industry: 'Architectural Lighting & Industrial Design',
    subtitle: 'Kelvin Light Lab, Photometric Case Studies & Material Swatch Dossier',
    staticUrl: '/pages/05-kontour-arca-studio.html',
    defaultPaletteId: 'kontour-system',
    recommendedPaletteIds: [
      'kontour-system',
      'arca-salt-olive-hibiscus',
      'cairn-story-system',
      'vix-functional-system',
      'forma-onyx-indigo-mint'
    ]
  }
];
