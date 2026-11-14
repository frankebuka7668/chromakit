import React, { useMemo, useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  Download,
  Film,
  Search,
  Terminal
} from 'lucide-react';
import {
  ColorPalette,
  EXTRACTED_PALETTES,
  PaletteCategory,
  PaletteColor,
  getContrastRatio,
  getPreciseContrastRatio,
  getWcagRating,
  isValidHexColor
} from './data/palettes';
import { LiveMockupStage } from './components/LiveMockupStage';
import { DesignGuidesView } from './components/DesignGuidesView';
import { RepoGeneratorView } from './components/RepoGeneratorView';
import { ShowcasePagesView } from './components/ShowcasePagesView';
import { RepoFileId, generateRepoFiles } from './utils/repoGenerator';
import { copyTextToClipboard, downloadBlob } from './utils/browser';

type ActiveSection = 'showcase' | 'palettes' | 'guides' | 'repo' | 'sources';

const SOURCE_VIDEOS = [
  {
    id: 'video-toolandtea',
    title: '3 Foundation + 1 Accent Color Triads',
    creator: '@toolandtea',
    path: '/assets/aistudio/9899eb4223a91d85b21c105186c09a7d_c5edba83.mp4',
    summary: 'Mark Tennis Club (Midnight Navy + Cloud White + Electric Lime), Kontour (Jet Black + Soft White + Flame Orange), Guardbase (Paper White + Ink Black + Cornflower Blue).'
  },
  {
    id: 'video-marco-1',
    title: 'Purist 3-Color Combinations Vol. 1',
    creator: '@bymarcoperez',
    path: '/assets/aistudio/e36fafbf3e5e9b12cd796b26fe3aa1a6_f34b9ae8.mp4',
    summary: 'Olipop (Lemon Yellow + Cobalt Blue + Hot Pink), Leica (Ice Blue + Midnight Ink + Vermilion), Afterhour (Forest Green + Ivory + Coral).'
  },
  {
    id: 'video-marco-2',
    title: 'Purist 3-Color Combinations Vol. 2',
    creator: '@bymarcoperez',
    path: '/assets/aistudio/53a4730821af12d64fd85947e05d2401_057f51d9.mp4',
    summary: 'Good Company (Sky Blue + Cloud White + Vermilion), Offscript (Red Orange + Snow White + Acid Yellow), Nightline (Sapphire Blue + Ocean Cyan + Neon Jade).'
  },
  {
    id: 'video-marco-3',
    title: 'Purist 3-Color Combinations Vol. 3',
    creator: '@bymarcoperez',
    path: '/assets/aistudio/b4ae09a4c14f0d16451e9cd815206449_83a8ac7d.mp4',
    summary: 'Zest (Mandarin Orange + Forest Green + Crest Yellow), Forma (Onyx Black + Electric Indigo + Tropical Mint), Prism (Teal Blue + Navy Blue + Crimson Pink).'
  },
  {
    id: 'video-marco-4',
    title: 'Purist 3-Color Combinations Vol. 4',
    creator: '@bymarcoperez',
    path: '/assets/aistudio/6e16f73df337929893f2efbd8783d00e_776e9e9a.mp4',
    summary: 'Bonbon (Sugar Violet + Vanilla Cream + Cherry Red), Solar (Pool Blue + Dark Cocoa + Solar Yellow), Mono (Porcelain + Carbon + Ultramarine).'
  },
  {
    id: 'video-marco-5',
    title: 'Purist 3-Color Combinations Vol. 5',
    creator: '@bymarcoperez',
    path: '/assets/aistudio/422105b5461eae358bb97bd86dac63bc_c2417fa5.mp4',
    summary: 'Motto (Almond Cream + Petrol Teal + Electric Violet), Dotto (Apricot + Mulberry + Pool Mint), Arca (Salt Grey + Deep Olive + Hibiscus Pink).'
  },
  {
    id: 'video-asongstudio',
    title: '4-Color Industry Brand Palettes (Pantone)',
    creator: '@asongstudio_',
    path: '/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4',
    summary: 'Veyra Tech Brand, Little Crumb Cafe, Atelier Law Firm, and Oriel Skincare 4-color Pantone systems.'
  },
  {
    id: 'video-backgrounds-22',
    title: '22 Backgrounds to Make Designs Less Flat',
    creator: '@charles.unemployed',
    path: '/assets/aistudio/17679cdeb42247d4a06fb8b16ee6adef_ea3ae57b.mp4',
    summary: 'Felt texture, fluted glass, thermal gradients, water ripples, speckled graphite, blueprint grids, halftone, ASCII & pixels, and more.'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('showcase');
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>(
    EXTRACTED_PALETTES[0].id
  );
  const [customColorsMap, setCustomColorsMap] = useState<Record<string, PaletteColor[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | PaletteCategory>('All');
  const [selectedPosture, setSelectedPosture] = useState<'All' | 'dark' | 'light'>('All');
  const [selectedCreator, setSelectedCreator] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heroComparisonMode, setHeroComparisonMode] = useState<'chromakit' | 'slop'>('chromakit');
  const [activeTexture, setActiveTexture] = useState<{
    css: string;
    name: string;
  } | null>(null);

  const activePalette: ColorPalette = useMemo(
    () =>
      EXTRACTED_PALETTES.find((p) => p.id === selectedPaletteId) ??
      EXTRACTED_PALETTES[0],
    [selectedPaletteId]
  );

  const activeColors: PaletteColor[] = useMemo(
    () => customColorsMap[activePalette.id] ?? activePalette.colors,
    [customColorsMap, activePalette]
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 1800);
  };

  const handleCopyText = async (text: string, label: string): Promise<boolean> => {
    const copied = await copyTextToClipboard(text);
    triggerToast(copied ? `Copied ${label}` : `Could not copy ${label}. Please copy it manually.`);
    return copied;
  };

  const handleDownloadRepoFile = (fileId: RepoFileId) => {
    const files = generateRepoFiles(activePalette, 'all', activeColors);
    const target = files.find((f) => f.id === fileId);
    if (!target) return;
    try {
      downloadBlob(new Blob([target.content], { type: 'text/plain;charset=utf-8' }), target.filename);
      triggerToast(`Downloaded ${target.filename}`);
    } catch {
      triggerToast(`Could not download ${target.filename}. Please try again.`);
    }
  };

  const handleCopyRepoFile = (fileId: RepoFileId) => {
    const files = generateRepoFiles(activePalette, 'all', activeColors);
    const target = files.find((f) => f.id === fileId);
    if (!target) return;
    handleCopyText(target.content, target.filename);
  };

  const handleSwapRoles = (indexA: number, indexB: number) => {
    const current = [...activeColors];
    if (!current[indexA] || !current[indexB]) return;
    const tempHex = current[indexA].hex;
    const tempName = current[indexA].name;
    const tempPantone = current[indexA].pantone;

    current[indexA] = {
      ...current[indexA],
      hex: current[indexB].hex,
      name: current[indexB].name,
      pantone: current[indexB].pantone
    };
    current[indexB] = {
      ...current[indexB],
      hex: tempHex,
      name: tempName,
      pantone: tempPantone
    };

    setCustomColorsMap((prev) => ({
      ...prev,
      [activePalette.id]: current
    }));
    triggerToast('Swapped 60% Background and 30% Surface roles');
  };

  const handleUpdateHex = (index: number, newHex: string) => {
    if (!isValidHexColor(newHex)) {
      triggerToast('Enter a valid hex color in #RGB or #RRGGBB format.');
      return;
    }
    const current = [...activeColors];
    if (!current[index]) return;
    current[index] = {
      ...current[index],
      hex: newHex
    };
    setCustomColorsMap((prev) => ({
      ...prev,
      [activePalette.id]: current
    }));
  };

  const handleResetPalette = () => {
    setCustomColorsMap((prev) => {
      const next = { ...prev };
      delete next[activePalette.id];
      return next;
    });
    triggerToast(`Reset ${activePalette.name} to original video tokens`);
  };

  const handleApplyTextureToMockup = (cssPattern: string, name: string) => {
    setActiveTexture({ css: cssPattern, name });
    setActiveSection('palettes');
    triggerToast(`Applied "${name}" overlay to Live Mockup Stage`);
  };

  const filteredPalettes = useMemo(() => {
    return EXTRACTED_PALETTES.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedPosture !== 'All' && p.posture !== selectedPosture) return false;
      if (selectedCreator !== 'All' && p.creator !== selectedCreator) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brandName.toLowerCase().includes(q);
        const matchCreator = p.creator.toLowerCase().includes(q);
        const matchColor = p.colors.some(
          (c) =>
            c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)
        );
        return matchName || matchBrand || matchCreator || matchColor;
      }
      return true;
    });
  }, [selectedCategory, selectedPosture, selectedCreator, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#F4F1EA] flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-10 py-4 border-b border-[#F4F1EA]/10 bg-[#0E0E10]/90 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('showcase');
          }}
          className="font-display text-lg font-bold tracking-tight text-[#F4F1EA] whitespace-nowrap shrink-0"
        >
          ChromaKit
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9A9890]">
          <button
            type="button"
            onClick={() => setActiveSection('showcase')}
            className={`hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeSection === 'showcase'
                ? 'text-[#F4F1EA] underline underline-offset-8 decoration-[#FF4D1F] decoration-2'
                : ''
            }`}
          >
            5 Live Websites
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('palettes')}
            className={`hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeSection === 'palettes'
                ? 'text-[#F4F1EA] underline underline-offset-8 decoration-[#FF4D1F] decoration-2'
                : ''
            }`}
          >
            {EXTRACTED_PALETTES.length} Color Systems
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('guides')}
            className={`hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeSection === 'guides'
                ? 'text-[#F4F1EA] underline underline-offset-8 decoration-[#FF4D1F] decoration-2'
                : ''
            }`}
          >
            Unslop &amp; Backgrounds
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('sources')}
            className={`hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeSection === 'sources'
                ? 'text-[#F4F1EA] underline underline-offset-8 decoration-[#FF4D1F] decoration-2'
                : ''
            }`}
          >
            Source Videos
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleCopyRepoFile('SKILL.md')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#FF4D1F] rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            Copy SKILL.md
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto px-6 py-2.5 border-b border-[#F4F1EA]/10 bg-[#16161A]">
        {[
          { id: 'showcase', label: '5 Live Websites' },
          { id: 'palettes', label: `${EXTRACTED_PALETTES.length} Color Systems` },
          { id: 'guides', label: 'Unslop & Backgrounds' },
          { id: 'sources', label: 'Source Videos' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id as ActiveSection)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 ${
              activeSection === tab.id
                ? 'bg-[#F4F1EA] text-[#0E0E10]'
                : 'text-[#9A9890]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Container (1440px baseline) */}
      <main id="top" className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-8 space-y-12">
        {/* HIGH-CONVICTION OPEN-SOURCE HERO: WHY DEVELOPERS & AI AGENTS USE CHROMAKIT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-[#F4F1EA]/10">
          {/* Left 7 Cols: Value Proposition & Instant Agent Install Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A9890] font-mono tabular-nums">
                <span>OPEN-SOURCE DESIGN SYSTEM REPOSITORY</span>
                <span aria-hidden="true">·</span>
                <span>100% FREE MIT LICENSE</span>
                <span aria-hidden="true">·</span>
                <span>BUILT FOR HUMANS &amp; AI AGENTS</span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F4F1EA] leading-[1.06]">
                Stop AI agents from shipping generic purple gradients.{' '}
                <span className="text-[#FF4D1F]">Give every colour a job.</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#9A9890] max-w-2xl leading-relaxed">
                When you ask Claude Code, Cursor, or Windsurf to build a UI without design guardrails, you get glowing indigo blobs, competing CTA buttons, and low-contrast grey text. <strong className="text-[#F4F1EA]">ChromaKit</strong> is a drop-in open-source repository containing <strong className="text-[#F4F1EA]">{EXTRACTED_PALETTES.length} human-curated 60-30-10 color systems</strong>, <strong className="text-[#F4F1EA]">5 full production websites</strong>, and <strong className="text-[#F4F1EA]">20 anti-slop rules</strong> that your coding agent reads automatically.
              </p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyRepoFile('SKILL.md')}
                  className="px-5 py-3 rounded-lg bg-[#FF4D1F] text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy SKILL.md for Agents</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyRepoFile('CLAUDE.md')}
                  className="px-4 py-3 rounded-lg bg-[#16161A] border border-[#F4F1EA]/20 hover:border-[#F4F1EA]/50 text-sm font-medium text-[#F4F1EA] flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Copy CLAUDE.md</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyRepoFile('.cursorrules')}
                  className="px-4 py-3 rounded-lg bg-[#16161A] border border-[#F4F1EA]/20 hover:border-[#F4F1EA]/50 text-sm font-medium text-[#F4F1EA] flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Copy .cursorrules</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadRepoFile('tokens.json')}
                  className="px-4 py-3 rounded-lg bg-[#16161A] border border-[#F4F1EA]/20 hover:border-[#F4F1EA]/50 text-sm font-medium text-[#F4F1EA] flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4 text-[#D4FF3A]" />
                  <span>Download tokens.json</span>
                </button>
              </div>

              {/* Quick Section Jump Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-[#9A9890] font-mono">Jump to:</span>
                <button
                  type="button"
                  onClick={() => setActiveSection('showcase')}
                  className={`px-3 py-1.5 rounded-md border font-medium transition-colors ${
                    activeSection === 'showcase'
                      ? 'bg-[#F4F1EA] text-[#0E0E10] border-[#F4F1EA]'
                      : 'bg-[#16161A] text-[#F4F1EA] border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40'
                  }`}
                >
                  1. Explore 5 Live Websites
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('palettes')}
                  className={`px-3 py-1.5 rounded-md border font-medium transition-colors ${
                    activeSection === 'palettes'
                      ? 'bg-[#F4F1EA] text-[#0E0E10] border-[#F4F1EA]'
                      : 'bg-[#16161A] text-[#F4F1EA] border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40'
                  }`}
                >
                  2. Browse All {EXTRACTED_PALETTES.length} Palettes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('guides')}
                  className={`px-3 py-1.5 rounded-md border font-medium transition-colors ${
                    activeSection === 'guides'
                      ? 'bg-[#F4F1EA] text-[#0E0E10] border-[#F4F1EA]'
                      : 'bg-[#16161A] text-[#F4F1EA] border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40'
                  }`}
                >
                  3. 20 Unslop Rules &amp; 22 Backgrounds
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Proof Card — "Without Repo (AI Slop)" vs "With ChromaKit Repo" */}
          <div className="lg:col-span-5 rounded-2xl border border-[#F4F1EA]/15 bg-[#16161A] p-2 flex flex-col justify-between">
            <div className="rounded-lg bg-[#0E0E10] p-5 h-full flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-[#F4F1EA]/10 pb-3">
                <span className="text-xs font-mono text-[#9A9890]">
                  LIVE AGENT OUTPUT COMPARISON
                </span>
                <div className="inline-flex rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
                  <button
                    type="button"
                    onClick={() => setHeroComparisonMode('slop')}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      heroComparisonMode === 'slop'
                        ? 'bg-[#F4F1EA] text-[#0E0E10]'
                        : 'text-[#9A9890] hover:text-[#F4F1EA]'
                    }`}
                  >
                    ✕ Without Repo
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroComparisonMode('chromakit')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      heroComparisonMode === 'chromakit'
                        ? 'bg-[#FF4D1F] text-white'
                        : 'text-[#9A9890] hover:text-[#F4F1EA]'
                    }`}
                  >
                    ✓ With ChromaKit
                  </button>
                </div>
              </div>

              {heroComparisonMode === 'slop' ? (
                <div className="rounded-xl p-5 border border-purple-500/40 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 space-y-3">
                  <div className="text-[11px] font-mono text-purple-300">
                    ✕ DEFAULT AI AGENT OUTPUT (NO GUARDRAILS)
                  </div>
                  <h3 className="text-lg font-sans font-bold text-white">
                    Supercharge your *next-gen* workflow!
                  </h3>
                  <p className="text-xs text-slate-400">
                    Three competing primary buttons, random italicized words, and generic purple gradients:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button type="button" className="py-2 px-3 rounded-lg bg-purple-600 text-white text-xs font-semibold">
                      Get Started
                    </button>
                    <button type="button" className="py-2 px-3 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl p-5 border border-[#F4F1EA]/15 bg-[#16161A] space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#D4FF3A]">
                    <span>✓ CHROMAKIT AGENT OUTPUT (60-30-10)</span>
                    <span className="tabular-nums">16.8:1 AAA</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#F4F1EA]">
                    Cited answers from production telemetry.
                  </h3>
                  <p className="text-xs text-[#9A9890] leading-relaxed">
                    60% Ink canvas, 30% Bone typography, 10% Flame action spent strictly once on the primary next step:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopyRepoFile('SKILL.md')}
                      className="py-2 px-3 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold"
                    >
                      Copy SKILL.md
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection('repo')}
                      className="py-2 px-3 rounded-lg border border-[#F4F1EA]/25 text-[#F4F1EA] text-xs font-medium"
                    >
                      View Repo Files
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-[#9A9890] font-mono pt-1">
                <span>Works with Claude, Cursor, Windsurf</span>
                <button
                  type="button"
                  onClick={() =>
                    setHeroComparisonMode((prev) =>
                      prev === 'chromakit' ? 'slop' : 'chromakit'
                    )
                  }
                  className="text-[#F4F1EA] underline underline-offset-4"
                >
                  Toggle Comparison
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 0: 5 INTERACTIVE WEB PAGES SHOWCASE */}
        {activeSection === 'showcase' && (
          <ShowcasePagesView
            onCopyText={handleCopyText}
            onNavigateToRepo={(paletteId) => {
              setSelectedPaletteId(paletteId);
              setActiveSection('repo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SECTION 1: PALETTE EXPLORER + LIVE MOCKUP STAGE */}
        {activeSection === 'palettes' && (
          <div className="space-y-10">
            <LiveMockupStage
              palette={activePalette}
              customColors={activeColors}
              onSwapRoles={handleSwapRoles}
              onUpdateHex={handleUpdateHex}
              onResetPalette={handleResetPalette}
              onCopyText={handleCopyText}
              activeTextureCss={activeTexture?.css}
              activeTextureName={activeTexture?.name}
              onClearTexture={() => setActiveTexture(null)}
            />

            {/* Filter & Search Toolbar */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-semibold text-[#F4F1EA]">
                    Extracted Color Combinations Catalog ({filteredPalettes.length} of {EXTRACTED_PALETTES.length})
                  </h2>
                  <p className="text-xs text-[#9A9890] mt-0.5">
                    Select any combination to preview its 60-30-10 role distribution in the live stage above or copy individual hex tokens.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#9A9890] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search color, hex, brand, creator..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#16161A] border border-[#F4F1EA]/15 text-xs text-[#F4F1EA] placeholder:text-[#9A9890] focus:outline-none focus:border-[#F4F1EA]/50"
                  />
                </div>
              </div>

              {/* Filter Controls Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
                  {(
                    [
                      'All',
                      'Tech & SaaS',
                      'Editorial & Luxury',
                      'Consumer & Playful',
                      'Industry Systems'
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-[#F4F1EA] text-[#0E0E10]'
                          : 'text-[#9A9890] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
                    {['All', '@bymarcoperez', '@toolandtea', '@asongstudio_', '@vixdesignz'].map(
                      (creator) => (
                        <button
                          key={creator}
                          type="button"
                          onClick={() => setSelectedCreator(creator)}
                          className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 ${
                            selectedCreator === creator
                              ? 'bg-[#F4F1EA] text-[#0E0E10] font-semibold'
                              : 'text-[#9A9890] hover:text-[#F4F1EA]'
                          }`}
                        >
                          {creator}
                        </button>
                      )
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1 rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
                    {(
                      [
                        { id: 'All', label: 'All Postures' },
                        { id: 'dark', label: 'Dark 60%' },
                        { id: 'light', label: 'Light 60%' }
                      ] as const
                    ).map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setSelectedPosture(pos.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          selectedPosture === pos.id
                            ? 'bg-[#F4F1EA] text-[#0E0E10]'
                            : 'text-[#9A9890] hover:text-[#F4F1EA]'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Palette Cards Grid */}
            {filteredPalettes.length === 0 ? (
              <div className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-12 text-center space-y-3">
                <p className="text-base font-medium text-[#F4F1EA]">
                  No color combinations match &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-[#9A9890]">
                  Try clearing your search query or switching category filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedCreator('All');
                    setSelectedPosture('All');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#FF4D1F] text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPalettes.map((palette) => {
                  const isSelected = palette.id === activePalette.id;
                  const bg = palette.colors.find((c) => c.role === 'background') ?? palette.colors[0];
                  const surf = palette.colors.find((c) => c.role === 'surface') ?? palette.colors[1];
                  const act = palette.colors.find((c) => c.role === 'action') ?? palette.colors[2];
                  const rare = palette.colors.find((c) => c.role === 'rare-accent');
                  const contrast = getContrastRatio(bg.hex, surf.hex);
                  const preciseContrast = getPreciseContrastRatio(bg.hex, surf.hex);

                  return (
                    <div
                      key={palette.id}
                      onClick={() => {
                        setSelectedPaletteId(palette.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedPaletteId(palette.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`group text-left rounded-2xl p-2 transition-colors cursor-pointer border flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#FF4D1F] bg-[#16161A]'
                          : 'border-[#F4F1EA]/10 bg-[#16161A]/70 hover:border-[#F4F1EA]/30'
                      }`}
                    >
                      <div>
                        <div className="rounded-lg overflow-hidden border border-white/10 h-28 flex">
                          <div
                            style={{ width: rare ? '50%' : '60%', backgroundColor: bg.hex }}
                            className="p-3 flex flex-col justify-between"
                          >
                            <span
                              style={{ color: surf.hex }}
                              className="font-display text-sm font-bold tracking-tight truncate"
                            >
                              {palette.brandName}
                            </span>
                            <span
                              style={{ color: surf.hex }}
                              className="font-mono text-[11px] opacity-80 tabular-nums"
                            >
                              60% {bg.hex}
                            </span>
                          </div>
                          <div
                            style={{ width: rare ? '25%' : '26%', backgroundColor: surf.hex }}
                            className="p-2.5 flex flex-col justify-end"
                          >
                            <span
                              style={{ color: bg.hex }}
                              className="font-mono text-[10px] opacity-85 tabular-nums truncate"
                            >
                              30% {surf.hex}
                            </span>
                          </div>
                          <div
                            style={{ width: rare ? '15%' : '14%', backgroundColor: act.hex }}
                            className="p-2 flex flex-col justify-end items-center"
                            title={`10% Action: ${act.name} (${act.hex})`}
                          >
                            <span className="font-mono text-[10px] font-bold bg-black/50 text-white px-1 rounded tabular-nums">
                              10%
                            </span>
                          </div>
                          {rare && (
                            <div
                              style={{ width: '10%', backgroundColor: rare.hex }}
                              title={`Rare Accent: ${rare.name} (${rare.hex})`}
                            />
                          )}
                        </div>

                        <div className="p-3">
                          <div className="flex items-center justify-between gap-2 text-xs text-[#9A9890] font-mono tabular-nums">
                            <span>
                              {palette.creator} · {palette.category}
                            </span>
                            <span>
                              {contrast}:1 ({getWcagRating(preciseContrast)})
                            </span>
                          </div>

                          <h3 className="mt-1 text-base font-display font-semibold text-[#F4F1EA] group-hover:text-white">
                            {palette.name}
                          </h3>

                          <p className="mt-1 text-xs text-[#9A9890] line-clamp-2 leading-relaxed">
                            &ldquo;{palette.storyQuote}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div
                        className="px-3 pb-3 pt-2 border-t border-[#F4F1EA]/10 flex flex-wrap items-center justify-between gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-wrap items-center gap-1.5">
                          {palette.colors.map((c) => (
                            <button
                              key={c.role + c.hex}
                              type="button"
                              onClick={() =>
                                handleCopyText(c.hex, `${c.name} (${c.hex})`)
                              }
                              className="px-2 py-1 rounded bg-[#0E0E10] border border-[#F4F1EA]/10 hover:border-[#F4F1EA]/40 text-[11px] font-mono text-[#F4F1EA] flex items-center gap-1.5 tabular-nums whitespace-nowrap shrink-0"
                              title={`${c.role.toUpperCase()}: ${c.name} (${c.hex}) — Click to copy`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-xs shrink-0 border border-white/20"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span>{c.hex}</span>
                            </button>
                          ))}
                        </div>

                        <span className="text-[11px] font-semibold text-[#FF4D1F] whitespace-nowrap shrink-0">
                          {isSelected ? 'Active ✓' : 'Test Live →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: DESIGN GUIDES & TEXTURE LAB */}
        {activeSection === 'guides' && (
          <DesignGuidesView
            activePalette={activePalette}
            onCopyText={handleCopyText}
            onApplyTextureToMockup={handleApplyTextureToMockup}
          />
        )}

        {/* SECTION 3: GITHUB REPOSITORY FILE GENERATOR */}
        {activeSection === 'repo' && (
          <RepoGeneratorView
            activePalette={activePalette}
            activeColors={activeColors}
            onCopyText={handleCopyText}
          />
        )}

        {/* SECTION 4: SOURCE VIDEOS & SLIDES VERIFICATION GALLERY */}
        {activeSection === 'sources' && (
          <div className="space-y-8">
            <div className="border-b border-[#F4F1EA]/10 pb-5">
              <div className="text-xs text-[#9A9890] font-mono">
                8 UPLOADED VIDEOS + 4 SPECIFICATION SLIDES
              </div>
              <h2 className="mt-1 text-2xl font-display font-semibold text-[#F4F1EA]">
                Original Reference Media Library
              </h2>
              <p className="mt-1 text-sm text-[#9A9890]">
                Every palette, hex code, and checklist item in ChromaKit was extracted from these uploaded videos and images. Play any clip below to cross-check the extracted combinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOURCE_VIDEOS.map((vid) => (
                <div
                  key={vid.id}
                  className="rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-5 flex flex-col sm:flex-row gap-5 items-center"
                >
                  <video
                    src={vid.path}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-44 h-72 rounded-lg bg-black object-cover shrink-0 border border-[#F4F1EA]/15"
                  />
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#9A9890]">
                      <Film className="w-3.5 h-3.5 text-[#FF4D1F]" />
                      <span>{vid.creator}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[#F4F1EA]">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-[#9A9890] leading-relaxed">
                      {vid.summary}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {EXTRACTED_PALETTES.filter(
                        (p) => p.sourceMediaPath === vid.path
                      ).map((matched) => (
                        <button
                          key={matched.id}
                          type="button"
                          onClick={() => {
                            setSelectedPaletteId(matched.id);
                            setActiveSection('palettes');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1 rounded bg-[#0E0E10] border border-[#F4F1EA]/15 hover:border-[#FF4D1F] text-xs font-mono text-[#F4F1EA] flex items-center gap-1.5 whitespace-nowrap shrink-0"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-xs"
                            style={{ backgroundColor: matched.colors[2]?.hex ?? matched.colors[0].hex }}
                          />
                          <span>Load {matched.brandName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-[#F4F1EA]/10 py-8 px-6 lg:px-10 text-xs text-[#9A9890]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            ChromaKit Open-Source Design System · 100% Free MIT License · Built for Developers &amp; AI Coding Agents
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveSection('showcase')}
              className="hover:text-[#F4F1EA] transition-colors"
            >
              5 Live Websites
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('palettes')}
              className="hover:text-[#F4F1EA] transition-colors"
            >
              {EXTRACTED_PALETTES.length} Color Systems
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('guides')}
              className="hover:text-[#F4F1EA] transition-colors"
            >
              Unslop &amp; Backgrounds
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('sources')}
              className="hover:text-[#F4F1EA] transition-colors"
            >
              Source Videos
            </button>
          </div>
        </div>
      </footer>

      {/* Non-blocking Copy / Action Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 rounded-lg bg-[#F4F1EA] text-[#0E0E10] px-4 py-2.5 text-xs font-semibold shadow-lg border border-black/10 flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-[#0D542E]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
