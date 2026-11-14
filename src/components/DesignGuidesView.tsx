import React, { useState } from 'react';
import {
  CheckSquare,
  Copy,
  ShieldCheck,
  Sparkles,
  Square
} from 'lucide-react';
import {
  BACKGROUND_RECIPES,
  COMPLIANCE_CHECKS,
  UNSLOP_RULES
} from '../data/guides';
import { ColorPalette } from '../data/palettes';

interface DesignGuidesViewProps {
  activePalette: ColorPalette;
  onCopyText: (text: string, label: string) => void;
  onApplyTextureToMockup: (cssPattern: string, name: string) => void;
}

type GuideSubTab = '60-30-10' | 'unslop-20' | 'backgrounds-22' | 'compliance-20';

export const DesignGuidesView: React.FC<DesignGuidesViewProps> = ({
  onCopyText,
  onApplyTextureToMockup
}) => {
  const [subTab, setSubTab] = useState<GuideSubTab>('60-30-10');
  const [unslopCategory, setUnslopCategory] = useState<string>('All');
  const [bgCategory, setBgCategory] = useState<string>('All');
  const [checkedCompliance, setCheckedCompliance] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    13: true,
    14: true,
    15: true
  });

  const toggleCompliance = (index: number) => {
    setCheckedCompliance((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(checkedCompliance).filter(Boolean).length;

  const filteredUnslop =
    unslopCategory === 'All'
      ? UNSLOP_RULES
      : UNSLOP_RULES.filter((r) => r.category === unslopCategory);

  const filteredBgs =
    bgCategory === 'All'
      ? BACKGROUND_RECIPES
      : BACKGROUND_RECIPES.filter((b) => b.category === bgCategory);

  const parseCssStringToStyle = (cssString: string): React.CSSProperties => {
    const style: Record<string, string> = {};
    cssString
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((decl) => {
        const colonIdx = decl.indexOf(':');
        if (colonIdx > 0) {
          const prop = decl
            .slice(0, colonIdx)
            .trim()
            .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          const val = decl.slice(colonIdx + 1).trim();
          style[prop] = val;
        }
      });
    return style;
  };

  return (
    <div className="space-y-8">
      {/* Guide Navigation Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4F1EA]/10 pb-5">
        <div>
          <div className="text-xs text-[#9A9890]">
            <span>Extracted Design Systems &amp; Checklists</span>
            <span aria-hidden="true"> · </span>
            <span>@vixdesignz · @charles.unemployed · @cooked_dev_</span>
          </div>
          <h2 className="mt-1 text-2xl font-display font-semibold text-[#F4F1EA]">
            Color Architecture, Anti-Slop Rules &amp; Non-Flat Backgrounds
          </h2>
        </div>

        <div className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
          <button
            type="button"
            onClick={() => setSubTab('60-30-10')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === '60-30-10'
                ? 'bg-[#F4F1EA] text-[#0E0E10]'
                : 'text-[#9A9890] hover:text-[#F4F1EA]'
            }`}
          >
            01. 60-30-10 Role Rules
          </button>
          <button
            type="button"
            onClick={() => setSubTab('unslop-20')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'unslop-20'
                ? 'bg-[#F4F1EA] text-[#0E0E10]'
                : 'text-[#9A9890] hover:text-[#F4F1EA]'
            }`}
          >
            02. 20 Ways to Unslop UI
          </button>
          <button
            type="button"
            onClick={() => setSubTab('backgrounds-22')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'backgrounds-22'
                ? 'bg-[#F4F1EA] text-[#0E0E10]'
                : 'text-[#9A9890] hover:text-[#F4F1EA]'
            }`}
          >
            03. 22 Non-Flat Backgrounds
          </button>
          <button
            type="button"
            onClick={() => setSubTab('compliance-20')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'compliance-20'
                ? 'bg-[#F4F1EA] text-[#0E0E10]'
                : 'text-[#9A9890] hover:text-[#F4F1EA]'
            }`}
          >
            04. 20 App Legal &amp; WCAG Checks
          </button>
        </div>
      </div>

      {/* TAB 1: 60-30-10 ROLE ARCHITECTURE (@vixdesignz) */}
      {subTab === '60-30-10' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#9A9890]">
                  01. ROLES FIRST · @VIXDESIGNZ
                </div>
                <h3 className="mt-2 text-2xl font-display font-semibold text-[#F4F1EA]">
                  Decide the jobs before the hues.
                </h3>
                <p className="mt-3 text-sm text-[#9A9890] leading-relaxed">
                  Background, text, action. Pick the job first, then the colour that can do it. An accent sits outside the 60-30-10 split—if it has no job, cut it.
                </p>
              </div>
              <div className="mt-6 rounded-lg overflow-hidden border border-[#F4F1EA]/15 flex h-24 font-mono">
                <div className="w-[60%] bg-[#0E0E10] text-[#F4F1EA] p-3 flex flex-col justify-between">
                  <span className="text-[11px] text-[#9A9890]">Background</span>
                  <span className="text-2xl font-bold tabular-nums">60%</span>
                </div>
                <div className="w-[30%] bg-[#F4F1EA] text-[#0E0E10] p-3 flex flex-col justify-between">
                  <span className="text-[11px] opacity-70">Text/Surfaces</span>
                  <span className="text-xl font-bold tabular-nums">30%</span>
                </div>
                <div className="w-[10%] bg-[#FF4D1F] text-white p-2 flex flex-col justify-between items-center">
                  <span className="text-[10px] [writing-mode:vertical-rl]">Action</span>
                  <span className="text-sm font-bold tabular-nums">10</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#9A9890]">
                  02. GIVE IT A REASON · CAIRN BRAND
                </div>
                <h3 className="mt-2 text-2xl font-display font-semibold text-[#F4F1EA]">
                  Then tie each one to the story.
                </h3>
                <p className="mt-3 text-sm text-[#9A9890] leading-relaxed">
                  A narrative reason stops the palette from drifting during long coding sessions or multi-agent edits.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="rounded-lg bg-[#FFB020] text-[#0E0E10] p-3">
                  <div className="font-bold">Amber · #FFB020</div>
                  <div className="text-[11px] mt-1 opacity-85 font-sans">The signal glowing in low light.</div>
                </div>
                <div className="rounded-lg bg-[#22252B] text-[#F4F1EA] p-3 border border-white/10">
                  <div className="font-bold">Charcoal · #22252B</div>
                  <div className="text-[11px] mt-1 opacity-80 font-sans">The foundation everything sits on.</div>
                </div>
                <div className="rounded-lg bg-[#1F5D50] text-[#F4F1EA] p-3">
                  <div className="font-bold">Deep Teal · #1F5D50</div>
                  <div className="text-[11px] mt-1 opacity-85 font-sans">The resolved state. Cool vs warm.</div>
                </div>
                <div className="rounded-lg bg-[#F3EFE6] text-[#0E0E10] p-3">
                  <div className="font-bold">Quarry · #F3EFE6</div>
                  <div className="text-[11px] mt-1 opacity-80 font-sans">Where the stone comes from.</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#9A9890]">
                  03. TEST IT · ACTION BUDGET
                </div>
                <h3 className="mt-2 text-2xl font-display font-semibold text-[#F4F1EA]">
                  Spend the action colour once.
                </h3>
                <p className="mt-3 text-sm text-[#9A9890] leading-relaxed">
                  Put your 10% action colour on every button, badge, and icon and it stops meaning anything. Reserve it for the single clearest next step.
                </p>
              </div>
              <div className="mt-6 rounded-lg bg-[#F4F1EA] text-[#0E0E10] p-4 space-y-2">
                <div className="text-xs font-semibold mb-2">One clear next step:</div>
                <div className="w-full py-2 rounded-md bg-[#FF4D1F] text-white text-center text-xs font-semibold">
                  Start free (10% Action)
                </div>
                <div className="w-full py-2 rounded-md border border-black/15 text-center text-xs font-medium">
                  Book a call (30% Surface)
                </div>
              </div>
            </div>
          </div>

          {/* Original 4 Reference Slides Gallery */}
          <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-[#9A9890]">Source Reference Slides (@vixdesignz)</div>
                <h3 className="text-lg font-semibold text-[#F4F1EA]">
                  Visual Specification Sheets
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  onCopyText(
                    `Rule 1: Decide the jobs before the hues (60% Background, 30% Text/Surfaces, 10% Action).\nRule 2: Tie each colour to the brand story so the palette never drifts.\nRule 3: Spend the action colour strictly once per viewport.`,
                    '60-30-10 Agent Rules'
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-[#0E0E10] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy 60-30-10 Prompt
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  src: '/assets/aistudio/7ad349894f2e0ec255081bc326fb5162_45a3d173.webp',
                  caption: 'Slide 1: Stop picking colours. Give each one a job.'
                },
                {
                  src: '/assets/aistudio/9dbcc5967e993c5964955caa7e5ee4bd_efce7b21.webp',
                  caption: 'Slide 2: Decide the jobs before the hues (60/30/10).'
                },
                {
                  src: '/assets/aistudio/bc8a72e3b0028361382e25512c093eb9_79a3bb1b.webp',
                  caption: 'Slide 3: Tie each one to the story (Cairn).'
                },
                {
                  src: '/assets/aistudio/8c426738fb8765e947f015e5c5d692d3_d4041656.webp',
                  caption: 'Slide 4: Spend the action colour once.'
                }
              ].map((slide) => (
                <div
                  key={slide.src}
                  className="rounded-lg border border-[#F4F1EA]/10 bg-[#0E0E10] p-2 flex flex-col justify-between"
                >
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded object-cover"
                  />
                  <p className="mt-2 px-1 text-xs text-[#9A9890]">{slide.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 20 WAYS TO UNSLOP AI DESIGNS (@charles.unemployed) */}
      {subTab === 'unslop-20' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
              {['All', 'Typography', 'Layout & Spacing', 'Color & Contrast', 'Components & Polish'].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setUnslopCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      unslopCategory === cat
                        ? 'bg-[#F4F1EA] text-[#0E0E10]'
                        : 'text-[#9A9890] hover:text-[#F4F1EA]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                onCopyText(
                  UNSLOP_RULES.map((r) => `${r.index}. ${r.title}: ${r.agentInstruction}`).join('\n'),
                  'All 20 Unslop Agent Rules'
                )
              }
              className="px-4 py-2 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All 20 Agent Rules
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUnslop.map((rule) => (
              <div
                key={rule.index}
                className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-[#9A9890] font-mono tabular-nums">
                      <span>Rule {String(rule.index).padStart(2, '0')}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{rule.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(rule.agentInstruction, `Rule #${rule.index}: ${rule.title}`)
                      }
                      className="text-xs text-[#9A9890] hover:text-[#F4F1EA] flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                      Copy directive
                    </button>
                  </div>

                  <h3 className="mt-1.5 text-lg font-semibold text-[#F4F1EA]">
                    {rule.index}. {rule.title}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-[#0E0E10] p-3 border border-[#F4F1EA]/5">
                      <div className="font-mono text-[#9A9890] mb-1">✕ Before (AI Slop)</div>
                      <p className="text-[#9A9890] leading-relaxed">{rule.beforeMistake}</p>
                    </div>
                    <div className="rounded-lg bg-[#0E0E10] p-3 border border-[#D4FF3A]/20">
                      <div className="font-mono text-[#D4FF3A] mb-1">✓ After (Clean UI)</div>
                      <p className="text-[#F4F1EA] leading-relaxed">{rule.afterFix}</p>
                    </div>
                  </div>
                </div>

                <pre className="mt-4 rounded-lg bg-[#0E0E10] p-3 text-[11px] font-mono text-[#9A9890] overflow-x-auto border border-[#F4F1EA]/10">
                  <code>{rule.codeSnippet}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 22 BACKGROUNDS TO MAKE DESIGNS LESS FLAT */}
      {subTab === 'backgrounds-22' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
              {[
                'All',
                'Texture & Material',
                'Gradients & Light',
                'Grids & Geometry',
                'Artistic & Digital'
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBgCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    bgCategory === cat
                      ? 'bg-[#F4F1EA] text-[#0E0E10]'
                      : 'text-[#9A9890] hover:text-[#F4F1EA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                onCopyText(
                  BACKGROUND_RECIPES.map(
                    (b) => `${b.index}. ${b.name} (${b.category}): ${b.agentPrompt}\nCSS: ${b.cssPattern}`
                  ).join('\n\n'),
                  'All 22 Background Recipes'
                )
              }
              className="px-4 py-2 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All 22 Background Recipes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBgs.map((bg) => (
              <div
                key={bg.index}
                className="rounded-2xl border border-[#F4F1EA]/10 bg-[#16161A] p-2 flex flex-col justify-between"
              >
                {/* Live CSS Swatch Preview (r_inner = 16px - 8px = 8px) */}
                <div>
                  <div
                    className="h-32 w-full rounded-lg border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden"
                    style={parseCssStringToStyle(bg.cssPattern)}
                  >
                    <div className="inline-flex self-start rounded bg-black/65 backdrop-blur-xs px-2 py-0.5 text-[11px] font-mono text-white tabular-nums">
                      #{String(bg.index).padStart(2, '0')} · {bg.category}
                    </div>
                    <div className="rounded bg-black/70 backdrop-blur-xs px-2.5 py-1.5 text-sm font-display font-semibold text-white self-start">
                      {bg.name}
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="text-xs text-[#9A9890] leading-relaxed">{bg.useCase}</p>
                    <p className="mt-2 text-xs text-[#F4F1EA] font-mono bg-[#0E0E10] p-2 rounded border border-[#F4F1EA]/10 truncate">
                      {bg.cssPattern}
                    </p>
                  </div>
                </div>

                <div className="px-3 pb-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onCopyText(bg.cssPattern, `${bg.name} CSS`)}
                    className="px-3 py-1.5 rounded-md bg-[#0E0E10] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                    Copy CSS
                  </button>
                  <button
                    type="button"
                    onClick={() => onApplyTextureToMockup(bg.cssPattern, bg.name)}
                    className="px-3 py-1.5 rounded-md bg-[#F4F1EA]/10 hover:bg-[#F4F1EA]/20 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4FF3A]" />
                    Test on Mockup
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 20 APP LEGAL & ACCESSIBILITY CHECKS (@cooked_dev_) */}
      {subTab === 'compliance-20' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#9A9890] font-mono tabular-nums">
                PRE-LAUNCH AUDIT · {completedCount} OF 20 CHECKS COMPLETED
              </div>
              <h3 className="mt-1 text-lg font-semibold text-[#F4F1EA]">
                20 Things to Have Claude Do So Your App Doesn&apos;t Get Sued
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                onCopyText(
                  `Audit this codebase and implement the following 20 production compliance & WCAG accessibility requirements:\n` +
                    COMPLIANCE_CHECKS.map((c) => `${c.index}. ${c.title}: ${c.claudePrompt}`).join('\n'),
                  '20-Point Claude Audit Mega-Prompt'
                )
              }
              className="px-4 py-2.5 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              Copy Full 20-Point Claude Audit Prompt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {COMPLIANCE_CHECKS.map((item) => {
              const isChecked = !!checkedCompliance[item.index];
              return (
                <div
                  key={item.index}
                  className={`rounded-xl border p-4 transition-colors flex flex-col justify-between ${
                    isChecked
                      ? 'border-[#D4FF3A]/35 bg-[#16161A]'
                      : 'border-[#F4F1EA]/10 bg-[#16161A]/70'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleCompliance(item.index)}
                        className="flex items-center gap-2.5 text-left group"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#D4FF3A] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-[#9A9890] group-hover:text-[#F4F1EA] shrink-0" />
                        )}
                        <span className="text-sm font-semibold text-[#F4F1EA]">
                          {String(item.index).padStart(2, '0')}. {item.title}
                        </span>
                      </button>

                      <span className="text-xs text-[#9A9890] font-mono whitespace-nowrap shrink-0">
                        {item.pillar}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#9A9890] leading-relaxed pl-6">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="mt-3 pl-6 pt-2.5 border-t border-[#F4F1EA]/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#F4F1EA]/80 truncate">
                      Prompt: &ldquo;{item.claudePrompt}&rdquo;
                    </span>
                    <button
                      type="button"
                      onClick={() => onCopyText(item.claudePrompt, `${item.title} prompt`)}
                      className="text-xs font-mono text-[#D4FF3A] hover:underline whitespace-nowrap shrink-0 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
