import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Minus,
  Plus,
  Sun
} from 'lucide-react';
import {
  ColorPalette,
  EXTRACTED_PALETTES,
  getContrastRatio,
  getReadableTextColor,
  getWcagRating
} from '../data/palettes';

export type ShowcasePageId =
  | 'page-1-leica-mono'
  | 'page-2-guardbase-veyra'
  | 'page-3-motto-tennis'
  | 'page-4-olipop-zest'
  | 'page-5-kontour-arca';

interface ShowcasePageConfig {
  id: ShowcasePageId;
  number: string;
  title: string;
  subtitle: string;
  defaultPaletteId: string;
  recommendedPaletteIds: string[];
}

export const SHOWCASE_PAGES: ShowcasePageConfig[] = [
  {
    id: 'page-1-leica-mono',
    number: '01',
    title: 'Leica & Mono Optical/Audio Flagship',
    subtitle: 'Precision Hardware Template · Ice Blue, Midnight Ink & Vermilion',
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
    title: 'Guardbase AI Security & ASCII Cloud',
    subtitle: 'Developer SaaS & Telemetry · Paper White, Ink Black & Cornflower Blue',
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
    title: 'Motto M-01 Electric Mobility & Club',
    subtitle: 'Urban Cruiser Configurator · Almond Cream, Petrol Teal & Electric Violet',
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
    title: 'Olipop & Zest Botanical Beverage Bar',
    subtitle: 'Playful Consumer Template · Lemon Yellow, Cobalt Blue & Hot Pink',
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
    title: 'Kontour & Arca Architectural Studio',
    subtitle: 'Editorial Design & Lighting · Jet Black, Soft White & Flame Orange',
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

interface ShowcasePagesViewProps {
  onCopyText: (text: string, label: string) => void;
  onNavigateToRepo: (paletteId: string) => void;
}

export const ShowcasePagesView: React.FC<ShowcasePagesViewProps> = ({
  onCopyText,
  onNavigateToRepo
}) => {
  const [activePageId, setActivePageId] = useState<ShowcasePageId>('page-1-leica-mono');
  const [pagePaletteOverrides, setPagePaletteOverrides] = useState<Record<ShowcasePageId, string>>({
    'page-1-leica-mono': 'leica-look-closer',
    'page-2-guardbase-veyra': 'guardbase-security',
    'page-3-motto-tennis': 'motto-almond-petrol-violet',
    'page-4-olipop-zest': 'olipop-sip-happy',
    'page-5-kontour-arca': 'kontour-system'
  });

  // Page 1: Leica/Mono Open-Source Hardware Spec & Token Bundle
  const [selectedLens, setSelectedLens] = useState<'35mm' | '50mm' | '28mm'>('35mm');
  const [frameLineBright, setFrameLineBright] = useState(true);
  const [bundleCount, setBundleCount] = useState(1);
  const [specClaimedP1, setSpecClaimedP1] = useState(false);

  // Page 2: Guardbase AI Security Console
  const [telemetryRange, setTelemetryRange] = useState<'24H' | '7D' | '30D' | '12M'>('12M');
  const [selectedTraceIndex, setSelectedTraceIndex] = useState(0);
  const [cliCopied, setCliCopied] = useState(false);

  // Page 3: Motto M-01 Electric Cruiser Configurator
  const [batteryTier, setBatteryTier] = useState<'single' | 'twin'>('twin');
  const [rideCity, setRideCity] = useState('Milan');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Page 4: Olipop / Zest Open Flavor Token Pack Builder
  const [boxCounts, setBoxCounts] = useState<Record<string, number>>({
    'Strawberry Vanilla': 4,
    'Blood Orange Zest': 4,
    'Sour Cherry Crisp': 4
  });
  const [includeAgentRules, setIncludeAgentRules] = useState(true);
  const [boxAdded, setBoxAdded] = useState(false);

  // Page 5: Kontour / Arca Architectural Luminaire Studio
  const [lampDimmer, setLampDimmer] = useState(85);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const currentPageConfig =
    SHOWCASE_PAGES.find((p) => p.id === activePageId) ?? SHOWCASE_PAGES[0];

  const currentPaletteId =
    pagePaletteOverrides[activePageId] ?? currentPageConfig.defaultPaletteId;

  const palette: ColorPalette =
    EXTRACTED_PALETTES.find((p) => p.id === currentPaletteId) ??
    EXTRACTED_PALETTES[0];

  const bg = palette.colors.find((c) => c.role === 'background') ?? palette.colors[0];
  const surface = palette.colors.find((c) => c.role === 'surface') ?? palette.colors[1];
  const action = palette.colors.find((c) => c.role === 'action') ?? palette.colors[2];

  const actionTextColor = getReadableTextColor(action.hex);
  const contrastRatio = getContrastRatio(bg.hex, surface.hex);

  const handleSelectPage = (pageId: ShowcasePageId) => {
    setActivePageId(pageId);
  };

  const handleChangePagePalette = (paletteId: string) => {
    setPagePaletteOverrides((prev) => ({
      ...prev,
      [activePageId]: paletteId
    }));
  };

  const totalCans = Object.values(boxCounts).reduce((sum, n) => sum + n, 0);

  return (
    <div className="space-y-6">
      {/* 5-Page Selector Dock + Active Color Combination Switcher */}
      <div className="rounded-2xl border border-[#F4F1EA]/10 bg-[#16161A] p-2">
        <div className="rounded-lg bg-[#0E0E10] p-4 lg:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4F1EA]/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9A9890] font-mono tabular-nums">
                <span>5 FREE OPEN-SOURCE WEB PAGES (MIT)</span>
                <span aria-hidden="true">·</span>
                <span>60-30-10 COLOR ARCHITECTURE</span>
                <span aria-hidden="true">·</span>
                <span>CONTRAST {contrastRatio}:1 ({getWcagRating(contrastRatio)})</span>
              </div>
              <h2 className="mt-1 text-xl font-display font-semibold text-[#F4F1EA]">
                100% Free Multi-Page Templates for Developers &amp; AI Coding Agents
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopyText(
                    `/* ${currentPageConfig.title} — ${palette.name} (Free MIT Open Source) */\n:root {\n  --bg-60: ${bg.hex}; /* ${bg.name} */\n  --surface-30: ${surface.hex}; /* ${surface.name} */\n  --action-10: ${action.hex}; /* ${action.name} */\n}`,
                    `${palette.name} page tokens`
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-[#16161A] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Page CSS Tokens
              </button>
              <button
                type="button"
                onClick={() => onNavigateToRepo(palette.id)}
                className="px-3.5 py-2 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              >
                Push / Export to GitHub →
              </button>
            </div>
          </div>

          {/* 5 Web Page Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {SHOWCASE_PAGES.map((pg) => {
              const isCurrent = pg.id === activePageId;
              const pgPalId = pagePaletteOverrides[pg.id] ?? pg.defaultPaletteId;
              const pgPal =
                EXTRACTED_PALETTES.find((p) => p.id === pgPalId) ?? EXTRACTED_PALETTES[0];
              return (
                <button
                  key={pg.id}
                  type="button"
                  onClick={() => handleSelectPage(pg.id)}
                  className={`text-left rounded-xl p-3 border transition-colors flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#16161A] border-[#FF4D1F] text-[#F4F1EA]'
                      : 'bg-[#16161A]/50 border-[#F4F1EA]/10 text-[#9A9890] hover:border-[#F4F1EA]/30 hover:text-[#F4F1EA]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#F4F1EA]">
                        Page {pg.number} · Free
                      </span>
                      <div className="flex items-center gap-1">
                        {pgPal.colors.slice(0, 3).map((c) => (
                          <span
                            key={c.role + c.hex}
                            className="w-3 h-3 rounded-xs border border-white/20"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-1.5 text-xs font-display font-semibold text-[#F4F1EA] truncate">
                      {pg.title}
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-[#9A9890] truncate">
                    {pgPal.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Palette Switcher for Current Page */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F4F1EA]/10 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#9A9890] font-mono">Recommended Palettes for Page {currentPageConfig.number}:</span>
              {currentPageConfig.recommendedPaletteIds.map((recId) => {
                const recPal = EXTRACTED_PALETTES.find((p) => p.id === recId);
                if (!recPal) return null;
                const isSelected = recPal.id === palette.id;
                return (
                  <button
                    key={recId}
                    type="button"
                    onClick={() => handleChangePagePalette(recId)}
                    className={`px-2.5 py-1 rounded-md font-mono text-xs flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#F4F1EA] text-[#0E0E10] border-[#F4F1EA] font-semibold'
                        : 'bg-[#16161A] text-[#F4F1EA] border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-xs border border-black/20"
                      style={{ backgroundColor: recPal.colors[2]?.hex ?? recPal.colors[0].hex }}
                    />
                    <span>{recPal.brandName}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="all-palette-select" className="text-[#9A9890] font-mono">
                Or test any of 24 palettes:
              </label>
              <select
                id="all-palette-select"
                value={palette.id}
                onChange={(e) => handleChangePagePalette(e.target.value)}
                className="rounded-md bg-[#16161A] border border-[#F4F1EA]/20 px-2.5 py-1 text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#FF4D1F]"
              >
                {EXTRACTED_PALETTES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.creator})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          WEB PAGE 01: LEICA / MONO — PRECISION OPTICAL & AUDIO HARDWARE TEMPLATE
         ===================================================================== */}
      {activePageId === 'page-1-leica-mono' && (
        <article
          className="rounded-2xl border border-white/10 overflow-hidden transition-colors duration-200"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Page 1 Top Navigation Bar (Strict 3-Zone Top Bar Contract) */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p1-optics" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Rangefinder System</a>
              <a href="#p1-lenses" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Apochromatic Lenses</a>
              <a href="#p1-collection" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Reference Series</a>
              <a href="#p1-specs" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Open Spec Sheet</a>
            </nav>
            <button
              type="button"
              onClick={() => {
                setSpecClaimedP1(true);
                onCopyText(
                  `--bg: ${bg.hex}; --surface: ${surface.hex}; --action: ${action.hex};`,
                  `${palette.name} tokens`
                );
              }}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Free Spec Kit ({bundleCount})</span>
            </button>
          </header>

          {/* Page 1 Hero + Open Specification Module */}
          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Cols: Interactive Rangefinder / Optical Hardware Viewport */}
              <div
                className="lg:col-span-7 rounded-2xl p-2 border flex flex-col justify-between"
                style={{
                  borderColor: `${surface.hex}25`,
                  backgroundColor: `${surface.hex}08`
                }}
              >
                <div
                  className="rounded-lg p-6 lg:p-10 h-full flex flex-col justify-between relative overflow-hidden"
                  style={{
                    backgroundColor: `${surface.hex}12`,
                    color: surface.hex
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono opacity-80">
                    <span>OPTICAL SPECIMEN · Wetzlar Brass &amp; Magnesium</span>
                    <span className="tabular-nums">60MP BSI CMOS · {selectedLens}</span>
                  </div>

                  {/* Interactive Camera / Optical Rangefinder Vector Schematic */}
                  <div className="my-8 flex flex-col items-center justify-center">
                    <div
                      className="w-full max-w-md rounded-2xl p-6 border relative shadow-sm"
                      style={{
                        backgroundColor: surface.hex,
                        color: bg.hex,
                        borderColor: `${bg.hex}30`
                      }}
                    >
                      {/* Iconic Vermilion Red Dot Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-display font-bold"
                            style={{ backgroundColor: action.hex, color: actionTextColor }}
                          >
                            M
                          </span>
                          <span className="font-mono text-xs tracking-widest uppercase">
                            M11-P OPEN CAD
                          </span>
                        </div>
                        <div
                          className="px-2.5 py-1 rounded border text-[11px] font-mono tabular-nums"
                          style={{ borderColor: `${bg.hex}40` }}
                        >
                          ISO 64 · 1/1000s
                        </div>
                      </div>

                      {/* Concentric Machined Lens Barrel */}
                      <div className="my-4 flex justify-center">
                        <div
                          className="w-40 h-40 rounded-full border-4 flex items-center justify-center relative"
                          style={{ borderColor: `${bg.hex}40` }}
                        >
                          <div
                            className="w-28 h-28 rounded-full border-2 flex items-center justify-center"
                            style={{
                              borderColor: frameLineBright ? action.hex : `${bg.hex}35`
                            }}
                          >
                            <div
                              className="w-16 h-16 rounded-full flex flex-col items-center justify-center font-mono text-[11px] tabular-nums"
                              style={{
                                backgroundColor: `${bg.hex}18`,
                                color: bg.hex
                              }}
                            >
                              <span className="font-bold">{selectedLens}</span>
                              <span className="text-[10px] opacity-75">f/1.4 ASPH</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono opacity-80 pt-3 border-t" style={{ borderColor: `${bg.hex}20` }}>
                        <span>SAPPHIRE CRYSTAL VIEWPORT</span>
                        <span>FREE MIT TEMPLATE</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Viewfinder Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: `${surface.hex}20` }}>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span>Focal Frame Lines:</span>
                      {(['28mm', '35mm', '50mm'] as const).map((lens) => (
                        <button
                          key={lens}
                          type="button"
                          onClick={() => setSelectedLens(lens)}
                          style={{
                            backgroundColor: selectedLens === lens ? action.hex : 'transparent',
                            color: selectedLens === lens ? actionTextColor : surface.hex,
                            borderColor: `${surface.hex}35`
                          }}
                          className="px-2.5 py-1 rounded border text-xs font-mono tabular-nums transition-colors"
                        >
                          {lens}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setFrameLineBright((prev) => !prev)}
                      className="text-xs font-mono underline underline-offset-4"
                    >
                      {frameLineBright ? 'Reticle Illumination: ON' : 'Reticle Illumination: OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Open-Source Specification & Token Module (Zero Prices) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-75">
                    OPEN HARDWARE UI · 60% {bg.name.toUpperCase()} / 30% {surface.name.toUpperCase()} / 10% {action.name.toUpperCase()}
                  </div>
                  <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-sm sm:text-base opacity-85 leading-relaxed">
                    {palette.subcopy}
                  </p>

                  <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: `${surface.hex}20` }}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-mono opacity-75">LICENSE &amp; ACCESS</span>
                      <span className="text-2xl font-display font-bold font-mono tabular-nums">
                        FREE · MIT OPEN SOURCE
                      </span>
                    </div>

                    <div className="text-xs font-mono opacity-80 space-y-1.5">
                      <div>· 60% Canvas: {bg.name} ({bg.hex})</div>
                      <div>· 30% Surface/Text: {surface.name} ({surface.hex})</div>
                      <div>· 10% Focal Action: {action.name} ({action.hex}) · {selectedLens} Profile</div>
                    </div>
                  </div>
                </div>

                {/* Primary Action (Spend the 10% action colour once) */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex items-center rounded-lg border px-2 py-2"
                      style={{ borderColor: `${surface.hex}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => setBundleCount((c) => Math.max(1, c - 1))}
                        className="p-1 hover:opacity-70"
                        aria-label="Decrease count"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-mono text-sm font-semibold tabular-nums">
                        {bundleCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setBundleCount((c) => c + 1)}
                        className="p-1 hover:opacity-70"
                        aria-label="Increase count"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSpecClaimedP1(true);
                        onCopyText(
                          `--bg-60: ${bg.hex}; --surface-30: ${surface.hex}; --action-10: ${action.hex};`,
                          `${palette.name} CSS tokens`
                        );
                      }}
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                      className="flex-1 py-3.5 px-6 rounded-lg text-sm font-semibold transition-transform active:scale-[0.99] whitespace-nowrap shrink-0"
                    >
                      {specClaimedP1
                        ? `Copied ${palette.brandName} Spec (${selectedLens}) ✓`
                        : `Copy Free ${palette.brandName} Token Kit`}
                    </button>
                  </div>

                  {specClaimedP1 && (
                    <div
                      className="rounded-lg p-3 text-xs font-mono border"
                      style={{
                        borderColor: action.hex,
                        backgroundColor: `${surface.hex}0D`
                      }}
                    >
                      Open-source {palette.name} tokens copied to clipboard. Ready for immediate use in any repository or AI agent prompt.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: 3-Column Featured Hardware UI Components Grid (Free Open-Source Specs) */}
            <section id="p1-collection" className="space-y-6 pt-8 border-t" style={{ borderColor: `${surface.hex}20` }}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">01. OPEN-SOURCE HARDWARE COMPONENT MODULES</div>
                  <h2 className="mt-1 text-2xl font-display font-bold">
                    Engineered for optical and acoustic permanence.
                  </h2>
                </div>
                <span className="text-xs font-mono opacity-75 tabular-nums">
                  3 Free Component Blueprints · MIT License
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    category: 'RANGEFINDER MODULE',
                    name: 'M11-P Matte Black Viewport',
                    spec: 'Brass top plate · Content Credentials CAI',
                    meta: 'Free Blueprint · 60-30-10'
                  },
                  {
                    category: 'APOCHROMATIC OPTIC',
                    name: 'APO-Summicron-M 35 f/2',
                    spec: '3 aspherical surfaces · 0.3m close focus',
                    meta: 'Free Blueprint · WCAG AAA'
                  },
                  {
                    category: 'REFERENCE TURNTABLE',
                    name: 'Mono Direct-Drive M1',
                    spec: 'Solid billet aluminum plinth · Optical strobe',
                    meta: 'Free Blueprint · Tabular Nums'
                  }
                ].map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl p-2 border transition-transform hover:-translate-y-0.5 flex flex-col justify-between"
                    style={{
                      borderColor: `${surface.hex}22`,
                      backgroundColor: `${surface.hex}08`
                    }}
                  >
                    <div
                      className="rounded-lg p-6 h-44 flex flex-col justify-between"
                      style={{ backgroundColor: surface.hex, color: bg.hex }}
                    >
                      <span className="text-[11px] font-mono opacity-75">{item.category}</span>
                      <div className="my-auto flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                          style={{ borderColor: action.hex }}
                        >
                          10%
                        </div>
                      </div>
                      <span className="text-xs font-mono opacity-80">{item.spec}</span>
                    </div>

                    <div className="p-4 flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        <div className="text-xs font-mono tabular-nums opacity-80 mt-0.5">
                          {item.meta}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setBundleCount((c) => c + 1);
                          onCopyText(item.name, item.name);
                        }}
                        style={{ borderColor: `${surface.hex}35` }}
                        className="px-3 py-1.5 rounded-lg border text-xs font-medium hover:opacity-80 whitespace-nowrap shrink-0"
                      >
                        Copy Spec
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      )}

      {/* =====================================================================
          WEB PAGE 02: GUARDBASE / VEYRA — AI SECURITY & ASCII INFRASTRUCTURE SAAS
         ===================================================================== */}
      {activePageId === 'page-2-guardbase-veyra' && (
        <article
          className="rounded-2xl border border-white/10 overflow-hidden transition-colors duration-200"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Page 2 Top Bar (Strict 3-Zone Top Bar Contract) */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}18` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p2-guardrails" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Runtime Guardrails</a>
              <a href="#p2-telemetry" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Trace Telemetry</a>
              <a href="#p2-editions" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Open Editions</a>
              <a href="#p2-docs" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Docs</a>
            </nav>
            <button
              type="button"
              onClick={() => {
                setCliCopied(true);
                onCopyText('curl -fsSL https://guardbase.dev/install.sh | sh', 'Guardbase CLI installer');
                window.setTimeout(() => setCliCopied(false), 1500);
              }}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              {cliCopied ? 'CLI Copied ✓' : 'Watch Demo'}
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Hero Section with Cornflower Blue Highlight & ASCII Mountain Art */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-mono opacity-75">
                  ZERO-TRUST AGENT FIREWALL · 100% FREE &amp; OPEN-SOURCE
                </div>
                <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                  AI{' '}
                  <span style={{ color: action.hex }}>deserves</span>{' '}
                  the same security{' '}
                  <span style={{ color: action.hex }}>as software.</span>
                </h1>
                <p className="text-base sm:text-lg opacity-85 max-w-xl leading-relaxed">
                  Monitor how autonomous agents behave, intercept prompt-injection payloads at the tool boundary, and enforce deterministic execution policies in under 4ms.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCliCopied(true);
                      onCopyText('npx @guardbase/sdk init', 'Guardbase SDK command');
                      window.setTimeout(() => setCliCopied(false), 1500);
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>{cliCopied ? 'SDK Command Copied ✓' : 'Deploy Free Guardrails'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <code
                    className="px-4 py-3 rounded-lg text-xs font-mono border select-all"
                    style={{
                      borderColor: `${surface.hex}25`,
                      backgroundColor: `${surface.hex}08`
                    }}
                  >
                    $ curl -fsSL guardbase.sh/install | sh
                  </code>
                </div>
              </div>

              {/* Right 5 Cols: Algorithmic ASCII Mountain & Pixel Shader in 10% Action Color */}
              <div
                className="lg:col-span-5 rounded-2xl p-2 border"
                style={{
                  borderColor: `${surface.hex}22`,
                  backgroundColor: `${surface.hex}06`
                }}
              >
                <div
                  className="rounded-lg p-5 font-mono text-[11px] leading-[1.15] overflow-hidden select-none"
                  style={{
                    backgroundColor: `${action.hex}12`,
                    color: action.hex
                  }}
                >
                  <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b" style={{ borderColor: `${action.hex}30`, color: surface.hex }}>
                    <span>ASCII_TERRAIN_SHADER.SH</span>
                    <span className="tabular-nums">LATENCY: 3.2ms</span>
                  </div>
                  <pre className="overflow-x-hidden font-mono text-[10px] sm:text-[11px] leading-tight">
{`                  /\\
                 /**\\          /\\
                /****\\   /\\   /##\\
               /******\\ /**\\ /####\\
        /\\    /********\\****/######\\
       /**\\  /**********************\\
      /****\\/************************\\
     /********************************\\
    /..::**************************::..\\
   /....::::********************::::....\\
  /.......::::::************::::::.......\\
 /..........::::::::****::::::::..........\\`}
                  </pre>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs tabular-nums" style={{ borderColor: `${action.hex}30`, color: surface.hex }}>
                    <span>99.989% Threat Interception</span>
                    <span>{action.name} ({action.hex})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Trace Telemetry & Unslop Rule #8/#18 (Tabular Nums) */}
            <section id="p2-telemetry" className="space-y-6 pt-8 border-t" style={{ borderColor: `${surface.hex}18` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">01. LIVE PRODUCTION TRACE INSPECTOR</div>
                  <h2 className="mt-1 text-2xl font-display font-bold">
                    Every tool call checkpointed and verified before execution.
                  </h2>
                </div>

                {/* Segmented Time Filter */}
                <div
                  className="inline-flex rounded-lg p-1 border"
                  style={{ borderColor: `${surface.hex}25`, backgroundColor: `${surface.hex}08` }}
                >
                  {(['24H', '7D', '30D', '12M'] as const).map((rng) => (
                    <button
                      key={rng}
                      type="button"
                      onClick={() => setTelemetryRange(rng)}
                      style={{
                        backgroundColor: telemetryRange === rng ? action.hex : 'transparent',
                        color: telemetryRange === rng ? actionTextColor : surface.hex
                      }}
                      className="px-3 py-1 rounded-md text-xs font-mono font-semibold tabular-nums transition-colors"
                    >
                      {rng}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: `Evaluated Tool Calls (${telemetryRange})`,
                    value: telemetryRange === '12M' ? '14,892,410' : telemetryRange === '30D' ? '1,240,880' : '42,881',
                    delta: '+21.5% verified nominal'
                  },
                  {
                    label: 'Blocked Exfiltration Attempts',
                    value: telemetryRange === '12M' ? '3,412' : '284',
                    delta: '0 false-positive rollbacks'
                  },
                  {
                    label: 'P99 Policy Gate Overhead',
                    value: '3.42 ms',
                    delta: 'Inline WASM sandbox'
                  }
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    onClick={() => setSelectedTraceIndex(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedTraceIndex(i);
                    }}
                    className="rounded-xl p-5 border cursor-pointer transition-colors"
                    style={{
                      borderColor: selectedTraceIndex === i ? action.hex : `${surface.hex}20`,
                      backgroundColor: `${surface.hex}06`
                    }}
                  >
                    <div className="text-xs opacity-75">{stat.label}</div>
                    <div className="mt-2 text-3xl font-display font-bold font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs font-mono opacity-80">{stat.delta}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Open-Source Distributions Section — 100% Free for Developers & Agents */}
            <section id="p2-editions" className="space-y-6 pt-8 border-t" style={{ borderColor: `${surface.hex}18` }}>
              <div className="max-w-xl">
                <div className="text-xs font-mono opacity-75">02. 100% FREE &amp; OPEN-SOURCE DISTRIBUTIONS</div>
                <h2 className="mt-1 text-3xl font-display font-bold text-balance">
                  Open tooling that scales with your agents and developers.
                </h2>
                <p className="mt-2 text-sm opacity-80">
                  Free forever under the MIT license. Zero paywalls, zero subscriptions—built for the entire developer and AI coding agent community.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {/* Primary Edition (10% Action CTA) */}
                <div
                  className="rounded-2xl p-6 border flex flex-col justify-between"
                  style={{
                    borderColor: action.hex,
                    backgroundColor: `${surface.hex}08`
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">AI Coding Agent Skill</h3>
                      <span className="text-xs font-mono opacity-75">For Claude Code, Cursor &amp; Windsurf</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2 font-mono tabular-nums">
                      <span className="text-3xl font-bold">Free</span>
                      <span className="text-xs opacity-75">· MIT Open Source</span>
                    </div>
                    <ul className="mt-6 space-y-2.5 text-xs opacity-90">
                      <li>· Drop-in SKILL.md, CLAUDE.md, and .cursorrules</li>
                      <li>· Enforces 60-30-10 split and single-action CTA rule</li>
                      <li>· Includes all 20 UI Unslop directives automatically</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToRepo(palette.id)}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="mt-8 w-full py-3 rounded-lg text-xs font-semibold"
                  >
                    Get Free Agent Skill Files
                  </button>
                </div>

                {/* Secondary Edition (Quiet 30% Surface CTA — Rule #10) */}
                <div
                  className="rounded-2xl p-6 border flex flex-col justify-between"
                  style={{
                    borderColor: `${surface.hex}22`,
                    backgroundColor: `${surface.hex}04`
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Developer Token SDK</h3>
                      <span className="text-xs font-mono opacity-75">For React, Vite &amp; Tailwind v4</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2 font-mono tabular-nums">
                      <span className="text-3xl font-bold">Free</span>
                      <span className="text-xs opacity-75">· W3C Design Tokens</span>
                    </div>
                    <ul className="mt-6 space-y-2.5 text-xs opacity-90">
                      <li>· Complete tokens.json &amp; tailwind-v4-theme.css</li>
                      <li>· Pre-verified WCAG AA/AAA luminance contrast pairs</li>
                      <li>· 22 CSS/SVG non-flat background recipes included</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopyText('npx chromakit init --free', 'Free CLI Command')}
                    style={{
                      borderColor: `${surface.hex}35`,
                      color: surface.hex
                    }}
                    className="mt-8 w-full py-3 rounded-lg text-xs font-semibold border hover:opacity-80"
                  >
                    Copy Free CLI Command
                  </button>
                </div>
              </div>
            </section>
          </div>
        </article>
      )}

      {/* =====================================================================
          WEB PAGE 03: MOTTO M-01 / MARK TENNIS — URBAN MOBILITY & PERFORMANCE CLUB
         ===================================================================== */}
      {activePageId === 'page-3-motto-tennis' && (
        <article
          className="rounded-2xl border border-white/10 overflow-hidden transition-colors duration-200"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Page 3 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p3-cruiser" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">M-01 Cruiser</a>
              <a href="#p3-battery" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Twin-Cell Architecture</a>
              <a href="#p3-specs" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Performance</a>
              <a href="#p3-testride" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Open Showrooms</a>
            </nav>
            <a
              href="#p3-testride"
              onClick={(e) => {
                e.preventDefault();
                setBookingConfirmed(true);
              }}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              {palette.ctaLabel}
            </a>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-80">
                    URBAN MOBILITY · 60% {bg.name.toUpperCase()} / 30% {surface.name.toUpperCase()} / 10% {action.name.toUpperCase()}
                  </div>
                  <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.06]">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-base opacity-85 leading-relaxed">
                    {palette.subcopy}
                  </p>
                </div>

                {/* Battery & Range Interactive Selector (Zero Prices) */}
                <div className="space-y-4 pt-4 border-t" style={{ borderColor: `${surface.hex}20` }}>
                  <div className="text-xs font-mono opacity-75">SELECT POWERTRAIN TELEMETRY SPEC (FREE TEMPLATE)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBatteryTier('single')}
                      style={{
                        borderColor: batteryTier === 'single' ? action.hex : `${surface.hex}25`,
                        backgroundColor: batteryTier === 'single' ? `${surface.hex}12` : 'transparent'
                      }}
                      className="rounded-xl p-4 border text-left transition-colors"
                    >
                      <div className="text-sm font-bold">M-01 Standard Spec</div>
                      <div className="text-xs font-mono tabular-nums opacity-80 mt-1">
                        65 km range · 45 km/h · Open Spec
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBatteryTier('twin')}
                      style={{
                        borderColor: batteryTier === 'twin' ? action.hex : `${surface.hex}25`,
                        backgroundColor: batteryTier === 'twin' ? `${surface.hex}12` : 'transparent'
                      }}
                      className="rounded-xl p-4 border text-left transition-colors"
                    >
                      <div className="text-sm font-bold">M-01 Twin-Cell Spec</div>
                      <div className="text-xs font-mono tabular-nums opacity-80 mt-1">
                        110 km range · 70 km/h · Open Spec
                      </div>
                    </button>
                  </div>
                </div>

                {/* Test Ride Booking Form */}
                <form
                  id="p3-testride"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingConfirmed(true);
                  }}
                  className="pt-2 space-y-3"
                >
                  <div className="flex flex-wrap gap-2">
                    {['Milan', 'Paris', 'Berlin', 'Tokyo'].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setRideCity(city)}
                        style={{
                          backgroundColor: rideCity === city ? surface.hex : 'transparent',
                          color: rideCity === city ? bg.hex : surface.hex,
                          borderColor: `${surface.hex}35`
                        }}
                        className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                      >
                        {city} Hub
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder={`Enter email for free ${rideCity} session...`}
                      style={{
                        borderColor: `${surface.hex}35`,
                        backgroundColor: `${surface.hex}08`,
                        color: surface.hex
                      }}
                      className="flex-1 rounded-lg border px-3.5 py-2.5 text-xs placeholder:opacity-60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                    >
                      {bookingConfirmed ? `Confirmed in ${rideCity} ✓` : `Book Free ${rideCity} Ride`}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right 6 Cols: Interactive M-01 Scooter / Rim Accent Showcase */}
              <div
                className="lg:col-span-6 rounded-2xl p-2 border flex flex-col justify-between"
                style={{
                  borderColor: `${surface.hex}25`,
                  backgroundColor: `${surface.hex}0A`
                }}
              >
                <div
                  className="rounded-lg p-6 lg:p-8 h-full flex flex-col justify-between"
                  style={{ backgroundColor: surface.hex, color: bg.hex }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>M-01 CHASSIS TELEMETRY</span>
                    <span
                      className="px-2 py-0.5 rounded font-bold"
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                    >
                      10% ACCENT: {action.name.toUpperCase()}
                    </span>
                  </div>

                  {/* Stylized Electric Cruiser Silhouette with 10% Action Rim Highlights */}
                  <div className="my-8 flex flex-col items-center">
                    <svg
                      viewBox="0 0 420 210"
                      className="w-full max-w-md h-auto"
                      role="img"
                      aria-label="M-01 Electric Cruiser with highlighted wheel rims"
                    >
                      <line x1="20" y1="185" x2="400" y2="185" stroke={bg.hex} strokeOpacity="0.25" strokeWidth="2" />
                      <circle cx="95" cy="150" r="32" fill="none" stroke={action.hex} strokeWidth="8" />
                      <circle cx="95" cy="150" r="16" fill={bg.hex} />
                      <circle cx="320" cy="150" r="32" fill="none" stroke={action.hex} strokeWidth="8" />
                      <circle cx="320" cy="150" r="16" fill={bg.hex} />
                      <path
                        d="M70 135 C70 95, 165 95, 190 135 L275 135 L295 65 L265 65"
                        fill="none"
                        stroke={bg.hex}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect x="85" y="82" width="85" height="16" rx="8" fill={action.hex} />
                      <circle cx="305" cy="68" r="9" fill={action.hex} />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t font-mono text-xs tabular-nums" style={{ borderColor: `${bg.hex}22` }}>
                    <div>
                      <div className="opacity-70">RANGE</div>
                      <div className="text-lg font-bold mt-0.5">
                        {batteryTier === 'twin' ? '110 km' : '65 km'}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-70">0–45 KM/H</div>
                      <div className="text-lg font-bold mt-0.5">3.1 sec</div>
                    </div>
                    <div>
                      <div className="opacity-70">CHARGE TIME</div>
                      <div className="text-lg font-bold mt-0.5">2.4 hrs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* =====================================================================
          WEB PAGE 04: OLIPOP / ZEST / BONBON — BOTANICAL BEVERAGE & TOKEN PACK BUILDER
         ===================================================================== */}
      {activePageId === 'page-4-olipop-zest' && (
        <article
          className="rounded-2xl border border-white/10 overflow-hidden transition-colors duration-200"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Page 4 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-2xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-90">
              <a href="#p4-flavors" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Flavor Palettes</a>
              <a href="#p4-ingredients" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Botanical Fiber</a>
              <a href="#p4-story" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Color Story</a>
              <a href="#p4-open" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Open Source</a>
            </nav>
            <button
              type="button"
              onClick={() => setBoxAdded(true)}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0"
            >
              {boxAdded ? `Pack Exported (${totalCans} Swatches) ✓` : `Free Pack (${totalCans})`}
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono font-semibold tracking-wide">
                  PLAYFUL CONSUMER UI TEMPLATE · 100% FREE &amp; OPEN SOURCE
                </div>
                <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[0.98]">
                  {palette.tagline}
                </h1>
                <p className="text-base sm:text-lg opacity-90 max-w-lg leading-relaxed">
                  {palette.subcopy}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setBoxAdded(true);
                      onCopyText(
                        `/* ${palette.name} Free Consumer Palette */\n--bg: ${bg.hex};\n--surface: ${surface.hex};\n--action: ${action.hex};`,
                        `${palette.name} Flavor Pack`
                      );
                      window.setTimeout(() => setBoxAdded(false), 1600);
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-6 py-3.5 rounded-full text-sm font-bold transition-transform active:scale-95 whitespace-nowrap shrink-0 shadow-xs"
                  >
                    {boxAdded
                      ? 'COPIED FREE PALETTE PACK ✓'
                      : `Copy Free ${totalCans}-Can Palette Spec`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIncludeAgentRules((prev) => !prev)}
                    style={{ borderColor: `${surface.hex}40` }}
                    className="px-4 py-3.5 rounded-full text-xs font-mono font-semibold border whitespace-nowrap shrink-0"
                  >
                    {includeAgentRules ? '✓ Include Free AI Agent Rules' : 'CSS Tokens Only'}
                  </button>
                </div>
              </div>

              {/* Right 6 Cols: Interactive Custom Variety Box Builder (Zero Prices) */}
              <div
                className="lg:col-span-6 rounded-2xl p-2 border"
                style={{
                  borderColor: `${surface.hex}30`,
                  backgroundColor: `${surface.hex}0C`
                }}
              >
                <div
                  className="rounded-lg p-6 space-y-5"
                  style={{ backgroundColor: surface.hex, color: bg.hex }}
                >
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${bg.hex}25` }}>
                    <div>
                      <div className="text-xs font-mono opacity-80">CUSTOM FLAVOR SWATCH MIXER</div>
                      <h2 className="text-lg font-display font-bold">
                        {totalCans} Swatch Units Selected
                      </h2>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold tabular-nums"
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                    >
                      9g Fiber · Free MIT
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(boxCounts).map(([flavor, count]) => (
                      <div
                        key={flavor}
                        className="rounded-xl p-3.5 border flex items-center justify-between gap-4"
                        style={{ borderColor: `${bg.hex}25` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-12 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0"
                            style={{ backgroundColor: action.hex, color: actionTextColor }}
                          >
                            10%
                          </div>
                          <div>
                            <div className="text-sm font-bold">{flavor}</div>
                            <div className="text-xs opacity-75 font-mono">
                              Cassava Root · Calendula · Nopal Cactus
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 font-mono tabular-nums">
                          <button
                            type="button"
                            onClick={() =>
                              setBoxCounts((prev) => ({
                                ...prev,
                                [flavor]: Math.max(0, prev[flavor] - 2)
                              }))
                            }
                            style={{ borderColor: `${bg.hex}40` }}
                            className="w-7 h-7 rounded border grid place-items-center"
                            aria-label={`Remove 2 ${flavor}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{count}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setBoxCounts((prev) => ({
                                ...prev,
                                [flavor]: prev[flavor] + 2
                              }))
                            }
                            style={{ borderColor: `${bg.hex}40` }}
                            className="w-7 h-7 rounded border grid place-items-center"
                            aria-label={`Add 2 ${flavor}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between text-xs font-mono tabular-nums" style={{ borderColor: `${bg.hex}25` }}>
                    <span>Open-source consumer storefront template</span>
                    <span className="font-bold">
                      100% Free for Agents &amp; Devs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* =====================================================================
          WEB PAGE 05: KONTOUR / ARCA / CAIRN — ARCHITECTURAL LIGHTING & DESIGN STUDIO
         ===================================================================== */}
      {activePageId === 'page-5-kontour-arca' && (
        <article
          className="rounded-2xl border border-white/10 overflow-hidden transition-colors duration-200"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Page 5 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p5-objects" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Lighting Objects</a>
              <a href="#p5-system" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Design System</a>
              <a href="#p5-works" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Selected Works</a>
              <a href="#p5-commission" onClick={(e) => e.preventDefault()} className="hover:underline whitespace-nowrap shrink-0">Open Specs</a>
            </nav>
            <a
              href="#p5-commission"
              onClick={(e) => {
                e.preventDefault();
                setInquirySent(true);
              }}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              {palette.ctaLabel}
            </a>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-75">
                    ARCHITECTURAL OBJECTS &amp; SYSTEMS · MILAN &amp; ZÜRICH · FREE MIT TEMPLATE
                  </div>
                  <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-base opacity-85 max-w-xl leading-relaxed">
                    {palette.subcopy}
                  </p>
                </div>

                {/* Editorial Numbered Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: `${surface.hex}20` }}>
                  <div>
                    <div className="text-xs font-mono font-bold" style={{ color: action.hex }}>
                      01. Spatial Luminaires
                    </div>
                    <p className="mt-1.5 text-xs opacity-80 leading-relaxed">
                      Hand-pleated Washi paper shades paired with solid patinated bronze stems.
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold" style={{ color: action.hex }}>
                      02. Hardware Interfaces
                    </div>
                    <p className="mt-1.5 text-xs opacity-80 leading-relaxed">
                      Tactile rotary dimmers and deterministic 60-30-10 embedded displays.
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold" style={{ color: action.hex }}>
                      03. Open Token Specs
                    </div>
                    <p className="mt-1.5 text-xs opacity-80 leading-relaxed">
                      Free architectural color tokens and CAD schematics for developers and AI agents.
                    </p>
                  </div>
                </div>

                {/* Free Spec Sheet Request Form */}
                <form
                  id="p5-commission"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySent(true);
                  }}
                  className="pt-4 flex flex-col sm:flex-row gap-3 max-w-xl"
                >
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Developer or studio email for free CAD spec..."
                    style={{
                      borderColor: `${surface.hex}30`,
                      backgroundColor: `${surface.hex}08`,
                      color: surface.hex
                    }}
                    className="flex-1 rounded-lg border px-4 py-3 text-xs placeholder:opacity-60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-6 py-3 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    {inquirySent ? 'Free Dossier Sent ✓' : 'Download Free Spec'}
                  </button>
                </form>
              </div>

              {/* Right 5 Cols: Interactive Pleated Lamp / Rim-Light Dimmer */}
              <div
                className="lg:col-span-5 rounded-2xl p-2 border flex flex-col justify-between"
                style={{
                  borderColor: `${surface.hex}25`,
                  backgroundColor: `${surface.hex}08`
                }}
              >
                <div
                  className="rounded-lg p-6 h-full flex flex-col justify-between"
                  style={{
                    backgroundColor: surface.hex,
                    color: bg.hex
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>LUMINAIRE NO. 04 · PLEATED FAN</span>
                    <span className="tabular-nums">{lampDimmer}% OUTPUT · 2700K</span>
                  </div>

                  {/* Interactive SVG Pleated Fan Lamp */}
                  <div className="my-6 flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 260 220"
                      className="w-56 h-48"
                      role="img"
                      aria-label="Pleated architectural floor lamp glowing in accent color"
                    >
                      <defs>
                        <radialGradient id="lampGlow" cx="50%" cy="45%" r="50%">
                          <stop
                            offset="0%"
                            stopColor={action.hex}
                            stopOpacity={lampDimmer / 100}
                          />
                          <stop
                            offset="100%"
                            stopColor={bg.hex}
                            stopOpacity="0.15"
                          />
                        </radialGradient>
                      </defs>
                      <polygon
                        points="130,115 35,45 65,28 100,20 130,16 160,20 195,28 225,45"
                        fill="url(#lampGlow)"
                        stroke={bg.hex}
                        strokeWidth="2"
                      />
                      <line x1="130" y1="115" x2="65" y2="28" stroke={bg.hex} strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="130" y1="115" x2="100" y2="20" stroke={bg.hex} strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="130" y1="115" x2="130" y2="16" stroke={bg.hex} strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="130" y1="115" x2="160" y2="20" stroke={bg.hex} strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="130" y1="115" x2="195" y2="28" stroke={bg.hex} strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="130" y1="115" x2="130" y2="195" stroke={bg.hex} strokeWidth="5" />
                      <rect x="95" y="195" width="70" height="10" rx="4" fill={bg.hex} />
                    </svg>
                  </div>

                  {/* Interactive Dimmer Slider */}
                  <div className="space-y-2 pt-3 border-t" style={{ borderColor: `${bg.hex}20` }}>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" />
                        <span>Adjust 10% Accent Glow ({action.name})</span>
                      </span>
                      <span className="tabular-nums font-bold">{lampDimmer}%</span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={100}
                      value={lampDimmer}
                      onChange={(e) => setLampDimmer(Number(e.target.value))}
                      className="w-full accent-[#FF4D1F] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
