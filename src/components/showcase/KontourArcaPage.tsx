import React from 'react';
import {
  Sun,
} from 'lucide-react';
import type { ShowcasePageState } from '../useShowcasePageState';

interface Props {
  state: ShowcasePageState;
  onCopyText: (text: string, label: string) => void;
}

export const KontourArcaPage: React.FC<Props> = ({ state, onCopyText }) => {
  const { lampDimmer, setLampDimmer, kelvinTemp, setKelvinTemp, fixtureModel, setFixtureModel, activeCaseStudy, setActiveCaseStudy, selectedMaterial, setSelectedMaterial, inquiryEmail, setInquiryEmail, inquirySent, setInquirySent, palette, bg, surface, action, actionTextColor, CASE_STUDIES } = state;
  return (
    <>
        <article
          className="rounded-2xl border border-white/15 overflow-hidden transition-colors duration-200 shadow-2xl"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Website 05 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p5-lightlab" className="hover:underline whitespace-nowrap shrink-0">Light Lab</a>
              <a href="#p5-projects" className="hover:underline whitespace-nowrap shrink-0">Architectural Works</a>
              <a href="#p5-materials" className="hover:underline whitespace-nowrap shrink-0">Material Dossier</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                onCopyText(
                  `${fixtureModel} Photometric IES File (${kelvinTemp}, ${lampDimmer}% output)`,
                  'Photometric IES Spec'
                )
              }
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              Download IES Spec
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Section 1: Hero & Interactive Kelvin / Dimmer Light Lab */}
            <section id="p5-lightlab" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-75">
                    ARCHITECTURAL LIGHTING &amp; INDUSTRIAL SYSTEMS · MILAN &amp; ZÜRICH
                  </div>
                  <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-base opacity-85 max-w-xl leading-relaxed">
                    {palette.subcopy} Configure fixture geometry, Kelvin color temperature, and lumen output in real time below.
                  </p>

                  {/* Fixture Model & Kelvin Selector Buttons */}
                  <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: `${surface.hex}20` }}>
                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">1. SELECT ARCHITECTURAL FIXTURE:</div>
                      <div className="flex flex-wrap gap-2">
                        {(['Arca Floor 01', 'Kontour Pendant 02', 'Cairn Sconce 03'] as const).map((mod) => (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => setFixtureModel(mod)}
                            style={{
                              backgroundColor: fixtureModel === mod ? action.hex : 'transparent',
                              color: fixtureModel === mod ? actionTextColor : surface.hex,
                              borderColor: fixtureModel === mod ? action.hex : `${surface.hex}35`
                            }}
                            className="px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors"
                          >
                            {mod}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">2. SELECT KELVIN COLOR TEMPERATURE &amp; DIMMER PRESET:</div>
                      <div className="flex flex-wrap gap-2">
                        {(['2200K', '2700K', '3500K', '4000K'] as const).map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setKelvinTemp(k)}
                            style={{
                              backgroundColor: kelvinTemp === k ? surface.hex : 'transparent',
                              color: kelvinTemp === k ? bg.hex : surface.hex,
                              borderColor: `${surface.hex}35`
                            }}
                            className="px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold tabular-nums"
                          >
                            {k}
                          </button>
                        ))}
                        {[25, 50, 75, 100].map((dim) => (
                          <button
                            key={dim}
                            type="button"
                            onClick={() => setLampDimmer(dim)}
                            style={{ borderColor: lampDimmer === dim ? action.hex : `${surface.hex}25` }}
                            className="px-2.5 py-1.5 rounded-lg border text-xs font-mono tabular-nums"
                          >
                            {dim}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Swatch & Spec Dossier Form */}
                <form
                  id="p5-materials"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySent(true);
                  }}
                  className="pt-4 space-y-3 max-w-xl"
                >
                  <div className="flex flex-wrap gap-2">
                    {['Hand-Pleated Washi', 'Patinated Bronze', 'Raw Travertine', 'Anodized Carbon'].map((mat) => (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        style={{
                          borderColor: selectedMaterial === mat ? action.hex : `${surface.hex}30`
                        }}
                        className="px-3 py-1 rounded border text-xs font-mono"
                      >
                        {selectedMaterial === mat ? `✓ ${mat}` : mat}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder={`Architect email for ${selectedMaterial} sample box...`}
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
                      {inquirySent ? 'Sample Box Requested ✓' : 'Request Material Sample'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right 5 Cols: Interactive Pleated Luminaire Viewport */}
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
                    <span>{fixtureModel.toUpperCase()}</span>
                    <span className="tabular-nums">{lampDimmer}% · {kelvinTemp} · 98 CRI</span>
                  </div>

                  <div className="my-6 flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 260 220"
                      className="w-56 h-48"
                      role="img"
                      aria-label="Pleated architectural floor lamp glowing in accent color"
                    >
                      <defs>
                        <radialGradient id="lampGlowPage5" cx="50%" cy="45%" r="50%">
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
                        fill="url(#lampGlowPage5)"
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

                  <div className="space-y-2 pt-3 border-t" style={{ borderColor: `${bg.hex}20` }}>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" />
                        <span>Rotary Dimmer ({selectedMaterial})</span>
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
            </section>

            {/* Section 2: Architectural Case Studies */}
            <section id="p5-projects" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}20` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">02. SELECTED ARCHITECTURAL INSTALLATIONS</div>
                  <h2 className="text-2xl font-display font-bold mt-1">
                    Measured photometric outcomes across galleries and pavilions.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CASE_STUDIES.map((cs, i) => (
                    <button
                      key={cs.place}
                      type="button"
                      onClick={() => setActiveCaseStudy(i)}
                      style={{
                        backgroundColor: activeCaseStudy === i ? action.hex : 'transparent',
                        color: activeCaseStudy === i ? actionTextColor : surface.hex,
                        borderColor: `${surface.hex}35`
                      }}
                      className="px-3.5 py-1.5 rounded-lg border text-xs font-semibold"
                    >
                      {cs.place}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CASE_STUDIES.map((cs, i) => (
                  <div
                    key={cs.place}
                    onClick={() => setActiveCaseStudy(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveCaseStudy(i);
                    }}
                    className="rounded-xl p-5 border cursor-pointer flex flex-col justify-between"
                    style={{
                      borderColor: activeCaseStudy === i ? action.hex : `${surface.hex}22`,
                      backgroundColor: activeCaseStudy === i ? `${surface.hex}10` : 'transparent'
                    }}
                  >
                    <div>
                      <div className="text-xs font-mono opacity-75">{cs.place}</div>
                      <h3 className="mt-1 text-lg font-display font-bold">{cs.project}</h3>
                      <p className="mt-2 text-xs opacity-85 leading-relaxed">{cs.summary}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t text-xs font-mono font-bold tabular-nums" style={{ borderColor: `${surface.hex}20`, color: action.hex }}>
                      {cs.metric}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
    </>
  );
};
