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
