export interface UnslopRule {
  index: number;
  title: string;
  category: 'Typography' | 'Layout & Spacing' | 'Color & Contrast' | 'Components & Polish';
  beforeMistake: string;
  afterFix: string;
  agentInstruction: string;
  codeSnippet: string;
}

export interface BackgroundRecipe {
  index: number;
  name: string;
  category: 'Texture & Material' | 'Gradients & Light' | 'Grids & Geometry' | 'Artistic & Digital';
  useCase: string;
  cssPattern: string;
  agentPrompt: string;
}

export interface ComplianceCheck {
  index: number;
  title: string;
  pillar: 'Legal Policies' | 'Privacy & Consent' | 'Honest UX & Claims' | 'Accessibility (WCAG)';
  whyItMatters: string;
  claudePrompt: string;
}

// --- Video 2 (@charles.unemployed): 20 Ways to Unslop AI Designs ---
export const UNSLOP_RULES: UnslopRule[] = [
  {
    index: 1,
    title: 'Delete filler badges',
    category: 'Components & Polish',
    beforeMistake: 'Wrapping "NEW: Evals as deploy gates ->" in a glowing neon pill above every headline.',
    afterFix: 'Lead directly with the bold headline ("Agents that survive production.") without a badge crutch.',
    agentInstruction: 'Do not place pill badges, announcement capsules, or sparkle tags above hero headlines.',
    codeSnippet: `<!-- Instead of a top badge + h1, lead directly with h1 -->\n<h1 class="text-5xl font-semibold tracking-tight text-balance">\n  Agents that survive production.\n</h1>`
  },
  {
    index: 2,
    title: 'Drop redundant labels',
    category: 'Typography',
    beforeMistake: 'Putting an uppercase "FAQ" kicker directly above "Questions, answered."',
    afterFix: 'Remove the redundant kicker; "Questions, answered." already communicates the section purpose.',
    agentInstruction: 'Omit redundant micro-kickers when the section heading is self-explanatory.',
    codeSnippet: `<section class="py-16">\n  <h2 class="text-3xl font-semibold">Questions, answered.</h2>\n</section>`
  },
  {
    index: 3,
    title: 'Unitalicize random words',
    category: 'Typography',
    beforeMistake: 'Setting "Small studio. *Wide-open* thinking." with arbitrary italic words for fake editorial flair.',
    afterFix: 'Keep the entire headline in clean, consistent roman weight unless emphasis changes the literal meaning.',
    agentInstruction: 'Do not italicize random words inside display headlines.',
    codeSnippet: `<h1 class="font-serif text-5xl font-normal tracking-tight">\n  Small studio. Wide-open thinking.\n</h1>`
  },
  {
    index: 4,
    title: 'Mono only where needed',
    category: 'Typography',
    beforeMistake: 'Setting marketing body paragraphs or subheadlines in monospace font.',
    afterFix: 'Use proportional sans-serif for prose, reserving monospace strictly for CLI commands (`curl -fsSL...`), hex codes, and metrics.',
    agentInstruction: 'Use monospace fonts strictly for code blocks, terminal commands, hex tokens, and tabular numbers—never for marketing body prose.',
    codeSnippet: `<p class="font-sans text-base text-zinc-300">Monolith reads your entire codebase and runs your tests.</p>\n<code class="font-mono text-sm text-amber-400">$ curl -fsSL monolith.sh/install | sh</code>`
  },
  {
    index: 5,
    title: 'Use a design system',
    category: 'Components & Polish',
    beforeMistake: 'Mixing mismatched neon purple buttons, cyan outlines, and arbitrary border radii in the same toolbar.',
    afterFix: 'Standardize control heights, neutral surface fills, hairline borders, and a single semantic accent color.',
    agentInstruction: 'Enforce consistent token scales for control height (e.g. h-9), border radius, and neutral surface elevation.',
    codeSnippet: `<div class="inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">\n  <button class="px-3 py-1 text-xs rounded-md bg-zinc-800 text-white">12M</button>\n</div>`
  },
  {
    index: 6,
    title: 'Show the actual product',
    category: 'Components & Polish',
    beforeMistake: 'Placing a generic 3D glowing blue sphere or abstract orb on the right side of the hero section.',
    afterFix: 'Show the real interface state—an interactive query card with cited papers and real product output.',
    agentInstruction: 'Never use abstract 3D orbs or decorative placeholder graphics in the hero; render an interactive preview of the actual product UI.',
    codeSnippet: `<div class="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">\n  <p class="text-sm font-medium">Does sleep improve memory?</p>\n  <p class="mt-2 text-xs text-zinc-600">Yes. Deep sleep replays what you learned [1][2].</p>\n</div>`
  },
  {
    index: 7,
    title: 'Enlarge the main feature',
    category: 'Layout & Spacing',
    beforeMistake: 'Displaying 3 equal-width small columns where nothing commands primary visual hierarchy.',
    afterFix: 'Give the primary value proposition ("Ship without the setup") a dominant 60% column and stack secondary points cleanly.',
    agentInstruction: 'Avoid 3 equal-weight columns for primary features; use an asymmetric split that enlarges the core capability.',
    codeSnippet: `<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">\n  <div class="lg:col-span-7"><!-- Dominant Feature --></div>\n  <div class="lg:col-span-5 space-y-6"><!-- Supporting Features --></div>\n</div>`
  },
  {
    index: 8,
    title: 'Group with spacing',
    category: 'Layout & Spacing',
    beforeMistake: 'Wrapping every single feature paragraph in its own heavy bordered card with internal dividers.',
    afterFix: 'Remove the outer box borders and group related items using generous whitespace (`gap-12`) and clean alignment.',
    agentInstruction: 'Prefer whitespace and grid alignment over wrapping every text block in a bordered card.',
    codeSnippet: `<div class="grid grid-cols-2 gap-x-12 gap-y-10">\n  <div><h3 class="font-medium text-white">Durable execution</h3><p class="mt-1 text-sm text-zinc-400">Every step is checkpointed.</p></div>\n</div>`
  },
  {
    index: 9,
    title: 'Make headlines specific',
    category: 'Typography',
    beforeMistake: 'Writing vague poetic slogans like "Curiosity, meet clarity."',
    afterFix: 'State exactly what the product does: "Cited answers from papers."',
    agentInstruction: 'Write concrete, specific headlines that state the exact mechanism or outcome rather than vague slogans.',
    codeSnippet: `<h1 class="text-5xl font-semibold tracking-tight text-zinc-900">\n  Cited answers from papers.\n</h1>`
  },
  {
    index: 10,
    title: 'Emphasize the CTA',
    category: 'Color & Contrast',
    beforeMistake: 'Giving both the "Pro" and "Business" pricing tiers identical high-contrast filled buttons.',
    afterFix: 'Use the primary filled accent CTA on the recommended tier and a quiet outlined/secondary button on the other.',
    agentInstruction: 'Ensure only one primary CTA per card group uses the high-contrast action fill.',
    codeSnippet: `<button class="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium">Start 14-day trial</button>\n<button class="border border-zinc-300 text-zinc-800 px-4 py-2.5 rounded-lg font-medium">Start 14-day trial</button>`
  },
  {
    index: 11,
    title: 'Add an accent colour',
    category: 'Color & Contrast',
    beforeMistake: 'Rendering an entire settings modal in flat greyscale where "Save changes" blends into the background.',
    afterFix: 'Introduce a decisive warm accent color (e.g., `#FF4D1F` or `#EA580C`) on the primary action button and focus ring.',
    agentInstruction: 'Pair quiet neutral foundations (60% + 30%) with a decisive 10% accent color for primary interactive actions.',
    codeSnippet: `<button class="bg-[#FF4D1F] text-white px-4 py-2 rounded-lg font-medium shadow-xs">\n  Save changes\n</button>`
  },
  {
    index: 12,
    title: 'Keep icons consistent',
    category: 'Components & Polish',
    beforeMistake: 'Mixing 3D emoji, filled solid icons, and thin 1px duotone icons inside the same habit grid.',
    afterFix: 'Use a single icon family with identical stroke width (`stroke-width="1.75"`), optical size, and monochrome color.',
    agentInstruction: 'Use one consistent icon set (e.g. Lucide with uniform stroke width and size) across all cards—never mix emojis and vector icons.',
    codeSnippet: `<GlassWater className="w-5 h-5 stroke-[1.75] text-zinc-800" />\n<BookOpen className="w-5 h-5 stroke-[1.75] text-zinc-800" />`
  },
  {
    index: 13,
    title: 'Remove embellishments',
    category: 'Components & Polish',
    beforeMistake: 'Adding glowing purple gradients, floating "MOST POPULAR" ribbons, and neon borders to pricing cards.',
    afterFix: 'Use clean hairline borders, subtle surface contrast, and quiet inline text for plan metadata.',
    agentInstruction: 'Strip neon outer glows, gradient borders, and floating ribbon badges from pricing and feature cards.',
    codeSnippet: `<div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">\n  <div class="flex justify-between items-baseline"><h3 class="text-lg font-medium">Pro</h3><span class="text-xs text-zinc-400">Most popular</span></div>\n</div>`
  },
  {
    index: 14,
    title: 'Inner radius = outer - padding',
    category: 'Layout & Spacing',
    beforeMistake: 'Using the same `rounded-2xl` (16px) on both the outer card and the inner element with `p-2` (8px) padding, causing pinched corners.',
    afterFix: 'Calculate nested border radius mathematically: `r_inner = r_outer - padding` (e.g., outer `16px` - padding `8px` = inner `8px`).',
    agentInstruction: 'Always compute nested border radii using r_inner = r_outer - padding so concentric curves align optically.',
    codeSnippet: `<div class="rounded-2xl p-2 bg-zinc-100"> <!-- outer: 16px, padding: 8px -->\n  <div class="rounded-lg bg-white p-4"> <!-- inner: 16px - 8px = 8px --></div>\n</div>`
  },
  {
    index: 15,
    title: 'Improve text contrast',
    category: 'Color & Contrast',
    beforeMistake: 'Setting body copy in washed-out light grey (`#9CA3AF`) on an off-white background.',
    afterFix: 'Raise body copy contrast to meet or exceed WCAG AA (4.5:1 minimum, using deep charcoal `#27272A` on light surfaces).',
    agentInstruction: 'Verify all body text achieves >= 4.5:1 WCAG contrast ratio against its surface.',
    codeSnippet: `<p class="text-zinc-800 dark:text-zinc-200 leading-relaxed">\n  Modern AI systems are trained, not designed.\n</p>`
  },
  {
    index: 16,
    title: 'Wrap headlines properly',
    category: 'Typography',
    beforeMistake: 'Letting a centered headline break into "Simple pricing that scales with / you" with an orphan word on the last line.',
    afterFix: 'Apply `text-wrap: balance` and sensible max-width so lines break into balanced semantic phrases.',
    agentInstruction: 'Apply `text-balance` (`text-wrap: balance`) to all display headlines and section titles to eliminate orphan words.',
    codeSnippet: `<h2 class="text-4xl font-semibold text-center text-balance max-w-md mx-auto">\n  Simple pricing that scales with you\n</h2>`
  },
  {
    index: 17,
    title: 'Align by eye, not pixels',
    category: 'Layout & Spacing',
    beforeMistake: 'Centering a triangular play icon mathematically inside a circle, making it look shifted to the left.',
    afterFix: 'Nudge asymmetric icons (like play triangles) 1–2px toward their narrower point for true optical centering.',
    agentInstruction: 'Apply optical alignment (`translate-x-[1px]`) to triangular play icons and asymmetric glyphs inside circular buttons.',
    codeSnippet: `<button class="w-10 h-10 rounded-full grid place-items-center bg-zinc-900">\n  <Play className="w-4 h-4 translate-x-[1px] fill-current" />\n</button>`
  },
  {
    index: 18,
    title: 'Use tabular nums',
    category: 'Typography',
    beforeMistake: 'Rendering live revenue counters, timers, or tables with proportional numerals that jitter horizontally as digits change.',
    afterFix: 'Apply `tabular-nums` (`font-variant-numeric: tabular-nums`) so every digit occupies an identical horizontal advance width.',
    agentInstruction: 'Always apply `tabular-nums` to prices, counters, percentages, timestamps, and table columns.',
    codeSnippet: `<span class="text-3xl font-semibold tabular-nums tracking-tight">\n  $42,881.54\n</span>`
  },
  {
    index: 19,
    title: 'Add loading states',
    category: 'Components & Polish',
    beforeMistake: 'Showing an empty white box or layout jump while transaction rows fetch.',
    afterFix: 'Render geometry-matched skeleton rows that preserve exact table row heights (`h-11`) while data resolves.',
    agentInstruction: 'Include geometry-matched skeleton loading states for asynchronous lists and tables.',
    codeSnippet: `<div class="h-11 flex items-center gap-4 border-b border-zinc-100 animate-pulse">\n  <div class="h-3 w-28 rounded bg-zinc-200" />\n</div>`
  },
  {
    index: 20,
    title: 'Animate useful feedback',
    category: 'Components & Polish',
    beforeMistake: 'Clicking "ADD TO CART" with zero state change, leaving the user unsure if the action registered.',
    afterFix: 'Transition button state immediately (<= 200ms) to confirm completion ("ADDED ✓") using compositor properties.',
    agentInstruction: 'Provide immediate <= 200ms visual confirmation on action buttons (e.g., Copy -> Copied, Add -> Added).',
    codeSnippet: `<button class="transition-transform active:scale-[0.98] bg-[#D4FF1E] text-black font-semibold px-6 py-3 rounded-full">\n  {added ? 'ADDED ✓' : 'ADD TO CART'}\n</button>`
  }
];

// --- Video 4 (@charles.unemployed): 22 Backgrounds to Make Designs Less Flat ---
export const BACKGROUND_RECIPES: BackgroundRecipe[] = [
  {
    index: 1,
    name: 'Felt texture',
    category: 'Texture & Material',
    useCase: 'Warm tactile storytelling cards, craft brands, and playful editorial canvases.',
    cssPattern: `background-color: #1B4DDB; background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0), radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0); background-size: 4px 4px; background-position: 0 0, 2px 2px;`,
    agentPrompt: 'Apply a subtle micro-speckled felt surface texture over a saturated primary canvas.'
  },
  {
    index: 2,
    name: 'Fluted glass',
    category: 'Texture & Material',
    useCase: 'Fintech hero overlays, ribbed glass cards, and depth-separated modal backdrops.',
    cssPattern: `background: repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 8px, rgba(0,0,0,0.18) 8px, rgba(0,0,0,0.18) 16px), linear-gradient(135deg, #073B2B 0%, #0D84FF 100%);`,
    agentPrompt: 'Render a vertical fluted-glass refraction overlay using repeating 8px linear-gradient ribs and backdrop-blur.'
  },
  {
    index: 3,
    name: 'Thermal gradients',
    category: 'Gradients & Light',
    useCase: 'AI compute benchmarks, biotech imaging, and high-energy event posters.',
    cssPattern: `background: radial-gradient(circle at 75% 30%, #F2DA3A 0%, #FF4D1F 28%, #6B17FA 62%, #0D0B12 95%);`,
    agentPrompt: 'Use a multi-stop infrared thermal radial gradient transitioning from solar yellow through vermilion and indigo to deep ink.'
  },
  {
    index: 4,
    name: 'Water ripples',
    category: 'Texture & Material',
    useCase: 'Wellness apps, sleep trackers, acoustic products, and calm consumer hardware.',
    cssPattern: `background: repeating-radial-gradient(circle at 50% 50%, rgba(216, 236, 245, 0.14) 0px, rgba(216, 236, 245, 0.02) 18px, transparent 36px), linear-gradient(180deg, #081D2B 0%, #132C48 100%);`,
    agentPrompt: 'Create concentric water ripple interference rings over a calm pool-blue or midnight-navy base.'
  },
  {
    index: 5,
    name: 'Speckled graphite',
    category: 'Texture & Material',
    useCase: 'EV charging networks, industrial hardware, and dark-mode developer consoles.',
    cssPattern: `background-color: #141416; background-image: radial-gradient(rgba(244, 241, 234, 0.11) 1px, transparent 1px), radial-gradient(rgba(244, 241, 234, 0.05) 1px, transparent 1px); background-size: 12px 12px; background-position: 0 0, 6px 6px;`,
    agentPrompt: 'Use a matte anodized speckled-graphite dark background with subtle metallic grain.'
  },
  {
    index: 6,
    name: 'Single-hue landscapes',
    category: 'Gradients & Light',
    useCase: 'Climate tech, travel itineraries, and atmospheric hero sections.',
    cssPattern: `background: linear-gradient(180deg, #C4621D 0%, #8C3B0C 55%, #3D1D14 100%);`,
    agentPrompt: 'Use a monochromatic tonal landscape gradient staying strictly within a single warm ochre or cool slate hue family.'
  },
  {
    index: 7,
    name: 'Blueprint grids',
    category: 'Grids & Geometry',
    useCase: 'Aerospace, CAD tools, autonomous robotics, and architecture specifications.',
    cssPattern: `background-color: #0D32B8; background-image: linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 64px 64px, 64px 64px, 16px 16px, 16px 16px;`,
    agentPrompt: 'Apply a dual-scale architectural blueprint grid (64px major lines + 16px minor subdivisions) over cobalt blue.'
  },
  {
    index: 8,
    name: 'Halftone',
    category: 'Artistic & Digital',
    useCase: 'Editorial zines, streetwear drops, music festivals, and bold consumer campaigns.',
    cssPattern: `background-color: #F4F1EA; background-image: radial-gradient(#0D32B8 2px, transparent 2px); background-size: 10px 10px;`,
    agentPrompt: 'Render a crisp screen-printed halftone dot matrix pattern with high-contrast ink dots.'
  },
  {
    index: 9,
    name: 'Grainy gradients',
    category: 'Gradients & Light',
    useCase: 'Creative tools, audio plugins, and modern design engineering landing pages.',
    cssPattern: `background: radial-gradient(at 20% 80%, #FF4D1F 0px, transparent 55%), radial-gradient(at 80% 20%, #1F5D50 0px, transparent 55%), #0E0E10;`,
    agentPrompt: 'Combine soft multi-point mesh gradients with an SVG turbulence noise overlay to prevent colour banding.'
  },
  {
    index: 10,
    name: 'Grass texture',
    category: 'Texture & Material',
    useCase: 'AgTech, botanical brands, outdoor sports clubs, and sustainability reports.',
    cssPattern: `background: repeating-linear-gradient(115deg, rgba(91,255,98,0.08) 0px, rgba(91,255,98,0.08) 2px, transparent 2px, transparent 6px), linear-gradient(160deg, #0D542E 0%, #073B2B 100%);`,
    agentPrompt: 'Use an organic directional blade texture in deep forest and lush turf greens.'
  },
  {
    index: 11,
    name: 'Dithered images',
    category: 'Artistic & Digital',
    useCase: 'Retro-futuristic developer tools, low-bandwidth documentation, and editorial tech blogs.',
    cssPattern: `background-color: #0B0B0B; background-image: conic-gradient(#F4F1EA 25%, transparent 0 50%, #F4F1EA 0 75%, transparent 0); background-size: 4px 4px;`,
    agentPrompt: 'Apply a 1-bit Atkinson or Bayer ordered dithering shader to hero photography.'
  },
  {
    index: 12,
    name: 'Paper texture',
    category: 'Texture & Material',
    useCase: 'Publishing platforms, research labs, stationery stores, and literary journals.',
    cssPattern: `background-color: #F3EFE6; background-image: radial-gradient(rgba(34, 37, 43, 0.06) 1px, transparent 0); background-size: 14px 14px;`,
    agentPrompt: 'Use an archival warm cotton-paper background (#F3EFE6) with subtle organic fiber grain.'
  },
  {
    index: 13,
    name: 'Contour lines',
    category: 'Grids & Geometry',
    useCase: 'Outdoor navigation, geospatial analytics, trail gear, and defense tech.',
    cssPattern: `background-color: #1F5D50; background-image: repeating-radial-gradient(circle at 20% 80%, transparent 0, transparent 18px, rgba(243, 239, 230, 0.14) 18px, rgba(243, 239, 230, 0.14) 19px);`,
    agentPrompt: 'Overlay 1px topographic elevation contour rings across the background canvas.'
  },
  {
    index: 14,
    name: 'Cloud sky',
    category: 'Gradients & Light',
    useCase: 'Aviation, clean energy, mindfulness apps, and optimistic SaaS launches.',
    cssPattern: `background: radial-gradient(ellipse at 50% 110%, #F2F6FA 0%, #D5E5F0 45%, #0D84FF 100%);`,
    agentPrompt: 'Use a zenith-to-horizon atmospheric sky gradient from deep cerulean to soft cloud white.'
  },
  {
    index: 15,
    name: 'Pixel mosaics',
    category: 'Artistic & Digital',
    useCase: 'Cryptography, zero-knowledge proofs, generative art, and gaming infrastructure.',
    cssPattern: `background-color: #0E0E10; background-image: linear-gradient(90deg, rgba(212,255,58,0.12) 50%, transparent 50%), linear-gradient(rgba(84,130,255,0.12) 50%, transparent 50%); background-size: 20px 20px;`,
    agentPrompt: 'Tile a quantized macro-pixel mosaic grid that reveals structure through coarse blocks.'
  },
  {
    index: 16,
    name: 'Lens distortion',
    category: 'Gradients & Light',
    useCase: 'Photography equipment, cinema lenses, and immersive architectural showcases.',
    cssPattern: `background: radial-gradient(circle at 50% 50%, transparent 45%, rgba(14, 14, 16, 0.65) 100%), linear-gradient(135deg, #22252B 0%, #6C84A6 50%, #F3EFE6 100%);`,
    agentPrompt: 'Frame the viewport with subtle optical barrel vignette and chromatic edge refraction.'
  },
  {
    index: 17,
    name: 'Stippled gradients',
    category: 'Artistic & Digital',
    useCase: 'Editorial storytelling, nocturnal radio apps, and indie publishing.',
    cssPattern: `background: radial-gradient(rgba(255, 77, 31, 0.35) 1.5px, transparent 1.5px), linear-gradient(135deg, #0D0B12 0%, #4F1233 60%, #FF4D1F 100%); background-size: 8px 8px, 100% 100%;`,
    agentPrompt: 'Blend a stippled ink-dot pattern over a warm twilight gradient.'
  },
  {
    index: 18,
    name: 'Square-dot grids',
    category: 'Grids & Geometry',
    useCase: 'Uptime monitors, engineering telemetry, note-taking canvases, and pricing matrices.',
    cssPattern: `background-color: #F4F4F2; background-image: radial-gradient(#171B1E 1.25px, transparent 1.25px); background-size: 16px 16px;`,
    agentPrompt: 'Render a precision 16px technical dot-matrix grid for structured data alignment.'
  },
  {
    index: 19,
    name: 'Blurred photos',
    category: 'Gradients & Light',
    useCase: 'Hospitality, seasonal lookbooks, and ambient media players.',
    cssPattern: `background: radial-gradient(circle at 30% 40%, #F7AC6F 0%, transparent 50%), radial-gradient(circle at 75% 65%, #FA7C67 0%, transparent 50%), linear-gradient(180deg, #B8E1EB 0%, #F3ECC8 100%);`,
    agentPrompt: 'Use a heavily Gaussian-blurred (blur-3xl) organic photograph as a soft ambient colour field behind crisp typography.'
  },
  {
    index: 20,
    name: 'Iridescent shapes',
    category: 'Gradients & Light',
    useCase: 'Materials science, optics, next-gen hardware, and luxury skincare.',
    cssPattern: `background: conic-gradient(from 140deg at 50% 50%, #D8ECF5, #A862F7, #FF318C, #5FF5C4, #D8ECF5);`,
    agentPrompt: 'Introduce a thin-film pearlescent conic gradient accent shape against a quiet neutral canvas.'
  },
  {
    index: 21,
    name: 'Impressionist paintings',
    category: 'Artistic & Digital',
    useCase: 'Cultural institutions, literary foundations, and human-centric AI research labs.',
    cssPattern: `background: radial-gradient(ellipse at 20% 30%, #6C84A6 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, #6B7032 0%, transparent 55%), linear-gradient(120deg, #D5E5F0 0%, #F2E6C9 100%);`,
    agentPrompt: 'Pair classical painterly brushwork textures in a split or inset frame with crisp neo-grotesque typography.'
  },
  {
    index: 22,
    name: 'ASCII and pixels',
    category: 'Artistic & Digital',
    useCase: 'AI security platforms (like Guardbase), CLI tools, and developer infrastructure.',
    cssPattern: `background-color: #FFFFFF; background-image: repeating-linear-gradient(0deg, rgba(84, 130, 255, 0.14) 0px, rgba(84, 130, 255, 0.14) 2px, transparent 2px, transparent 8px), repeating-linear-gradient(90deg, rgba(84, 130, 255, 0.14) 0px, rgba(84, 130, 255, 0.14) 2px, transparent 2px, transparent 8px);`,
    agentPrompt: 'Render algorithmic ASCII character art (`#`, `:`, `.`, `/`) tinted in the 10% accent colour to form mountains or technical illustrations.'
  }
];

// --- Video 1 (@cooked_dev_): 20 Things to Have Claude Do So Your App Doesn't Get Sued ---
export const COMPLIANCE_CHECKS: ComplianceCheck[] = [
  {
    index: 1,
    title: 'Privacy policy',
    pillar: 'Legal Policies',
    whyItMatters: 'Where applicable privacy laws or platform rules require notice, explain the data actually processed, purposes, retention, rights, and contact details. Requirements vary by users’ locations, data, and service; this checklist is not legal advice.',
    claudePrompt: 'Generate a plain-English Privacy Policy route (/privacy) detailing exact data collected, retention periods, and third-party processors.'
  },
  {
    index: 2,
    title: 'Terms of service',
    pillar: 'Legal Policies',
    whyItMatters: 'Defines acceptable use, liability limitations, governing law, and intellectual property ownership.',
    claudePrompt: 'Create a Terms of Service page (/terms) covering acceptable use, limitation of liability, and account termination rules.'
  },
  {
    index: 3,
    title: 'Refund policy',
    pillar: 'Legal Policies',
    whyItMatters: 'Clear cancellation and refund terms help set customer expectations; required rights and permitted terms depend on the product, transaction, and applicable consumer-protection law.',
    claudePrompt: 'Add a transparent Refund & Cancellation Policy section explaining pro-rata refunds, trial windows, and how to cancel.'
  },
  {
    index: 4,
    title: 'Cookie policy',
    pillar: 'Legal Policies',
    whyItMatters: 'Describe cookies and similar storage accurately. Disclosure and consent rules vary by jurisdiction, storage purpose, and technology; separate strictly necessary storage from optional tracking where the applicable law requires it.',
    claudePrompt: 'Document all first-party and third-party cookies, localStorage keys, and session tokens in a dedicated Cookie Policy.'
  },
  {
    index: 5,
    title: 'Cookie consent banner',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Some jurisdictions require prior consent for certain non-essential storage or tracking. Determine which rules apply to your audience and technologies; do not treat this checklist as jurisdiction-specific legal advice.',
    claudePrompt: 'Build a non-intrusive Cookie Consent bar with equal-weight "Accept Optional" and "Essential Only" buttons.'
  },
  {
    index: 6,
    title: 'Check form consents',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Where consent is the appropriate legal basis, it generally must meet the applicable requirements for being informed, specific, and freely given. Avoid preselected optional marketing choices and assess rules for each audience.',
    claudePrompt: 'Audit all signup and checkout forms to ensure marketing opt-in checkboxes default to unchecked (`defaultChecked={false}`).'
  },
  {
    index: 7,
    title: 'Collect only needed data',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Data minimization reduces breach liability and form drop-off.',
    claudePrompt: 'Remove unnecessary PII fields (phone number, physical address, birth date) from forms unless strictly required for the feature.'
  },
  {
    index: 8,
    title: 'Audit third-party SDKs',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Embedded trackers, fonts, or unvetted scripts can leak user IPs and telemetry without disclosure.',
    claudePrompt: 'Audit package.json and index.html scripts to remove unused third-party trackers and document all external network requests.'
  },
  {
    index: 9,
    title: 'Remove dark patterns',
    pillar: 'Honest UX & Claims',
    whyItMatters: 'Consumer-protection and platform rules in some jurisdictions restrict manipulative cancellation, confirmshaming, and hidden opt-out patterns. Design fair, reversible choices and check the requirements that apply to each market.',
    claudePrompt: 'Audit cancellation and downgrade flows so users can cancel in the same number of clicks as signing up, with zero confirmshaming copy.'
  },
  {
    index: 10,
    title: 'No hidden fees',
    pillar: 'Honest UX & Claims',
    whyItMatters: 'Some consumer-protection regimes restrict drip pricing or require mandatory charges to be shown prominently before purchase. Make totals clear and verify the pricing rules that apply to each market.',
    claudePrompt: 'Display total all-in pricing upfront on pricing cards, including billing cadence and any applicable taxes or usage tiers.'
  },
  {
    index: 11,
    title: 'No fake reviews',
    pillar: 'Honest UX & Claims',
    whyItMatters: 'Fabricated testimonials, undisclosed synthetic endorsements, and invented ratings can violate advertising and consumer-protection rules. Requirements and enforcement vary by jurisdiction; use substantiated, clearly disclosed endorsements.',
    claudePrompt: 'Remove all fabricated customer quotes, fake company logos, and hallucinated review counts from landing pages.'
  },
  {
    index: 12,
    title: 'No unsupported claims',
    pillar: 'Honest UX & Claims',
    whyItMatters: 'Unsubstantiated medical, financial, or security guarantees can mislead users and may breach advertising or sector-specific rules. Substantiate claims and add qualifications required for the relevant product and market.',
    claudePrompt: 'Replace unverified superlatives ("100% unhackable", "Guaranteed ROI") with factual, measurable architectural descriptions.'
  },
  {
    index: 13,
    title: 'Add alt text',
    pillar: 'Accessibility (WCAG)',
    whyItMatters: 'Accessible image alternatives are required by WCAG and many accessibility laws where they apply. Provide meaningful text for informative images and hide purely decorative images from assistive technology.',
    claudePrompt: 'Add descriptive, context-accurate `alt` attributes to every informative `<img>` and `aria-hidden="true"` to purely decorative SVGs.'
  },
  {
    index: 14,
    title: 'Fix color contrast',
    pillar: 'Accessibility (WCAG)',
    whyItMatters: 'Low-contrast grey text fails WCAG 2.1 AA (4.5:1 normal text, 3.0:1 large text/UI components).',
    claudePrompt: 'Verify every text/background pair across light and dark modes achieves >= 4.5:1 WCAG contrast ratio.'
  },
  {
    index: 15,
    title: 'Keyboard navigation',
    pillar: 'Accessibility (WCAG)',
    whyItMatters: 'All interactive controls, modals, and tabs must be operable via `Tab`, `Enter`, `Space`, and `Escape` with visible focus rings.',
    claudePrompt: 'Ensure all interactive elements use native `<button>` / `<a>` tags with visible `focus-visible:ring-2` styles and Escape key modal dismissal.'
  },
  {
    index: 16,
    title: 'Business details',
    pillar: 'Legal Policies',
    whyItMatters: 'For businesses or transactions covered by EU/UK e-commerce rules, required trader identity and contact details must be made available. Check the applicable disclosure rules and required fields for each market.',
    claudePrompt: 'Add a clean company contact and legal imprint block in the footer with support email and entity details.'
  },
  {
    index: 17,
    title: 'Age consent for kids',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Children’s privacy and age-assurance obligations vary by jurisdiction, age, service, and data use. Identify applicable rules and safeguards before collecting data from minors; thresholds and parental-consent duties differ.',
    claudePrompt: 'Add age-gate verification or explicit minimum-age requirements in signup flows and Terms of Service.'
  },
  {
    index: 18,
    title: 'Unsubscribe link',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Marketing-email opt-out duties depend on the recipient’s jurisdiction and message type. Provide the unsubscribe mechanisms and processing times required by the laws that apply to your mailing list.',
    claudePrompt: 'Include a one-click `List-Unsubscribe` header and visible footer unsubscribe link in all transactional/marketing email templates.'
  },
  {
    index: 19,
    title: 'License stock images',
    pillar: 'Honest UX & Claims',
    whyItMatters: 'Using photos without permission can lead to infringement claims or takedown requests. Licensing, exceptions, and remedies vary by jurisdiction; use assets with verifiable usage rights.',
    claudePrompt: 'Replace any unverified external image URLs with properly licensed local assets, SVG illustrations, or generated artwork.'
  },
  {
    index: 20,
    title: 'Data deletion option',
    pillar: 'Privacy & Consent',
    whyItMatters: 'Some privacy laws or platform policies grant deletion rights or require an accessible deletion path. Applicability, exceptions, and timing vary; map the data and rules relevant to your service.',
    claudePrompt: 'Implement a self-serve "Delete Account & Erase Data" action in user settings with clear confirmation.'
  }
];
