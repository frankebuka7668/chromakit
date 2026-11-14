import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');
const rawSkill = fs.readFileSync(path.join(rootDir, 'SKILL.md'), 'utf8');
const body = rawSkill.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
const generated = (content) =>
  `<!-- AUTO-GENERATED from SKILL.md. Edit SKILL.md, then run \`npm run sync-rules\`. -->\n\n${content}`;
const cursorMdc = `---\ndescription: ChromaKit colour roles, contrast, and UI design rules\nglobs: **/*\nalwaysApply: true\n---\n\n${body}`;
const skillFile = `---\nname: chromakit\ndescription: ChromaKit palette, contrast, and interface design guidance. Use when building or editing UI.\n---\n\n${body}`;
const outputs = new Map([
  ['CLAUDE.md', generated(body)],
  ['.cursorrules', generated(body)],
  ['AGENTS.md', generated(body)],
  ['.agents/skills/chromakit/SKILL.md', skillFile],
  ['.cursor/rules/chromakit.mdc', cursorMdc],
  [
    '.devin/README.md',
    `# Devin repository guidance\n\nThis generated reference mirrors the shared ChromaKit instructions in [AGENTS.md](../AGENTS.md) and [SKILL.md](../SKILL.md). Keep both in sync with \`npm run sync-rules\`. This file is provided for explicit/manual use; it does not claim automatic discovery by Devin.\n`
  ]
]);

for (const [relativePath, content] of outputs) {
  const filePath = path.join(rootDir, relativePath);
  if (checkOnly) {
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8') !== content) {
      throw new Error(`${relativePath} is out of sync; run npm run sync-rules`);
    }
  } else {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log(`${checkOnly ? 'Verified' : 'Synced'} SKILL.md to ${[...outputs.keys()].join(', ')}`);
