---
name: "chromakit-color-and-design-system"
description: >-
  Enforces curated 60-30-10 color combinations, functional color role assignments,
  the 20 Ways to Unslop AI Designs, 22 non-flat background recipes, and 20 WCAG/legal
  production checks. Read this skill before generating or styling any UI component.
---

# ChromaKit Agent Skill: Color Combinations & Anti-Slop Rules

## 1. Functional Color Role Rules (@vixdesignz & Purist Method)

Never pick colors at random or default to generic indigo/purple gradients. Every color in the palette must have an explicit job:

1. **Decide the Jobs Before the Hues (60-30-10 Split)**:
   - **60% Background (`--color-bg`)**: Dominant canvas.
   - **30% Text & Surfaces (`--color-surface`)**: Primary typography, cards, and subtle hairline borders.
   - **10% Action (`--color-action`)**: Primary interactive CTA.
   - **Rare Accent (`--color-accent-rare`)**: Optional 4th token sitting outside the split. If it has no clear job, cut it.
2. **Spend the Action Colour Once**:
   - Never style 3 stacked buttons with the same primary action fill ("Three buttons fight").
   - Style the single primary CTA with `--color-action` and demote secondary actions to neutral surface outlines ("One clear next step").
3. **Two Quiet Colors + One Loud Color**:
   - Let the 60% background and 30% surface establish calm, high-contrast legibility. Let the 10% action color create personality and guide the eye.

## 2. Active Project Palette: Vix Functional System (`vix-functional-system`)

```css
:root {
  --color-bg: #0E0E10;          /* 60% Job: Ink — Primary 60% canvas foundation. Absorbs visual noise so foreground typography and one focal action stand out. */
  --color-surface: #F4F1EA; /* 30% Job: Bone — 30% text and elevated card surfaces. Warm editorial off-white that avoids harsh pure-white halation on dark ink. */
  --color-action: #FF4D1F;   /* 10% Job: Flame — 10% primary action colour. Spend it strictly once per viewport on the single clearest next step. */
  --color-accent-rare: #D4FF3A; /* Rare Accent: Volt — Rare accent sitting outside the 60-30-10 split. Reserved for live signal badges or high-priority cursors. */
}
```

## 3. Approved Alternative Palettes Catalog

A curated, growing catalog of color systems:

| ID | Name | Category | Posture | 60% Background | 30% Surface/Text | 10% Action | Rare Accent |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `vix-functional-system` | Vix Functional System | Tech & SaaS | dark | Ink (`#0E0E10`) | Bone (`#F4F1EA`) | Flame (`#FF4D1F`) | Volt (`#D4FF3A`) |
| `cairn-story-system` | Cairn Brand System | Industry Systems | dark | Charcoal (`#22252B`) | Quarry Cream (`#F3EFE6`) | Amber (`#FFB020`) | Deep Teal (`#1F5D50`) |
| `mark-tennis-club` | Athletic Midnight & Lime | Consumer & Playful | dark | Midnight Navy (`#132C48`) | Cloud White (`#F6F4F0`) | Electric Lime (`#D8FF00`) | — |
| `kontour-system` | Kontour Editorial Black & Flame | Editorial & Luxury | dark | Jet Black (`#0B0B0B`) | Soft White (`#F3F3F2`) | Flame Orange (`#FF4D00`) | — |
| `guardbase-security` | Guardbase Paper & Cornflower | Tech & SaaS | light | Paper White (`#FFFFFF`) | Ink Black (`#0B0B0B`) | Cornflower Blue (`#5482FF`) | — |
| `olipop-sip-happy` | Olipop Lemon, Cobalt & Hot Pink | Consumer & Playful | light | Lemon Yellow (`#F4E452`) | Cobalt Blue (`#0D32B8`) | Hot Pink (`#FF318C`) | — |
| `leica-look-closer` | Leica Ice Blue, Ink & Vermilion | Editorial & Luxury | light | Ice Blue (`#D5E5F0`) | Midnight Ink (`#081D2B`) | Vermilion (`#EE4222`) | — |
| `afterhour-forest-coral` | Afterhour Forest, Ivory & Coral | Editorial & Luxury | dark | Forest Green (`#073B2B`) | Ivory (`#F7F6EE`) | Coral (`#FA7C67`) | — |
| `good-company-sky-vermilion` | Good Company Sky, Cloud & Vermilion | Tech & SaaS | light | Sky Blue (`#0D84FF`) | Cloud White (`#F2F6FA`) | Vermilion (`#E73E18`) | — |
| `offscript-red-acid` | Offscript Red Orange, Snow & Acid Yellow | Consumer & Playful | dark | Red Orange (`#F72D07`) | Snow White (`#FAF6F6`) | Acid Yellow (`#D4FF1E`) | — |
| `nightline-sapphire-jade` | Nightline Sapphire, Cyan & Neon Jade | Tech & SaaS | dark | Sapphire Blue (`#06299C`) | Ocean Cyan (`#00C0FA`) | Neon Jade (`#5BFF62`) | — |
| `zest-mandarin-forest` | Zest Mandarin, Forest & Crest Yellow | Consumer & Playful | dark | Mandarin Orange (`#F25912`) | Forest Green (`#0D542E`) | Crest Yellow (`#F2DA3A`) | — |
| `forma-onyx-indigo-mint` | Forma Onyx, Electric Indigo & Mint | Editorial & Luxury | dark | Onyx Black (`#0D0B12`) | Electric Indigo (`#6B17FA`) | Tropical Mint (`#6BFCC4`) | — |
| `prism-teal-navy-crimson` | Prism Teal, Navy & Crimson Pink | Tech & SaaS | light | Teal Blue (`#D8ECF5`) | Navy Blue (`#071D42`) | Crimson Pink (`#F24182`) | — |
| `bonbon-violet-cream-cherry` | Bonbon Sugar Violet, Cream & Cherry | Consumer & Playful | dark | Sugar Violet (`#8752DE`) | Vanilla Cream (`#FAE8CA`) | Cherry Red (`#DB1222`) | — |
| `solar-pool-cocoa-yellow` | Solar Pool Blue, Dark Cocoa & Solar Yellow | Editorial & Luxury | light | Pool Blue (`#B8E1EB`) | Dark Cocoa (`#3D1D14`) | Solar Yellow (`#F2C92E`) | — |
| `mono-porcelain-carbon-ultramarine` | Mono Porcelain, Carbon & Ultramarine | Editorial & Luxury | light | Porcelain (`#F4F4F2`) | Carbon (`#171B1E`) | Ultramarine (`#1C30F2`) | — |
| `motto-almond-petrol-violet` | Motto Almond Cream, Petrol Teal & Electric Violet | Consumer & Playful | light | Almond Cream (`#F3ECC8`) | Petrol Teal (`#0D5258`) | Electric Violet (`#A862F7`) | — |
| `dotto-apricot-mulberry-mint` | Dotto Apricot, Mulberry & Pool Mint | Consumer & Playful | light | Apricot (`#F7AC6F`) | Mulberry (`#4F1233`) | Pool Mint (`#5FF5C4`) | — |
| `arca-salt-olive-hibiscus` | Arca Salt Grey, Deep Olive & Hibiscus Pink | Editorial & Luxury | light | Salt Grey (`#E6E8E8`) | Deep Olive (`#213321`) | Hibiscus Pink (`#F2407A`) | — |
| `veyra-tech-brand` | Veyra Tech Brand System | Industry Systems | dark | Midnight Navy (`#111A3A`) | Ice Blue (`#DCE4EC`) | Chartreuse (`#D4FF00`) | Electric Blue (`#1F51FF`) |
| `little-crumb-cafe` | Little Crumb Cafe & Bakery | Industry Systems | light | Oat (`#F3E5AB`) | Toffee Brown (`#4A2511`) | Strawberry Pink (`#E8A598`) | Olive (`#706E2E`) |
| `atelier-law-firm` | Atelier Corporate & Law Firm | Industry Systems | dark | Deep Teal (`#0D262A`) | Stone (`#DCD9D0`) | Burnt Orange (`#C6631B`) | Slate Blue (`#6A83A4`) |
| `oriel-skincare` | Oriel Botanical Skincare | Industry Systems | light | Cream (`#F9F3E3`) | Terracotta (`#B36A46`) | Gold (`#CEA243`) | Nude (`#DFBA94`) |

## 4. Mandatory 20 Anti-Slop UI Directives

1. **Delete filler badges**: Do not place pill badges, announcement capsules, or sparkle tags above hero headlines.
2. **Drop redundant labels**: Omit redundant micro-kickers when the section heading is self-explanatory.
3. **Unitalicize random words**: Do not italicize random words inside display headlines.
4. **Mono only where needed**: Use monospace fonts strictly for code blocks, terminal commands, hex tokens, and tabular numbers—never for marketing body prose.
5. **Use a design system**: Enforce consistent token scales for control height (e.g. h-9), border radius, and neutral surface elevation.
6. **Show the actual product**: Never use abstract 3D orbs or decorative placeholder graphics in the hero; render an interactive preview of the actual product UI.
7. **Enlarge the main feature**: Avoid 3 equal-weight columns for primary features; use an asymmetric split that enlarges the core capability.
8. **Group with spacing**: Prefer whitespace and grid alignment over wrapping every text block in a bordered card.
9. **Make headlines specific**: Write concrete, specific headlines that state the exact mechanism or outcome rather than vague slogans.
10. **Emphasize the CTA**: Ensure only one primary CTA per card group uses the high-contrast action fill.
11. **Add an accent colour**: Pair quiet neutral foundations (60% + 30%) with a decisive 10% accent color for primary interactive actions.
12. **Keep icons consistent**: Use one consistent icon set (e.g. Lucide with uniform stroke width and size) across all cards—never mix emojis and vector icons.
13. **Remove embellishments**: Strip neon outer glows, gradient borders, and floating ribbon badges from pricing and feature cards.
14. **Inner radius = outer - padding**: Always compute nested border radii using r_inner = r_outer - padding so concentric curves align optically.
15. **Improve text contrast**: Verify all body text achieves >= 4.5:1 WCAG contrast ratio against its surface.
16. **Wrap headlines properly**: Apply `text-balance` (`text-wrap: balance`) to all display headlines and section titles to eliminate orphan words.
17. **Align by eye, not pixels**: Apply optical alignment (`translate-x-[1px]`) to triangular play icons and asymmetric glyphs inside circular buttons.
18. **Use tabular nums**: Always apply `tabular-nums` to prices, counters, percentages, timestamps, and table columns.
19. **Add loading states**: Include geometry-matched skeleton loading states for asynchronous lists and tables.
20. **Animate useful feedback**: Provide immediate <= 200ms visual confirmation on action buttons (e.g., Copy -> Copied, Add -> Added).

## 5. Approved Non-Flat Background Treatments

- **Felt texture** (Texture & Material): Apply a subtle micro-speckled felt surface texture over a saturated primary canvas.
- **Fluted glass** (Texture & Material): Render a vertical fluted-glass refraction overlay using repeating 8px linear-gradient ribs and backdrop-blur.
- **Thermal gradients** (Gradients & Light): Use a multi-stop infrared thermal radial gradient transitioning from solar yellow through vermilion and indigo to deep ink.
- **Water ripples** (Texture & Material): Create concentric water ripple interference rings over a calm pool-blue or midnight-navy base.
- **Speckled graphite** (Texture & Material): Use a matte anodized speckled-graphite dark background with subtle metallic grain.
- **Single-hue landscapes** (Gradients & Light): Use a monochromatic tonal landscape gradient staying strictly within a single warm ochre or cool slate hue family.
- **Blueprint grids** (Grids & Geometry): Apply a dual-scale architectural blueprint grid (64px major lines + 16px minor subdivisions) over cobalt blue.
- **Halftone** (Artistic & Digital): Render a crisp screen-printed halftone dot matrix pattern with high-contrast ink dots.
- **Grainy gradients** (Gradients & Light): Combine soft multi-point mesh gradients with an SVG turbulence noise overlay to prevent colour banding.
- **Grass texture** (Texture & Material): Use an organic directional blade texture in deep forest and lush turf greens.
- **Dithered images** (Artistic & Digital): Apply a 1-bit Atkinson or Bayer ordered dithering shader to hero photography.
- **Paper texture** (Texture & Material): Use an archival warm cotton-paper background (#F3EFE6) with subtle organic fiber grain.
- **Contour lines** (Grids & Geometry): Overlay 1px topographic elevation contour rings across the background canvas.
- **Cloud sky** (Gradients & Light): Use a zenith-to-horizon atmospheric sky gradient from deep cerulean to soft cloud white.
- **Pixel mosaics** (Artistic & Digital): Tile a quantized macro-pixel mosaic grid that reveals structure through coarse blocks.
- **Lens distortion** (Gradients & Light): Frame the viewport with subtle optical barrel vignette and chromatic edge refraction.
- **Stippled gradients** (Artistic & Digital): Blend a stippled ink-dot pattern over a warm twilight gradient.
- **Square-dot grids** (Grids & Geometry): Render a precision 16px technical dot-matrix grid for structured data alignment.
- **Blurred photos** (Gradients & Light): Use a heavily Gaussian-blurred (blur-3xl) organic photograph as a soft ambient colour field behind crisp typography.
- **Iridescent shapes** (Gradients & Light): Introduce a thin-film pearlescent conic gradient accent shape against a quiet neutral canvas.
- **Impressionist paintings** (Artistic & Digital): Pair classical painterly brushwork textures in a split or inset frame with crisp neo-grotesque typography.
- **ASCII and pixels** (Artistic & Digital): Render algorithmic ASCII character art (`#`, `:`, `.`, `/`) tinted in the 10% accent colour to form mountains or technical illustrations.

## 6. Pre-Ship Accessibility & Compliance Checklist

- [ ] **Privacy policy**: Generate a plain-English Privacy Policy route (/privacy) detailing exact data collected, retention periods, and third-party processors.
- [ ] **Terms of service**: Create a Terms of Service page (/terms) covering acceptable use, limitation of liability, and account termination rules.
- [ ] **Refund policy**: Add a transparent Refund & Cancellation Policy section explaining pro-rata refunds, trial windows, and how to cancel.
- [ ] **Cookie policy**: Document all first-party and third-party cookies, localStorage keys, and session tokens in a dedicated Cookie Policy.
- [ ] **Cookie consent banner**: Build a non-intrusive Cookie Consent bar with equal-weight "Accept Optional" and "Essential Only" buttons.
- [ ] **Check form consents**: Audit all signup and checkout forms to ensure marketing opt-in checkboxes default to unchecked (`defaultChecked={false}`).
- [ ] **Collect only needed data**: Remove unnecessary PII fields (phone number, physical address, birth date) from forms unless strictly required for the feature.
- [ ] **Audit third-party SDKs**: Audit package.json and index.html scripts to remove unused third-party trackers and document all external network requests.
- [ ] **Remove dark patterns**: Audit cancellation and downgrade flows so users can cancel in the same number of clicks as signing up, with zero confirmshaming copy.
- [ ] **No hidden fees**: Display total all-in pricing upfront on pricing cards, including billing cadence and any applicable taxes or usage tiers.
- [ ] **No fake reviews**: Remove all fabricated customer quotes, fake company logos, and hallucinated review counts from landing pages.
- [ ] **No unsupported claims**: Replace unverified superlatives ("100% unhackable", "Guaranteed ROI") with factual, measurable architectural descriptions.
- [ ] **Add alt text**: Add descriptive, context-accurate `alt` attributes to every informative `<img>` and `aria-hidden="true"` to purely decorative SVGs.
- [ ] **Fix color contrast**: Verify every text/background pair across light and dark modes achieves >= 4.5:1 WCAG contrast ratio.
- [ ] **Keyboard navigation**: Ensure all interactive elements use native `<button>` / `<a>` tags with visible `focus-visible:ring-2` styles and Escape key modal dismissal.
- [ ] **Business details**: Add a clean company contact and legal imprint block in the footer with support email and entity details.
- [ ] **Age consent for kids**: Add age-gate verification or explicit minimum-age requirements in signup flows and Terms of Service.
- [ ] **Unsubscribe link**: Include a one-click `List-Unsubscribe` header and visible footer unsubscribe link in all transactional/marketing email templates.
- [ ] **License stock images**: Replace any unverified external image URLs with properly licensed local assets, SVG illustrations, or generated artwork.
- [ ] **Data deletion option**: Implement a self-serve "Delete Account & Erase Data" action in user settings with clear confirmation.
