#!/usr/bin/env bash
# ChromaKit — Full Repository Generator & GitHub Push Script
# Generates README.md, SKILL.md, CLAUDE.md, .cursorrules, tokens.json, tailwind-v4-theme.css,
# and all 5 showcase web pages in /pages, then commits and pushes to your GitHub remote.

set -e
mkdir -p pages

cat << 'EOF_README' > README.md
# ChromaKit — Curated Color Combinations, 5 Showcase Pages & AI Agent Skill

> Machine-readable color combinations, 5 production web page templates, 60-30-10 role allocation rules, UI unslop directives, and background recipes built for **human developers** and **AI coding agents** (Claude Code, Cursor, Windsurf, AI Studio).

---

## Included 5 Showcase Web Pages (`/pages`)

1. **`pages/01-leica-mono-hardware.html`**: Precision Optical & Audio Hardware Flagship (*Ice Blue `#D5E5F0` · Midnight Ink `#081D2B` · Vermilion `#EE4222`*)
2. **`pages/02-guardbase-ai-security.html`**: AI Security & ASCII Cloud Console (*Paper White `#FFFFFF` · Ink Black `#0B0B0B` · Cornflower Blue `#5482FF`*)
3. **`pages/03-motto-electric-mobility.html`**: Urban Electric Cruiser Configurator (*Almond Cream `#F3ECC8` · Petrol Teal `#0D5258` · Electric Violet `#A862F7`*)
4. **`pages/04-olipop-zest-beverage.html`**: Botanical Beverage D2C Storefront (*Lemon Yellow `#F4E452` · Cobalt Blue `#0D32B8` · Hot Pink `#FF318C`*)
5. **`pages/05-kontour-arca-studio.html`**: Architectural Lighting & Design Studio (*Jet Black `#0B0B0B` · Soft White `#F3F3F2` · Flame Orange `#FF4D00`*)

---

## Core Color Philosophy: Give Every Colour a Job

1. **Decide the jobs before the hues (60-30-10 Split)**:
   - **60% Background (`--color-bg`)**: Dominant neutral or atmospheric canvas.
   - **30% Surface & Typography (`--color-surface`)**: High-contrast text, structural cards, and hairline dividers.
   - **10% Action (`--color-action`)**: Primary interactive focal point.
   - **Rare Accent (`--color-accent-rare`, optional)**: Sits outside the 60-30-10 split. No job? Cut it.
2. **Two Quiet Foundations + One Loud Focal Accent**:
   - The first two colors set the mood and structural legibility. The third color creates an unmistakable focal point.
3. **Spend the Action Colour Once**:
   - Put the 10% action color on everything and it stops meaning anything. Reserve it strictly for the single clearest next step per viewport.

---

## Complete Extracted Color Catalog (24 Systems)

### 1. Vix Functional System (`vix-functional-system`) — *Tech & SaaS*
- **60% Background**: Ink (`#0E0E10`)
- **30% Surface / Text**: Bone (`#F4F1EA`) — Contrast: `17.1:1 (AAA)`
- **10% Action Accent**: Flame (`#FF4D1F`)
- **Rare Accent**: Volt (`#D4FF3A`)
- **Why It Works**: *"Decide the jobs before the hues. Spend the action colour once—put it on everything and it stops meaning anything."* (@vixdesignz)

### 2. Cairn Brand System (`cairn-story-system`) — *Industry Systems*
- **60% Background**: Charcoal (`#22252B`)
- **30% Surface / Text**: Quarry Cream (`#F3EFE6`) — Contrast: `13.38:1 (AAA)`
- **10% Action Accent**: Amber (`#FFB020`)
- **Rare Accent**: Deep Teal (`#1F5D50`)
- **Why It Works**: *"Amber is the signal glowing in low light; Charcoal is the foundation; Deep Teal is the resolved state; Quarry Cream is where the stone comes from."* (@vixdesignz)

### 3. Athletic Midnight & Lime (`mark-tennis-club`) — *Consumer & Playful*
- **60% Background**: Midnight Navy (`#132C48`)
- **30% Surface / Text**: Cloud White (`#F6F4F0`) — Contrast: `12.9:1 (AAA)`
- **10% Action Accent**: Electric Lime (`#D8FF00`)
- **Why It Works**: *"Midnight navy and cloud white look clean. Now add electric lime and the whole thing has energy."* (@toolandtea)

### 4. Kontour Editorial Black & Flame (`kontour-system`) — *Editorial & Luxury*
- **60% Background**: Jet Black (`#0B0B0B`)
- **30% Surface / Text**: Soft White (`#F3F3F2`) — Contrast: `17.73:1 (AAA)`
- **10% Action Accent**: Flame Orange (`#FF4D00`)
- **Why It Works**: *"Jet black and soft white already look premium, but add flame orange and now the whole thing is bold."* (@toolandtea)

### 5. Guardbase Paper & Cornflower (`guardbase-security`) — *Tech & SaaS*
- **60% Background**: Paper White (`#FFFFFF`)
- **30% Surface / Text**: Ink Black (`#0B0B0B`) — Contrast: `19.68:1 (AAA)`
- **10% Action Accent**: Cornflower Blue (`#5482FF`)
- **Why It Works**: *"Paper white and ink black is simple and clear. One touch of cornflower blue and some ASCII design—now you know exactly where to click."* (@toolandtea)

### 6. Olipop Lemon, Cobalt & Hot Pink (`olipop-sip-happy`) — *Consumer & Playful*
- **60% Background**: Lemon Yellow (`#F4E452`)
- **30% Surface / Text**: Cobalt Blue (`#0D32B8`) — Contrast: `7.42:1 (AAA)`
- **10% Action Accent**: Hot Pink (`#FF318C`)
- **Why It Works**: *"Lemon yellow and cobalt blue looks fun. Add a little hot pink—now the product jumps off the page."* (@bymarcoperez)

### 7. Leica Ice Blue, Ink & Vermilion (`leica-look-closer`) — *Editorial & Luxury*
- **60% Background**: Ice Blue (`#D5E5F0`)
- **30% Surface / Text**: Midnight Ink (`#081D2B`) — Contrast: `13.35:1 (AAA)`
- **10% Action Accent**: Vermilion (`#EE4222`)
- **Why It Works**: *"Ice blue and midnight ink: clean, but a little cold. Add vermilion—now it feels expensive."* (@bymarcoperez)

### 8. Afterhour Forest, Ivory & Coral (`afterhour-forest-coral`) — *Editorial & Luxury*
- **60% Background**: Forest Green (`#073B2B`)
- **30% Surface / Text**: Ivory (`#F7F6EE`) — Contrast: `11.6:1 (AAA)`
- **10% Action Accent**: Coral (`#FA7C67`)
- **Why It Works**: *"Forest green and ivory: nice and understated. Bring in coral—now the whole design feels warmer."* (@bymarcoperez)

### 9. Good Company Sky, Cloud & Vermilion (`good-company-sky-vermilion`) — *Tech & SaaS*
- **60% Background**: Sky Blue (`#0D84FF`)
- **30% Surface / Text**: Cloud White (`#F2F6FA`) — Contrast: `3.36:1 (AA Large)`
- **10% Action Accent**: Vermilion (`#E73E18`)
- **Why It Works**: *"Sky blue and cloud white looks clean right? Add a little bit of vermilion—now look where your eyes go."* (@bymarcoperez)

### 10. Offscript Red Orange, Snow & Acid Yellow (`offscript-red-acid`) — *Consumer & Playful*
- **60% Background**: Red Orange (`#F72D07`)
- **30% Surface / Text**: Snow White (`#FAF6F6`) — Contrast: `3.67:1 (AA Large)`
- **10% Action Accent**: Acid Yellow (`#D4FF1E`)
- **Why It Works**: *"Red orange and snowy white: nothing wrong with it. Add one touch of acid yellow—now it is something worth stopping for."* (@bymarcoperez)

### 11. Nightline Sapphire, Cyan & Neon Jade (`nightline-sapphire-jade`) — *Tech & SaaS*
- **60% Background**: Sapphire Blue (`#06299C`)
- **30% Surface / Text**: Ocean Cyan (`#00C0FA`) — Contrast: `5.5:1 (AA)`
- **10% Action Accent**: Neon Jade (`#5BFF62`)
- **Why It Works**: *"Sapphire blue and ocean cyan: you think it is finished. Add a bit of neon jade—now try imagining without it."* (@bymarcoperez)

### 12. Zest Mandarin, Forest & Crest Yellow (`zest-mandarin-forest`) — *Consumer & Playful*
- **60% Background**: Mandarin Orange (`#F25912`)
- **30% Surface / Text**: Forest Green (`#0D542E`) — Contrast: `2.67:1 (Decorative)`
- **10% Action Accent**: Crest Yellow (`#F2DA3A`)
- **Why It Works**: *"Mandarin orange and forest green looks good. Add a little crest yellow—now you know exactly where to click."* (@bymarcoperez)

### 13. Forma Onyx, Electric Indigo & Mint (`forma-onyx-indigo-mint`) — *Editorial & Luxury*
- **60% Background**: Onyx Black (`#0D0B12`)
- **30% Surface / Text**: Electric Indigo (`#6B17FA`) — Contrast: `2.91:1 (Decorative)`
- **10% Action Accent**: Tropical Mint (`#6BFCC4`)
- **Why It Works**: *"Onyx black and electric indigo: a bit forgettable. One touch of tropical mint—now you would recognize it anywhere."* (@bymarcoperez)

### 14. Prism Teal, Navy & Crimson Pink (`prism-teal-navy-crimson`) — *Tech & SaaS*
- **60% Background**: Teal Blue (`#D8ECF5`)
- **30% Surface / Text**: Navy Blue (`#071D42`) — Contrast: `13.64:1 (AAA)`
- **10% Action Accent**: Crimson Pink (`#F24182`)
- **Why It Works**: *"Teal blue and navy blue: you could leave it here. Add a little bit of crimson pink—suddenly the whole page comes together."* (@bymarcoperez)

### 15. Bonbon Sugar Violet, Cream & Cherry (`bonbon-violet-cream-cherry`) — *Consumer & Playful*
- **60% Background**: Sugar Violet (`#8752DE`)
- **30% Surface / Text**: Vanilla Cream (`#FAE8CA`) — Contrast: `4.07:1 (AA Large)`
- **10% Action Accent**: Cherry Red (`#DB1222`)
- **Why It Works**: *"Sugar violet and vanilla cream already feels playful, but add a little bit of cherry red—now it has got personality."* (@bymarcoperez)

### 16. Solar Pool Blue, Dark Cocoa & Solar Yellow (`solar-pool-cocoa-yellow`) — *Editorial & Luxury*
- **60% Background**: Pool Blue (`#B8E1EB`)
- **30% Surface / Text**: Dark Cocoa (`#3D1D14`) — Contrast: `10.84:1 (AAA)`
- **10% Action Accent**: Solar Yellow (`#F2C92E`)
- **Why It Works**: *"Pool blue and dark cocoa looks calm right? Add a touch of solar yellow—now it is impossible to ignore."* (@bymarcoperez)

### 17. Mono Porcelain, Carbon & Ultramarine (`mono-porcelain-carbon-ultramarine`) — *Editorial & Luxury*
- **60% Background**: Porcelain (`#F4F4F2`)
- **30% Surface / Text**: Carbon (`#171B1E`) — Contrast: `15.73:1 (AAA)`
- **10% Action Accent**: Ultramarine (`#1C30F2`)
- **Why It Works**: *"Porcelain and carbon: clean and precise. But add a little bit of ultramarine—now look where your eyes go."* (@bymarcoperez)

### 18. Motto Almond Cream, Petrol Teal & Electric Violet (`motto-almond-petrol-violet`) — *Consumer & Playful*
- **60% Background**: Almond Cream (`#F3ECC8`)
- **30% Surface / Text**: Petrol Teal (`#0D5258`) — Contrast: `7.46:1 (AAA)`
- **10% Action Accent**: Electric Violet (`#A862F7`)
- **Why It Works**: *"Almond cream and petrol teal looks clean right? But add a little electric violet—now look where your eyes go."* (@bymarcoperez)

### 19. Dotto Apricot, Mulberry & Pool Mint (`dotto-apricot-mulberry-mint`) — *Consumer & Playful*
- **60% Background**: Apricot (`#F7AC6F`)
- **30% Surface / Text**: Mulberry (`#4F1233`) — Contrast: `7.56:1 (AAA)`
- **10% Action Accent**: Pool Mint (`#5FF5C4`)
- **Why It Works**: *"Apricot and mulberry already feels playful. Add a touch of pool mint and see how the details pop."* (@bymarcoperez)

### 20. Arca Salt Grey, Deep Olive & Hibiscus Pink (`arca-salt-olive-hibiscus`) — *Editorial & Luxury*
- **60% Background**: Salt Grey (`#E6E8E8`)
- **30% Surface / Text**: Deep Olive (`#213321`) — Contrast: `10.94:1 (AAA)`
- **10% Action Accent**: Hibiscus Pink (`#F2407A`)
- **Why It Works**: *"Salt grey and deep olive: you would think it is finished. But add a little bit of hibiscus pink—try picturing the room without it."* (@bymarcoperez)

### 21. Veyra Tech Brand System (`veyra-tech-brand`) — *Industry Systems*
- **60% Background**: Midnight Navy (`#111A3A`)
- **30% Surface / Text**: Ice Blue (`#DCE4EC`) — Contrast: `13.27:1 (AAA)`
- **10% Action Accent**: Chartreuse (`#D4FF00`)
- **Rare Accent**: Electric Blue (`#1F51FF`)
- **Why It Works**: *"For a tech brand, try Midnight Navy, Ice Blue, Electric Blue, and Chartreuse."* (@asongstudio_)

### 22. Little Crumb Cafe & Bakery (`little-crumb-cafe`) — *Industry Systems*
- **60% Background**: Oat (`#F3E5AB`)
- **30% Surface / Text**: Toffee Brown (`#4A2511`) — Contrast: `10.62:1 (AAA)`
- **10% Action Accent**: Strawberry Pink (`#E8A598`)
- **Rare Accent**: Olive (`#706E2E`)
- **Why It Works**: *"For a cafe, try Toffee Brown, Oat, Strawberry Pink, and Olive."* (@asongstudio_)

### 23. Atelier Corporate & Law Firm (`atelier-law-firm`) — *Industry Systems*
- **60% Background**: Deep Teal (`#0D262A`)
- **30% Surface / Text**: Stone (`#DCD9D0`) — Contrast: `11.21:1 (AAA)`
- **10% Action Accent**: Burnt Orange (`#C6631B`)
- **Rare Accent**: Slate Blue (`#6A83A4`)
- **Why It Works**: *"For a law firm, try Deep Teal, Slate Blue, Stone, and Burnt Orange."* (@asongstudio_)

### 24. Oriel Botanical Skincare (`oriel-skincare`) — *Industry Systems*
- **60% Background**: Cream (`#F9F3E3`)
- **30% Surface / Text**: Terracotta (`#B36A46`) — Contrast: `3.74:1 (AA Large)`
- **10% Action Accent**: Gold (`#CEA243`)
- **Rare Accent**: Nude (`#DFBA94`)
- **Why It Works**: *"For skincare, try Terracotta, Nude, Cream, and Gold."* (@asongstudio_)

---

## 20 Ways to Unslop AI Designs (@charles.unemployed)

| # | Rule | Before (AI Slop) | After (Production Grade) |
| :--- | :--- | :--- | :--- |
| 1 | **Delete filler badges** | Wrapping "NEW: Evals as deploy gates ->" in a glowing neon pill above every headline. | Lead directly with the bold headline ("Agents that survive production.") without a badge crutch. |
| 2 | **Drop redundant labels** | Putting an uppercase "FAQ" kicker directly above "Questions, answered." | Remove the redundant kicker; "Questions, answered." already communicates the section purpose. |
| 3 | **Unitalicize random words** | Setting "Small studio. *Wide-open* thinking." with arbitrary italic words for fake editorial flair. | Keep the entire headline in clean, consistent roman weight unless emphasis changes the literal meaning. |
| 4 | **Mono only where needed** | Setting marketing body paragraphs or subheadlines in monospace font. | Use proportional sans-serif for prose, reserving monospace strictly for CLI commands (`curl -fsSL...`), hex codes, and metrics. |
| 5 | **Use a design system** | Mixing mismatched neon purple buttons, cyan outlines, and arbitrary border radii in the same toolbar. | Standardize control heights, neutral surface fills, hairline borders, and a single semantic accent color. |
| 6 | **Show the actual product** | Placing a generic 3D glowing blue sphere or abstract orb on the right side of the hero section. | Show the real interface state—an interactive query card with cited papers and real product output. |
| 7 | **Enlarge the main feature** | Displaying 3 equal-width small columns where nothing commands primary visual hierarchy. | Give the primary value proposition ("Ship without the setup") a dominant 60% column and stack secondary points cleanly. |
| 8 | **Group with spacing** | Wrapping every single feature paragraph in its own heavy bordered card with internal dividers. | Remove the outer box borders and group related items using generous whitespace (`gap-12`) and clean alignment. |
| 9 | **Make headlines specific** | Writing vague poetic slogans like "Curiosity, meet clarity." | State exactly what the product does: "Cited answers from papers." |
| 10 | **Emphasize the CTA** | Giving both the "Pro" and "Business" pricing tiers identical high-contrast filled buttons. | Use the primary filled accent CTA on the recommended tier and a quiet outlined/secondary button on the other. |
| 11 | **Add an accent colour** | Rendering an entire settings modal in flat greyscale where "Save changes" blends into the background. | Introduce a decisive warm accent color (e.g., `#FF4D1F` or `#EA580C`) on the primary action button and focus ring. |
| 12 | **Keep icons consistent** | Mixing 3D emoji, filled solid icons, and thin 1px duotone icons inside the same habit grid. | Use a single icon family with identical stroke width (`stroke-width="1.75"`), optical size, and monochrome color. |
| 13 | **Remove embellishments** | Adding glowing purple gradients, floating "MOST POPULAR" ribbons, and neon borders to pricing cards. | Use clean hairline borders, subtle surface contrast, and quiet inline text for plan metadata. |
| 14 | **Inner radius = outer - padding** | Using the same `rounded-2xl` (16px) on both the outer card and the inner element with `p-2` (8px) padding, causing pinched corners. | Calculate nested border radius mathematically: `r_inner = r_outer - padding` (e.g., outer `16px` - padding `8px` = inner `8px`). |
| 15 | **Improve text contrast** | Setting body copy in washed-out light grey (`#9CA3AF`) on an off-white background. | Raise body copy contrast to meet or exceed WCAG AA (4.5:1 minimum, using deep charcoal `#27272A` on light surfaces). |
| 16 | **Wrap headlines properly** | Letting a centered headline break into "Simple pricing that scales with / you" with an orphan word on the last line. | Apply `text-wrap: balance` and sensible max-width so lines break into balanced semantic phrases. |
| 17 | **Align by eye, not pixels** | Centering a triangular play icon mathematically inside a circle, making it look shifted to the left. | Nudge asymmetric icons (like play triangles) 1–2px toward their narrower point for true optical centering. |
| 18 | **Use tabular nums** | Rendering live revenue counters, timers, or tables with proportional numerals that jitter horizontally as digits change. | Apply `tabular-nums` (`font-variant-numeric: tabular-nums`) so every digit occupies an identical horizontal advance width. |
| 19 | **Add loading states** | Showing an empty white box or layout jump while transaction rows fetch. | Render geometry-matched skeleton rows that preserve exact table row heights (`h-11`) while data resolves. |
| 20 | **Animate useful feedback** | Clicking "ADD TO CART" with zero state change, leaving the user unsure if the action registered. | Transition button state immediately (<= 200ms) to confirm completion ("ADDED ✓") using compositor properties. |

---

## 22 Backgrounds to Make Designs Less Flat (@charles.unemployed)

1. **Felt texture** (*Texture & Material*): Warm tactile storytelling cards, craft brands, and playful editorial canvases.
2. **Fluted glass** (*Texture & Material*): Fintech hero overlays, ribbed glass cards, and depth-separated modal backdrops.
3. **Thermal gradients** (*Gradients & Light*): AI compute benchmarks, biotech imaging, and high-energy event posters.
4. **Water ripples** (*Texture & Material*): Wellness apps, sleep trackers, acoustic products, and calm consumer hardware.
5. **Speckled graphite** (*Texture & Material*): EV charging networks, industrial hardware, and dark-mode developer consoles.
6. **Single-hue landscapes** (*Gradients & Light*): Climate tech, travel itineraries, and atmospheric hero sections.
7. **Blueprint grids** (*Grids & Geometry*): Aerospace, CAD tools, autonomous robotics, and architecture specifications.
8. **Halftone** (*Artistic & Digital*): Editorial zines, streetwear drops, music festivals, and bold consumer campaigns.
9. **Grainy gradients** (*Gradients & Light*): Creative tools, audio plugins, and modern design engineering landing pages.
10. **Grass texture** (*Texture & Material*): AgTech, botanical brands, outdoor sports clubs, and sustainability reports.
11. **Dithered images** (*Artistic & Digital*): Retro-futuristic developer tools, low-bandwidth documentation, and editorial tech blogs.
12. **Paper texture** (*Texture & Material*): Publishing platforms, research labs, stationery stores, and literary journals.
13. **Contour lines** (*Grids & Geometry*): Outdoor navigation, geospatial analytics, trail gear, and defense tech.
14. **Cloud sky** (*Gradients & Light*): Aviation, clean energy, mindfulness apps, and optimistic SaaS launches.
15. **Pixel mosaics** (*Artistic & Digital*): Cryptography, zero-knowledge proofs, generative art, and gaming infrastructure.
16. **Lens distortion** (*Gradients & Light*): Photography equipment, cinema lenses, and immersive architectural showcases.
17. **Stippled gradients** (*Artistic & Digital*): Editorial storytelling, nocturnal radio apps, and indie publishing.
18. **Square-dot grids** (*Grids & Geometry*): Uptime monitors, engineering telemetry, note-taking canvases, and pricing matrices.
19. **Blurred photos** (*Gradients & Light*): Hospitality, seasonal lookbooks, and ambient media players.
20. **Iridescent shapes** (*Gradients & Light*): Materials science, optics, next-gen hardware, and luxury skincare.
21. **Impressionist paintings** (*Artistic & Digital*): Cultural institutions, literary foundations, and human-centric AI research labs.
22. **ASCII and pixels** (*Artistic & Digital*): AI security platforms (like Guardbase), CLI tools, and developer infrastructure.

---

## 20 App Legal, Privacy & Accessibility Checks (@cooked_dev_)

- [ ] **1. Privacy policy** (*Legal Policies*): Mandatory under GDPR, CCPA, and app store guidelines whenever any user data or IP address is processed.
- [ ] **2. Terms of service** (*Legal Policies*): Defines acceptable use, liability limitations, governing law, and intellectual property ownership.
- [ ] **3. Refund policy** (*Legal Policies*): Prevents payment processor chargebacks and complies with consumer protection laws for SaaS and e-commerce.
- [ ] **4. Cookie policy** (*Legal Policies*): Discloses essential auth cookies vs. analytics/marketing storage under ePrivacy and GDPR rules.
- [ ] **5. Cookie consent banner** (*Privacy & Consent*): Requires explicit opt-in before firing non-essential analytics or tracking scripts in regulated jurisdictions.
- [ ] **6. Check form consents** (*Privacy & Consent*): Pre-ticked marketing checkboxes violate GDPR; consent must be freely given, specific, and affirmative.
- [ ] **7. Collect only needed data** (*Privacy & Consent*): Data minimization reduces breach liability and form drop-off.
- [ ] **8. Audit third-party SDKs** (*Privacy & Consent*): Embedded trackers, fonts, or unvetted scripts can leak user IPs and telemetry without disclosure.
- [ ] **9. Remove dark patterns** (*Honest UX & Claims*): FTC and EU Digital Services Act actively penalize roach-motel cancellations, confirmshaming, and hidden opt-outs.
- [ ] **10. No hidden fees** (*Honest UX & Claims*): Drip pricing (revealing mandatory platform or processing fees only at the final step) violates consumer law.
- [ ] **11. No fake reviews** (*Honest UX & Claims*): Fabricated testimonials, AI-generated avatars claiming to be customers, or invented star ratings trigger heavy FTC fines.
- [ ] **12. No unsupported claims** (*Honest UX & Claims*): Absolute medical, financial, or security guarantees without empirical proof create legal exposure.
- [ ] **13. Add alt text** (*Accessibility (WCAG)*): Screen readers rely on descriptive `alt` attributes; missing alt text is the #1 ADA / EAA web accessibility violation.
- [ ] **14. Fix color contrast** (*Accessibility (WCAG)*): Low-contrast grey text fails WCAG 2.1 AA (4.5:1 normal text, 3.0:1 large text/UI components).
- [ ] **15. Keyboard navigation** (*Accessibility (WCAG)*): All interactive controls, modals, and tabs must be operable via `Tab`, `Enter`, `Space`, and `Escape` with visible focus rings.
- [ ] **16. Business details** (*Legal Policies*): EU/UK e-commerce directives require clear legal entity name, contact email, and registered address in the footer or imprint.
- [ ] **17. Age consent for kids** (*Privacy & Consent*): COPPA and GDPR-K strictly regulate data collection from users under 13 (or 16) without verifiable parental consent.
- [ ] **18. Unsubscribe link** (*Privacy & Consent*): CAN-SPAM and GDPR require a one-click unsubscribe mechanism in every commercial or marketing email.
- [ ] **19. License stock images** (*Honest UX & Claims*): Hotlinking unverified images or scraping copyrighted photography exposes repositories to DMCA takedowns and statutory damages.
- [ ] **20. Data deletion option** (*Privacy & Consent*): Right to Erasure (GDPR Art. 17 / CCPA) and Apple App Store rules require a self-serve account & data deletion flow.

EOF_README

cat << 'EOF_SKILL' > SKILL.md
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

EOF_SKILL

cat << 'EOF_CLAUDE' > CLAUDE.md
# CLAUDE.md — Frontend Color & Design System Directives

When creating or modifying UI components in this repository, strictly follow the **ChromaKit 60-30-10 Color Architecture** and **Anti-Slop Constitution**.

## Active Color Tokens (Vix Functional System)

- **60% Background (`--color-bg`)**: `#0E0E10` (Ink) — Primary 60% canvas foundation. Absorbs visual noise so foreground typography and one focal action stand out.
- **30% Surface & Text (`--color-surface`)**: `#F4F1EA` (Bone) — 30% text and elevated card surfaces. Warm editorial off-white that avoids harsh pure-white halation on dark ink.
- **10% Primary Action (`--color-action`)**: `#FF4D1F` (Flame) — 10% primary action colour. Spend it strictly once per viewport on the single clearest next step.
- **Rare Accent (`--color-accent-rare`)**: `#D4FF3A` (Volt) — Rare accent sitting outside the 60-30-10 split. Reserved for live signal badges or high-priority cursors.

## Non-Negotiable Design Rules

1. **Spend the Action Color Once**: Only one primary button per viewport section may use `#FF4D1F`. Secondary actions must use quiet borders or surface fills.
2. **Nested Corner Radius Math**: Always compute inner border radius as `r_inner = r_outer - padding` (e.g., outer `rounded-2xl` 16px with `p-2` 8px padding requires inner `rounded-lg` 8px).
3. **Typography & Numerals**:
   - Never italicize random words in headlines.
   - Apply `text-balance` (`text-wrap: balance`) to all headlines to prevent orphan trailing words.
   - Use `tabular-nums` (`font-variant-numeric: tabular-nums`) on all numbers, prices, metrics, and counters.
   - Reserve monospace fonts strictly for terminal commands, hex codes, and numerical telemetry.
4. **Zero Filler Badges**: Delete decorative "NEW" pill badges above hero headlines and drop redundant section kickers.
5. **Show the Actual Product**: Render interactive product states rather than abstract 3D spheres or placeholder boxes.

EOF_CLAUDE

cat << 'EOF_CURSOR' > .cursorrules
# .cursorrules — ChromaKit Color & Anti-Slop System

You are an expert design engineer. Enforce the following color tokens and UI rules on every code edit:

## 1. Color System (60-30-10 Rule — Vix Functional System)
- 60% Background Canvas: #0E0E10 (Ink)
- 30% Text & Structural Surfaces: #F4F1EA (Bone)
- 10% Focal Action CTA: #FF4D1F (Flame)
- Rare Accent: #D4FF3A (Volt)
- Rule: Spend the 10% action color (#FF4D1F) strictly ONCE per primary action group.

## 2. 20 Ways to Unslop UI
- Delete filler badges: Do not place pill badges, announcement capsules, or sparkle tags above hero headlines.
- Drop redundant labels: Omit redundant micro-kickers when the section heading is self-explanatory.
- Unitalicize random words: Do not italicize random words inside display headlines.
- Mono only where needed: Use monospace fonts strictly for code blocks, terminal commands, hex tokens, and tabular numbers—never for marketing body prose.
- Use a design system: Enforce consistent token scales for control height (e.g. h-9), border radius, and neutral surface elevation.
- Show the actual product: Never use abstract 3D orbs or decorative placeholder graphics in the hero; render an interactive preview of the actual product UI.
- Enlarge the main feature: Avoid 3 equal-weight columns for primary features; use an asymmetric split that enlarges the core capability.
- Group with spacing: Prefer whitespace and grid alignment over wrapping every text block in a bordered card.
- Make headlines specific: Write concrete, specific headlines that state the exact mechanism or outcome rather than vague slogans.
- Emphasize the CTA: Ensure only one primary CTA per card group uses the high-contrast action fill.
- Add an accent colour: Pair quiet neutral foundations (60% + 30%) with a decisive 10% accent color for primary interactive actions.
- Keep icons consistent: Use one consistent icon set (e.g. Lucide with uniform stroke width and size) across all cards—never mix emojis and vector icons.
- Remove embellishments: Strip neon outer glows, gradient borders, and floating ribbon badges from pricing and feature cards.
- Inner radius = outer - padding: Always compute nested border radii using r_inner = r_outer - padding so concentric curves align optically.
- Improve text contrast: Verify all body text achieves >= 4.5:1 WCAG contrast ratio against its surface.
- Wrap headlines properly: Apply `text-balance` (`text-wrap: balance`) to all display headlines and section titles to eliminate orphan words.
- Align by eye, not pixels: Apply optical alignment (`translate-x-[1px]`) to triangular play icons and asymmetric glyphs inside circular buttons.
- Use tabular nums: Always apply `tabular-nums` to prices, counters, percentages, timestamps, and table columns.
- Add loading states: Include geometry-matched skeleton loading states for asynchronous lists and tables.
- Animate useful feedback: Provide immediate <= 200ms visual confirmation on action buttons (e.g., Copy -> Copied, Add -> Added).

EOF_CURSOR

cat << 'EOF_TOKENS' > tokens.json
{
  "$schema": "https://tr.designtokens.org/format/",
  "meta": {
    "generator": "ChromaKit Studio",
    "philosophy": "60% Background, 30% Surface/Text, 10% Action Accent. Spend the action colour once.",
    "activePaletteId": "vix-functional-system",
    "totalPalettes": 24
  },
  "showcasePages": [
    {
      "page": "01",
      "file": "pages/01-leica-mono-hardware.html",
      "paletteId": "leica-look-closer"
    },
    {
      "page": "02",
      "file": "pages/02-guardbase-ai-security.html",
      "paletteId": "guardbase-security"
    },
    {
      "page": "03",
      "file": "pages/03-motto-electric-mobility.html",
      "paletteId": "motto-almond-petrol-violet"
    },
    {
      "page": "04",
      "file": "pages/04-olipop-zest-beverage.html",
      "paletteId": "olipop-sip-happy"
    },
    {
      "page": "05",
      "file": "pages/05-kontour-arca-studio.html",
      "paletteId": "kontour-system"
    }
  ],
  "palettes": {
    "vix-functional-system": {
      "name": "Vix Functional System",
      "brandExample": "vixdesignz",
      "creator": "@vixdesignz",
      "category": "Tech & SaaS",
      "posture": "dark",
      "storyQuote": "Decide the jobs before the hues. Spend the action colour once—put it on everything and it stops meaning anything.",
      "colors": [
        {
          "role": "background",
          "name": "Ink",
          "hex": "#0E0E10",
          "percentage": 60,
          "jobDescription": "Primary 60% canvas foundation. Absorbs visual noise so foreground typography and one focal action stand out."
        },
        {
          "role": "surface",
          "name": "Bone",
          "hex": "#F4F1EA",
          "percentage": 30,
          "jobDescription": "30% text and elevated card surfaces. Warm editorial off-white that avoids harsh pure-white halation on dark ink."
        },
        {
          "role": "action",
          "name": "Flame",
          "hex": "#FF4D1F",
          "percentage": 10,
          "jobDescription": "10% primary action colour. Spend it strictly once per viewport on the single clearest next step."
        },
        {
          "role": "rare-accent",
          "name": "Volt",
          "hex": "#D4FF3A",
          "percentage": 0,
          "jobDescription": "Rare accent sitting outside the 60-30-10 split. Reserved for live signal badges or high-priority cursors."
        }
      ]
    },
    "cairn-story-system": {
      "name": "Cairn Brand System",
      "brandExample": "Cairn",
      "creator": "@vixdesignz",
      "category": "Industry Systems",
      "posture": "dark",
      "storyQuote": "Amber is the signal glowing in low light; Charcoal is the foundation; Deep Teal is the resolved state; Quarry Cream is where the stone comes from.",
      "colors": [
        {
          "role": "background",
          "name": "Charcoal",
          "hex": "#22252B",
          "percentage": 60,
          "jobDescription": "The foundation everything else sits on. Grounded slate-charcoal background canvas."
        },
        {
          "role": "surface",
          "name": "Quarry Cream",
          "hex": "#F3EFE6",
          "percentage": 30,
          "jobDescription": "Where the stone comes from. Primary readable typography and light surface cards."
        },
        {
          "role": "action",
          "name": "Amber",
          "hex": "#FFB020",
          "percentage": 10,
          "jobDescription": "The signal. A warm marker glowing in low light for primary interactive CTAs."
        },
        {
          "role": "rare-accent",
          "name": "Deep Teal",
          "hex": "#1F5D50",
          "percentage": 0,
          "jobDescription": "The resolved state. Cool where amber is warm—used for completed states and secondary containers."
        }
      ]
    },
    "mark-tennis-club": {
      "name": "Athletic Midnight & Lime",
      "brandExample": "MARK TENNIS CLUB",
      "creator": "@toolandtea",
      "category": "Consumer & Playful",
      "posture": "dark",
      "storyQuote": "Midnight navy and cloud white look clean. Now add electric lime and the whole thing has energy.",
      "colors": [
        {
          "role": "background",
          "name": "Midnight Navy",
          "hex": "#132C48",
          "percentage": 60,
          "jobDescription": "Deep court-side navy canvas that establishes discipline and athletic authority."
        },
        {
          "role": "surface",
          "name": "Cloud White",
          "hex": "#F6F4F0",
          "percentage": 30,
          "jobDescription": "Clean chalk-line white for display headlines, court metrics, and navigation."
        },
        {
          "role": "action",
          "name": "Electric Lime",
          "hex": "#D8FF00",
          "percentage": 10,
          "jobDescription": "Kinetic tennis-ball optic yellow-lime for the single primary reservation CTA and focal word."
        }
      ]
    },
    "kontour-system": {
      "name": "Kontour Editorial Black & Flame",
      "brandExample": "KONTOUR",
      "creator": "@toolandtea",
      "category": "Editorial & Luxury",
      "posture": "dark",
      "storyQuote": "Jet black and soft white already look premium, but add flame orange and now the whole thing is bold.",
      "colors": [
        {
          "role": "background",
          "name": "Jet Black",
          "hex": "#0B0B0B",
          "percentage": 60,
          "jobDescription": "Deep studio black canvas creating architectural depth and gallery-level contrast."
        },
        {
          "role": "surface",
          "name": "Soft White",
          "hex": "#F3F3F2",
          "percentage": 30,
          "jobDescription": "Precision typographic white for oversized wordmarks, editorial copy, and hairline dividers."
        },
        {
          "role": "action",
          "name": "Flame Orange",
          "hex": "#FF4D00",
          "percentage": 10,
          "jobDescription": "High-heat industrial orange for the primary action pill and hero rim-light accent."
        }
      ]
    },
    "guardbase-security": {
      "name": "Guardbase Paper & Cornflower",
      "brandExample": "Guardbase",
      "creator": "@toolandtea",
      "category": "Tech & SaaS",
      "posture": "light",
      "storyQuote": "Paper white and ink black is simple and clear. One touch of cornflower blue and some ASCII design—now you know exactly where to click.",
      "colors": [
        {
          "role": "background",
          "name": "Paper White",
          "hex": "#FFFFFF",
          "percentage": 60,
          "jobDescription": "Crisp technical documentation canvas that maximizes daytime legibility."
        },
        {
          "role": "surface",
          "name": "Ink Black",
          "hex": "#0B0B0B",
          "percentage": 30,
          "jobDescription": "High-contrast ink for primary headlines, body prose, and primary dark buttons."
        },
        {
          "role": "action",
          "name": "Cornflower Blue",
          "hex": "#5482FF",
          "percentage": 10,
          "jobDescription": "Signal blue for emphasized headline tokens, ASCII mountain shaders, and interactive links."
        }
      ]
    },
    "olipop-sip-happy": {
      "name": "Olipop Lemon, Cobalt & Hot Pink",
      "brandExample": "OLIPOP",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "light",
      "storyQuote": "Lemon yellow and cobalt blue looks fun. Add a little hot pink—now the product jumps off the page.",
      "colors": [
        {
          "role": "background",
          "name": "Lemon Yellow",
          "hex": "#F4E452",
          "percentage": 60,
          "jobDescription": "Sunlit citrus canvas that radiates warmth and shelf-stopping CPG optimism."
        },
        {
          "role": "surface",
          "name": "Cobalt Blue",
          "hex": "#0D32B8",
          "percentage": 30,
          "jobDescription": "Ultra-saturated royal cobalt for display typography, nutrition tables, and footer bars."
        },
        {
          "role": "action",
          "name": "Hot Pink",
          "hex": "#FF318C",
          "percentage": 10,
          "jobDescription": "Punchy berry pink reserved strictly for the primary CTA badge and product callout."
        }
      ]
    },
    "leica-look-closer": {
      "name": "Leica Ice Blue, Ink & Vermilion",
      "brandExample": "LEICA",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "light",
      "storyQuote": "Ice blue and midnight ink: clean, but a little cold. Add vermilion—now it feels expensive.",
      "colors": [
        {
          "role": "background",
          "name": "Ice Blue",
          "hex": "#D5E5F0",
          "percentage": 60,
          "jobDescription": "Cool optical-glass blue canvas that frames anodized black hardware with studio neutrality."
        },
        {
          "role": "surface",
          "name": "Midnight Ink",
          "hex": "#081D2B",
          "percentage": 30,
          "jobDescription": "Deep naval ink for precision serif/sans typography and camera body silhouettes."
        },
        {
          "role": "action",
          "name": "Vermilion",
          "hex": "#EE4222",
          "percentage": 10,
          "jobDescription": "Signature red-dot vermilion for the primary CTA button and gallery frame borders."
        }
      ]
    },
    "afterhour-forest-coral": {
      "name": "Afterhour Forest, Ivory & Coral",
      "brandExample": "afterhour",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "dark",
      "storyQuote": "Forest green and ivory: nice and understated. Bring in coral—now the whole design feels warmer.",
      "colors": [
        {
          "role": "background",
          "name": "Forest Green",
          "hex": "#073B2B",
          "percentage": 60,
          "jobDescription": "Deep nocturnal evergreen canvas with subtle radial warmth."
        },
        {
          "role": "surface",
          "name": "Ivory",
          "hex": "#F7F6EE",
          "percentage": 30,
          "jobDescription": "Soft acoustic ivory for high-contrast editorial headlines and tracklist metadata."
        },
        {
          "role": "action",
          "name": "Coral",
          "hex": "#FA7C67",
          "percentage": 10,
          "jobDescription": "Warm analog coral for the active player card and primary listening CTA."
        }
      ]
    },
    "good-company-sky-vermilion": {
      "name": "Good Company Sky, Cloud & Vermilion",
      "brandExample": "GOOD COMPANY",
      "creator": "@bymarcoperez",
      "category": "Tech & SaaS",
      "posture": "light",
      "storyQuote": "Sky blue and cloud white looks clean right? Add a little bit of vermilion—now look where your eyes go.",
      "colors": [
        {
          "role": "background",
          "name": "Sky Blue",
          "hex": "#0D84FF",
          "percentage": 60,
          "jobDescription": "Optimistic zenith sky blue canvas that commands immediate viewport presence."
        },
        {
          "role": "surface",
          "name": "Cloud White",
          "hex": "#F2F6FA",
          "percentage": 30,
          "jobDescription": "Crisp atmospheric white for condensed display headlines and lower gradient fade."
        },
        {
          "role": "action",
          "name": "Vermilion",
          "hex": "#E73E18",
          "percentage": 10,
          "jobDescription": "High-contrast vermilion red-orange for the primary CTA pill and portrait card frames."
        }
      ]
    },
    "offscript-red-acid": {
      "name": "Offscript Red Orange, Snow & Acid Yellow",
      "brandExample": "OFFSCRIPT",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "dark",
      "storyQuote": "Red orange and snowy white: nothing wrong with it. Add one touch of acid yellow—now it is something worth stopping for.",
      "colors": [
        {
          "role": "background",
          "name": "Red Orange",
          "hex": "#F72D07",
          "percentage": 60,
          "jobDescription": "Fearless vermilion-red grid canvas that breaks SaaS monotony."
        },
        {
          "role": "surface",
          "name": "Snow White",
          "hex": "#FAF6F6",
          "percentage": 30,
          "jobDescription": "Heavyweight display typography and subtle 1px structural grid lines."
        },
        {
          "role": "action",
          "name": "Acid Yellow",
          "hex": "#D4FF1E",
          "percentage": 10,
          "jobDescription": "Fluorescent acid-lime spark for interactive badges and primary action triggers."
        }
      ]
    },
    "nightline-sapphire-jade": {
      "name": "Nightline Sapphire, Cyan & Neon Jade",
      "brandExample": "nightline",
      "creator": "@bymarcoperez",
      "category": "Tech & SaaS",
      "posture": "dark",
      "storyQuote": "Sapphire blue and ocean cyan: you think it is finished. Add a bit of neon jade—now try imagining without it.",
      "colors": [
        {
          "role": "background",
          "name": "Sapphire Blue",
          "hex": "#06299C",
          "percentage": 60,
          "jobDescription": "Deep midnight-sapphire base canvas for immersive audio and developer tools."
        },
        {
          "role": "surface",
          "name": "Ocean Cyan",
          "hex": "#00C0FA",
          "percentage": 30,
          "jobDescription": "Luminous cyan atmospheric glow and secondary surface highlights."
        },
        {
          "role": "action",
          "name": "Neon Jade",
          "hex": "#5BFF62",
          "percentage": 10,
          "jobDescription": "High-voltage jade green for the bottom live-player bar and primary headline accent."
        }
      ]
    },
    "zest-mandarin-forest": {
      "name": "Zest Mandarin, Forest & Crest Yellow",
      "brandExample": "ZEST",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "dark",
      "storyQuote": "Mandarin orange and forest green looks good. Add a little crest yellow—now you know exactly where to click.",
      "colors": [
        {
          "role": "background",
          "name": "Mandarin Orange",
          "hex": "#F25912",
          "percentage": 60,
          "jobDescription": "Vibrant tangerine-orange hero canvas that radiates flavour and warmth."
        },
        {
          "role": "surface",
          "name": "Forest Green",
          "hex": "#0D542E",
          "percentage": 30,
          "jobDescription": "Botanical leaf green for oversized condensed typography and grounded footer bar."
        },
        {
          "role": "action",
          "name": "Crest Yellow",
          "hex": "#F2DA3A",
          "percentage": 10,
          "jobDescription": "Sun-ripened lemon crest yellow strictly reserved for the primary purchase button."
        }
      ]
    },
    "forma-onyx-indigo-mint": {
      "name": "Forma Onyx, Electric Indigo & Mint",
      "brandExample": "forma.",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "dark",
      "storyQuote": "Onyx black and electric indigo: a bit forgettable. One touch of tropical mint—now you would recognize it anywhere.",
      "colors": [
        {
          "role": "background",
          "name": "Onyx Black",
          "hex": "#0D0B12",
          "percentage": 60,
          "jobDescription": "Velvet obsidian-violet black canvas for dramatic editorial contrast."
        },
        {
          "role": "surface",
          "name": "Electric Indigo",
          "hex": "#6B17FA",
          "percentage": 30,
          "jobDescription": "Saturated ultraviolets for portrait lighting blocks and secondary containers."
        },
        {
          "role": "action",
          "name": "Tropical Mint",
          "hex": "#6BFCC4",
          "percentage": 10,
          "jobDescription": "Crisp bioluminescent mint for the primary CTA pill and signature italic keywords."
        }
      ]
    },
    "prism-teal-navy-crimson": {
      "name": "Prism Teal, Navy & Crimson Pink",
      "brandExample": "prism",
      "creator": "@bymarcoperez",
      "category": "Tech & SaaS",
      "posture": "light",
      "storyQuote": "Teal blue and navy blue: you could leave it here. Add a little bit of crimson pink—suddenly the whole page comes together.",
      "colors": [
        {
          "role": "background",
          "name": "Teal Blue",
          "hex": "#D8ECF5",
          "percentage": 60,
          "jobDescription": "Airy glacial-teal background that keeps enterprise analytics feeling light and open."
        },
        {
          "role": "surface",
          "name": "Navy Blue",
          "hex": "#071D42",
          "percentage": 30,
          "jobDescription": "Authoritative deep navy for executive typography and 3D glass refraction forms."
        },
        {
          "role": "action",
          "name": "Crimson Pink",
          "hex": "#F24182",
          "percentage": 10,
          "jobDescription": "Vibrant magenta-crimson for the primary CTA button and optical ribbon highlights."
        }
      ]
    },
    "bonbon-violet-cream-cherry": {
      "name": "Bonbon Sugar Violet, Cream & Cherry",
      "brandExample": "bonbon",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "dark",
      "storyQuote": "Sugar violet and vanilla cream already feels playful, but add a little bit of cherry red—now it has got personality.",
      "colors": [
        {
          "role": "background",
          "name": "Sugar Violet",
          "hex": "#8752DE",
          "percentage": 60,
          "jobDescription": "Confectionery lavender-violet canvas with unmistakable brand recall."
        },
        {
          "role": "surface",
          "name": "Vanilla Cream",
          "hex": "#FAE8CA",
          "percentage": 30,
          "jobDescription": "Warm custard cream for oversized wordmarks, navigation, and pill surfaces."
        },
        {
          "role": "action",
          "name": "Cherry Red",
          "hex": "#DB1222",
          "percentage": 10,
          "jobDescription": "Glossy maraschino cherry red for the hero focal centerpiece and interactive accents."
        }
      ]
    },
    "solar-pool-cocoa-yellow": {
      "name": "Solar Pool Blue, Dark Cocoa & Solar Yellow",
      "brandExample": "solar",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "light",
      "storyQuote": "Pool blue and dark cocoa looks calm right? Add a touch of solar yellow—now it is impossible to ignore.",
      "colors": [
        {
          "role": "background",
          "name": "Pool Blue",
          "hex": "#B8E1EB",
          "percentage": 60,
          "jobDescription": "Mid-century swimming-pool blue canvas that feels calm, architectural, and airy."
        },
        {
          "role": "surface",
          "name": "Dark Cocoa",
          "hex": "#3D1D14",
          "percentage": 30,
          "jobDescription": "Rich espresso-walnut brown for grounded typography and primary button fills."
        },
        {
          "role": "action",
          "name": "Solar Yellow",
          "hex": "#F2C92E",
          "percentage": 10,
          "jobDescription": "Warm marigold solar yellow that turns the hero product into an immediate magnet."
        }
      ]
    },
    "mono-porcelain-carbon-ultramarine": {
      "name": "Mono Porcelain, Carbon & Ultramarine",
      "brandExample": "mono",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "light",
      "storyQuote": "Porcelain and carbon: clean and precise. But add a little bit of ultramarine—now look where your eyes go.",
      "colors": [
        {
          "role": "background",
          "name": "Porcelain",
          "hex": "#F4F4F2",
          "percentage": 60,
          "jobDescription": "Braun/Rams-inspired matte porcelain gallery background."
        },
        {
          "role": "surface",
          "name": "Carbon",
          "hex": "#171B1E",
          "percentage": 30,
          "jobDescription": "Anodized carbon black for precision technical typography and dark specification cards."
        },
        {
          "role": "action",
          "name": "Ultramarine",
          "hex": "#1C30F2",
          "percentage": 10,
          "jobDescription": "Klein-inspired electric ultramarine for the platter strobe ring and focal indicators."
        }
      ]
    },
    "motto-almond-petrol-violet": {
      "name": "Motto Almond Cream, Petrol Teal & Electric Violet",
      "brandExample": "MOTTO",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "light",
      "storyQuote": "Almond cream and petrol teal looks clean right? But add a little electric violet—now look where your eyes go.",
      "colors": [
        {
          "role": "background",
          "name": "Almond Cream",
          "hex": "#F3ECC8",
          "percentage": 60,
          "jobDescription": "Warm Mediterranean parchment cream that gives mobility hardware a lifestyle editorial feel."
        },
        {
          "role": "surface",
          "name": "Petrol Teal",
          "hex": "#0D5258",
          "percentage": 30,
          "jobDescription": "Deep vintage-motorsport petrol teal for display typography, frame bodywork, and buttons."
        },
        {
          "role": "action",
          "name": "Electric Violet",
          "hex": "#A862F7",
          "percentage": 10,
          "jobDescription": "Unexpected iridescent violet accent on wheel rims, helmet visors, and active badges."
        }
      ]
    },
    "dotto-apricot-mulberry-mint": {
      "name": "Dotto Apricot, Mulberry & Pool Mint",
      "brandExample": "DOTTO",
      "creator": "@bymarcoperez",
      "category": "Consumer & Playful",
      "posture": "light",
      "storyQuote": "Apricot and mulberry already feels playful. Add a touch of pool mint and see how the details pop.",
      "colors": [
        {
          "role": "background",
          "name": "Apricot",
          "hex": "#F7AC6F",
          "percentage": 60,
          "jobDescription": "Sun-baked terracotta-apricot paper stock background across modular bento grids."
        },
        {
          "role": "surface",
          "name": "Mulberry",
          "hex": "#4F1233",
          "percentage": 30,
          "jobDescription": "Deep wine-mulberry ink for bookbinding spines, bold wordmarks, and dark feature cards."
        },
        {
          "role": "action",
          "name": "Pool Mint",
          "hex": "#5FF5C4",
          "percentage": 10,
          "jobDescription": "Fresh mint enamel highlight for wire clips, tags, and primary interactive elements."
        }
      ]
    },
    "arca-salt-olive-hibiscus": {
      "name": "Arca Salt Grey, Deep Olive & Hibiscus Pink",
      "brandExample": "arca.",
      "creator": "@bymarcoperez",
      "category": "Editorial & Luxury",
      "posture": "light",
      "storyQuote": "Salt grey and deep olive: you would think it is finished. But add a little bit of hibiscus pink—try picturing the room without it.",
      "colors": [
        {
          "role": "background",
          "name": "Salt Grey",
          "hex": "#E6E8E8",
          "percentage": 60,
          "jobDescription": "Plaster-and-stone gallery grey that lets architectural lighting take center stage."
        },
        {
          "role": "surface",
          "name": "Deep Olive",
          "hex": "#213321",
          "percentage": 30,
          "jobDescription": "Organic dark olive for serif/sans typography, furniture plinths, and structural borders."
        },
        {
          "role": "action",
          "name": "Hibiscus Pink",
          "hex": "#F2407A",
          "percentage": 10,
          "jobDescription": "Radiant diffused hibiscus rose glow for the luminaire shade and focal CTA."
        }
      ]
    },
    "veyra-tech-brand": {
      "name": "Veyra Tech Brand System",
      "brandExample": "veyra",
      "creator": "@asongstudio_",
      "category": "Industry Systems",
      "posture": "dark",
      "storyQuote": "For a tech brand, try Midnight Navy, Ice Blue, Electric Blue, and Chartreuse.",
      "colors": [
        {
          "role": "background",
          "name": "Midnight Navy",
          "hex": "#111A3A",
          "percentage": 60,
          "pantone": "PANTONE 19-4027",
          "jobDescription": "Deep enterprise navy foundation for developer consoles and dark-mode documentation."
        },
        {
          "role": "surface",
          "name": "Ice Blue",
          "hex": "#DCE4EC",
          "percentage": 30,
          "pantone": "PANTONE 13-4110",
          "jobDescription": "Cool glacier surface and primary readable text contrast against Midnight Navy."
        },
        {
          "role": "action",
          "name": "Chartreuse",
          "hex": "#D4FF00",
          "percentage": 10,
          "pantone": "PANTONE 13-0550",
          "jobDescription": "High-visibility terminal chevron and primary deployment CTA accent."
        },
        {
          "role": "rare-accent",
          "name": "Electric Blue",
          "hex": "#1F51FF",
          "percentage": 0,
          "pantone": "PANTONE 18-4051",
          "jobDescription": "Brand emblem tile and interactive focus-ring highlight."
        }
      ]
    },
    "little-crumb-cafe": {
      "name": "Little Crumb Cafe & Bakery",
      "brandExample": "little crumb",
      "creator": "@asongstudio_",
      "category": "Industry Systems",
      "posture": "light",
      "storyQuote": "For a cafe, try Toffee Brown, Oat, Strawberry Pink, and Olive.",
      "colors": [
        {
          "role": "background",
          "name": "Oat",
          "hex": "#F3E5AB",
          "percentage": 60,
          "pantone": "PANTONE 12-0712",
          "jobDescription": "Warm baked-oat pastry canvas that feels inviting, organic, and tactile."
        },
        {
          "role": "surface",
          "name": "Toffee Brown",
          "hex": "#4A2511",
          "percentage": 30,
          "pantone": "PANTONE 19-1230",
          "jobDescription": "Roasted espresso-bean brown for primary typography, illustrations, and menu cards."
        },
        {
          "role": "action",
          "name": "Strawberry Pink",
          "hex": "#E8A598",
          "percentage": 10,
          "pantone": "PANTONE 15-1621",
          "jobDescription": "Sweet glacé strawberry pink for wordmark fills, seasonal badges, and order buttons."
        },
        {
          "role": "rare-accent",
          "name": "Olive",
          "hex": "#706E2E",
          "percentage": 0,
          "pantone": "PANTONE 18-0538",
          "jobDescription": "Botanical olive accent for savoury menu tags and organic certification stamps."
        }
      ]
    },
    "atelier-law-firm": {
      "name": "Atelier Corporate & Law Firm",
      "brandExample": "VANCE & STERLING",
      "creator": "@asongstudio_",
      "category": "Industry Systems",
      "posture": "dark",
      "storyQuote": "For a law firm, try Deep Teal, Slate Blue, Stone, and Burnt Orange.",
      "colors": [
        {
          "role": "background",
          "name": "Deep Teal",
          "hex": "#0D262A",
          "percentage": 60,
          "pantone": "PANTONE 19-4914",
          "jobDescription": "Sovereign dark-teal boardroom foundation conveying gravitas and discretion."
        },
        {
          "role": "surface",
          "name": "Stone",
          "hex": "#DCD9D0",
          "percentage": 30,
          "pantone": "PANTONE 13-0002",
          "jobDescription": "Archival cotton-rag stationery tone for crisp serif/sans typography and dossier cards."
        },
        {
          "role": "action",
          "name": "Burnt Orange",
          "hex": "#C6631B",
          "percentage": 10,
          "pantone": "PANTONE 17-1464",
          "jobDescription": "Signet-wax burnt orange for the primary consultation CTA and official seal accent."
        },
        {
          "role": "rare-accent",
          "name": "Slate Blue",
          "hex": "#6A83A4",
          "percentage": 0,
          "pantone": "PANTONE 17-4028",
          "jobDescription": "Tailored slate-blue secondary card surface and divider accent."
        }
      ]
    },
    "oriel-skincare": {
      "name": "Oriel Botanical Skincare",
      "brandExample": "oriel",
      "creator": "@asongstudio_",
      "category": "Industry Systems",
      "posture": "light",
      "storyQuote": "For skincare, try Terracotta, Nude, Cream, and Gold.",
      "colors": [
        {
          "role": "background",
          "name": "Cream",
          "hex": "#F9F3E3",
          "percentage": 60,
          "pantone": "PANTONE 11-0604",
          "jobDescription": "Luminous apothecary cream background that evokes clean formulation and calm."
        },
        {
          "role": "surface",
          "name": "Terracotta",
          "hex": "#B36A46",
          "percentage": 30,
          "pantone": "PANTONE 17-1340",
          "jobDescription": "Warm earth terracotta for editorial typography, packaging shadows, and primary containers."
        },
        {
          "role": "action",
          "name": "Gold",
          "hex": "#CEA243",
          "percentage": 10,
          "pantone": "PANTONE 16-0948",
          "jobDescription": "Botanical oil gold for primary regimen CTAs and foil-stamped accents."
        },
        {
          "role": "rare-accent",
          "name": "Nude",
          "hex": "#DFBA94",
          "percentage": 0,
          "pantone": "PANTONE 15-1225",
          "jobDescription": "Soft sandstone nude for secondary product tiles and ingredient comparison tables."
        }
      ]
    }
  }
}
EOF_TOKENS

cat << 'EOF_CSS' > tailwind-v4-theme.css
/* ChromaKit — Tailwind CSS v4 @theme & Custom Properties */
@import "tailwindcss";

@theme {
  /* Active 60-30-10 Functional Tokens (Vix Functional System) */
  --color-canvas: #0E0E10;
  --color-surface: #F4F1EA;
  --color-action: #FF4D1F;
  --color-accent-rare: #D4FF3A;

  /* Complete Extracted Palette Token Library */
  /* Vix Functional System (vixdesignz) */
  --color-vix-functional-system-bg: #0E0E10;
  --color-vix-functional-system-surface: #F4F1EA;
  --color-vix-functional-system-action: #FF4D1F;
  --color-vix-functional-system-rare: #D4FF3A;

  /* Cairn Brand System (Cairn) */
  --color-cairn-story-system-bg: #22252B;
  --color-cairn-story-system-surface: #F3EFE6;
  --color-cairn-story-system-action: #FFB020;
  --color-cairn-story-system-rare: #1F5D50;

  /* Athletic Midnight & Lime (MARK TENNIS CLUB) */
  --color-mark-tennis-club-bg: #132C48;
  --color-mark-tennis-club-surface: #F6F4F0;
  --color-mark-tennis-club-action: #D8FF00;

  /* Kontour Editorial Black & Flame (KONTOUR) */
  --color-kontour-system-bg: #0B0B0B;
  --color-kontour-system-surface: #F3F3F2;
  --color-kontour-system-action: #FF4D00;

  /* Guardbase Paper & Cornflower (Guardbase) */
  --color-guardbase-security-bg: #FFFFFF;
  --color-guardbase-security-surface: #0B0B0B;
  --color-guardbase-security-action: #5482FF;

  /* Olipop Lemon, Cobalt & Hot Pink (OLIPOP) */
  --color-olipop-sip-happy-bg: #F4E452;
  --color-olipop-sip-happy-surface: #0D32B8;
  --color-olipop-sip-happy-action: #FF318C;

  /* Leica Ice Blue, Ink & Vermilion (LEICA) */
  --color-leica-look-closer-bg: #D5E5F0;
  --color-leica-look-closer-surface: #081D2B;
  --color-leica-look-closer-action: #EE4222;

  /* Afterhour Forest, Ivory & Coral (afterhour) */
  --color-afterhour-forest-coral-bg: #073B2B;
  --color-afterhour-forest-coral-surface: #F7F6EE;
  --color-afterhour-forest-coral-action: #FA7C67;

  /* Good Company Sky, Cloud & Vermilion (GOOD COMPANY) */
  --color-good-company-sky-vermilion-bg: #0D84FF;
  --color-good-company-sky-vermilion-surface: #F2F6FA;
  --color-good-company-sky-vermilion-action: #E73E18;

  /* Offscript Red Orange, Snow & Acid Yellow (OFFSCRIPT) */
  --color-offscript-red-acid-bg: #F72D07;
  --color-offscript-red-acid-surface: #FAF6F6;
  --color-offscript-red-acid-action: #D4FF1E;

  /* Nightline Sapphire, Cyan & Neon Jade (nightline) */
  --color-nightline-sapphire-jade-bg: #06299C;
  --color-nightline-sapphire-jade-surface: #00C0FA;
  --color-nightline-sapphire-jade-action: #5BFF62;

  /* Zest Mandarin, Forest & Crest Yellow (ZEST) */
  --color-zest-mandarin-forest-bg: #F25912;
  --color-zest-mandarin-forest-surface: #0D542E;
  --color-zest-mandarin-forest-action: #F2DA3A;

  /* Forma Onyx, Electric Indigo & Mint (forma.) */
  --color-forma-onyx-indigo-mint-bg: #0D0B12;
  --color-forma-onyx-indigo-mint-surface: #6B17FA;
  --color-forma-onyx-indigo-mint-action: #6BFCC4;

  /* Prism Teal, Navy & Crimson Pink (prism) */
  --color-prism-teal-navy-crimson-bg: #D8ECF5;
  --color-prism-teal-navy-crimson-surface: #071D42;
  --color-prism-teal-navy-crimson-action: #F24182;

  /* Bonbon Sugar Violet, Cream & Cherry (bonbon) */
  --color-bonbon-violet-cream-cherry-bg: #8752DE;
  --color-bonbon-violet-cream-cherry-surface: #FAE8CA;
  --color-bonbon-violet-cream-cherry-action: #DB1222;

  /* Solar Pool Blue, Dark Cocoa & Solar Yellow (solar) */
  --color-solar-pool-cocoa-yellow-bg: #B8E1EB;
  --color-solar-pool-cocoa-yellow-surface: #3D1D14;
  --color-solar-pool-cocoa-yellow-action: #F2C92E;

  /* Mono Porcelain, Carbon & Ultramarine (mono) */
  --color-mono-porcelain-carbon-ultramarine-bg: #F4F4F2;
  --color-mono-porcelain-carbon-ultramarine-surface: #171B1E;
  --color-mono-porcelain-carbon-ultramarine-action: #1C30F2;

  /* Motto Almond Cream, Petrol Teal & Electric Violet (MOTTO) */
  --color-motto-almond-petrol-violet-bg: #F3ECC8;
  --color-motto-almond-petrol-violet-surface: #0D5258;
  --color-motto-almond-petrol-violet-action: #A862F7;

  /* Dotto Apricot, Mulberry & Pool Mint (DOTTO) */
  --color-dotto-apricot-mulberry-mint-bg: #F7AC6F;
  --color-dotto-apricot-mulberry-mint-surface: #4F1233;
  --color-dotto-apricot-mulberry-mint-action: #5FF5C4;

  /* Arca Salt Grey, Deep Olive & Hibiscus Pink (arca.) */
  --color-arca-salt-olive-hibiscus-bg: #E6E8E8;
  --color-arca-salt-olive-hibiscus-surface: #213321;
  --color-arca-salt-olive-hibiscus-action: #F2407A;

  /* Veyra Tech Brand System (veyra) */
  --color-veyra-tech-brand-bg: #111A3A;
  --color-veyra-tech-brand-surface: #DCE4EC;
  --color-veyra-tech-brand-action: #D4FF00;
  --color-veyra-tech-brand-rare: #1F51FF;

  /* Little Crumb Cafe & Bakery (little crumb) */
  --color-little-crumb-cafe-bg: #F3E5AB;
  --color-little-crumb-cafe-surface: #4A2511;
  --color-little-crumb-cafe-action: #E8A598;
  --color-little-crumb-cafe-rare: #706E2E;

  /* Atelier Corporate & Law Firm (VANCE & STERLING) */
  --color-atelier-law-firm-bg: #0D262A;
  --color-atelier-law-firm-surface: #DCD9D0;
  --color-atelier-law-firm-action: #C6631B;
  --color-atelier-law-firm-rare: #6A83A4;

  /* Oriel Botanical Skincare (oriel) */
  --color-oriel-skincare-bg: #F9F3E3;
  --color-oriel-skincare-surface: #B36A46;
  --color-oriel-skincare-action: #CEA243;
  --color-oriel-skincare-rare: #DFBA94;
}

EOF_CSS

cat << 'EOF_PAGE1' > pages/01-leica-mono-hardware.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page 01 — Leica & Mono Optical Hardware Flagship (Leica Ice Blue, Ink & Vermilion)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (Leica Ice Blue, Ink & Vermilion by @bymarcoperez) */
      --bg-60: #D5E5F0;      /* 60% Background: Ice Blue */
      --surface-30: #081D2B; /* 30% Surface/Text: Midnight Ink */
      --action-10: #EE4222;   /* 10% Action: Vermilion */
      --action-text: #F4F1EA;
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
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">LEICA</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">Explore M-System</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE 01 · 60% Ice Blue (#D5E5F0) · 30% Midnight Ink (#081D2B) · 10% Vermilion (#EE4222)
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          Look closer.
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          Precision optical engineering and full-frame rangefinder architecture built for decisive moments.
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">Explore M-System</button>
          <button class="btn-secondary">Technical specs</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          <div class="mono" style="font-size: 0.75rem;">M11-P RANGEFINDER · 60MP BSI CMOS</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">Summilux-M 35mm f/1.4 ASPH</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Ice blue and midnight ink: clean, but a little cold. Add vermilion—now it feels expensive."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
EOF_PAGE1

cat << 'EOF_PAGE2' > pages/02-guardbase-ai-security.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page 02 — Guardbase AI Security & ASCII Cloud (Guardbase Paper & Cornflower)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (Guardbase Paper & Cornflower by @toolandtea) */
      --bg-60: #FFFFFF;      /* 60% Background: Paper White */
      --surface-30: #0B0B0B; /* 30% Surface/Text: Ink Black */
      --action-10: #5482FF;   /* 10% Action: Cornflower Blue */
      --action-text: #F4F1EA;
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
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">Guardbase</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">Watch demo</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE 02 · 60% Paper White (#FFFFFF) · 30% Ink Black (#0B0B0B) · 10% Cornflower Blue (#5482FF)
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          AI deserves the same security as software.
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          Monitor how agents behave, what attackers could exploit, and which risks actually matter in production.
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">Watch demo</button>
          <button class="btn-secondary">Read docs</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          <div class="mono" style="font-size: 0.75rem;">ZERO-TRUST AGENT FIREWALL</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">99.989% Threat Interception</h2>
     <pre class="mono" style="margin-top: 1rem; font-size: 0.7rem; color: #5482FF;">
        /\      /\
       /**\    /##\
      /****\  /####\
     /******\/######\
     </pre>
     <div class="mono" style="margin-top: 1.5rem; font-size: 0.8rem;">$ curl -fsSL guardbase.sh/install | sh</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
EOF_PAGE2

cat << 'EOF_PAGE3' > pages/03-motto-electric-mobility.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page 03 — Motto M-01 Urban Electric Cruiser (Motto Almond Cream, Petrol Teal & Electric Violet)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (Motto Almond Cream, Petrol Teal & Electric Violet by @bymarcoperez) */
      --bg-60: #F3ECC8;      /* 60% Background: Almond Cream */
      --surface-30: #0D5258; /* 30% Surface/Text: Petrol Teal */
      --action-10: #A862F7;   /* 10% Action: Electric Violet */
      --action-text: #F4F1EA;
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
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">MOTTO</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">Explore M-01</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE 03 · 60% Almond Cream (#F3ECC8) · 30% Petrol Teal (#0D5258) · 10% Electric Violet (#A862F7)
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          Make room to roam.
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          City, reimagined. The M-01 electric urban cruiser with removable twin-cell battery and 110 km range.
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">Explore M-01</button>
          <button class="btn-secondary">Book test ride</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          <div class="mono" style="font-size: 0.75rem;">TWIN-CELL URBAN MOBILITY</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">110 km Range · 70 km/h Top Speed</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Almond cream and petrol teal looks clean right? But add a little electric violet—now look where your eyes go."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
EOF_PAGE3

cat << 'EOF_PAGE4' > pages/04-olipop-zest-beverage.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page 04 — Olipop & Zest Botanical Beverage Storefront (Olipop Lemon, Cobalt & Hot Pink)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (Olipop Lemon, Cobalt & Hot Pink by @bymarcoperez) */
      --bg-60: #F4E452;      /* 60% Background: Lemon Yellow */
      --surface-30: #0D32B8; /* 30% Surface/Text: Cobalt Blue */
      --action-10: #FF318C;   /* 10% Action: Hot Pink */
      --action-text: #F4F1EA;
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
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">OLIPOP</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">Find your flavor</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE 04 · 60% Lemon Yellow (#F4E452) · 30% Cobalt Blue (#0D32B8) · 10% Hot Pink (#FF318C)
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          SIP HAPPY.
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          Less ordinary. More oh-so-good. Plant-powered prebiotic soda crafted with botanicals and real fruit juice.
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">Find your flavor</button>
          <button class="btn-secondary">Read ingredients</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          <div class="mono" style="font-size: 0.75rem;">9G PREBIOTIC FIBER · 2G SUGAR</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">12-Can Custom Variety Pack</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Lemon yellow and cobalt blue looks fun. Add a little hot pink—now the product jumps off the page."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
EOF_PAGE4

cat << 'EOF_PAGE5' > pages/05-kontour-arca-studio.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page 05 — Kontour & Arca Architectural Lighting Studio (Kontour Editorial Black & Flame)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      /* 60-30-10 Functional Color Tokens (Kontour Editorial Black & Flame by @toolandtea) */
      --bg-60: #0B0B0B;      /* 60% Background: Jet Black */
      --surface-30: #F3F3F2; /* 30% Surface/Text: Soft White */
      --action-10: #FF4D00;   /* 10% Action: Flame Orange */
      --action-text: #F4F1EA;
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
    <span class="brand" style="font-size: 1.25rem; font-weight: 700;">KONTOUR</span>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#architecture">Architecture</a>
      <a href="#specifications">Specifications</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-primary">Start a project</button>
  </header>
  <main>
    <div class="hero-grid">
      <div>
        <p class="mono" style="font-size: 0.75rem; opacity: 0.75;">
          PAGE 05 · 60% Jet Black (#0B0B0B) · 30% Soft White (#F3F3F2) · 10% Flame Orange (#FF4D00)
        </p>
        <h1 style="font-size: clamp(2.5rem, 4.5vw, 4rem); line-height: 1.06; margin-top: 0.75rem;">
          Clarity first. Then the system.
        </h1>
        <p style="margin-top: 1.25rem; font-size: 1.05rem; opacity: 0.85; max-width: 54ch;">
          Industrial design and design-engineering foundry building hardware-grade interfaces.
        </p>
        <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
          <!-- Spend the action colour once -->
          <button class="btn-primary">Start a project</button>
          <button class="btn-secondary">View our work</button>
        </div>
      </div>
      <div class="card-outer">
        <div class="card-inner">
          <div class="mono" style="font-size: 0.75rem;">LUMINAIRE NO. 04 · 2700K WARMTH</div>
     <h2 style="margin-top: 1rem; font-size: 1.75rem;">01. Spatial Luminaires &amp; Systems</h2>
     <p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.85;">"Jet black and soft white already look premium, but add flame orange and now the whole thing is bold."</p>
     <div class="mono" style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">FREE · MIT OPEN SOURCE</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
EOF_PAGE5

echo "Created all ChromaKit design files and 5 web pages!"

if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

git add README.md SKILL.md CLAUDE.md .cursorrules tokens.json tailwind-v4-theme.css pages/
git commit -m "feat: add 24 extracted color combinations, 5 showcase web pages, and AI agent rules"

if git remote | grep -q "^origin$"; then
  git remote set-url origin "https://github.com/your-username/chromakit-color-system.git"
else
  git remote add origin "https://github.com/your-username/chromakit-color-system.git"
fi

echo "Pushing to https://github.com/your-username/chromakit-color-system.git..."
git push -u origin main
