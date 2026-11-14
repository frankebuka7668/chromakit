import React from 'react';
import {

} from 'lucide-react';
import type { ShowcasePageState } from '../useShowcasePageState';

interface Props {
  state: ShowcasePageState;
  onCopyText: (text: string, label: string) => void;
}

export const OlipopZestPage: React.FC<Props> = ({ state, onCopyText }) => {
  const { activeFlavorIdx, setActiveFlavorIdx, boxCounts, setBoxCounts, activeBotanicalIdx, setActiveBotanicalIdx, boxClaimed, setBoxClaimed, palette, bg, surface, action, actionTextColor, totalCans, FLAVORS, BOTANICAL_STUDIES } = state;
  return (
    <>
        <article
          className="rounded-2xl border border-white/15 overflow-hidden transition-colors duration-200 shadow-2xl"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Website 04 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-2xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-90">
              <a href="#p4-flavors" className="hover:underline whitespace-nowrap shrink-0">Flavor Explorer</a>
              <a href="#p4-builder" className="hover:underline whitespace-nowrap shrink-0">12-Can Box Builder</a>
              <a href="#p4-botanicals" className="hover:underline whitespace-nowrap shrink-0">Prebiotic Science</a>
            </nav>
            <button
              type="button"
              onClick={() => setBoxClaimed(true)}
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0"
            >
              {boxClaimed ? `Box Ready (${totalCans} Cans) ✓` : `Your Box (${totalCans}/12)`}
            </button>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Section 1: Hero & Interactive Flavor Switcher */}
            <section id="p4-flavors" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono font-bold tracking-wide">
                  PLANT-POWERED MICROBIOME TONIC · 9G PREBIOTIC FIBER · 2G SUGAR
                </div>
                <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[0.98]">
                  {palette.tagline}
                </h1>
                <p className="text-base sm:text-lg opacity-90 max-w-lg leading-relaxed">
                  {FLAVORS[activeFlavorIdx].tagline} Crafted with {FLAVORS[activeFlavorIdx].botanicals}.
                </p>

                {/* Flavor Selector Buttons */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-semibold opacity-80">
                    SELECT ACTIVE FLAVOR CAN:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FLAVORS.map((flv, idx) => (
                      <button
                        key={flv.name}
                        type="button"
                        onClick={() => setActiveFlavorIdx(idx)}
                        style={{
                          backgroundColor: activeFlavorIdx === idx ? surface.hex : 'transparent',
                          color: activeFlavorIdx === idx ? bg.hex : surface.hex,
                          borderColor: `${surface.hex}40`
                        }}
                        className="px-3.5 py-2 rounded-full border text-xs font-bold transition-colors"
                      >
                        {flv.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const flavorName = FLAVORS[activeFlavorIdx].name;
                      setBoxCounts((prev) => ({
                        ...prev,
                        [flavorName]: (prev[flavorName] ?? 0) + 2
                      }));
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-6 py-3.5 rounded-full text-sm font-bold transition-transform active:scale-95 whitespace-nowrap shrink-0"
                  >
                    + Add 2 {FLAVORS[activeFlavorIdx].name} Cans
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBoxCounts({
                        'Strawberry Vanilla': 3,
                        'Blood Orange Zest': 3,
                        'Crisp Apple Botanical': 3,
                        'Sour Cherry Bonbon': 3
                      })
                    }
                    style={{ borderColor: `${surface.hex}40` }}
                    className="px-5 py-3.5 rounded-full text-xs font-mono font-bold border whitespace-nowrap shrink-0"
                  >
                    Auto-Fill Balanced 12-Pack
                  </button>
                </div>
              </div>

              {/* Right 6 Cols: Interactive 12-Can Box Builder */}
              <div
                id="p4-builder"
                className="lg:col-span-6 rounded-2xl p-2 border"
                style={{
                  borderColor: `${surface.hex}30`,
                  backgroundColor: `${surface.hex}0C`
                }}
              >
                <div
                  className="rounded-lg p-6 space-y-5"
                  style={{ backgroundColor: surface.hex, color: bg.hex }}
                >
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${bg.hex}25` }}>
                    <div>
                      <div className="text-xs font-mono opacity-80">CUSTOM VARIETY BOX BUILDER</div>
                      <h2 className="text-lg font-display font-bold tabular-nums">
                        {totalCans} Cans in Your Box ({totalCans * 9}g Total Prebiotic Fiber)
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setBoxCounts({
                          'Strawberry Vanilla': 0,
                          'Blood Orange Zest': 0,
                          'Crisp Apple Botanical': 0,
                          'Sour Cherry Bonbon': 0
                        })
                      }
                      className="text-xs font-mono underline"
                    >
                      Clear Box
                    </button>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(boxCounts).map(([flavor, count]) => (
                      <div
                        key={flavor}
                        className="rounded-xl p-3.5 border flex items-center justify-between gap-4"
                        style={{ borderColor: `${bg.hex}25` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-12 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0"
                            style={{ backgroundColor: action.hex, color: actionTextColor }}
                          >
                            9g
                          </div>
                          <div>
                            <div className="text-sm font-bold">{flavor}</div>
                            <div className="text-xs opacity-75 font-mono">
                              2g Sugar · 35 Cal · Plant Fiber
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 font-mono tabular-nums">
                          <button
                            type="button"
                            onClick={() =>
                              setBoxCounts((prev) => ({
                                ...prev,
                                [flavor]: Math.max(0, prev[flavor] - 1)
                              }))
                            }
                            style={{ borderColor: `${bg.hex}40` }}
                            className="w-7 h-7 rounded border grid place-items-center font-bold"
                            aria-label={`Remove 1 ${flavor}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{count}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setBoxCounts((prev) => ({
                                ...prev,
                                [flavor]: prev[flavor] + 1
                              }))
                            }
                            style={{ borderColor: `${bg.hex}40` }}
                            className="w-7 h-7 rounded border grid place-items-center font-bold"
                            aria-label={`Add 1 ${flavor}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBoxClaimed(true);
                      onCopyText(
                        JSON.stringify(boxCounts, null, 2),
                        'Custom 12-Can Variety Box'
                      );
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    {boxClaimed ? `Confirmed ${totalCans}-Can Variety Pack ✓` : `Confirm ${totalCans}-Can Variety Pack`}
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: Interactive Botanical Ingredient Science Explorer */}
            <section id="p4-botanicals" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}25` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold opacity-80">02. CLINICAL BOTANICAL TRANSPARENCY</div>
                  <h2 className="text-2xl font-display font-bold mt-1">
                    Every root, flower, and prebiotic fiber explained.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {BOTANICAL_STUDIES.map((bot, i) => (
                    <button
                      key={bot.name}
                      type="button"
                      onClick={() => setActiveBotanicalIdx(i)}
                      style={{
                        backgroundColor: activeBotanicalIdx === i ? action.hex : 'transparent',
                        color: activeBotanicalIdx === i ? actionTextColor : surface.hex,
                        borderColor: `${surface.hex}35`
                      }}
                      className="px-3.5 py-1.5 rounded-full border text-xs font-bold"
                    >
                      {bot.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {BOTANICAL_STUDIES.map((bot, i) => (
                  <div
                    key={bot.name}
                    onClick={() => setActiveBotanicalIdx(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveBotanicalIdx(i);
                    }}
                    className="rounded-xl p-5 border cursor-pointer transition-transform hover:-translate-y-0.5"
                    style={{
                      borderColor: activeBotanicalIdx === i ? action.hex : `${surface.hex}25`,
                      backgroundColor: activeBotanicalIdx === i ? `${surface.hex}12` : 'transparent'
                    }}
                  >
                    <div className="text-xs font-mono font-bold opacity-75">{bot.role}</div>
                    <h3 className="mt-1 text-base font-display font-bold">{bot.name}</h3>
                    <p className="mt-2 text-xs opacity-85 leading-relaxed">{bot.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
    </>
  );
};
