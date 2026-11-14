import React from 'react';
import {
  ArrowRight,
  Copy,
  FileCode,
} from 'lucide-react';
import { EXTRACTED_PALETTES, getWcagRating } from '../data/palettes';
import { SHOWCASE_PAGES } from '../data/showcasePages';
import { useShowcasePageState } from './useShowcasePageState';
import { LeicaMonoPage } from './showcase/LeicaMonoPage';
import { GuardbaseSecurityPage } from './showcase/GuardbaseSecurityPage';
import { MottoMobilityPage } from './showcase/MottoMobilityPage';
import { OlipopZestPage } from './showcase/OlipopZestPage';
import { KontourArcaPage } from './showcase/KontourArcaPage';
interface ShowcasePagesViewProps {
  onCopyText: (text: string, label: string) => void;
  onNavigateToRepo: (paletteId: string) => void;
}

export const ShowcasePagesView: React.FC<ShowcasePagesViewProps> = ({
  onCopyText,
  onNavigateToRepo
}) => {
  const pageState = useShowcasePageState();
  const { activePageId, setActivePageId, pagePaletteOverrides, currentPageConfig, palette, bg, surface, action, contrastRatio, preciseContrastRatio, contrastWarnings, handleChangePagePalette } = pageState;

  return (
    <div className="space-y-6">
      {/* Control Bar: Switch between the 5 Full Web Pages & Swap Palettes Live */}
      <div className="rounded-2xl border border-[#F4F1EA]/10 bg-[#16161A] p-2">
        <div className="rounded-lg bg-[#0E0E10] p-4 lg:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4F1EA]/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9A9890] font-mono tabular-nums">
                <span>5 COMPLETE PRODUCTION WEBSITES</span>
                <span aria-hidden="true">·</span>
                <span>ACTIVE PALETTE: {palette.name.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>WCAG {contrastRatio}:1 ({getWcagRating(preciseContrastRatio)})</span>
              </div>
              <h2 className="mt-1 text-xl font-display font-semibold text-[#F4F1EA]">
                Explore 5 Real Multi-Section Websites Built with the Extracted Palettes
              </h2>
              {contrastWarnings.length > 0 && (
                <p role="status" className="mt-2 text-xs text-amber-300">
                  Contrast warning: {contrastWarnings.join(' ')}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={currentPageConfig.staticUrl}
                className="px-3.5 py-2 rounded-lg bg-[#16161A] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-mono text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <FileCode className="w-3.5 h-3.5 text-[#D4FF3A]" />
                <span>{currentPageConfig.staticUrl}</span>
              </a>
              <button
                type="button"
                onClick={() =>
                  onCopyText(
                    `/* ${currentPageConfig.title} — ${palette.name} */\n:root {\n  --bg-60: ${bg.hex};\n  --surface-30: ${surface.hex};\n  --action-10: ${action.hex};\n}`,
                    `${palette.name} CSS variables`
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-[#16161A] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy CSS Variables
              </button>
              <button
                type="button"
                onClick={() => onNavigateToRepo(palette.id)}
                className="px-4 py-2 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>Get Repo &amp; Page Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5 Website Switcher Buttons */}
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
                  onClick={() => setActivePageId(pg.id)}
                  className={`text-left rounded-xl p-3 border transition-colors flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#16161A] border-[#FF4D1F] text-[#F4F1EA]'
                      : 'bg-[#16161A]/50 border-[#F4F1EA]/10 text-[#9A9890] hover:border-[#F4F1EA]/30 hover:text-[#F4F1EA]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#F4F1EA]">
                        Website {pg.number}
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
                    <div className="text-[11px] text-[#9A9890] truncate">
                      {pg.industry}
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-[#F4F1EA]/10 text-[11px] font-mono text-[#D4FF3A] truncate">
                    {isCurrent ? '● Viewing Live Site' : 'Launch Site →'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Color Combination Switcher for the Active Website */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F4F1EA]/10 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#9A9890] font-mono">
                Re-theme Website {currentPageConfig.number} with one click:
              </span>
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
                All {EXTRACTED_PALETTES.length} combinations:
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
          WEBSITE 01: LEICA & MONO — PRECISION OPTICAL & AUDIO HARDWARE WEBSITE
         ===================================================================== */}
      {activePageId === 'page-1-leica-mono' && (
        <LeicaMonoPage state={pageState} onCopyText={onCopyText} />
      )}

      {/* =====================================================================
          WEBSITE 02: GUARDBASE — AI AGENT SECURITY & RUNTIME FIREWALL WEBSITE
         ===================================================================== */}
      {activePageId === 'page-2-guardbase-veyra' && (
        <GuardbaseSecurityPage state={pageState} onCopyText={onCopyText} />
      )}

      {/* =====================================================================
          WEBSITE 03: MOTTO M-01 — URBAN ELECTRIC CRUISER & MOBILITY WEBSITE
         ===================================================================== */}
      {activePageId === 'page-3-motto-tennis' && (
        <MottoMobilityPage state={pageState} onCopyText={onCopyText} />
      )}

      {/* =====================================================================
          WEBSITE 04: OLIPOP & ZEST — BOTANICAL BEVERAGE & FUNCTIONAL DRINK WEBSITE
         ===================================================================== */}
      {activePageId === 'page-4-olipop-zest' && (
        <OlipopZestPage state={pageState} onCopyText={onCopyText} />
      )}

      {/* =====================================================================
          WEBSITE 05: KONTOUR & ARCA — ARCHITECTURAL LIGHTING & DESIGN STUDIO
         ===================================================================== */}
      {activePageId === 'page-5-kontour-arca' && (
        <KontourArcaPage state={pageState} onCopyText={onCopyText} />
      )}
    </div>
  );
};

