export type ColorRole = 'background' | 'surface' | 'action' | 'rare-accent';

export interface PaletteColor {
  name: string;
  hex: string;
  role: ColorRole;
  percentage: number;
  pantone?: string;
  jobDescription: string;
}

export type PaletteCategory =
  | 'Tech & SaaS'
  | 'Editorial & Luxury'
  | 'Consumer & Playful'
  | 'Industry Systems';

export interface ColorPalette {
  id: string;
  name: string;
  brandName: string;
  tagline: string;
  subcopy: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
  creator: '@bymarcoperez' | '@toolandtea' | '@asongstudio_' | '@vixdesignz';
  category: PaletteCategory;
  posture: 'dark' | 'light';
  storyQuote: string;
  sourceMediaPath: string;
  sourceMediaType: 'video' | 'image';
  colors: PaletteColor[];
}

export const EXTRACTED_PALETTES: ColorPalette[] = [
  // --- @vixdesignz Role-Driven Brand Systems (Images) ---
  {
    id: 'vix-functional-system',
    name: 'Vix Functional System',
    brandName: 'vixdesignz',
    tagline: 'Stop picking colours. Give each one a job.',
    subcopy: 'Background 60%, Text and surfaces 30%, Action 10%. An accent sits outside the split. No job? Cut it.',
    ctaLabel: 'Start free',
    secondaryCtaLabel: 'Book a call',
    creator: '@vixdesignz',
    category: 'Tech & SaaS',
    posture: 'dark',
    storyQuote: 'Decide the jobs before the hues. Spend the action colour once—put it on everything and it stops meaning anything.',
    sourceMediaPath: '/assets/aistudio/7ad349894f2e0ec255081bc326fb5162_45a3d173.webp',
    sourceMediaType: 'image',
    colors: [
      {
        name: 'Ink',
        hex: '#0E0E10',
        role: 'background',
        percentage: 60,
        jobDescription: 'Primary 60% canvas foundation. Absorbs visual noise so foreground typography and one focal action stand out.'
      },
      {
        name: 'Bone',
        hex: '#F4F1EA',
        role: 'surface',
        percentage: 30,
        jobDescription: '30% text and elevated card surfaces. Warm editorial off-white that avoids harsh pure-white halation on dark ink.'
      },
      {
        name: 'Flame',
        hex: '#FF4D1F',
        role: 'action',
        percentage: 10,
        jobDescription: '10% primary action colour. Spend it strictly once per viewport on the single clearest next step.'
      },
      {
        name: 'Volt',
        hex: '#D4FF3A',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'Rare accent sitting outside the 60-30-10 split. Reserved for live signal badges or high-priority cursors.'
      }
    ]
  },
  {
    id: 'cairn-story-system',
    name: 'Cairn Brand System',
    brandName: 'Cairn',
    tagline: 'Then tie each one to the story.',
    subcopy: 'A reason stops the palette drifting. Every colour earns its place as a marker glowing in low light.',
    ctaLabel: 'Explore the trail',
    secondaryCtaLabel: 'Read field notes',
    creator: '@vixdesignz',
    category: 'Industry Systems',
    posture: 'dark',
    storyQuote: 'Amber is the signal glowing in low light; Charcoal is the foundation; Deep Teal is the resolved state; Quarry Cream is where the stone comes from.',
    sourceMediaPath: '/assets/aistudio/bc8a72e3b0028361382e25512c093eb9_79a3bb1b.webp',
    sourceMediaType: 'image',
    colors: [
      {
        name: 'Charcoal',
        hex: '#22252B',
        role: 'background',
        percentage: 60,
        jobDescription: 'The foundation everything else sits on. Grounded slate-charcoal background canvas.'
      },
      {
        name: 'Quarry Cream',
        hex: '#F3EFE6',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Where the stone comes from. Primary readable typography and light surface cards.'
      },
      {
        name: 'Amber',
        hex: '#FFB020',
        role: 'action',
        percentage: 10,
        jobDescription: 'The signal. A warm marker glowing in low light for primary interactive CTAs.'
      },
      {
        name: 'Deep Teal',
        hex: '#1F5D50',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'The resolved state. Cool where amber is warm—used for completed states and secondary containers.'
      }
    ]
  },

  // --- @toolandtea Foundation + Accent Triads (Video 5) ---
  {
    id: 'mark-tennis-club',
    name: 'Athletic Midnight & Lime',
    brandName: 'MARK TENNIS CLUB',
    tagline: 'Motion. Discipline. Result.',
    subcopy: 'Private court reservations, biomechanical serve analysis, and high-performance seasonal clinics.',
    ctaLabel: 'Reserve a court',
    secondaryCtaLabel: 'View club schedule',
    creator: '@toolandtea',
    category: 'Consumer & Playful',
    posture: 'dark',
    storyQuote: 'Midnight navy and cloud white look clean. Now add electric lime and the whole thing has energy.',
    sourceMediaPath: '/assets/aistudio/9899eb4223a91d85b21c105186c09a7d_c5edba83.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Midnight Navy',
        hex: '#132C48',
        role: 'background',
        percentage: 60,
        jobDescription: 'Deep court-side navy canvas that establishes discipline and athletic authority.'
      },
      {
        name: 'Cloud White',
        hex: '#F6F4F0',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Clean chalk-line white for display headlines, court metrics, and navigation.'
      },
      {
        name: 'Electric Lime',
        hex: '#D8FF00',
        role: 'action',
        percentage: 10,
        jobDescription: 'Kinetic tennis-ball optic yellow-lime for the single primary reservation CTA and focal word.'
      }
    ]
  },
  {
    id: 'kontour-system',
    name: 'Kontour Editorial Black & Flame',
    brandName: 'KONTOUR',
    tagline: 'Clarity first. Then the system.',
    subcopy: 'Industrial design and design-engineering foundry building hardware-grade interfaces.',
    ctaLabel: 'Start a project',
    secondaryCtaLabel: 'View our work',
    creator: '@toolandtea',
    category: 'Editorial & Luxury',
    posture: 'dark',
    storyQuote: 'Jet black and soft white already look premium, but add flame orange and now the whole thing is bold.',
    sourceMediaPath: '/assets/aistudio/9899eb4223a91d85b21c105186c09a7d_c5edba83.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Jet Black',
        hex: '#0B0B0B',
        role: 'background',
        percentage: 60,
        jobDescription: 'Deep studio black canvas creating architectural depth and gallery-level contrast.'
      },
      {
        name: 'Soft White',
        hex: '#F3F3F2',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Precision typographic white for oversized wordmarks, editorial copy, and hairline dividers.'
      },
      {
        name: 'Flame Orange',
        hex: '#FF4D00',
        role: 'action',
        percentage: 10,
        jobDescription: 'High-heat industrial orange for the primary action pill and hero rim-light accent.'
      }
    ]
  },
  {
    id: 'guardbase-security',
    name: 'Guardbase Paper & Cornflower',
    brandName: 'Guardbase',
    tagline: 'AI deserves the same security as software.',
    subcopy: 'Monitor how agents behave, what attackers could exploit, and which risks actually matter in production.',
    ctaLabel: 'Watch demo',
    secondaryCtaLabel: 'Read docs',
    creator: '@toolandtea',
    category: 'Tech & SaaS',
    posture: 'light',
    storyQuote: 'Paper white and ink black is simple and clear. One touch of cornflower blue and some ASCII design—now you know exactly where to click.',
    sourceMediaPath: '/assets/aistudio/9899eb4223a91d85b21c105186c09a7d_c5edba83.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Paper White',
        hex: '#FFFFFF',
        role: 'background',
        percentage: 60,
        jobDescription: 'Crisp technical documentation canvas that maximizes daytime legibility.'
      },
      {
        name: 'Ink Black',
        hex: '#0B0B0B',
        role: 'surface',
        percentage: 30,
        jobDescription: 'High-contrast ink for primary headlines, body prose, and primary dark buttons.'
      },
      {
        name: 'Cornflower Blue',
        hex: '#5482FF',
        role: 'action',
        percentage: 10,
        jobDescription: 'Signal blue for emphasized headline tokens, ASCII mountain shaders, and interactive links.'
      }
    ]
  },

  // --- @bymarcoperez Purist Triads Video 6 ---
  {
    id: 'olipop-sip-happy',
    name: 'Olipop Lemon, Cobalt & Hot Pink',
    brandName: 'OLIPOP',
    tagline: 'SIP HAPPY.',
    subcopy: 'Less ordinary. More oh-so-good. Plant-powered prebiotic soda crafted with botanicals and real fruit juice.',
    ctaLabel: 'Find your flavor',
    secondaryCtaLabel: 'Read ingredients',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'light',
    storyQuote: 'Lemon yellow and cobalt blue looks fun. Add a little hot pink—now the product jumps off the page.',
    sourceMediaPath: '/assets/aistudio/e36fafbf3e5e9b12cd796b26fe3aa1a6_f34b9ae8.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Lemon Yellow',
        hex: '#F4E452',
        role: 'background',
        percentage: 60,
        jobDescription: 'Sunlit citrus canvas that radiates warmth and shelf-stopping CPG optimism.'
      },
      {
        name: 'Cobalt Blue',
        hex: '#0D32B8',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Ultra-saturated royal cobalt for display typography, nutrition tables, and footer bars.'
      },
      {
        name: 'Hot Pink',
        hex: '#FF318C',
        role: 'action',
        percentage: 10,
        jobDescription: 'Punchy berry pink reserved strictly for the primary CTA badge and product callout.'
      }
    ]
  },
  {
    id: 'leica-look-closer',
    name: 'Leica Ice Blue, Ink & Vermilion',
    brandName: 'LEICA',
    tagline: 'Look closer.',
    subcopy: 'Precision optical engineering and full-frame rangefinder architecture built for decisive moments.',
    ctaLabel: 'Explore M-System',
    secondaryCtaLabel: 'Technical specs',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'light',
    storyQuote: 'Ice blue and midnight ink: clean, but a little cold. Add vermilion—now it feels expensive.',
    sourceMediaPath: '/assets/aistudio/e36fafbf3e5e9b12cd796b26fe3aa1a6_f34b9ae8.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Ice Blue',
        hex: '#D5E5F0',
        role: 'background',
        percentage: 60,
        jobDescription: 'Cool optical-glass blue canvas that frames anodized black hardware with studio neutrality.'
      },
      {
        name: 'Midnight Ink',
        hex: '#081D2B',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Deep naval ink for precision serif/sans typography and camera body silhouettes.'
      },
      {
        name: 'Vermilion',
        hex: '#EE4222',
        role: 'action',
        percentage: 10,
        jobDescription: 'Signature red-dot vermilion for the primary CTA button and gallery frame borders.'
      }
    ]
  },
  {
    id: 'afterhour-forest-coral',
    name: 'Afterhour Forest, Ivory & Coral',
    brandName: 'afterhour',
    tagline: 'Make them feel something.',
    subcopy: 'Independent sound design and spatial audio suites for cinema, installations, and tactile digital products.',
    ctaLabel: 'Start listening',
    secondaryCtaLabel: 'Browse soundpacks',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'dark',
    storyQuote: 'Forest green and ivory: nice and understated. Bring in coral—now the whole design feels warmer.',
    sourceMediaPath: '/assets/aistudio/e36fafbf3e5e9b12cd796b26fe3aa1a6_f34b9ae8.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Forest Green',
        hex: '#073B2B',
        role: 'background',
        percentage: 60,
        jobDescription: 'Deep nocturnal evergreen canvas with subtle radial warmth.'
      },
      {
        name: 'Ivory',
        hex: '#F7F6EE',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Soft acoustic ivory for high-contrast editorial headlines and tracklist metadata.'
      },
      {
        name: 'Coral',
        hex: '#FA7C67',
        role: 'action',
        percentage: 10,
        jobDescription: 'Warm analog coral for the active player card and primary listening CTA.'
      }
    ]
  },

  // --- @bymarcoperez Purist Triads Video 7 ---
  {
    id: 'good-company-sky-vermilion',
    name: 'Good Company Sky, Cloud & Vermilion',
    brandName: 'GOOD COMPANY',
    tagline: 'BIG IDEAS. EVEN BIGGER ENERGY.',
    subcopy: 'We bring ambitious founders and bold brands together when things happen at speed and scale.',
    ctaLabel: 'Meet the roster',
    secondaryCtaLabel: 'Our thesis',
    creator: '@bymarcoperez',
    category: 'Tech & SaaS',
    posture: 'light',
    storyQuote: 'Sky blue and cloud white looks clean right? Add a little bit of vermilion—now look where your eyes go.',
    sourceMediaPath: '/assets/aistudio/53a4730821af12d64fd85947e05d2401_057f51d9.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Sky Blue',
        hex: '#0D84FF',
        role: 'background',
        percentage: 60,
        jobDescription: 'Optimistic zenith sky blue canvas that commands immediate viewport presence.'
      },
      {
        name: 'Cloud White',
        hex: '#F2F6FA',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Crisp atmospheric white for condensed display headlines and lower gradient fade.'
      },
      {
        name: 'Vermilion',
        hex: '#E73E18',
        role: 'action',
        percentage: 10,
        jobDescription: 'High-contrast vermilion red-orange for the primary CTA pill and portrait card frames.'
      }
    ]
  },
  {
    id: 'offscript-red-acid',
    name: 'Offscript Red Orange, Snow & Acid Yellow',
    brandName: 'OFFSCRIPT',
    tagline: 'GOOD WEIRD PEOPLE',
    subcopy: 'A club for the creatively restless. Curated residencies, late-night salons, and unannounced drops.',
    ctaLabel: 'Apply for membership',
    secondaryCtaLabel: 'Upcoming salons',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'dark',
    storyQuote: 'Red orange and snowy white: nothing wrong with it. Add one touch of acid yellow—now it is something worth stopping for.',
    sourceMediaPath: '/assets/aistudio/53a4730821af12d64fd85947e05d2401_057f51d9.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Red Orange',
        hex: '#F72D07',
        role: 'background',
        percentage: 60,
        jobDescription: 'Fearless vermilion-red grid canvas that breaks SaaS monotony.'
      },
      {
        name: 'Snow White',
        hex: '#FAF6F6',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Heavyweight display typography and subtle 1px structural grid lines.'
      },
      {
        name: 'Acid Yellow',
        hex: '#D4FF1E',
        role: 'action',
        percentage: 10,
        jobDescription: 'Fluorescent acid-lime spark for interactive badges and primary action triggers.'
      }
    ]
  },
  {
    id: 'nightline-sapphire-jade',
    name: 'Nightline Sapphire, Cyan & Neon Jade',
    brandName: 'nightline',
    tagline: 'Less noise. More discovery. All night long.',
    subcopy: 'Electronic sounds for the hours between. Curated underground mixes, live stems, and spatial radio.',
    ctaLabel: 'Listen live',
    secondaryCtaLabel: 'Explore archive',
    creator: '@bymarcoperez',
    category: 'Tech & SaaS',
    posture: 'dark',
    storyQuote: 'Sapphire blue and ocean cyan: you think it is finished. Add a bit of neon jade—now try imagining without it.',
    sourceMediaPath: '/assets/aistudio/53a4730821af12d64fd85947e05d2401_057f51d9.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Sapphire Blue',
        hex: '#06299C',
        role: 'background',
        percentage: 60,
        jobDescription: 'Deep midnight-sapphire base canvas for immersive audio and developer tools.'
      },
      {
        name: 'Ocean Cyan',
        hex: '#00C0FA',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Luminous cyan atmospheric glow and secondary surface highlights.'
      },
      {
        name: 'Neon Jade',
        hex: '#5BFF62',
        role: 'action',
        percentage: 10,
        jobDescription: 'High-voltage jade green for the bottom live-player bar and primary headline accent.'
      }
    ]
  },

  // --- @bymarcoperez Purist Triads Video 8 ---
  {
    id: 'zest-mandarin-forest',
    name: 'Zest Mandarin, Forest & Crest Yellow',
    brandName: 'ZEST',
    tagline: 'REFRESHING',
    subcopy: 'Cold-pressed sparkling blood orange and botanical extracts with zero refined sugar.',
    ctaLabel: 'Get Zest',
    secondaryCtaLabel: 'Store locator',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'dark',
    storyQuote: 'Mandarin orange and forest green looks good. Add a little crest yellow—now you know exactly where to click.',
    sourceMediaPath: '/assets/aistudio/b4ae09a4c14f0d16451e9cd815206449_83a8ac7d.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Mandarin Orange',
        hex: '#F25912',
        role: 'background',
        percentage: 60,
        jobDescription: 'Vibrant tangerine-orange hero canvas that radiates flavour and warmth.'
      },
      {
        name: 'Forest Green',
        hex: '#0D542E',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Botanical leaf green for oversized condensed typography and grounded footer bar.'
      },
      {
        name: 'Crest Yellow',
        hex: '#F2DA3A',
        role: 'action',
        percentage: 10,
        jobDescription: 'Sun-ripened lemon crest yellow strictly reserved for the primary purchase button.'
      }
    ]
  },
  {
    id: 'forma-onyx-indigo-mint',
    name: 'Forma Onyx, Electric Indigo & Mint',
    brandName: 'forma.',
    tagline: 'MAKE something MATTER beautifully.',
    subcopy: 'Independent brand direction, kinetic typography, and digital product architecture for category creators.',
    ctaLabel: 'Explore how',
    secondaryCtaLabel: 'Selected index',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'dark',
    storyQuote: 'Onyx black and electric indigo: a bit forgettable. One touch of tropical mint—now you would recognize it anywhere.',
    sourceMediaPath: '/assets/aistudio/b4ae09a4c14f0d16451e9cd815206449_83a8ac7d.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Onyx Black',
        hex: '#0D0B12',
        role: 'background',
        percentage: 60,
        jobDescription: 'Velvet obsidian-violet black canvas for dramatic editorial contrast.'
      },
      {
        name: 'Electric Indigo',
        hex: '#6B17FA',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Saturated ultraviolets for portrait lighting blocks and secondary containers.'
      },
      {
        name: 'Tropical Mint',
        hex: '#6BFCC4',
        role: 'action',
        percentage: 10,
        jobDescription: 'Crisp bioluminescent mint for the primary CTA pill and signature italic keywords.'
      }
    ]
  },
  {
    id: 'prism-teal-navy-crimson',
    name: 'Prism Teal, Navy & Crimson Pink',
    brandName: 'prism',
    tagline: 'A clearer perspective.',
    subcopy: 'Intelligence meets imagination. We turn complex operational data into your clearest competitive advantage.',
    ctaLabel: 'See the platform',
    secondaryCtaLabel: 'Read whitepaper',
    creator: '@bymarcoperez',
    category: 'Tech & SaaS',
    posture: 'light',
    storyQuote: 'Teal blue and navy blue: you could leave it here. Add a little bit of crimson pink—suddenly the whole page comes together.',
    sourceMediaPath: '/assets/aistudio/b4ae09a4c14f0d16451e9cd815206449_83a8ac7d.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Teal Blue',
        hex: '#D8ECF5',
        role: 'background',
        percentage: 60,
        jobDescription: 'Airy glacial-teal background that keeps enterprise analytics feeling light and open.'
      },
      {
        name: 'Navy Blue',
        hex: '#071D42',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Authoritative deep navy for executive typography and 3D glass refraction forms.'
      },
      {
        name: 'Crimson Pink',
        hex: '#F24182',
        role: 'action',
        percentage: 10,
        jobDescription: 'Vibrant magenta-crimson for the primary CTA button and optical ribbon highlights.'
      }
    ]
  },

  // --- @bymarcoperez Purist Triads Video 9 ---
  {
    id: 'bonbon-violet-cream-cherry',
    name: 'Bonbon Sugar Violet, Cream & Cherry',
    brandName: 'bonbon',
    tagline: 'Small bites. Big feelings.',
    subcopy: 'Grown-up candy crafted with real sour cherries, Madagascar vanilla bean, and zero artificial dyes.',
    ctaLabel: 'Pick your happy',
    secondaryCtaLabel: 'Gift boxes',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'dark',
    storyQuote: 'Sugar violet and vanilla cream already feels playful, but add a little bit of cherry red—now it has got personality.',
    sourceMediaPath: '/assets/aistudio/6e16f73df337929893f2efbd8783d00e_776e9e9a.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Sugar Violet',
        hex: '#8752DE',
        role: 'background',
        percentage: 60,
        jobDescription: 'Confectionery lavender-violet canvas with unmistakable brand recall.'
      },
      {
        name: 'Vanilla Cream',
        hex: '#FAE8CA',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Warm custard cream for oversized wordmarks, navigation, and pill surfaces.'
      },
      {
        name: 'Cherry Red',
        hex: '#DB1222',
        role: 'action',
        percentage: 10,
        jobDescription: 'Glossy maraschino cherry red for the hero focal centerpiece and interactive accents.'
      }
    ]
  },
  {
    id: 'solar-pool-cocoa-yellow',
    name: 'Solar Pool Blue, Dark Cocoa & Solar Yellow',
    brandName: 'solar',
    tagline: 'A little out of the ordinary.',
    subcopy: 'Sculptural fiberglass and bent-wood lounge furniture designed for sunlit interiors and courtyards.',
    ctaLabel: 'Find your piece',
    secondaryCtaLabel: 'Visit showroom',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'light',
    storyQuote: 'Pool blue and dark cocoa looks calm right? Add a touch of solar yellow—now it is impossible to ignore.',
    sourceMediaPath: '/assets/aistudio/6e16f73df337929893f2efbd8783d00e_776e9e9a.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Pool Blue',
        hex: '#B8E1EB',
        role: 'background',
        percentage: 60,
        jobDescription: 'Mid-century swimming-pool blue canvas that feels calm, architectural, and airy.'
      },
      {
        name: 'Dark Cocoa',
        hex: '#3D1D14',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Rich espresso-walnut brown for grounded typography and primary button fills.'
      },
      {
        name: 'Solar Yellow',
        hex: '#F2C92E',
        role: 'action',
        percentage: 10,
        jobDescription: 'Warm marigold solar yellow that turns the hero product into an immediate magnet.'
      }
    ]
  },
  {
    id: 'mono-porcelain-carbon-ultramarine',
    name: 'Mono Porcelain, Carbon & Ultramarine',
    brandName: 'mono',
    tagline: 'PURE SOUND. Less noise. More feeling.',
    subcopy: 'Direct-drive reference turntables machined from solid billet aluminum with optical speed regulation.',
    ctaLabel: 'Discover the M1',
    secondaryCtaLabel: 'Acoustic engineering',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'light',
    storyQuote: 'Porcelain and carbon: clean and precise. But add a little bit of ultramarine—now look where your eyes go.',
    sourceMediaPath: '/assets/aistudio/6e16f73df337929893f2efbd8783d00e_776e9e9a.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Porcelain',
        hex: '#F4F4F2',
        role: 'background',
        percentage: 60,
        jobDescription: 'Braun/Rams-inspired matte porcelain gallery background.'
      },
      {
        name: 'Carbon',
        hex: '#171B1E',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Anodized carbon black for precision technical typography and dark specification cards.'
      },
      {
        name: 'Ultramarine',
        hex: '#1C30F2',
        role: 'action',
        percentage: 10,
        jobDescription: 'Klein-inspired electric ultramarine for the platter strobe ring and focal indicators.'
      }
    ]
  },

  // --- @bymarcoperez Purist Triads Video 10 ---
  {
    id: 'motto-almond-petrol-violet',
    name: 'Motto Almond Cream, Petrol Teal & Electric Violet',
    brandName: 'MOTTO',
    tagline: 'Make room to roam.',
    subcopy: 'City, reimagined. The M-01 electric urban cruiser with removable twin-cell battery and 110 km range.',
    ctaLabel: 'Explore M-01',
    secondaryCtaLabel: 'Book test ride',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'light',
    storyQuote: 'Almond cream and petrol teal looks clean right? But add a little electric violet—now look where your eyes go.',
    sourceMediaPath: '/assets/aistudio/422105b5461eae358bb97bd86dac63bc_c2417fa5.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Almond Cream',
        hex: '#F3ECC8',
        role: 'background',
        percentage: 60,
        jobDescription: 'Warm Mediterranean parchment cream that gives mobility hardware a lifestyle editorial feel.'
      },
      {
        name: 'Petrol Teal',
        hex: '#0D5258',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Deep vintage-motorsport petrol teal for display typography, frame bodywork, and buttons.'
      },
      {
        name: 'Electric Violet',
        hex: '#A862F7',
        role: 'action',
        percentage: 10,
        jobDescription: 'Unexpected iridescent violet accent on wheel rims, helmet visors, and active badges.'
      }
    ]
  },
  {
    id: 'dotto-apricot-mulberry-mint',
    name: 'Dotto Apricot, Mulberry & Pool Mint',
    brandName: 'DOTTO',
    tagline: 'Better ideas start here. PLAY ON PAPER.',
    subcopy: 'Lay-flat thread-bound notebooks, weighted brass clips, and tactile desk tools for analog thinkers.',
    ctaLabel: 'Shop stationery',
    secondaryCtaLabel: 'The desk edit',
    creator: '@bymarcoperez',
    category: 'Consumer & Playful',
    posture: 'light',
    storyQuote: 'Apricot and mulberry already feels playful. Add a touch of pool mint and see how the details pop.',
    sourceMediaPath: '/assets/aistudio/422105b5461eae358bb97bd86dac63bc_c2417fa5.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Apricot',
        hex: '#F7AC6F',
        role: 'background',
        percentage: 60,
        jobDescription: 'Sun-baked terracotta-apricot paper stock background across modular bento grids.'
      },
      {
        name: 'Mulberry',
        hex: '#4F1233',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Deep wine-mulberry ink for bookbinding spines, bold wordmarks, and dark feature cards.'
      },
      {
        name: 'Pool Mint',
        hex: '#5FF5C4',
        role: 'action',
        percentage: 10,
        jobDescription: 'Fresh mint enamel highlight for wire clips, tags, and primary interactive elements.'
      }
    ]
  },
  {
    id: 'arca-salt-olive-hibiscus',
    name: 'Arca Salt Grey, Deep Olive & Hibiscus Pink',
    brandName: 'arca.',
    tagline: 'Light, shaped by hand.',
    subcopy: 'A softer kind of architecture. Pleated Washi paper luminaires and patinated bronze floor lamps.',
    ctaLabel: 'View the collection',
    secondaryCtaLabel: 'Trade inquiries',
    creator: '@bymarcoperez',
    category: 'Editorial & Luxury',
    posture: 'light',
    storyQuote: 'Salt grey and deep olive: you would think it is finished. But add a little bit of hibiscus pink—try picturing the room without it.',
    sourceMediaPath: '/assets/aistudio/422105b5461eae358bb97bd86dac63bc_c2417fa5.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Salt Grey',
        hex: '#E6E8E8',
        role: 'background',
        percentage: 60,
        jobDescription: 'Plaster-and-stone gallery grey that lets architectural lighting take center stage.'
      },
      {
        name: 'Deep Olive',
        hex: '#213321',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Organic dark olive for serif/sans typography, furniture plinths, and structural borders.'
      },
      {
        name: 'Hibiscus Pink',
        hex: '#F2407A',
        role: 'action',
        percentage: 10,
        jobDescription: 'Radiant diffused hibiscus rose glow for the luminaire shade and focal CTA.'
      }
    ]
  },

  // --- @asongstudio_ 4-Color Industry Palettes (Video 3) ---
  {
    id: 'veyra-tech-brand',
    name: 'Veyra Tech Brand System',
    brandName: 'veyra',
    tagline: 'Autonomous infrastructure for high-velocity engineering teams.',
    subcopy: 'Deploy zero-downtime edge clusters with deterministic routing and instant rollback telemetry.',
    ctaLabel: 'Deploy cluster',
    secondaryCtaLabel: 'Read benchmarks',
    creator: '@asongstudio_',
    category: 'Industry Systems',
    posture: 'dark',
    storyQuote: 'For a tech brand, try Midnight Navy, Ice Blue, Electric Blue, and Chartreuse.',
    sourceMediaPath: '/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Midnight Navy',
        hex: '#111A3A',
        pantone: 'PANTONE 19-4027',
        role: 'background',
        percentage: 60,
        jobDescription: 'Deep enterprise navy foundation for developer consoles and dark-mode documentation.'
      },
      {
        name: 'Ice Blue',
        hex: '#DCE4EC',
        pantone: 'PANTONE 13-4110',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Cool glacier surface and primary readable text contrast against Midnight Navy.'
      },
      {
        name: 'Chartreuse',
        hex: '#D4FF00',
        pantone: 'PANTONE 13-0550',
        role: 'action',
        percentage: 10,
        jobDescription: 'High-visibility terminal chevron and primary deployment CTA accent.'
      },
      {
        name: 'Electric Blue',
        hex: '#1F51FF',
        pantone: 'PANTONE 18-4051',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'Brand emblem tile and interactive focus-ring highlight.'
      }
    ]
  },
  {
    id: 'little-crumb-cafe',
    name: 'Little Crumb Cafe & Bakery',
    brandName: 'little crumb',
    tagline: 'Small-batch sourdough, laminated pastries & single-origin espresso.',
    subcopy: 'Slow-fermented for 36 hours using stone-milled heritage grains and cultured Normandy butter.',
    ctaLabel: 'Order morning box',
    secondaryCtaLabel: 'Seasonal menu',
    creator: '@asongstudio_',
    category: 'Industry Systems',
    posture: 'light',
    storyQuote: 'For a cafe, try Toffee Brown, Oat, Strawberry Pink, and Olive.',
    sourceMediaPath: '/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Oat',
        hex: '#F3E5AB',
        pantone: 'PANTONE 12-0712',
        role: 'background',
        percentage: 60,
        jobDescription: 'Warm baked-oat pastry canvas that feels inviting, organic, and tactile.'
      },
      {
        name: 'Toffee Brown',
        hex: '#4A2511',
        pantone: 'PANTONE 19-1230',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Roasted espresso-bean brown for primary typography, illustrations, and menu cards.'
      },
      {
        name: 'Strawberry Pink',
        hex: '#E8A598',
        pantone: 'PANTONE 15-1621',
        role: 'action',
        percentage: 10,
        jobDescription: 'Sweet glacé strawberry pink for wordmark fills, seasonal badges, and order buttons.'
      },
      {
        name: 'Olive',
        hex: '#706E2E',
        pantone: 'PANTONE 18-0538',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'Botanical olive accent for savoury menu tags and organic certification stamps.'
      }
    ]
  },
  {
    id: 'atelier-law-firm',
    name: 'Atelier Corporate & Law Firm',
    brandName: 'VANCE & STERLING',
    tagline: 'Cross-border litigation, sovereign arbitration & intellectual property.',
    subcopy: 'Decisive counsel for complex technology transactions and high-stakes regulatory defense.',
    ctaLabel: 'Schedule consultation',
    secondaryCtaLabel: 'Practice areas',
    creator: '@asongstudio_',
    category: 'Industry Systems',
    posture: 'dark',
    storyQuote: 'For a law firm, try Deep Teal, Slate Blue, Stone, and Burnt Orange.',
    sourceMediaPath: '/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Deep Teal',
        hex: '#0D262A',
        pantone: 'PANTONE 19-4914',
        role: 'background',
        percentage: 60,
        jobDescription: 'Sovereign dark-teal boardroom foundation conveying gravitas and discretion.'
      },
      {
        name: 'Stone',
        hex: '#DCD9D0',
        pantone: 'PANTONE 13-0002',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Archival cotton-rag stationery tone for crisp serif/sans typography and dossier cards.'
      },
      {
        name: 'Burnt Orange',
        hex: '#C6631B',
        pantone: 'PANTONE 17-1464',
        role: 'action',
        percentage: 10,
        jobDescription: 'Signet-wax burnt orange for the primary consultation CTA and official seal accent.'
      },
      {
        name: 'Slate Blue',
        hex: '#6A83A4',
        pantone: 'PANTONE 17-4028',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'Tailored slate-blue secondary card surface and divider accent.'
      }
    ]
  },
  {
    id: 'oriel-skincare',
    name: 'Oriel Botanical Skincare',
    brandName: 'oriel',
    tagline: 'Barrier-first clinical botanicals formulated for sensitive skin.',
    subcopy: 'Cold-pressed sea buckthorn, biomimetic ceramides, and squalane in recyclable apothecary glass.',
    ctaLabel: 'Shop the regimen',
    secondaryCtaLabel: 'Clinical results',
    creator: '@asongstudio_',
    category: 'Industry Systems',
    posture: 'light',
    storyQuote: 'For skincare, try Terracotta, Nude, Cream, and Gold.',
    sourceMediaPath: '/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4',
    sourceMediaType: 'video',
    colors: [
      {
        name: 'Cream',
        hex: '#F9F3E3',
        pantone: 'PANTONE 11-0604',
        role: 'background',
        percentage: 60,
        jobDescription: 'Luminous apothecary cream background that evokes clean formulation and calm.'
      },
      {
        name: 'Terracotta',
        hex: '#B36A46',
        pantone: 'PANTONE 17-1340',
        role: 'surface',
        percentage: 30,
        jobDescription: 'Warm earth terracotta for editorial typography, packaging shadows, and primary containers.'
      },
      {
        name: 'Gold',
        hex: '#CEA243',
        pantone: 'PANTONE 16-0948',
        role: 'action',
        percentage: 10,
        jobDescription: 'Botanical oil gold for primary regimen CTAs and foil-stamped accents.'
      },
      {
        name: 'Nude',
        hex: '#DFBA94',
        pantone: 'PANTONE 15-1225',
        role: 'rare-accent',
        percentage: 0,
        jobDescription: 'Soft sandstone nude for secondary product tiles and ingredient comparison tables.'
      }
    ]
  }
];

// --- WCAG Contrast & Color Math Utilities ---
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  if (!/^#(?:[\da-fA-F]{3}|[\da-fA-F]{6})$/.test(hex)) {
    throw new TypeError(`Invalid hexadecimal colour: ${hex}`);
  }
  const cleaned = hex.slice(1);
  const full = cleaned.length === 3 ? [...cleaned].map((c) => c + c).join('') : cleaned;
  const num = Number.parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const normalize = (val: number) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getPreciseContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getContrastRatio(hex1: string, hex2: string): number {
  return Number(getPreciseContrastRatio(hex1, hex2).toFixed(2));
}

export function getReadableTextColor(bgHex: string): '#0E0E10' | '#F4F1EA' {
  const darkText = '#0E0E10';
  const lightText = '#F4F1EA';
  return getPreciseContrastRatio(bgHex, darkText) >= getPreciseContrastRatio(bgHex, lightText)
    ? darkText
    : lightText;
}

export function getContrastWarning(ratio: number, threshold = 4.5): string | null {
  return ratio < threshold
    ? `Contrast ${ratio.toFixed(3)}:1 is below the ${threshold}:1 WCAG target.`
    : null;
}

export function getWcagRating(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Decorative' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3.0) return 'AA Large';
  return 'Decorative';
}
