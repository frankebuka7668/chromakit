import fs from 'node:fs';
import path from 'node:path';
import { EXTRACTED_PALETTES, getReadableTextColor, isValidHexColor, type ColorPalette } from '../src/data/palettes';
import { SHOWCASE_PAGES, type ShowcasePageConfig } from '../src/data/showcasePages';

const properties = ['bg', 'ink', 'accent', 'accent-ink', 'muted', 'line', 'card', 'card-ink', 'font', 'display', 'mono'] as const;
type PaletteProperty = typeof properties[number];
export type SyncIo = Pick<typeof console, 'log' | 'error'>;

function canonical(page: ShowcasePageConfig, palettes: ColorPalette[], filename: string): Record<PaletteProperty, string> {
  const palette = palettes.find((item) => item.id === page.defaultPaletteId);
  if (!palette) throw new Error(`${filename}: canonical palette '${page.defaultPaletteId}' not found`);
  const role = (name: string) => {
    const color = palette.colors.find((item) => item.role === name);
    if (!color) throw new Error(`${filename}: canonical palette '${palette.id}' has no '${name}' color`);
    if (!isValidHexColor(color.hex)) throw new Error(`${filename}: canonical ${name} color '${color.hex}' is invalid`);
    return color.hex;
  };
  const accent = role('action');
  return { bg: role('background'), ink: role('surface'), accent, 'accent-ink': getReadableTextColor(accent), muted: 'color-mix(in srgb,var(--ink) 67%,var(--bg))', line: 'color-mix(in srgb,var(--ink) 18%,transparent)', card: 'var(--ink)', 'card-ink': 'var(--bg)', font: '"Plus Jakarta Sans",sans-serif', display: '"Bricolage Grotesque",sans-serif', mono: '"JetBrains Mono",monospace' };
}

function expectedHtml(before: string, filename: string, values: Record<PaletteProperty, string>, palette: ColorPalette): string {
  const roots = [...before.matchAll(/:root\{([^}]*)\}/g)];
  if (roots.length !== 1) throw new Error(`${filename}: expected exactly one CSS :root block; found ${roots.length}`);
  let declarations = roots[0][1];
  for (const variable of properties) {
    const pattern = new RegExp(`(^|;)\\s*--${variable}(?![\\w-])`, 'g');
    const matches = [...declarations.matchAll(pattern)];
    const valid = [...declarations.matchAll(new RegExp(`(^|;)\\s*--${variable}(?![\\w-])\\s*:\\s*([^;}]*)`, 'g'))];
    if (matches.length !== 1 || valid.length !== 1 || !valid[0][2].trim()) {
      const actual = matches.map((match) => match[0]).join(', ') || 'missing';
      throw new Error(`${filename}: cannot replace --${variable}; expected exactly one valid declaration with value '${values[variable]}', found ${matches.length} declaration(s) (${actual})`);
    }
    declarations = declarations.replace(valid[0][0], `${valid[0][1]}--${variable}:${values[variable]}`);
  }
  let output = before.replace(roots[0][0], `:root{${declarations}}`);
  const themes = [...output.matchAll(/<meta\s+name="theme-color"\s+content="([^"]*)"\s*\/>/g)];
  if (themes.length !== 1) throw new Error(`${filename}: expected one theme-color meta; found ${themes.length}`);
  output = output.replace(themes[0][0], themes[0][0].replace(themes[0][1], values.bg));
  const swatchPattern = /<div class="palette-row">[\s\S]*?(?=<\/section>)/g;
  const swatches = [...output.matchAll(swatchPattern)];
  if (swatches.length !== 1) throw new Error(`${filename}: expected one palette-row swatch group; found ${swatches.length}`);
  const swatchHtml = `<div class="palette-row">${palette.colors.map((color) => `<div class="swatch"><span class="swatch-chip" style="background:${color.hex}" aria-hidden="true"></span><span class="swatch-copy"><strong>${color.name}</strong><small>${color.hex}</small></span></div>`).join('')}</div>`;
  output = output.replace(swatchPattern, swatchHtml);
  return output;
}

export function synchronizeShowcaseFiles(options: { root: string; pages?: ShowcasePageConfig[]; palettes?: ColorPalette[]; checkOnly?: boolean; io?: SyncIo }): boolean {
  const { root, pages = SHOWCASE_PAGES, palettes = EXTRACTED_PALETTES, checkOnly = false, io = console } = options;
  const plans = pages.map((page) => {
    const filename = path.basename(page.staticUrl);
    const target = path.join(root, 'public/pages', filename);
    if (!fs.existsSync(target)) throw new Error(`${filename}: expected target file at '${target}', but it does not exist`);
    const before = fs.readFileSync(target, 'utf8');
    const palette = palettes.find((item) => item.id === page.defaultPaletteId);
    if (!palette) throw new Error(`${filename}: canonical palette '${page.defaultPaletteId}' not found`);
    const values = canonical(page, palettes, filename);
    const after = expectedHtml(before, filename, values, palette);
    return { filename, target, before, after, values };
  });
  const stale = plans.filter((plan) => plan.before !== plan.after);
  if (checkOnly) {
    for (const plan of stale) {
      const declarations = plan.before.match(/:root\{([^}]*)\}/)?.[1] ?? '';
      const differing = properties.filter((variable) => {
        const found = [...declarations.matchAll(new RegExp(`(?:^|;)\\s*--${variable}(?![\\w-])\\s*:\\s*([^;}]*)`, 'g'))];
        return found.length !== 1 || found[0][1].trim() !== plan.values[variable];
      });
      io.error(`${plan.filename}: stale; expected CSS variables ${differing.map((variable) => `--${variable}='${plan.values[variable]}'`).join(', ') || '(non-variable showcase markup)'}; actual values ${differing.map((variable) => { const m = declarations.match(new RegExp(`(?:^|;)\\s*--${variable}(?![\\w-])\\s*:\\s*([^;}]*)`)); return `--${variable}='${m?.[1].trim() ?? 'missing/duplicate'}`; }).join(', ') || 'palette HTML differs'}`);
    }
    return stale.length === 0;
  }
  for (const plan of stale) fs.writeFileSync(plan.target, plan.after);
  for (const plan of stale) io.log(`Synced ${plan.filename}`);
  if (!stale.length) io.log('Showcase pages already synchronized; no changes needed');
  return true;
}
