import React from 'react';
import {

} from 'lucide-react';
import type { ShowcasePageState } from '../useShowcasePageState';

interface Props {
  state: ShowcasePageState;
  onCopyText: (text: string, label: string) => void;
}

export const MottoMobilityPage: React.FC<Props> = ({ state, onCopyText }) => {
  const { rideMode, setRideMode, batteryTier, setBatteryTier, headlampOn, setHeadlampOn, dailyCommuteKm, setDailyCommuteKm, rideCity, setRideCity, rideSlot, setRideSlot, bookingEmail, setBookingEmail, bookingConfirmed, setBookingConfirmed, palette, bg, surface, action, actionTextColor, effectiveRangeKm, daysBetweenCharges, diasLabel } = state;
  return (
    <>
        <article
          className="rounded-2xl border border-white/15 overflow-hidden transition-colors duration-200 shadow-2xl"
          style={{ backgroundColor: bg.hex, color: surface.hex }}
        >
          {/* Website 03 Top Bar */}
          <header
            className="flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b"
            style={{ borderColor: `${surface.hex}20` }}
          >
            <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0">
              {palette.brandName}
            </span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-85">
              <a href="#p3-customizer" className="hover:underline whitespace-nowrap shrink-0">M-01 Customizer</a>
              <a href="#p3-calculator" className="hover:underline whitespace-nowrap shrink-0">Range Calculator</a>
              <a href="#p3-testride" className="hover:underline whitespace-nowrap shrink-0">City Hubs</a>
            </nav>
            <a
              href="#p3-testride"
              style={{ backgroundColor: action.hex, color: actionTextColor }}
              className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              Book Free Test Ride
            </a>
          </header>

          <div className="px-6 lg:px-12 py-10 lg:py-14 space-y-16">
            {/* Section 1: Hero & Interactive Cruiser Controls */}
            <section id="p3-customizer" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono opacity-80">
                    URBAN ELECTRIC MOBILITY · REMOVABLE TWIN-CELL ARCHITECTURE
                  </div>
                  <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.06]">
                    {palette.tagline}
                  </h1>
                  <p className="mt-4 text-base opacity-85 leading-relaxed">
                    {palette.subcopy} Swap cells in 15 seconds, charge from any standard wall socket, and glide through city lanes with regenerative braking.
                  </p>

                  {/* Interactive Ride Mode & Battery Controls */}
                  <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: `${surface.hex}20` }}>
                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">1. SELECT DRIVE TELEMETRY MODE:</div>
                      <div className="flex flex-wrap gap-2">
                        {(['Eco', 'City', 'Sport'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setRideMode(m)}
                            style={{
                              backgroundColor: rideMode === m ? action.hex : 'transparent',
                              color: rideMode === m ? actionTextColor : surface.hex,
                              borderColor: rideMode === m ? action.hex : `${surface.hex}35`
                            }}
                            className="px-4 py-2 rounded-lg border text-xs font-semibold transition-colors"
                          >
                            {m} Mode ({m === 'Eco' ? '45 km/h' : m === 'City' ? '60 km/h' : '70 km/h'})
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono opacity-75 mb-2">2. BATTERY PACK &amp; HEADLAMP CONTROL:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setBatteryTier('single')}
                          style={{
                            backgroundColor: batteryTier === 'single' ? surface.hex : 'transparent',
                            color: batteryTier === 'single' ? bg.hex : surface.hex,
                            borderColor: `${surface.hex}35`
                          }}
                          className="px-3.5 py-2 rounded-lg border text-xs font-mono font-semibold"
                        >
                          Single-Cell (65 km)
                        </button>
                        <button
                          type="button"
                          onClick={() => setBatteryTier('twin')}
                          style={{
                            backgroundColor: batteryTier === 'twin' ? surface.hex : 'transparent',
                            color: batteryTier === 'twin' ? bg.hex : surface.hex,
                            borderColor: `${surface.hex}35`
                          }}
                          className="px-3.5 py-2 rounded-lg border text-xs font-mono font-semibold"
                        >
                          Twin-Cell Pro (110 km)
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeadlampOn((prev) => !prev)}
                          style={{ borderColor: `${surface.hex}35` }}
                          className="px-3.5 py-2 rounded-lg border text-xs font-mono"
                        >
                          Headlamp: {headlampOn ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(true);
                      onCopyText(
                        `Motto M-01 (${rideMode} Mode, ${batteryTier} battery, ${effectiveRangeKm}km range)`,
                        'M-01 Build Spec'
                      );
                    }}
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-6 py-3.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0"
                  >
                    Save M-01 Build ({effectiveRangeKm} km Range)
                  </button>
                  <a
                    href="#p3-calculator"
                    style={{ borderColor: `${surface.hex}35`, color: surface.hex }}
                    className="px-5 py-3.5 rounded-lg text-sm font-medium border hover:opacity-80 whitespace-nowrap shrink-0"
                  >
                    Calculate Commute →
                  </a>
                </div>
              </div>

              {/* Right 6 Cols: Interactive M-01 Vector Viewport */}
              <div
                className="lg:col-span-6 rounded-2xl p-2 border flex flex-col justify-between"
                style={{
                  borderColor: `${surface.hex}25`,
                  backgroundColor: `${surface.hex}0A`
                }}
              >
                <div
                  className="rounded-lg p-6 lg:p-8 h-full flex flex-col justify-between"
                  style={{ backgroundColor: surface.hex, color: bg.hex }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>M-01 LIVE TELEMETRY · {rideMode.toUpperCase()} MODE</span>
                    <span
                      className="px-2.5 py-0.5 rounded font-bold tabular-nums"
                      style={{ backgroundColor: action.hex, color: actionTextColor }}
                    >
                      EST. RANGE: {effectiveRangeKm} KM
                    </span>
                  </div>

                  <div className="my-8 flex flex-col items-center">
                    <svg
                      viewBox="0 0 420 210"
                      className="w-full max-w-md h-auto"
                      role="img"
                      aria-label="M-01 Electric Cruiser interactive diagram"
                    >
                      <line x1="20" y1="185" x2="400" y2="185" stroke={bg.hex} strokeOpacity="0.25" strokeWidth="2" />
                      <circle cx="95" cy="150" r="32" fill="none" stroke={action.hex} strokeWidth="8" />
                      <circle cx="95" cy="150" r="16" fill={bg.hex} />
                      <circle cx="320" cy="150" r="32" fill="none" stroke={action.hex} strokeWidth="8" />
                      <circle cx="320" cy="150" r="16" fill={bg.hex} />
                      <path
                        d="M70 135 C70 95, 165 95, 190 135 L275 135 L295 65 L265 65"
                        fill="none"
                        stroke={bg.hex}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect x="85" y="82" width="85" height="16" rx="8" fill={action.hex} />
                      <circle cx="305" cy="68" r="9" fill={action.hex} />
                      {headlampOn && (
                        <polygon
                          points="314,68 410,35 410,105"
                          fill={action.hex}
                          fillOpacity="0.28"
                        />
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t font-mono text-xs tabular-nums" style={{ borderColor: `${bg.hex}22` }}>
                    <div>
                      <div className="opacity-70">EFFECTIVE RANGE</div>
                      <div className="text-lg font-bold mt-0.5">{effectiveRangeKm} km</div>
                    </div>
                    <div>
                      <div className="opacity-70">CHARGING</div>
                      <div className="text-lg font-bold mt-0.5">
                        {diasLabel(daysBetweenCharges)}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-70">TOP SPEED</div>
                      <div className="text-lg font-bold mt-0.5">
                        {rideMode === 'Eco' ? '45 km/h' : rideMode === 'City' ? '60 km/h' : '70 km/h'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Interactive Commute Range & Charge Frequency Calculator */}
            <section id="p3-calculator" className="pt-10 border-t grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ borderColor: `${surface.hex}20` }}>
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono opacity-75">02. URBAN COMMUTE CALCULATOR</div>
                <h2 className="text-2xl font-display font-bold">
                  See how rarely you need to plug in.
                </h2>
                <p className="text-sm opacity-85">
                  Adjust your daily round-trip city distance below or select a preset commute profile:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[10, 22, 35, 50].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setDailyCommuteKm(km)}
                      style={{
                        backgroundColor: dailyCommuteKm === km ? action.hex : 'transparent',
                        color: dailyCommuteKm === km ? actionTextColor : surface.hex,
                        borderColor: dailyCommuteKm === km ? action.hex : `${surface.hex}35`
                      }}
                      className="px-3.5 py-1.5 rounded-lg border text-xs font-mono font-semibold tabular-nums"
                    >
                      {km} km / day
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl p-5 border" style={{ borderColor: `${surface.hex}25` }}>
                  <div className="text-xs font-mono opacity-75">CHARGE CADENCE</div>
                  <div className="mt-2 text-3xl font-display font-bold font-mono tabular-nums">
                    Every {daysBetweenCharges} days
                  </div>
                  <div className="mt-1 text-xs opacity-80">
                    Based on {dailyCommuteKm} km/day in {rideMode} mode
                  </div>
                </div>
                <div className="rounded-xl p-5 border" style={{ borderColor: `${surface.hex}25` }}>
                  <div className="text-xs font-mono opacity-75">ANNUAL CO₂ SAVED</div>
                  <div className="mt-2 text-3xl font-display font-bold font-mono tabular-nums">
                    {Math.round(dailyCommuteKm * 260 * 0.14)} kg
                  </div>
                  <div className="mt-1 text-xs opacity-80">
                    Compared to urban ICE commuter car
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: City Hub Test-Ride Scheduler */}
            <section id="p3-testride" className="pt-10 border-t space-y-6" style={{ borderColor: `${surface.hex}20` }}>
              <div>
                <div className="text-xs font-mono opacity-75">03. FLAGSHIP SHOWROOMS</div>
                <h2 className="text-2xl font-display font-bold mt-1">
                  Schedule a 45-minute city test ride.
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingConfirmed(true);
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-5 flex flex-wrap gap-2">
                  {['Milan', 'Paris', 'Berlin', 'Tokyo', 'London'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setRideCity(city)}
                      style={{
                        backgroundColor: rideCity === city ? surface.hex : 'transparent',
                        color: rideCity === city ? bg.hex : surface.hex,
                        borderColor: `${surface.hex}35`
                      }}
                      className="px-3.5 py-2 rounded-lg border text-xs font-semibold"
                    >
                      {city}
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-3 flex flex-wrap gap-2">
                  {['10:30 AM', '02:00 PM', '05:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setRideSlot(slot)}
                      style={{
                        borderColor: rideSlot === slot ? action.hex : `${surface.hex}30`
                      }}
                      className="px-2.5 py-2 rounded-lg border text-xs font-mono tabular-nums"
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-4 flex gap-2">
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder={`Rider email for ${rideCity}...`}
                    style={{
                      borderColor: `${surface.hex}35`,
                      backgroundColor: `${surface.hex}08`,
                      color: surface.hex
                    }}
                    className="flex-1 rounded-lg border px-3.5 py-2.5 text-xs placeholder:opacity-60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: action.hex, color: actionTextColor }}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    {bookingConfirmed ? `Booked ${rideCity} ✓` : 'Confirm Slot'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </article>
    </>
  );
};
