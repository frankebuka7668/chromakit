import React, { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  FileCode,
  FileJson,
  FileText,
  FolderGit2,
  GitBranch,
  Globe
} from 'lucide-react';
import { ColorPalette, EXTRACTED_PALETTES, PaletteColor } from '../data/palettes';
import { downloadBlob } from '../utils/browser';
import {
  GeneratedRepoFile,
  RepoFileId,
  generateRepoFiles
} from '../utils/repoGenerator';

interface RepoGeneratorViewProps {
  activePalette: ColorPalette;
  activeColors: PaletteColor[];
  onCopyText: (text: string, label: string) => void | Promise<boolean>;
}

const RECOMMENDED_REPO_NAME = 'chromakit';
const RECOMMENDED_REPO_DESCRIPTION =
  'Free, open-source 60-30-10 color combinations, 5 showcase web pages, 20 UI unslop rules, and 22 background recipes for developers and AI coding agents (SKILL.md, CLAUDE.md, .cursorrules, Tailwind v4, W3C tokens).';

export const RepoGeneratorView: React.FC<RepoGeneratorViewProps> = ({
  activePalette,
  activeColors,
  onCopyText
}) => {
  const [scope, setScope] = useState<'all' | 'active'>('all');
  const [selectedFileId, setSelectedFileId] = useState<RepoFileId>('SKILL.md');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const files = useMemo(
    () => generateRepoFiles(activePalette, scope, activeColors),
    [activePalette, activeColors, scope]
  );

  const currentFile: GeneratedRepoFile =
    files.find((f) => f.id === selectedFileId) ?? files[0];

  const handleCopyFile = async (file: GeneratedRepoFile) => {
    const copied = await onCopyText(file.content, file.filename);
    if (copied === false) return;
    setCopiedId(file.id);
    window.setTimeout(() => setCopiedId(null), 1400);
  };

  const handleDownloadFile = (file: GeneratedRepoFile) => {
    const mimeMap: Record<GeneratedRepoFile['language'], string> = {
      markdown: 'text/markdown;charset=utf-8',
      json: 'application/json;charset=utf-8',
      css: 'text/css;charset=utf-8',
      html: 'text/html;charset=utf-8',
      bash: 'text/x-shellscript;charset=utf-8'
    };
    try {
      downloadBlob(new Blob([file.content], { type: mimeMap[file.language] }), file.filename);
      setDownloadError(null);
    } catch {
      setDownloadError(`Could not download ${file.filename}. Please try again.`);
    }
  };

  const renderIcon = (id: RepoFileId) => {
    if (id === 'tokens.json') return <FileJson className="w-4 h-4 text-[#D4FF3A]" />;
    if (id === 'tailwind-v4-theme.css') return <FileCode className="w-4 h-4 text-[#5482FF]" />;
    if (id.startsWith('/pages/')) return <Globe className="w-4 h-4 text-[#6BFCC4]" />;
    return <FileText className="w-4 h-4 text-[#F4F1EA]" />;
  };

  return (
    <div className="space-y-6">
      {/* Header & Repository Metadata Bar */}
      <div className="rounded-2xl border border-[#F4F1EA]/10 bg-[#16161A] p-2">
        <div className="rounded-lg bg-[#0E0E10] p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4F1EA]/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9A9890] font-mono">
                <GitBranch className="w-3.5 h-3.5 text-[#FF4D1F]" />
                <span>100% FREE &amp; OPEN-SOURCE (MIT) · AGENT &amp; DESIGN TOKEN FILES</span>
              </div>
              <h2 className="mt-1 text-2xl font-display font-semibold text-[#F4F1EA]">
                Agent Rules, Design Tokens &amp; Standalone HTML Pages
              </h2>
            </div>

            <div className="inline-flex items-center rounded-lg bg-[#16161A] p-1 border border-[#F4F1EA]/10">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  scope === 'all'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                All {EXTRACTED_PALETTES.length} Palettes + 5 Pages
              </button>
              <button
                type="button"
                onClick={() => setScope('active')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  scope === 'active'
                    ? 'bg-[#F4F1EA] text-[#0E0E10]'
                    : 'text-[#9A9890] hover:text-[#F4F1EA]'
                }`}
              >
                Active Palette ({activePalette.brandName})
              </button>
            </div>
          </div>

          {/* Copyable Repo Name & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#9A9890]">
                  RECOMMENDED REPO NAME
                </div>
                <div className="mt-1 text-sm font-mono font-bold text-[#F4F1EA] truncate">
                  {RECOMMENDED_REPO_NAME}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onCopyText(RECOMMENDED_REPO_NAME, 'Repository Name')}
                className="px-3 py-1.5 rounded-lg bg-[#0E0E10] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-mono text-[#F4F1EA] flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Name
              </button>
            </div>

            <div className="lg:col-span-8 rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#9A9890]">
                  RECOMMENDED REPO DESCRIPTION
                </div>
                <div className="mt-1 text-xs text-[#F4F1EA] truncate">
                  {RECOMMENDED_REPO_DESCRIPTION}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onCopyText(RECOMMENDED_REPO_DESCRIPTION, 'Repository Description')}
                className="px-3 py-1.5 rounded-lg bg-[#0E0E10] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-mono text-[#F4F1EA] flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Description
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* IDE File Explorer & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Repository File Tree */}
        <div className="lg:col-span-4 rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9A9890] pb-2 border-b border-[#F4F1EA]/10">
            <FolderGit2 className="w-4 h-4 text-[#F4F1EA]" />
            <span>chromakit/ (11 free MIT files)</span>
          </div>

          <div className="space-y-1 max-h-[560px] overflow-y-auto pr-1">
            {files.map((file) => {
              const isSelected = file.id === currentFile.id;
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full text-left rounded-lg p-2.5 transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0E0E10] border border-[#F4F1EA]/20 text-[#F4F1EA]'
                      : 'hover:bg-[#0E0E10]/50 text-[#9A9890] border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="mt-0.5 shrink-0">{renderIcon(file.id)}</div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-semibold text-[#F4F1EA] truncate">
                        {file.id}
                      </div>
                      <p className="text-[11px] text-[#9A9890] leading-snug mt-0.5">
                        {file.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="lg:col-span-8 rounded-xl border border-[#F4F1EA]/10 bg-[#16161A] overflow-hidden">
          {downloadError && <p role="status" className="px-4 py-2 text-xs text-red-300">{downloadError}</p>}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[#F4F1EA]/10 bg-[#0E0E10]">
            <div className="flex items-center gap-2.5">
              {renderIcon(currentFile.id)}
              <span className="font-mono text-sm font-semibold text-[#F4F1EA]">
                {currentFile.id}
              </span>
              <span className="text-xs text-[#9A9890] font-mono tabular-nums">
                · {currentFile.content.split('\n').length} lines
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyFile(currentFile)}
                className="px-3.5 py-1.5 rounded-lg bg-[#16161A] border border-[#F4F1EA]/15 hover:border-[#F4F1EA]/40 text-xs font-medium text-[#F4F1EA] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedId === currentFile.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#D4FF3A]" />
                    <span>Copied {currentFile.filename}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {currentFile.filename}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDownloadFile(currentFile)}
                className="px-3.5 py-1.5 rounded-lg bg-[#F4F1EA] text-[#0E0E10] hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition-opacity whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>

          <pre className="p-5 text-xs font-mono text-[#F4F1EA]/90 overflow-x-auto max-h-[600px] leading-relaxed bg-[#0E0E10]/70">
            <code>{currentFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
