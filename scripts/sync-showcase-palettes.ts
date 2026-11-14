import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXTRACTED_PALETTES } from '../src/data/palettes';
import { SHOWCASE_PAGES } from '../src/data/showcasePages';
import { synchronizeShowcaseFiles } from './showcase-sync-lib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');
const pagesMatch = synchronizeShowcaseFiles({ root, checkOnly });
const galleryPath = path.join(root, 'index.html');
const before = fs.readFileSync(galleryPath, 'utf8');
let cardIndex = 0;
let labelIndex = 0;
const cards = before.replace(/<div class="swatches" aria-label="Color combination:[^"]*">[\s\S]*?<\/div>/g, () => {
  const page = SHOWCASE_PAGES[cardIndex++];
  if (!page) throw new Error('index.html: unexpected extra showcase card');
  const palette = EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId);
  if (!palette) throw new Error(`index.html: missing canonical palette ${page.defaultPaletteId}`);
  const names = palette.colors.map((color) => color.name);
  const accessible = names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}` : names[0];
  return `<div class="swatches" aria-label="Color combination: ${accessible}">\n                ${palette.colors.map((color) => `<span class="swatch"><i class="dot" style="background:${color.hex}"></i>${color.name}</span>`).join('\n                ')}\n              </div>`;
});
const after = cards.replace(/<div class="palette-label">[^<]*<\/div>/g, () => {
  const page = SHOWCASE_PAGES[labelIndex++];
  const palette = page && EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId);
  if (!palette) throw new Error('index.html: palette label mapping is incomplete');
  return `<div class="palette-label">${palette.colors.map((color) => color.name).join(' · ')}</div>`;
});
if (cardIndex !== SHOWCASE_PAGES.length || labelIndex !== SHOWCASE_PAGES.length) throw new Error(`index.html: expected ${SHOWCASE_PAGES.length} cards and labels; found ${cardIndex} and ${labelIndex}`);
if (checkOnly) {
  if (after !== before) { console.error('index.html: stale showcase cards or labels'); process.exitCode = 1; }
  if (!pagesMatch) process.exitCode = 1;
} else if (after !== before) fs.writeFileSync(galleryPath, after);
