import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXTRACTED_PALETTES, getReadableTextColor } from '../src/data/palettes';
import { SHOWCASE_PAGES } from '../src/data/showcasePages';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = SHOWCASE_PAGES.map((page) => [
  path.basename(page.staticUrl),
  page.defaultPaletteId
] as const);
const checkOnly = process.argv.includes('--check');

for (const [filename, paletteId] of pages) {
  const palette = EXTRACTED_PALETTES.find((item) => item.id === paletteId);
  if (!palette) throw new Error(`Missing canonical palette: ${paletteId}`);
  const colorFor = (role: string) => palette.colors.find((color) => color.role === role);
  const background = colorFor('background');
  const surface = colorFor('surface');
  const action = colorFor('action');
  if (!background || !surface || !action) throw new Error(`Incomplete palette: ${paletteId}`);
  const colors = `:root{--bg:${background.hex};--ink:${surface.hex};--accent:${action.hex};--accent-ink:${getReadableTextColor(action.hex)};--muted:color-mix(in srgb,var(--ink) 67%,var(--bg));--line:color-mix(in srgb,var(--ink) 18%,transparent);--card:var(--ink);--card-ink:var(--bg);--font:"Plus Jakarta Sans",sans-serif;--display:"Bricolage Grotesque",sans-serif;--mono:"JetBrains Mono",monospace}`;
  const swatches = `<div class="palette-row">${palette.colors.map((color) => `<div class="swatch"><span class="swatch-chip" style="background:${color.hex}" aria-hidden="true"></span><span class="swatch-copy"><strong>${color.name}</strong><small>${color.hex}</small></span></div>`).join('')}</div>`;
  const filePath = path.join(root, 'public/pages', filename);
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = original
    .replace(/<meta name="theme-color" content="#[0-9A-Fa-f]{6}"\s*\/>/, `<meta name="theme-color" content="${background.hex}" />`)
    .replace(/:root\{--bg:[^}]*\}/, colors)
    .replace(/\n  <style>:root\{--bg:[^<]*<\/style>/, '')
    .replace(/<div class="palette-row">[\s\S]*?(?=<\/section>)/, swatches);
  if (checkOnly) {
    if (updated !== original) throw new Error(`${filename} is out of sync; run npm run sync-showcases`);
  } else {
    fs.writeFileSync(filePath, updated);
    console.log(`Synced ${filename} from ${paletteId}`);
  }
}

const galleryPath = path.join(root, 'index.html');
const originalGallery = fs.readFileSync(galleryPath, 'utf8');
let galleryPageIndex = 0;
let galleryLabelIndex = 0;
const updatedGallery = originalGallery.replace(
  /<div class="swatches" aria-label="Color combination:[^"]*">[\s\S]*?<\/div>/g,
  () => {
    const page = SHOWCASE_PAGES[galleryPageIndex++];
    const palette = page && EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId);
    if (!page || !palette) throw new Error('Showcase gallery palette mapping is incomplete');
    const names = palette.colors.map((color) => color.name);
    const accessibleNames = names.length > 1
      ? `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`
      : names[0];
    const swatches = palette.colors.map((color) =>
      `<span class="swatch"><i class="dot" style="background:${color.hex}"></i>${color.name}</span>`
    ).join('\n                ');
    return `<div class="swatches" aria-label="Color combination: ${accessibleNames}">\n                ${swatches}\n              </div>`;
  }
);
const updatedGalleryWithLabels = updatedGallery.replace(
  /<div class="palette-label">[^<]*<\/div>/g,
  () => {
    const page = SHOWCASE_PAGES[galleryLabelIndex++];
    const palette = page && EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId);
    if (!page || !palette) throw new Error('Showcase gallery labels do not match the palette mapping');
    return `<div class="palette-label">${palette.colors.map((color) => color.name).join(' · ')}</div>`;
  }
);
if (galleryPageIndex !== SHOWCASE_PAGES.length || galleryLabelIndex !== SHOWCASE_PAGES.length) {
  throw new Error(`Expected ${SHOWCASE_PAGES.length} palette cards and labels in index.html; found ${galleryPageIndex} cards and ${galleryLabelIndex} labels`);
}
if (checkOnly) {
  if (updatedGalleryWithLabels !== originalGallery) throw new Error('index.html palette cards are out of sync; run npm run sync-showcases');
} else {
  fs.writeFileSync(galleryPath, updatedGalleryWithLabels);
  console.log('Synced index.html showcase cards from canonical palettes');
}
