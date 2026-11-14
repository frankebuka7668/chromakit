import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowUpRight,
  Check,
  Copy,
  Eye,
  Film,
  Layers,
  Play,
  RotateCcw,
  Sliders
} from 'lucide-react';
import {
  ColorPalette,
  PaletteColor,
  getContrastRatio,
  getContrastWarning,
  getPreciseContrastRatio,
  getReadableTextColor,
  getWcagRating
} from '../data/palettes';

interface LiveMockupStageProps {
  palette: ColorPalette;
  customColors: PaletteColor[];
  onSwapRoles: (indexA: number, indexB: number) => void;
  onUpdateHex: (index: number, newHex: string) => void;
  onResetPalette: () => void;
  onCopyText: (text: string, label: string) => void;
  activeTextureCss?: string | null;
  activeTextureName?: string | null;
  onClearTexture?: () => void;
}

type MockupTemplate = 'editorial' | 'vix-discipline' | 'saas-console' | 'source-media';

export const LiveMockupStage: React.FC<LiveMockupStageProps> = ({
  palette,
  customColors,
  onSwapRoles,
  onUpdateHex,
  onResetPalette,
  onCopyText,
  activeTextureCss,
  activeTextureName,
  onClearTexture
}) => {
  const [template, setTemplate] = useState<MockupTemplate>('editorial');
  const [ctaClicked, setCtaClicked] = useState(false);
  const [showUnslopped, setShowUnslopped] = useState(true);

  const bg = customColors.find((c) => c.role === 'background') ?? customColors[0];
  const surface = customColors.find((c) => c.role === 'surface') ?? customColors[1];
  const action = customColors.find((c) => c.role === 'action') ?? customColors[2];
  const rare = customColors.find((c) => c.role === 'rare-accent');

  const actionTextColor = getReadableTextColor(action.hex);
  const bgToSurfaceRatio = getContrastRatio(bg.hex, surface.hex);
  const bgToSurfacePrecise = getPreciseContrastRatio(bg.hex, surface.hex);
  const bgToActionRatio = getContrastRatio(bg.hex, action.hex);
  const actionTextRatio = getPreciseContrastRatio(action.hex, actionTextColor);
  const bgWcag = getWcagRating(bgToSurfacePrecise);
  const contrastWarnings = [
    getContrastWarning(bgToSurfacePrecise),
    getContrastWarning(actionTextRatio)
  ].filter((warning): warning is string => warning !== null);

  const isModified = customColors.some((c, idx) => c.hex !== palette.colors[idx]?.hex);

  const handleCtaTrigger = () => {
    setCtaClicked(true);
    window.setTimeout(() => setCtaClicked(false), 1400);
  };

  return (
    <div className="rounded-2xl border border-[#F4F1EA]/10 bg-[#16161A] p-2">
      <div className="rounded-lg bg-[#0E0E10] p-5 lg:p-6">
        {/* Stage Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#F4F1EA]/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#9A9890]">
              <span>Active System</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#F4F1EA]">{palette.id}</span>
              <span aria-hidden="true">·</span>
              <span>{palette.creator}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                Text Contrast {bgToSurfaceRatio}:1 ({bgWcag})
              </span>
            </div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#F4F1EA]">
              {palette.name}
            </h2>
          </div>

          {contrastWarnings.length > 0 && (
            <p role="status" className="w-full rounded-md border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
              Contrast warning: {contrastWarnings.join(' ')}
            </p>
          )}

          {/* Interactive Template Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
              <button
                type="button"
                onClick={() => setTemplate('editorial')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  template === 'editorial'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Purist Hero
              </button>
              <button
                type="button"
                onClick={() => setTemplate('vix-discipline')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  template === 'vix-discipline'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                60-30-10 Test
              </button>
              <button
                type="button"
                onClick={() => setTemplate('saas-console')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  template === 'saas-console'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Unslop SaaS
              </button>
              <button
                type="button"
                onClick={() => setTemplate('source-media')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  template === 'source-media'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                Source Reference
              </button>
            </div>

            <button
              type="button"
              onClick={() => onSwapRoles(0, 1)}
              className="px-3 py-2 text-xs font-medium text-[#F4F1EA] bg-[#16161A] border border-[#F4F1EA]/15 rounded-lg hover:border-[#F4F1EA]/40 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              title="Swap 60% Background and 30% Surface roles"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Invert 60/30
            </button>

            {isModified && (
              <button
                type="button"
                onClick={onResetPalette}
                className="px-3 py-2 text-xs font-medium text-[#FF4D1F] bg-[#16161A] border border-[#FF4D1F]/30 rounded-lg hover:bg-[#FF4D1F]/10 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {activeTextureName && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-[#D4FF3A]/30 bg-[#D4FF3A]/5 px-3.5 py-2 text-xs">
            <span className="text-[#F4F1EA]">
              Active Background Overlay: <strong className="font-medium">{activeTextureName}</strong>
            </span>
            {onClearTexture && (
              <button
                type="button"
                onClick={onClearTexture}
                className="text-[#D4FF3A] hover:underline whitespace-nowrap shrink-0"
              >
                Clear Texture Overlay
              </button>
            )}
          </div>
        )}

        {/* LIVE MOCKUP CANVAS */}
        <div className="mt-5">
          {template === 'editorial' && (
            <div
              className="rounded-xl border border-black/10 p-6 lg:p-10 transition-colors duration-200 relative overflow-hidden"
              style={{
                backgroundColor: bg.hex,
                color: surface.hex
              }}
            >
              {/* Optional subtle background texture layer */}
              {activeTextureCss && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'radial-gradient(currentColor 1.25px, transparent 1.25px)',
                    backgroundSize: '14px 14px'
                  }}
                />
              )}

              <div className="relative z-10">
                {/* Mockup Top Bar */}
                <div
                  className="flex items-center justify-between gap-6 pb-6 border-b"
                  style={{ borderColor: `${surface.hex}22` }}
                >
                  <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0">
                    {palette.brandName}
                  </span>
                  <div className="hidden sm:flex items-center gap-6 text-xs font-medium opacity-80">
                    <span>Overview</span>
                    <span>Architecture</span>
                    <span>Specifications</span>
                    <span>Journal</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCtaTrigger}
                    style={{
                      backgroundColor: action.hex,
                      color: actionTextColor
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-transform active:scale-95 whitespace-nowrap shrink-0"
                  >
                    {ctaClicked ? 'Confirmed ✓' : palette.ctaLabel}
                  </button>
                </div>

                {/* Mockup Split Hero */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs opacity-75 font-mono">
                        <span>{palette.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>60-30-10 Verified</span>
                        {rare && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span
                              className="font-semibold underline underline-offset-4"
                              style={{ textDecorationColor: rare.hex }}
                            >
                              Signal: {rare.name}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance leading-[1.08]">
                        {palette.tagline}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base opacity-85 max-w-xl leading-relaxed">
                        {palette.subcopy}
                      </p>
                    </div>

                    {/* Action Bar — Spend the action colour once */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCtaTrigger}
                        style={{
                          backgroundColor: action.hex,
                          color: actionTextColor
                        }}
                        className="px-5 py-3 rounded-lg text-sm font-semibold transition-transform active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>{ctaClicked ? 'Action Executed ✓' : palette.ctaLabel}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onCopyText(
                            `--bg: ${bg.hex}; --surface: ${surface.hex}; --action: ${action.hex};`,
                            `${palette.name} CSS variables`
                          )
                        }
                        style={{
                          borderColor: `${surface.hex}35`,
                          color: surface.hex
                        }}
                        className="px-5 py-3 rounded-lg text-sm font-medium border hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
                      >
                        {palette.secondaryCtaLabel}
                      </button>
                    </div>
                  </div>

                  {/* Right Focal Showcase Card (Nested radius math: outer 16px, p-2 8px -> inner 8px) */}
                  <div
                    className="lg:col-span-5 rounded-2xl p-2 border flex flex-col justify-between"
                    style={{
                      borderColor: `${surface.hex}24`,
                      backgroundColor: `${surface.hex}0D`
                    }}
                  >
                    <div
                      className="rounded-lg p-5 h-full flex flex-col justify-between"
                      style={{
                        backgroundColor: surface.hex,
                        color: bg.hex
                      }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono opacity-75">
                        <span>FOCAL SPECIMEN</span>
                        <span className="tabular-nums">{action.hex}</span>
                      </div>

                      <div className="my-6 flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center font-mono text-xs font-bold shadow-xs"
                          style={{
                            backgroundColor: action.hex,
                            color: actionTextColor
                          }}
                        >
                          10%
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {action.name} Focal Point
                          </div>
                          <p className="text-xs opacity-80 mt-0.5 leading-snug">
                            &ldquo;{palette.storyQuote}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div
                        className="pt-4 border-t flex items-center justify-between text-xs font-mono tabular-nums"
                        style={{ borderColor: `${bg.hex}22` }}
                      >
                        <span>60% {bg.name}</span>
                        <span>30% {surface.name}</span>
                        <span
                          className="font-bold underline"
                          style={{ textDecorationColor: action.hex }}
                        >
                          10% {action.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {template === 'vix-discipline' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Three buttons fight (What NOT to do) */}
              <div
                className="rounded-xl p-6 border transition-colors"
                style={{
                  backgroundColor: bg.hex,
                  color: surface.hex,
                  borderColor: `${surface.hex}22`
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="opacity-75">ANTI-PATTERN · OVERUSED ACCENT</span>
                  <span className="font-semibold">✕ Three buttons fight</span>
                </div>
                <p className="mt-2 text-xs opacity-80">
                  Put the 10% action colour ({action.name} {action.hex}) on every button and it stops meaning anything.
                </p>

                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold"
                  >
                    {palette.ctaLabel}
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold"
                  >
                    {palette.secondaryCtaLabel}
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold"
                  >
                    Read documentation
                  </button>
                </div>
              </div>

              {/* Right: One clear next step (What TO do) */}
              <div
                className="rounded-xl p-6 border transition-colors"
                style={{
                  backgroundColor: bg.hex,
                  color: surface.hex,
                  borderColor: `${surface.hex}22`
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="opacity-75">60-30-10 RULE · @VIXDESIGNZ</span>
                  <span className="font-semibold">✓ One clear next step</span>
                </div>
                <p className="mt-2 text-xs opacity-80">
                  Spend the action colour once. Secondary controls use quiet 30% surface borders.
                </p>

                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleCtaTrigger}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-transform active:scale-[0.99]"
                  >
                    {ctaClicked ? 'Selected Primary Step ✓' : palette.ctaLabel}
                  </button>
                  <button
                    type="button"
                    style={{
                      borderColor: `${surface.hex}30`,
                      color: surface.hex
                    }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-medium border"
                  >
                    {palette.secondaryCtaLabel}
                  </button>
                  <button
                    type="button"
                    style={{
                      borderColor: `${surface.hex}30`,
                      color: surface.hex
                    }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-medium border"
                  >
                    Read documentation
                  </button>
                </div>
              </div>
            </div>
          )}

          {template === 'saas-console' && (
            <div
              className="rounded-xl p-6 lg:p-8 border transition-colors"
              style={{
                backgroundColor: bg.hex,
                color: surface.hex,
                borderColor: `${surface.hex}22`
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: `${surface.hex}20` }}>
                <div>
                  <span className="text-xs font-mono opacity-70">
                    UNSLOP ENGINE · TABULAR NUMS &amp; OPTICAL ALIGNMENT
                  </span>
                  <h3 className="text-2xl font-display font-bold mt-1">
                    {showUnslopped
                      ? 'Cited answers from production telemetry.'
                      : 'Curiosity, meet *clarity* in your terminal.'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUnslopped((prev) => !prev)}
                  style={{
                    backgroundColor: showUnslopped ? action.hex : `${surface.hex}20`,
                    color: showUnslopped ? actionTextColor : surface.hex
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  {showUnslopped ? 'Viewing: Unslopped UI ✓' : 'Viewing: Before (AI Slop)'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="rounded-2xl p-2 border"
                  style={{ borderColor: `${surface.hex}25` }}
                >
                  <div
                    className="rounded-lg p-4 h-full"
                    style={{ backgroundColor: `${surface.hex}0E` }}
                  >
                    <div className="text-xs opacity-75">Open-Source Installs (Rule #18 Tabular Nums)</div>
                    <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
                      42,881
                    </div>
                    <div className="mt-2 text-xs font-mono tabular-nums opacity-80">
                      100% Free MIT · r_inner = 16px - 8px
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-2 border"
                  style={{ borderColor: `${surface.hex}25` }}
                >
                  <div
                    className="rounded-lg p-4 h-full flex flex-col justify-between"
                    style={{ backgroundColor: `${surface.hex}0E` }}
                  >
                    <div className="text-xs opacity-75">Optical Play Button (Rule #17)</div>
                    <div className="my-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCtaTrigger}
                        style={{ backgroundColor: action.hex, color: actionTextColor }}
                        className="w-10 h-10 rounded-full grid place-items-center shrink-0"
                        aria-label="Play demo"
                      >
                        <Play className="w-4 h-4 translate-x-[1px] fill-current" />
                      </button>
                      <span className="text-sm font-semibold">See it in action</span>
                    </div>
                    <div className="text-xs font-mono opacity-75">
                      Icon shifted +1px right for optical center
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-2 border"
                  style={{ borderColor: `${surface.hex}25` }}
                >
                  <div
                    className="rounded-lg p-4 h-full flex flex-col justify-between"
                    style={{ backgroundColor: `${surface.hex}0E` }}
                  >
                    <div className="text-xs opacity-75">CLI Install (Rule #4 Mono Only Here)</div>
                    <code
                      className="my-2 block rounded px-3 py-2 text-xs font-mono truncate"
                      style={{
                        backgroundColor: `${surface.hex}18`,
                        color: surface.hex
                      }}
                    >
                      $ npx chromakit init --theme={palette.id}
                    </code>
                    <div className="text-xs font-mono tabular-nums opacity-75">
                      Action contrast: {bgToActionRatio}:1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {template === 'source-media' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-5">
              <div className="lg:col-span-5 flex justify-center">
                {palette.sourceMediaType === 'video' ? (
                  <video
                    key={palette.sourceMediaPath}
                    src={palette.sourceMediaPath}
                    controls
                    playsInline
                    className="max-h-[420px] w-auto rounded-lg border border-[#F4F1EA]/15 bg-black"
                  />
                ) : (
                  <img
                    src={palette.sourceMediaPath}
                    alt={`${palette.name} reference slide`}
                    referrerPolicy="no-referrer"
                    className="max-h-[420px] w-auto rounded-lg border border-[#F4F1EA]/15 object-contain"
                  />
                )}
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs text-[#9A9890]">
                  <span>Original Reference Asset</span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono text-[#F4F1EA]">{palette.creator}</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-[#F4F1EA]">
                  &ldquo;{palette.storyQuote}&rdquo;
                </h3>
                <p className="text-sm text-[#9A9890] leading-relaxed">
                  Every color in <strong className="text-[#F4F1EA]">{palette.name}</strong> was extracted directly from this creator reference and mapped into the 60-30-10 role schema so both human developers and AI agents can apply it deterministically.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {customColors.map((c) => (
                    <div
                      key={c.role + c.name}
                      className="rounded-lg border border-[#F4F1EA]/10 bg-[#0E0E10] p-3 flex items-center gap-3"
                    >
                      <div
                        className="w-10 h-10 rounded-md shrink-0 border border-white/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#F4F1EA] truncate">
                          {c.name} ({c.role})
                        </div>
                        <div className="text-xs font-mono text-[#9A9890] tabular-nums">
                          {c.hex} {c.pantone ? `· ${c.pantone}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 60-30-10 Proportional Split Bar & Interactive Swatch Role Cards */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-[#9A9890] mb-2">
            <span>Functional 60-30-10 Allocation Bar (Click any swatch to copy hex or edit live)</span>
            <span className="font-mono tabular-nums">
              60% Background · 30% Surface/Text · 10% Action
            </span>
          </div>

          <div className="h-3 w-full rounded-full overflow-hidden flex border border-[#F4F1EA]/15">
            <div style={{ width: '60%', backgroundColor: bg.hex }} title={`60% Background: ${bg.name} (${bg.hex})`} />
            <div style={{ width: '30%', backgroundColor: surface.hex }} title={`30% Surface: ${surface.name} (${surface.hex})`} />
            <div style={{ width: '10%', backgroundColor: action.hex }} title={`10% Action: ${action.name} (${action.hex})`} />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {customColors.map((color, idx) => (
              <SwatchRoleCard
                key={`${palette.id}-${color.role}-${idx}`}
                color={color}
                index={idx}
                onCopy={(hex, name) => onCopyText(hex, `${name} (${hex})`)}
                onUpdateHex={onUpdateHex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SwatchRoleCardProps {
  color: PaletteColor;
  index: number;
  onCopy: (hex: string, name: string) => void;
  onUpdateHex: (index: number, hex: string) => void;
}

const SwatchRoleCard: React.FC<SwatchRoleCardProps> = ({
  color,
  index,
  onCopy,
  onUpdateHex
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(color.hex, color.name);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-3.5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <label
              className="w-7 h-7 rounded-md shrink-0 border border-white/15 cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: color.hex }}
              title="Click to test custom hex color"
            >
              <input
                type="color"
                value={color.hex}
                onChange={(e) => onUpdateHex(index, e.target.value.toUpperCase())}
                className="sr-only"
              />
            </label>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#F4F1EA] truncate">
                {color.name}
              </div>
              <div className="text-xs text-[#9A9890] font-mono tabular-nums">
                {color.role.toUpperCase()} · {color.percentage > 0 ? `${color.percentage}%` : 'RARE'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-md bg-[#0E0E10] border border-[#F4F1EA]/10 hover:border-[#F4F1EA]/35 text-xs font-mono text-[#F4F1EA] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{color.hex}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#D4FF3A]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#9A9890]" />
            )}
          </button>
        </div>

        <p className="mt-2.5 text-xs text-[#9A9890] leading-relaxed">
          {color.jobDescription}
        </p>
      </div>

      {color.pantone && (
        <div className="mt-3 pt-2 border-t border-[#F4F1EA]/10 text-[11px] font-mono text-[#9A9890]">
          Reference: {color.pantone}
        </div>
      )}
    </div>
  );
};
