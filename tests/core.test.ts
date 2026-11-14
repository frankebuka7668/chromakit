import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  EXTRACTED_PALETTES,
  getContrastWarning,
  getPreciseContrastRatio,
  getReadableTextColor,
  hexToRgb,
  isValidHexColor
} from '../src/data/palettes';
import { copyTextWithFallback, downloadBlob, type DownloadEnvironment } from '../src/utils/browser';
import { generateRepoFiles } from '../src/utils/repoGenerator';
import { SHOWCASE_PAGES } from '../src/data/showcasePages';
import { synchronizeShowcaseFiles } from '../scripts/showcase-sync-lib';

test('hexadecimal parsing accepts three and six digit RGB and rejects malformed and alpha input', () => {
  for (const value of ['#ABC', '#abc', '#ABCDEF', '#abcdef', '#aBc', '#a1B2c3']) assert.equal(isValidHexColor(value), true, value);
  assert.deepEqual(hexToRgb('#FFF'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#FFFFFF'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#000000'), { r: 0, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('#5482FF'), { r: 84, g: 130, b: 255 });
  for (const value of ['', '   ', 'FFFFFF', '#GGG', '#12', '#1234', '#1234567', '#11223344', '#FFF8', '#12zz34', '#12GGGG']) {
    assert.equal(isValidHexColor(value), false);
    assert.throws(() => hexToRgb(value), /Invalid hexadecimal colour/);
  }
});

test('readable text selection compares both foreground candidates by contrast', () => {
  for (const color of ['#000000', '#FFFFFF', '#777777', '#FF318C', '#D5E5F0']) {
    const chosen = getReadableTextColor(color);
    const alternative = chosen === '#0E0E10' ? '#F4F1EA' : '#0E0E10';
    assert.ok(getPreciseContrastRatio(color, chosen) >= getPreciseContrastRatio(color, alternative));
  }
  assert.equal(getReadableTextColor('#FFFFFF'), '#0E0E10');
  assert.equal(getReadableTextColor('#000000'), '#F4F1EA');
});

test('contrast warnings respect normal-text WCAG AA threshold', () => {
  assert.equal(getContrastWarning(4.5), null);
  assert.equal(getContrastWarning(7), null);
  assert.match(getContrastWarning(4.49) ?? '', /below the 4.5:1 WCAG target/);
  const borderline = getPreciseContrastRatio('#777777', '#FFFFFF');
  assert.ok(borderline < 4.5);
  assert.match(getContrastWarning(borderline) ?? '', /4\.478:1/);
});

test('all five static showcases use canonical palette tokens and swatches', () => {
  assert.equal(SHOWCASE_PAGES.length, 5);
  const gallery = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const page of SHOWCASE_PAGES) {
    const filename = page.staticUrl.split('/').at(-1);
    const palette = EXTRACTED_PALETTES.find((entry) => entry.id === page.defaultPaletteId);
    assert.ok(filename);
    assert.ok(palette, `Missing palette ${page.defaultPaletteId}`);
    const html = readFileSync(new URL(`../public/pages/${filename}`, import.meta.url), 'utf8');
    assert.ok(gallery.includes(`<div class="palette-label">${palette.colors.map((color) => color.name).join(' · ')}</div>`));
    for (const color of palette.colors) {
      assert.ok(html.includes(color.hex), `${filename} is missing ${color.hex}`);
      assert.ok(html.includes(`<strong>${color.name}</strong>`), `${filename} is missing swatch ${color.name}`);
      assert.ok(
        gallery.includes(`<i class="dot" style="background:${color.hex}"></i>${color.name}`),
        `index.html is missing canonical swatch ${color.name}`
      );
    }
    const background = palette.colors.find((color) => color.role === 'background');
    const surface = palette.colors.find((color) => color.role === 'surface');
    const action = palette.colors.find((color) => color.role === 'action');
    assert.ok(background && surface && action);
    assert.ok(html.includes(`--bg:${background.hex};--ink:${surface.hex};--accent:${action.hex};`));
    assert.ok(html.includes(`<meta name="theme-color" content="${background.hex}" />`), `${filename} has stale background theme color`);
  }
});

test('custom palette edits flow consistently into JSON, CSS, Tailwind and standalone HTML without mutation', () => {
  const palette = EXTRACTED_PALETTES.find((entry) => entry.id === 'leica-look-closer');
  assert.ok(palette);
  const before = structuredClone(palette.colors);
  const customized = palette.colors.map((color) => ({ ...color }));
  customized.find((color) => color.role === 'background')!.hex = '#F0E0D0';
  customized.find((color) => color.role === 'surface')!.hex = '#102030';
  customized.find((color) => color.role === 'action')!.hex = '#D02040';
  const files = generateRepoFiles(palette, 'all', customized);
  const file = (id: string) => files.find((candidate) => candidate.id === id)?.content ?? '';
  const tokens = JSON.parse(file('tokens.json')) as { palettes: Record<string, { colors: Array<{ role: string; hex: string }> }> };
  const exportedColors = tokens.palettes[palette.id].colors;
  assert.ok(exportedColors.some((color) => color.role === 'background' && color.hex === '#F0E0D0'));
  assert.ok(exportedColors.some((color) => color.role === 'surface' && color.hex === '#102030'));
  assert.ok(exportedColors.some((color) => color.role === 'action' && color.hex === '#D02040'));
  assert.match(file('tailwind-v4-theme.css'), /--color-leica-look-closer-bg: #F0E0D0/);
  const standalone = file('/pages/01-leica-mono-hardware.html');
  assert.match(standalone, /--bg-60: #F0E0D0/);
  assert.match(standalone, /--surface-30: #102030/);
  assert.match(standalone, /--action-10: #D02040/);
  assert.deepEqual(palette.colors, before);

  const guardbase = EXTRACTED_PALETTES.find((entry) => entry.id === 'guardbase-security');
  assert.ok(guardbase);
  const guardbaseColors = guardbase.colors.map((color) => ({ ...color }));
  guardbaseColors.find((color) => color.role === 'action')!.hex = '#12A878';
  const guardbaseHtml = generateRepoFiles(guardbase, 'all', guardbaseColors)
    .find((candidate) => candidate.id === '/pages/02-guardbase-ai-security.html')?.content ?? '';
  assert.match(guardbaseHtml, /<pre class="mono"[^>]*color: var\(--action-10\);/);
});

test('generated repository exposes synchronized agent instruction formats', () => {
  const files = generateRepoFiles(EXTRACTED_PALETTES[0], 'active');
  const ids = new Set(files.map((file) => file.id));
  for (const id of ['AGENTS.md', '.agents/skills/chromakit/SKILL.md', '.cursor/rules/chromakit.mdc', '.devin/README.md']) {
    assert.ok(ids.has(id as (typeof files)[number]['id']), `Missing ${id}`);
  }
  assert.match(files.find((file) => file.id === '.cursor/rules/chromakit.mdc')?.content ?? '', /alwaysApply: true/);
  assert.match(files.find((file) => file.id === '.devin/README.md')?.content ?? '', /does not claim automatic discovery/);
});

test('clipboard reports native success, falls back after rejection, and reports failure truthfully', async () => {
  assert.equal(await copyTextWithFallback('hello', {
    clipboard: { writeText: async () => undefined },
    fallbackCopy: () => false
  }), true);
  let fallbackText = '';
  assert.equal(await copyTextWithFallback('fallback', {
    clipboard: { writeText: async () => { throw new Error('permission denied'); } },
    fallbackCopy: (text) => { fallbackText = text; return true; }
  }), true);
  assert.equal(fallbackText, 'fallback');
  assert.equal(await copyTextWithFallback('nope', {
    fallbackCopy: () => false
  }), false);
});

test('downloads defer independent URL cleanup for repeated clicks', () => {
  const scheduled: Array<{ url: string; delay: number; callback: () => void }> = [];
  const revoked: string[] = [];
  const clicked: string[] = [];
  let nextUrl = 0;
  const anchor = { href: '', download: '', click: () => clicked.push(anchor.href) };
  const body = {
    appendChild: (node: Node) => { clicked.push((node as HTMLAnchorElement).href); return node; },
    removeChild: (node: Node) => node
  };
  const environment: DownloadEnvironment = {
    document: {
      body,
      createElement: () => anchor as unknown as HTMLAnchorElement
    } as unknown as DownloadEnvironment['document'],
    createObjectURL: () => `blob:test-${++nextUrl}`,
    revokeObjectURL: (url: string) => revoked.push(url),
    schedule: (callback: () => void, delay: number) => { scheduled.push({ url: `blob:test-${nextUrl}`, delay, callback }); }
  };
  downloadBlob(new Blob(['one']), 'one.txt', environment);
  downloadBlob(new Blob(['two']), 'two.txt', environment);
  const failingEnvironment: DownloadEnvironment = {
    ...environment,
    document: {
      body,
      createElement: () => ({ href: '', download: '', click() { throw new Error('click failed'); } }) as unknown as HTMLAnchorElement
    } as unknown as DownloadEnvironment['document']
  };
  assert.throws(() => downloadBlob(new Blob(['broken']), 'broken.txt', failingEnvironment), /click failed/);
  assert.equal(scheduled.length, 3);
  assert.deepEqual(scheduled.map((entry) => entry.delay), [1000, 1000, 1000]);
  assert.deepEqual(revoked, []);
  scheduled.forEach((entry) => entry.callback());
  assert.deepEqual(revoked, ['blob:test-1', 'blob:test-2', 'blob:test-3']);
  assert.equal(clicked.some((url) => url.includes('blob:test-1')), true);
});

test('showcase synchronizer replaces exact CSS values, preserves unrelated content, and is idempotent', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'chromakit-sync-'));
  try {
    mkdirSync(path.join(root, 'public/pages'), { recursive: true });
    const page = SHOWCASE_PAGES[0];
    const palette = EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId)!;
    const html = '<!doctype html><style>:root{--bg:#000000;--ink:#111111;--accent:#222222;--accent-ink:#000000;--muted:old;--line:old;--card:old;--card-ink:old;--font:old;--display:old;--mono:old}</style><p>keep this</p><meta name="theme-color" content="#000000" /><section><div class="palette-row"><old></div></section>';
    const target = path.join(root, 'public/pages', path.basename(page.staticUrl));
    writeFileSync(target, html);
    const messages = { log: () => {}, error: () => {} };
    assert.equal(synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette], io: messages }), true);
    const generated = readFileSync(target, 'utf8');
    assert.ok(generated.includes(`--bg:${palette.colors.find((c) => c.role === 'background')!.hex}`));
    assert.ok(generated.includes('<p>keep this</p>'));
    assert.equal(synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette], io: messages }), true);
    assert.equal(readFileSync(target, 'utf8'), generated);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('showcase synchronizer validates missing, duplicate, and malformed declarations without writes', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'chromakit-invalid-sync-'));
  try {
    mkdirSync(path.join(root, 'public/pages'), { recursive: true });
    const page = SHOWCASE_PAGES[0];
    const palette = EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId)!;
    const filename = path.basename(page.staticUrl);
    assert.throws(() => synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette] }), /target file.*does not exist/);
    const good = '<style>:root{--bg:#000;--ink:#000;--accent:#000;--accent-ink:#000;--muted:x;--line:x;--card:x;--card-ink:x;--font:x;--display:x;--mono:x}</style><meta name="theme-color" content="#000000" /><section><div class="palette-row"><old></div></section>';
    const target = path.join(root, 'public/pages', filename);
    for (const broken of [good.replace('--bg:#000;', '--bg:#000;--bg:#111;'), good.replace('--bg:#000;', '--bg #000;')]) {
      writeFileSync(target, broken);
      assert.throws(() => synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette] }), /--bg/);
      assert.equal(readFileSync(target, 'utf8'), broken);
    }
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('failed showcase replacement throws without emitting a success message', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'chromakit-failure-sync-'));
  try {
    mkdirSync(path.join(root, 'public/pages'), { recursive: true });
    const page = SHOWCASE_PAGES[0];
    const palette = EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId)!;
    const target = path.join(root, 'public/pages', path.basename(page.staticUrl));
    writeFileSync(target, '<style>:root{--bg:#000;--ink:#000;--accent:#000;--accent-ink:#000;--muted:x;--line:x;--card:x;--card-ink:x;--font:x;--display:x}</style><meta name="theme-color" content="#000000" /><section><div class="palette-row"></div></section>');
    const success: string[] = [];
    assert.throws(() => synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette], io: { log: (message) => success.push(message), error: () => {} } }), /--mono/);
    assert.deepEqual(success, []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('showcase check mode reports stale variables, returns failure, and never modifies files', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'chromakit-check-sync-'));
  try {
    mkdirSync(path.join(root, 'public/pages'), { recursive: true });
    const page = SHOWCASE_PAGES[0];
    const palette = EXTRACTED_PALETTES.find((item) => item.id === page.defaultPaletteId)!;
    const original = '<style>:root{--bg:#000;--ink:#000;--accent:#000;--accent-ink:#000;--muted:x;--line:x;--card:x;--card-ink:x;--font:x;--display:x;--mono:x}</style><meta name="theme-color" content="#000000" /><section><div class="palette-row"><old></div></section>';
    const target = path.join(root, 'public/pages', path.basename(page.staticUrl));
    writeFileSync(target, original);
    const errors: string[] = [];
    assert.equal(synchronizeShowcaseFiles({ root, pages: [page], palettes: [palette], checkOnly: true, io: { log: () => {}, error: (message) => errors.push(message) } }), false);
    assert.match(errors.join('\n'), /stale.*--bg=/);
    assert.match(errors.join('\n'), /--ink=/);
    assert.equal(readFileSync(target, 'utf8'), original);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
