import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  EXTRACTED_PALETTES,
  getContrastWarning,
  getPreciseContrastRatio,
  getReadableTextColor
} from '../src/data/palettes';
import { copyTextWithFallback, downloadBlob, type DownloadEnvironment } from '../src/utils/browser';
import { generateRepoFiles } from '../src/utils/repoGenerator';
import { SHOWCASE_PAGES } from '../src/data/showcasePages';

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
