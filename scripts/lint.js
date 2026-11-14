import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src');
const issues = [];

function collect(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory()
      ? collect(target)
      : /\.(?:ts|tsx)$/.test(entry.name)
        ? [target]
        : [];
  });
}

const files = collect(sourceRoot);
for (const filename of files) {
  const relativePath = path.relative(root, filename);
  const lines = fs.readFileSync(filename, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (/\s+$/.test(line)) issues.push(`${relativePath}:${lineNumber}: trailing whitespace`);
    if (/\bdebugger\s*;?\s*$/.test(line)) issues.push(`${relativePath}:${lineNumber}: remove debugger statement`);
    if (/\bconsole\.log\s*\(/.test(line)) issues.push(`${relativePath}:${lineNumber}: remove console.log from application source`);
  });
}

if (issues.length > 0) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Lint checks passed for ${files.length} TypeScript source files.`);
}
