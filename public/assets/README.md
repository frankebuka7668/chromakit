# External Media Assets (`public/assets/aistudio/`)

The filenames below are the source of truth for media referenced by the React app. All 12 referenced files are present in `public/assets/aistudio/` and are included in Vite's static output, so the existing `/assets/aistudio/...` URLs resolve locally and in the deployed site. The two unreferenced files marked safe to omit are intentionally absent.

## Exact File Paths Referenced by the React App

### 1. Referenced in `src/App.tsx` (`SOURCE_VIDEOS`) & `src/data/palettes.ts` (`sourceMediaPath`)
- `/assets/aistudio/9899eb4223a91d85b21c105186c09a7d_c5edba83.mp4` (`@toolandtea` — 3 Foundation + 1 Accent Color Triads)
- `/assets/aistudio/e36fafbf3e5e9b12cd796b26fe3aa1a6_f34b9ae8.mp4` (`@bymarcoperez` — Purist 3-Color Combinations Vol. 1)
- `/assets/aistudio/53a4730821af12d64fd85947e05d2401_057f51d9.mp4` (`@bymarcoperez` — Purist 3-Color Combinations Vol. 2)
- `/assets/aistudio/b4ae09a4c14f0d16451e9cd815206449_83a8ac7d.mp4` (`@bymarcoperez` — Purist 3-Color Combinations Vol. 3)
- `/assets/aistudio/6e16f73df337929893f2efbd8783d00e_776e9e9a.mp4` (`@bymarcoperez` — Purist 3-Color Combinations Vol. 4)
- `/assets/aistudio/422105b5461eae358bb97bd86dac63bc_c2417fa5.mp4` (`@bymarcoperez` — Purist 3-Color Combinations Vol. 5)
- `/assets/aistudio/10eb1664fe5bec80acc5811b3e652227_2028b605.mp4` (`@asongstudio_` — 4-Color Industry Brand Palettes)
- `/assets/aistudio/17679cdeb42247d4a06fb8b16ee6adef_ea3ae57b.mp4` (`@charles.unemployed` — 22 Backgrounds to Make Designs Less Flat; referenced in `src/App.tsx` only)

### 2. Referenced in `src/components/DesignGuidesView.tsx` & `src/data/palettes.ts`
- `/assets/aistudio/7ad349894f2e0ec255081bc326fb5162_45a3d173.webp` (`@vixdesignz` Slide 1 — also referenced in `src/data/palettes.ts`)
- `/assets/aistudio/9dbcc5967e993c5964955caa7e5ee4bd_efce7b21.webp` (`@vixdesignz` Slide 2 — `DesignGuidesView.tsx`)
- `/assets/aistudio/bc8a72e3b0028361382e25512c093eb9_79a3bb1b.webp` (`@vixdesignz` Slide 3 — also referenced in `src/data/palettes.ts`)
- `/assets/aistudio/8c426738fb8765e947f015e5c5d692d3_d4041656.webp` (`@vixdesignz` Slide 4 — `DesignGuidesView.tsx`)

### 3. Unreferenced Files (Safe to Omit)
- `/assets/aistudio/8779dd7d7704205de13f21a796a409d1_87d9592b.mp4` (not referenced in `src/`)
- `/assets/aistudio/ed7b7b3846dde5533457d5fffa92f6fa_b8a1ac68.mp4` (not referenced in `src/`)
