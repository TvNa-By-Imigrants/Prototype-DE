# App Shell & Navigation Specification

**Goal:** Create a consistent mobile-first app shell and navigation system so page content slots directly inside `<main>`.

## Mobile Layout (`390px` Stacking)

```
┌─────────────────────────────────────────┐
│ Mobile Header (Two rows, sticky)        │
│ ┌─────────────────────────────────────┐ │
│ │ [Logo: TvNa] [Login][Register][Lang]│ │
│ ├─────────────────────────────────────┤ │
│ │ [🔍 Search general…           ] [☀] │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Main Content (scrollable, pb-24)        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Hero Promotion Slider (Auto-loop)   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Section: Feed          [View All >] │ │
│ │ ┌───────────────┐ ┌───────────────┐ │ │
│ │ │ Feed Card 1   │ │ Feed Card 2   │ │ │
│ │ └───────────────┘ └───────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ │ │
│ │ │ Feed Card 3   │ │ Feed Card 4   │ │ │
│ │ └───────────────┘ └───────────────┘ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Section: Hang Out (Partnered)       │ │
│ │ ┌───────────────┐ ┌───────────────┐ │ │
│ │ │ Place Card 1  │ │ Place Card 2  │ │ │
│ │ └───────────────┘ └───────────────┘ │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Fixed Bottom Navigation Bar (lg:hidden) │
│ [Home]  [Place]  [Plan]  [Map]  [Feed]  │
└─────────────────────────────────────────┘
```

## Desktop Layout (`1280px+`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Desktop Header (Single unified row, sticky top-0, z-40)                 │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ [Logo]  [Home] [Place] [Plan] [Map] [Feed]                          │ │
│ │                             [🔍 Search…] [Lang: KM/EN] [☀] [Login]  │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│ Centered Main Container (max-w-7xl, px-4, pb-10)                        │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Hero Promotion Slider (Looped brand & partner places)           │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Section: Feed (Top 4 picks)                 [View All >](/feed) │   │
│   │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│   │ │ Feed Card 1 │ │ Feed Card 2 │ │ Feed Card 3 │ │ Feed Card 4 │ │   │
│   │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Section: Hangout Places (Partnered)        [View All >](/place) │   │
│   │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│   │ │ Place Card 1│ │ Place Card 2│ │ Place Card 3│ │ Place Card 4│ │   │
│   │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Responsive Shell Rules

1. **Navigation Order & Route Parity:**
   - 5 primary destinations: **Home** (`/`), **Place** (`/place`), **Plan** (`/plan`), **Map** (`/map`), **Feed** (`/feed`).
   - Fixed bottom bar on mobile (`lg:hidden`).
   - Promoted directly to the top horizontal header on desktop (`hidden lg:flex`).
2. **Header Consolidation:**
   - Mobile: 2 rows (top: Logo + Auth + Lang; bottom: Search input + Theme switch).
   - Desktop: Single consolidated row with brand logo, nav links, search input, theme toggle, language dropdown (`KM` / `EN`), and login/register actions.
3. **Safe Area & Viewport:**
   - Safe-area insets handled on all edges: `pl-[max(1rem,env(safe-area-inset-left))]` and `pb-24` on mobile to clear the fixed bottom nav.
