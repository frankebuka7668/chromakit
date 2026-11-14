import React from 'react';
import {
  ArrowUpRight,
  Copy,
} from 'lucide-react';
import type { ShowcasePageState } from '../useShowcasePageState';

interface Props {
  state: ShowcasePageState;
  onCopyText: (text: string, label: string) => void;
}

export const LeicaMonoPage: React.FC<Props> = ({ state, onCopyText }) => {
  const { selectedLens, setSelectedLens, shutterSpeed, setShutterSpeed, frameLineBright, setFrameLineBright, shutterCount, shutterFlash, turntableRpm, setTurntableRpm, specTabP1, setSpecTabP1, palette, bg, surface, action, actionTextColor, triggerShutter } = state;
  return (
    <>
        <article
          className="rounded-2xl border border-white/15 overflow-hidden transition-colors duration-200 shadow-2xl"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Website 01 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p1-rangefinder" className="hover:underline whitespace-nowrap shrink-0">M11-P Rangefinder</a>
              <a href="#p1-turntable" className="hover:underline whitespace-nowrap shrink-0">Mono M1 Turntable</a>
              <a href="#p1-specs" className="hover:underline whitespace-nowrap shrink-0">Technical Bench</a>
              <a href="#p1-collection" className="hover:underline whitespace-nowrap shrink-0">Instruments</a>
            </nav>
            <button
              type="button"
              onClick={triggerShutter}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 transition-transform active:scale-95"
            >
              <span>Test Shutter ({shutterCount})</span>
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Section 1: Hero & Interactive Rangefinder Optical Bench */}
            <section id="p1-rangefinder" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-75">
                    WETZLAR OPTICAL &amp; ACOUSTIC ENGINEERING · SERIES IV
                  </div>
                  <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-base opacity-85 leading-relaxed max-w-xl">
                    {palette.subcopy} Machined from solid brass and billet magnesium with sapphire crystal glass and hardware-signed Content Credentials.
                  </p>

                  {/* Interactive Focal Length & Shutter Speed Selector Buttons */}
                  <div className="mt-8 space-y-4 pt-6 border-t" style={{ borderColor: `${surface.hex}20` }}>
                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">
                        1. SELECT APOCHROMATIC FOCAL LENGTH (BRIGHT-LINE FRAME PREVIEW):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(['28mm', '35mm', '50mm', '75mm'] as const).map((lens) => (
                          <button
                            key={lens}
                            type="button"
                            onClick={() => setSelectedLens(lens)}
                            style={{
                              backgroundColor: selectedLens === lens ? action.hex : 'transparent',
                              color: selectedLens === lens ? actionTextColor : surface.hex,
                              borderColor: selectedLens === lens ? action.hex : `${surface.hex}35`
                            }}
                            className="px-3.5 py-2 rounded-lg border text-xs font-mono font-semibold tabular-nums transition-colors"
                          >
                            {lens} Summilux
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">
                        2. SELECT MECHANICAL / ELECTRONIC SHUTTER SPEED:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(['1/500s', '1/1000s', '1/4000s', '1/8000s'] as const).map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => setShutterSpeed(spd)}
                            style={{
                              backgroundColor: shutterSpeed === spd ? surface.hex : 'transparent',
                              color: shutterSpeed === spd ? bg.hex : surface.hex,
                              borderColor: `${surface.hex}35`
                            }}
                            className="px-3 py-1.5 rounded-lg border text-xs font-mono tabular-nums transition-colors"
                          >
                            {spd}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons (Spend the action colour once) */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={triggerShutter}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-6 py-3.5 rounded-lg text-sm font-semibold transition-transform active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Release Shutter ({selectedLens} · {shutterSpeed})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrameLineBright((prev) => !prev)}
                    style={{ borderColor: `${surface.hex}35`, color: surface.hex }}
                    className="px-5 py-3.5 rounded-lg text-sm font-medium border hover:opacity-80 whitespace-nowrap shrink-0"
                  >
                    {frameLineBright ? 'Toggle Reticle: Illuminated' : 'Toggle Reticle: Ambient'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(
                        `Leica M11-P Optical Config: ${selectedLens} at ${shutterSpeed} | Palette: ${bg.hex}, ${surface.hex}, ${action.hex}`,
                        'Optical Configuration'
                      )
                    }
                    style={{ borderColor: `${surface.hex}35`, color: surface.hex }}
                    className="px-4 py-3.5 rounded-lg text-sm font-medium border hover:opacity-80 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Config</span>
                  </button>
                </div>
              </div>

              {/* Right 6 Cols: Interactive Optical Viewfinder & Camera Body */}
              <div
                className="lg:col-span-6 rounded-2xl p-2 border flex flex-col justify-between"
                style={{
                  borderColor: `${surface.hex}25`,
                  backgroundColor: `${surface.hex}08`
                }}
              >
                <div
                  className="rounded-lg p-6 lg:p-8 h-full flex flex-col justify-between transition-opacity duration-150"
                  style={{
                    backgroundColor: surface.hex,
                    color: bg.hex,
                    opacity: shutterFlash ? 0.35 : 1
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>BRIGHT-LINE RANGEFINDER VIEWPORT (0.73x MAGNIFICATION)</span>
                    <span className="tabular-nums">FRAME #{shutterCount}</span>
                  </div>

                  {/* Interactive Optical Frame-Line Simulator */}
                  <div
                    className="my-6 rounded-xl border-2 p-6 relative flex items-center justify-center h-64 overflow-hidden"
                    style={{ borderColor: `${bg.hex}30`, backgroundColor: `${bg.hex}0D` }}
                  >
                    {/* Outer 28mm Frame Line */}
                    <div
                      className="absolute inset-4 border transition-all duration-200 pointer-events-none"
                      style={{
                        borderColor:
                          selectedLens === '28mm' && frameLineBright
                            ? action.hex
                            : `${bg.hex}25`,
                        borderWidth: selectedLens === '28mm' ? '2px' : '1px'
                      }}
                    />
                    {/* 35mm Frame Line */}
                    <div
                      className="absolute inset-9 border transition-all duration-200 pointer-events-none"
                      style={{
                        borderColor:
                          selectedLens === '35mm' && frameLineBright
                            ? action.hex
                            : `${bg.hex}25`,
                        borderWidth: selectedLens === '35mm' ? '2px' : '1px'
                      }}
                    />
                    {/* 50mm Frame Line */}
                    <div
                      className="absolute inset-14 border transition-all duration-200 pointer-events-none"
                      style={{
                        borderColor:
                          selectedLens === '50mm' && frameLineBright
                            ? action.hex
                            : `${bg.hex}25`,
                        borderWidth: selectedLens === '50mm' ? '2px' : '1px'
                      }}
                    />
                    {/* 75mm Frame Line */}
                    <div
                      className="absolute inset-20 border transition-all duration-200 pointer-events-none"
                      style={{
                        borderColor:
                          selectedLens === '75mm' && frameLineBright
                            ? action.hex
                            : `${bg.hex}25`,
                        borderWidth: selectedLens === '75mm' ? '2px' : '1px'
                      }}
                    />

                    {/* Central Coincident Rangefinder Patch */}
                    <div
                      className="w-24 h-16 rounded border flex flex-col items-center justify-center font-mono text-xs tabular-nums"
                      style={{
                        borderColor: action.hex,
                        backgroundColor: `${action.hex}20`
                      }}
                    >
                      <span className="font-bold">{selectedLens}</span>
                      <span className="text-[10px] opacity-85">{shutterSpeed} · f/1.4</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t text-xs font-mono tabular-nums" style={{ borderColor: `${bg.hex}20` }}>
                    <span>60.3 MP DNG + JPEG</span>
                    <span>15-Stop Dynamic Range</span>
                    <button
                      type="button"
                      onClick={triggerShutter}
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                      className="px-3 py-1 rounded font-bold"
                    >
                      Capture Frame
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Interactive Mono M1 Direct-Drive Turntable Deck */}
            <section id="p1-turntable" className="pt-10 border-t grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ borderColor: `${surface.hex}20` }}>
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono opacity-75">02. ACOUSTIC ENGINEERING · MONO M1</div>
                <h2 className="text-3xl font-display font-bold">
                  PURE SOUND. Less noise. More feeling.
                </h2>
                <p className="text-sm opacity-85 leading-relaxed">
                  Direct-drive reference turntable machined from a single 18 kg block of solid billet aluminum with optical pitch regulation. Test the platter speed and strobe ring below.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {(['OFF', '33.3 RPM', '45 RPM'] as const).map((rpm) => (
                    <button
                      key={rpm}
                      type="button"
                      onClick={() => setTurntableRpm(rpm)}
                      style={{
                        backgroundColor: turntableRpm === rpm ? action.hex : 'transparent',
                        color: turntableRpm === rpm ? actionTextColor : surface.hex,
                        borderColor: turntableRpm === rpm ? action.hex : `${surface.hex}35`
                      }}
                      className="px-4 py-2 rounded-lg border text-xs font-mono font-semibold tabular-nums transition-colors"
                    >
                      {rpm === 'OFF' ? 'Stop Platter' : `Spin ${rpm}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 rounded-2xl p-2 border" style={{ borderColor: `${surface.hex}25` }}>
                <div
                  className="rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                  style={{ backgroundColor: `${surface.hex}0E` }}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-28 h-28 rounded-full border-4 flex items-center justify-center shrink-0 ${
                        turntableRpm !== 'OFF' ? 'animate-spin' : ''
                      }`}
                      style={{
                        borderColor: surface.hex,
                        animationDuration: turntableRpm === '45 RPM' ? '1.8s' : '2.6s'
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
                        style={{ backgroundColor: action.hex, color: actionTextColor }}
                      >
                        {turntableRpm === 'OFF' ? 'M1' : turntableRpm.split(' ')[0]}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono opacity-75">OPTICAL STROBE LOCK</div>
                      <div className="text-lg font-display font-bold">
                        {turntableRpm === 'OFF' ? 'Platter Parked (Brake Engaged)' : `Locked at ${turntableRpm} (0.008% Wow)`}
                      </div>
                      <p className="text-xs opacity-80 font-mono">
                        Coreless twin-rotor motor · Titanium gimbal tonearm
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setTurntableRpm((prev) => (prev === 'OFF' ? '33.3 RPM' : 'OFF'))
                    }
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    {turntableRpm === 'OFF' ? 'Start Motor' : 'Engage Brake'}
                  </button>
                </div>
              </div>
            </section>

            {/* Section 3: Interactive Technical Specification Tabs */}
            <section id="p1-specs" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}20` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">03. COMPLETE ENGINEERING SPECIFICATIONS</div>
                  <h2 className="text-2xl font-display font-bold mt-1">
                    Verified tolerances and optical MTF benchmarks.
                  </h2>
                </div>

                <div className="inline-flex rounded-lg p-1 border" style={{ borderColor: `${surface.hex}25` }}>
                  {(
                    [
                      { id: 'optics', label: 'Apochromatic Lenses' },
                      { id: 'sensor', label: '60MP BSI Sensor' },
                      { id: 'turntable', label: 'M1 Acoustic Deck' }
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSpecTabP1(tab.id)}
                      style={{
                        backgroundColor: specTabP1 === tab.id ? surface.hex : 'transparent',
                        color: specTabP1 === tab.id ? bg.hex : surface.hex
                      }}
                      className="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {specTabP1 === 'optics' &&
                  [
                    { title: 'Optical Design', val: '10 elements in 5 groups', detail: '3 anomalous partial dispersion glass elements' },
                    { title: 'Aperture Range', val: 'f/1.4 to f/16', detail: '11-blade circular diaphragm with half-stop clicks' },
                    { title: 'Close Focus Distance', val: '0.30 meters', detail: 'Extended helicoid cam with rangefinder coupling' }
                  ].map((row) => (
                    <div key={row.title} className="rounded-xl p-5 border" style={{ borderColor: `${surface.hex}22` }}>
                      <div className="text-xs font-mono opacity-75">{row.title}</div>
                      <div className="mt-2 text-xl font-display font-bold tabular-nums">{row.val}</div>
                      <div className="mt-1 text-xs opacity-80">{row.detail}</div>
                    </div>
                  ))}
                {specTabP1 === 'sensor' &&
                  [
                    { title: 'Triple Resolution', val: '60.3 / 36.5 / 18.4 MP', detail: 'Full-sensor readout at all three raw DNG resolutions' },
                    { title: 'Color Filter Array', val: 'IR + UV Cut Filter', detail: 'Ultra-thin 0.8mm cover glass preventing edge refraction' },
                    { title: 'Buffer & Storage', val: '256 GB Internal + SD', detail: 'Dedicated Maestro III processor with 3 GB LPDDR4 cache' }
                  ].map((row) => (
                    <div key={row.title} className="rounded-xl p-5 border" style={{ borderColor: `${surface.hex}22` }}>
                      <div className="text-xs font-mono opacity-75">{row.title}</div>
                      <div className="mt-2 text-xl font-display font-bold tabular-nums">{row.val}</div>
                      <div className="mt-1 text-xs opacity-80">{row.detail}</div>
                    </div>
                  ))}
                {specTabP1 === 'turntable' &&
                  [
                    { title: 'Platter Inertia', val: '4.8 kg Machined Brass', detail: 'Damped elastomer underside with vacuum record mat' },
                    { title: 'Signal-to-Noise Ratio', val: '> 86 dB (DIN-B)', detail: 'Galvanically isolated linear power supply' },
                    { title: 'Effective Arm Length', val: '239 mm (9.4 inch)', detail: 'Overhang 16 mm · Tracking error < 0.12°/cm' }
                  ].map((row) => (
                    <div key={row.title} className="rounded-xl p-5 border" style={{ borderColor: `${surface.hex}22` }}>
                      <div className="text-xs font-mono opacity-75">{row.title}</div>
                      <div className="mt-2 text-xl font-display font-bold tabular-nums">{row.val}</div>
                      <div className="mt-1 text-xs opacity-80">{row.detail}</div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </article>
    </>
  );
};
