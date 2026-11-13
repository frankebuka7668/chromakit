import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const skillPath = path.join(rootDir, 'SKILL.md');
const claudePath = path.join(rootDir, 'CLAUDE.md');
const cursorRulesPath = path.join(rootDir, '.cursorrules');

const HEADER_COMMENT =
  '<!-- AUTO-GENERATED from SKILL.md. Edit SKILL.md, then run `npm run sync-rules`. -->\n\n';

const rawSkill = fs.readFileSync(skillPath, 'utf8');
const bodyWithoutFrontmatter = rawSkill.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
const outputContent = `${HEADER_COMMENT}${bodyWithoutFrontmatter}`;

fs.writeFileSync(claudePath, outputContent, 'utf8');
fs.writeFileSync(cursorRulesPath, outputContent, 'utf8');

console.log('Synced SKILL.md -> CLAUDE.md and .cursorrules');
