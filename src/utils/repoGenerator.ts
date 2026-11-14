import {
  ColorPalette,
  EXTRACTED_PALETTES,
  getContrastRatio,
  getPreciseContrastRatio,
  getReadableTextColor,
  getWcagRating,
  isValidHexColor
} from '../data/palettes';
import {
  BACKGROUND_RECIPES,
  COMPLIANCE_CHECKS,
  UNSLOP_RULES
} from '../data/guides';
import { SHOWCASE_PAGES } from '../data/showcasePages';

export type RepoFileId =
  | 'README.md'
  | 'SKILL.md'
  | 'CLAUDE.md'
  | '.cursorrules'
  | 'AGENTS.md'
  | '.agents/skills/chromakit/SKILL.md'
  | '.cursor/rules/chromakit.mdc'
  | '.devin/README.md'
  | 'tokens.json'
  | 'tailwind-v4-theme.css'
  | '/pages/01-leica-mono-hardware.html'
  | '/pages/02-guardbase-ai-security.html'
  | '/pages/03-motto-electric-mobility.html'
  | '/pages/04-olipop-zest-beverage.html'
  | '/pages/05-kontour-arca-studio.html';

export interface GeneratedRepoFile {
  id: RepoFileId;
  filename: string;
  language: 'markdown' | 'json' | 'css' | 'html' | 'bash';
  description: string;
  content: string;
}

function buildStandalonePageHtml(
  pageNumber: string,
  pageTitle: string,
  paletteId: string,
  extraBodyMarkup: string,
  paletteOverride?: ColorPalette
): string {
  const pal =
    paletteOverride ?? EXTRACTED_PALETTES.find((p) => p.id === paletteId) ?? EXTRACTED_PALETTES[0];
  const bg = pal.colors.find((c) => c.role === 'background') ?? pal.colors[0];
  const surf = pal.colors.find((c) => c.role === 'surface') ?? pal.colors[1];
  const act = pal.colors.find((c) => c.role === 'action') ?? pal.colors[2];
  const actText = getReadableTextColor(act.hex);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page ${pageNumber} — ${pageTitle} (${pal.name})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (${pal.name} by ${pal.creator}) */
      --bg-60: ${bg.hex};      /* 60% Background: ${bg.name} */
      --surface-30: ${surf.hex}; /* 30% Surface/Text: ${surf.name} */
      --action-10: ${act.hex};   /* 10% Action: ${act.name} */
      --action-text: ${actText};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-60);
      color: var(--surface-30);
      font-family: "Plus Jakarta Sans", sans-serif;
      line-height: 1.5;
      min-height: 100vh;
    }
    h1, h2, h3, .brand {
      font-family: "Bricolage Grotesque", sans-serif;
      text-wrap: balance;
    }
    code, .mono {
      font-family: "JetBrains Mono", monospace;
      font-variant-numeric: tabular-nums;
    }
    /* Strict 3-Zone Top Bar Contract */
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1.25rem 3rem;
      border-bottom: 1px solid color-mix(in srgb, var(--surface-30) 18%, transparent);
    }
    nav { display: flex; gap: 2rem; font-size: 0.875rem; font-weight: 500; }
    nav a { color: inherit; text-decoration: none; white-space: nowrap; }
    .btn-primary {
      background-color: var(--action-10);
      color: var(--action-text);
      padding: 0.65rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.8125rem;
      border: none;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn-secondary {
      background: transparent;
      color: var(--surface-30);
      padding: 0.65rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.8125rem;
      border: 1px solid color-mix(in srgb, var(--surface-30) 30%, transparent);
      cursor: pointer;
      white-space: nowrap;
    }
    main { max-width: 1280px; margin: 0 auto; padding: 4rem 3rem; }
    .hero-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 3rem; align-items: stretch; }
    /* Rule 14: r_inner = r_outer (16px) - padding (8px) = 8px */
    .card-outer {
      border-radius: 16px;
      padding: 8px;
      border: 1px solid color-mix(in srgb, var(--surface-30) 22%, transparent);
    }
    .card-inner {
      border-radius: 8px;
      padding: 2rem;
      height: 100%;
      background-color: var(--surface-30);
      color: var(--bg-60);
    }
  </style>
</head>
<body>
  <header>
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">${pal.brandName}</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">${pal.ctaLabel}</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE ${pageNumber} · 60% ${bg.name} (${bg.hex}) · 30% ${surf.name} (${surf.hex}) · 10% ${act.name} (${act.hex})
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          ${pal.tagline}
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          ${pal.subcopy}
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">${pal.ctaLabel}</button>
          <button class="btn-secondary">${pal.secondaryCtaLabel}</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          ${extraBodyMarkup}
        </div>
      </div>
    </div>
  </main>
</body>
</html>`;
}

export function generateRepoFiles(
  activePalette: ColorPalette,
  scope: 'all' | 'active',
  activeColors: ColorPalette['colors'] = activePalette.colors
): GeneratedRepoFile[] {
  for (const color of activeColors) {
    if (!isValidHexColor(color.hex)) throw new TypeError(`Cannot export invalid hex color for ${color.name}: ${color.hex}`);
  }
  // Apply user edits to cloned objects; never mutate the canonical palette catalog.
  const exportActivePalette: ColorPalette = {
    ...activePalette,
    colors: activeColors.map((color) => ({ ...color }))
  };
  const palettes = (scope === 'all' ? EXTRACTED_PALETTES : [activePalette]).map(
    (palette) => palette.id === activePalette.id ? exportActivePalette : palette
  );
  const pagePalettes = new Map(palettes.map((palette) => [palette.id, palette]));

  const bg = exportActivePalette.colors.find((c) => c.role === 'background') ?? exportActivePalette.colors[0];
  const surface = exportActivePalette.colors.find((c) => c.role === 'surface') ?? exportActivePalette.colors[1];
  const action = exportActivePalette.colors.find((c) => c.role === 'action') ?? exportActivePalette.colors[2];
  const rare = exportActivePalette.colors.find((c) => c.role === 'rare-accent');

  // 5 Standalone Showcase Web Pages (100% Free & Open-Source)
  const page1Html = buildStandalonePageHtml(
    '01',
    'Leica & Mono Optical Hardware Flagship',
    SHOWCASE_PAGES[0].defaultPaletteId,
    `<div class="mono" style="font-size: 0.75rem;">M11-P RANGEFINDER · 60MP BSI CMOS</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">Summilux-M 35mm f/1.4 ASPH</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Ice blue and midnight ink: clean, but a little cold. Add vermilion—now it feels expensive."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>`,
    pagePalettes.get(SHOWCASE_PAGES[0].defaultPaletteId)
  );

  const page2Html = buildStandalonePageHtml(
    '02',
    'Guardbase AI Security & ASCII Cloud',
    SHOWCASE_PAGES[1].defaultPaletteId,
    `<div class="mono" style="font-size: 0.75rem;">ZERO-TRUST AGENT FIREWALL</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">99.989% Threat Interception</h2>
     <pre class="mono" style="margin-top: 1rem; font-size: 0.7rem; color: var(--action-10);">
        /\\      /\\
       /**\\    /##\\
      /****\\  /####\\
     /******\\/######\\
     </pre>
     <div class="mono" style="margin-top: 1.5rem; font-size: 0.8rem;">$ curl -fsSL guardbase.sh/install | sh</div>`,
    pagePalettes.get(SHOWCASE_PAGES[1].defaultPaletteId)
  );

  const page3Html = buildStandalonePageHtml(
    '03',
    'Motto M-01 Urban Electric Cruiser',
    SHOWCASE_PAGES[2].defaultPaletteId,
    `<div class="mono" style="font-size: 0.75rem;">TWIN-CELL URBAN MOBILITY</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">110 km Range · 70 km/h Top Speed</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Almond cream and petrol teal looks clean right? But add a little electric violet—now look where your eyes go."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>`,
    pagePalettes.get(SHOWCASE_PAGES[2].defaultPaletteId)
  );

  const page4Html = buildStandalonePageHtml(
    '04',
    'Olipop & Zest Botanical Beverage Storefront',
    SHOWCASE_PAGES[3].defaultPaletteId,
    `<div class="mono" style="font-size: 0.75rem;">9G PREBIOTIC FIBER · 2G SUGAR</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">12-Can Custom Variety Pack</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Lemon yellow and cobalt blue looks fun. Add a little hot pink—now the product jumps off the page."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>`,
    pagePalettes.get(SHOWCASE_PAGES[3].defaultPaletteId)
  );

  const page5Html = buildStandalonePageHtml(
    '05',
    'Kontour & Arca Architectural Lighting Studio',
    SHOWCASE_PAGES[4].defaultPaletteId,
    `<div class="mono" style="font-size: 0.75rem;">LUMINAIRE NO. 04 · 2700K WARMTH</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">01. Spatial Luminaires &amp; Systems</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Jet black and soft white already look premium, but add flame orange and now the whole thing is bold."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>`,
    pagePalettes.get(SHOWCASE_PAGES[4].defaultPaletteId)
  );

  // 1. README.md
  const readmeContent = `# ChromaKit — Curated Color Combinations, 5 Showcase Pages & AI Agent Skill

> Machine-readable color combinations, 5 production web page templates, 60-30-10 role allocation rules, UI unslop directives, and background recipes built for **human developers** and **AI coding agents** (Claude Code, Cursor, Windsurf, AI Studio).

---

## AI agent instruction discovery

SKILL.md is the canonical source. Run npm run sync-rules after editing it. Discovery varies by tool; automatic discovery is not claimed for every file. AGENTS.md targets agents supporting that convention; .agents/skills/chromakit/SKILL.md is a reusable skill; CLAUDE.md and .cursor/rules/chromakit.mdc target Claude Code and Cursor; .cursorrules is retained for legacy compatibility. .devin/README.md is a manual reference only.

---

## Included 5 Showcase Web Pages (\`/pages\`)

1. **\`/pages/01-leica-mono-hardware.html\`**: Precision Optical & Audio Hardware Flagship (*Ice Blue \`#D5E5F0\` · Midnight Ink \`#081D2B\` · Vermilion \`#EE4222\`*)
2. **\`/pages/02-guardbase-ai-security.html\`**: AI Security & ASCII Cloud Console (*Paper White \`#FFFFFF\` · Ink Black \`#0B0B0B\` · Cornflower Blue \`#5482FF\`*)
3. **\`/pages/03-motto-electric-mobility.html\`**: Urban Electric Cruiser Configurator (*Almond Cream \`#F3ECC8\` · Petrol Teal \`#0D5258\` · Electric Violet \`#A862F7\`*)
4. **\`/pages/04-olipop-zest-beverage.html\`**: Botanical Beverage D2C Storefront (*Lemon Yellow \`#F4E452\` · Cobalt Blue \`#0D32B8\` · Hot Pink \`#FF318C\`*)
5. **\`/pages/05-kontour-arca-studio.html\`**: Architectural Lighting & Design Studio (*Jet Black \`#0B0B0B\` · Soft White \`#F3F3F2\` · Flame Orange \`#FF4D00\`*)

---

## Core Color Philosophy: Give Every Colour a Job

1. **Decide the jobs before the hues (60-30-10 Split)**:
   - **60% Background (\`--color-bg\`)**: Dominant neutral or atmospheric canvas.
   - **30% Surface & Typography (\`--color-surface\`)**: High-contrast text, structural cards, and hairline dividers.
   - **10% Action (\`--color-action\`)**: Primary interactive focal point.
   - **Rare Accent (\`--color-accent-rare\`, optional)**: Sits outside the 60-30-10 split. No job? Cut it.
2. **Two Quiet Foundations + One Loud Focal Accent**:
   - The first two colors set the mood and structural legibility. The third color creates an unmistakable focal point.
3. **Spend the Action Colour Once**:
   - Put the 10% action color on everything and it stops meaning anything. Reserve it strictly for the single clearest next step per viewport.

---

## Attribution & Sources

The curated, growing catalog of color systems below was compiled from public color-system posts
by four TikTok creators: [@vixdesignz](https://www.tiktok.com/@vixdesignz),
[@toolandtea](https://www.tiktok.com/@toolandtea), [@bymarcoperez](https://www.tiktok.com/@bymarcoperez),
and [@asongstudio_](https://www.tiktok.com/@asongstudio_). Hex values, role allocations,
and the "why it works" quotes are credited to them individually in each entry
below. This repository's code, documentation structure, showcase pages, and
AI agent skill files are original and licensed under MIT (see LICENSE);
the cited palette curation itself is not claimed as original work.

---

## Complete Extracted Color Catalog (A Curated, Growing Catalog of Color Systems)

${palettes
  .map((p, idx) => {
    const pBg = p.colors.find((c) => c.role === 'background') ?? p.colors[0];
    const pSurf = p.colors.find((c) => c.role === 'surface') ?? p.colors[1];
    const pAct = p.colors.find((c) => c.role === 'action') ?? p.colors[2];
    const pRare = p.colors.find((c) => c.role === 'rare-accent');
    return `### ${idx + 1}. ${p.name} (\`${p.id}\`) — *${p.category}*
- **60% Background**: ${pBg.name} (\`${pBg.hex}\`)
- **30% Surface / Text**: ${pSurf.name} (\`${pSurf.hex}\`) — Contrast: \`${getContrastRatio(pBg.hex, pSurf.hex)}:1 (${getWcagRating(getPreciseContrastRatio(pBg.hex, pSurf.hex))})\`
- **10% Action Accent**: ${pAct.name} (\`${pAct.hex}\`)
${pRare ? `- **Rare Accent**: ${pRare.name} (\`${pRare.hex}\`)\n` : ''}- **Why It Works**: *"${p.storyQuote}"* (${p.creator})`;
  })
  .join('\n\n')}

---

## 20 Ways to Unslop AI Designs (@charles.unemployed)

| # | Rule | Before (AI Slop) | After (Production Grade) |
| :--- | :--- | :--- | :--- |
${UNSLOP_RULES.map(
  (r) => `| ${r.index} | **${r.title}** | ${r.beforeMistake} | ${r.afterFix} |`
).join('\n')}

---

## 22 Backgrounds to Make Designs Less Flat (@charles.unemployed)

${BACKGROUND_RECIPES.map(
  (b) => `${b.index}. **${b.name}** (*${b.category}*): ${b.useCase}`
).join('\n')}

---

## 20 App Legal, Privacy & Accessibility Checks (@cooked_dev_)

${COMPLIANCE_CHECKS.map(
  (c) => `- [ ] **${c.index}. ${c.title}** (*${c.pillar}*): ${c.whyItMatters}`
).join('\n')}

---

## Maintaining

\`SKILL.md\` is the single source of truth for all AI coding agent rules in this repository. Both \`CLAUDE.md\` and \`.cursorrules\` are auto-generated from \`SKILL.md\` (with YAML frontmatter stripped).

After editing \`SKILL.md\` by hand, propagate your changes by running:

\`\`\`bash
npm run sync-rules
\`\`\`
`;

  // 2. SKILL.md
  const skillBody = `# ChromaKit Agent Skill: Color Combinations & Anti-Slop Rules

## 1. Functional Color Role Rules (@vixdesignz & Purist Method)

Never pick colors at random or default to generic indigo/purple gradients. Every color in the palette must have an explicit job:

1. **Decide the Jobs Before the Hues (60-30-10 Split)**:
   - **60% Background (\`--color-bg\`)**: Dominant canvas.
   - **30% Text & Surfaces (\`--color-surface\`)**: Primary typography, cards, and subtle hairline borders.
   - **10% Action (\`--color-action\`)**: Primary interactive CTA.
   - **Rare Accent (\`--color-accent-rare\`)**: Optional 4th token sitting outside the split. If it has no clear job, cut it.
2. **Spend the Action Colour Once**:
   - Never style 3 stacked buttons with the same primary action fill ("Three buttons fight").
   - Style the single primary CTA with \`--color-action\` and demote secondary actions to neutral surface outlines ("One clear next step").
3. **Two Quiet Colors + One Loud Color**:
   - Let the 60% background and 30% surface establish calm, high-contrast legibility. Let the 10% action color create personality and guide the eye.

## 2. Active Project Palette: ${activePalette.name} (\`${activePalette.id}\`)

\`\`\`css
:root {
  --color-bg: ${bg.hex};          /* 60% Job: ${bg.name} — ${bg.jobDescription} */
  --color-surface: ${surface.hex}; /* 30% Job: ${surface.name} — ${surface.jobDescription} */
  --color-action: ${action.hex};   /* 10% Job: ${action.name} — ${action.jobDescription} */${
    rare
      ? `\n  --color-accent-rare: ${rare.hex}; /* Rare Accent: ${rare.name} — ${rare.jobDescription} */`
      : ''
  }
}
\`\`\`

## 3. Approved Alternative Palettes Catalog

A curated, growing catalog of color systems:

| ID | Name | Category | Posture | 60% Background | 30% Surface/Text | 10% Action | Rare Accent |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${palettes
  .map((p) => {
    const pBg = p.colors.find((c) => c.role === 'background') ?? p.colors[0];
    const pSurf = p.colors.find((c) => c.role === 'surface') ?? p.colors[1];
    const pAct = p.colors.find((c) => c.role === 'action') ?? p.colors[2];
    const pRare = p.colors.find((c) => c.role === 'rare-accent');
    return `| \`${p.id}\` | ${p.name} | ${p.category} | ${p.posture} | ${pBg.name} (\`${pBg.hex}\`) | ${pSurf.name} (\`${pSurf.hex}\`) | ${pAct.name} (\`${pAct.hex}\`) | ${pRare ? `${pRare.name} (\`${pRare.hex}\`)` : '—'} |`;
  })
  .join('\n')}

## 4. Mandatory 20 Anti-Slop UI Directives

${UNSLOP_RULES.map((r) => `${r.index}. **${r.title}**: ${r.agentInstruction}`).join('\n')}

## 5. Approved Non-Flat Background Treatments

${BACKGROUND_RECIPES.map((b) => `- **${b.name}** (${b.category}): ${b.agentPrompt}`).join('\n')}

## 6. Pre-Ship Accessibility & Compliance Checklist

${COMPLIANCE_CHECKS.map((c) => `- [ ] **${c.title}**: ${c.claudePrompt}`).join('\n')}
`;

  const skillContent = `---
name: "chromakit-color-and-design-system"
description: >-
  Enforces curated 60-30-10 color combinations, functional color role assignments,
  the 20 Ways to Unslop AI Designs, 22 non-flat background recipes, and 20 WCAG/legal
  production checks. Read this skill before generating or styling any UI component.
---

${skillBody}`;

  const syncedRulesContent = `<!-- AUTO-GENERATED from SKILL.md. Edit SKILL.md, then run \`npm run sync-rules\`. -->\n\n${skillBody}`;
  const cursorMdcContent = `---\ndescription: ChromaKit colour roles, contrast, and UI design rules\nglobs: **/*\nalwaysApply: true\n---\n\n${skillBody}`;
  const agentSkillContent = `---\nname: chromakit\ndescription: ChromaKit palette, contrast, and interface design guidance. Use when building or editing UI.\n---\n\n${skillBody}`;
  const devinReferenceContent = `# Devin repository guidance\n\nThis generated reference mirrors the shared ChromaKit instructions in [AGENTS.md](../AGENTS.md) and [SKILL.md](../SKILL.md). Keep both in sync with \`npm run sync-rules\`. This file is provided for explicit/manual use; it does not claim automatic discovery by Devin.\n`;

  // Claude, Cursor, and generic agent instruction files remain synchronized to the skill.
  const claudeContent = syncedRulesContent;
  const cursorRulesContent = syncedRulesContent;

  // 5. tokens.json
  const tokensPayload = {
    $schema: 'https://tr.designtokens.org/format/',
    meta: {
      generator: 'ChromaKit Studio',
      philosophy: '60% Background, 30% Surface/Text, 10% Action Accent. Spend the action colour once.',
      activePaletteId: activePalette.id,
      totalPalettes: palettes.length
    },
    showcasePages: SHOWCASE_PAGES.map((page) => ({
      page: page.number,
      file: page.staticUrl,
      paletteId: page.defaultPaletteId
    })),
    palettes: Object.fromEntries(
      palettes.map((p) => [
        p.id,
        {
          name: p.name,
          brandExample: p.brandName,
          creator: p.creator,
          category: p.category,
          posture: p.posture,
          storyQuote: p.storyQuote,
          colors: p.colors.map((c) => ({
            role: c.role,
            name: c.name,
            hex: c.hex,
            percentage: c.percentage,
            pantone: c.pantone ?? undefined,
            jobDescription: c.jobDescription
          }))
        }
      ])
    )
  };

  // 6. tailwind-v4-theme.css
  const cssContent = `/* ChromaKit — Tailwind CSS v4 @theme & Custom Properties */
@import "tailwindcss";

@theme {
  /* Active 60-30-10 Functional Tokens (${activePalette.name}) */
  --color-canvas: ${bg.hex};
  --color-surface: ${surface.hex};
  --color-action: ${action.hex};${rare ? `\n  --color-accent-rare: ${rare.hex};` : ''}

  /* Complete Extracted Palette Token Library */
${palettes
  .map((p) => {
    const pBg = p.colors.find((c) => c.role === 'background') ?? p.colors[0];
    const pSurf = p.colors.find((c) => c.role === 'surface') ?? p.colors[1];
    const pAct = p.colors.find((c) => c.role === 'action') ?? p.colors[2];
    const pRare = p.colors.find((c) => c.role === 'rare-accent');
    return `  /* ${p.name} (${p.brandName}) */
  --color-${p.id}-bg: ${pBg.hex};
  --color-${p.id}-surface: ${pSurf.hex};
  --color-${p.id}-action: ${pAct.hex};${pRare ? `\n  --color-${p.id}-rare: ${pRare.hex};` : ''}`;
  })
  .join('\n\n')}
}
`;

  return [
    {
      id: 'SKILL.md',
      filename: 'SKILL.md',
      language: 'markdown',
      description: 'AI Coding Agent Skill file with 60-30-10 color rules, catalog table, and 20 anti-slop directives.',
      content: skillContent
    },
    {
      id: 'README.md',
      filename: 'README.md',
      language: 'markdown',
      description: 'GitHub repository documentation with all extracted color combinations, 5 pages index, and guides.',
      content: readmeContent
    },
    {
      id: 'CLAUDE.md',
      filename: 'CLAUDE.md',
      language: 'markdown',
      description: 'Root-level instructions for Claude Code enforcing the active palette and UI quality rules.',
      content: claudeContent
    },
    {
      id: '.cursorrules',
      filename: '.cursorrules',
      language: 'markdown',
      description: 'Legacy Cursor rules file, kept synchronized for existing repositories.',
      content: cursorRulesContent
    },
    {
      id: 'AGENTS.md',
      filename: 'AGENTS.md',
      language: 'markdown',
      description: 'Shared repository instructions for coding agents that discover AGENTS.md.',
      content: syncedRulesContent
    },
    {
      id: '.agents/skills/chromakit/SKILL.md',
      filename: '.agents/skills/chromakit/SKILL.md',
      language: 'markdown',
      description: 'Reusable ChromaKit agent skill with standard skill frontmatter.',
      content: agentSkillContent
    },
    {
      id: '.cursor/rules/chromakit.mdc',
      filename: '.cursor/rules/chromakit.mdc',
      language: 'markdown',
      description: 'Cursor project rule in MDC format, generated from the shared ChromaKit skill.',
      content: cursorMdcContent
    },
    {
      id: '.devin/README.md',
      filename: '.devin/README.md',
      language: 'markdown',
      description: 'Manual Devin reference; automatic repository discovery is not assumed.',
      content: devinReferenceContent
    },
    {
      id: 'tokens.json',
      filename: 'tokens.json',
      language: 'json',
      description: 'W3C Design Token JSON schema containing hex values, Pantone codes, and 5 page mappings.',
      content: JSON.stringify(tokensPayload, null, 2)
    },
    {
      id: 'tailwind-v4-theme.css',
      filename: 'tailwind-v4-theme.css',
      language: 'css',
      description: 'Tailwind CSS v4 @theme block and semantic CSS custom properties for all extracted palettes.',
      content: cssContent
    },
    {
      id: '/pages/01-leica-mono-hardware.html',
      filename: '01-leica-mono-hardware.html',
      language: 'html',
      description: 'Page 01: Leica & Mono Precision Optical Hardware Flagship (Ice Blue, Midnight Ink, Vermilion).',
      content: page1Html
    },
    {
      id: '/pages/02-guardbase-ai-security.html',
      filename: '02-guardbase-ai-security.html',
      language: 'html',
      description: 'Page 02: Guardbase AI Security & ASCII Cloud (Paper White, Ink Black, Cornflower Blue).',
      content: page2Html
    },
    {
      id: '/pages/03-motto-electric-mobility.html',
      filename: '03-motto-electric-mobility.html',
      language: 'html',
      description: 'Page 03: Motto M-01 Urban Electric Cruiser (Almond Cream, Petrol Teal, Electric Violet).',
      content: page3Html
    },
    {
      id: '/pages/04-olipop-zest-beverage.html',
      filename: '04-olipop-zest-beverage.html',
      language: 'html',
      description: 'Page 04: Olipop & Zest Botanical Beverage Storefront (Lemon Yellow, Cobalt Blue, Hot Pink).',
      content: page4Html
    },
    {
      id: '/pages/05-kontour-arca-studio.html',
      filename: '05-kontour-arca-studio.html',
      language: 'html',
      description: 'Page 05: Kontour & Arca Architectural Lighting Studio (Jet Black, Soft White, Flame Orange).',
      content: page5Html
    }
  ];
}
