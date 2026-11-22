# Home Page Content Layout (Inside `<main>` Shell)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Centered Content Container (max-w-7xl, px-4, space-y-6)                 │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 1. Hero Promo Banner (rounded-2xl, overflow-hidden)                 │ │
│ │ ┌───────────────────────┬───────────┬───────────────┬─────────────┐ │ │
│ │ │ Left Promo Block      │  Panel 1  │    Panel 2    │   Panel 3   │ │ │
│ │ │ • Headline            │ [Explore] │    [Stay]     │    [Eat]    │ │ │
│ │ │ • Map Graphic         │  (Pill)   │    (Pill)     │   (Pill)    │ │ │
│ │ │ • Sub-tagline         │           │               │             │ │ │
│ │ └───────────────────────┴───────────┴───────────────┴─────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 2. Section: Feed / ហ្វីត                                            │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Header: [🔥 Icon] Title + Subtitle            [View All >]      │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │ │
│ │ │ Feed Card 1   │ │ Feed Card 2   │ │ Feed Card 3   │ │ Feed Card │ │ │
│ │ │ [Img + 4 Tags]│ │ [Img + 4 Tags]│ │ [Img + 4 Tags]│ │ [Img+Tags]│ │ │
│ │ │ Author ✓      │ │ Author ✓      │ │ Author ✓      │ │ Author    │ │ │
│ │ │ Title + Desc  │ │ Title + Desc  │ │ Title + Desc  │ │ Title+Desc│ │ │
│ │ │     👍 💬 👁  │ │     👍 💬 👁  │ │     👍 💬 👁  │ │   👍 💬 👁 │ │ │
│ │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 3. Section: Curated Places ("Beautiful places for green season")    │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Header: Section Title                                          │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │ │
│ │ │ Place Card 1  │ │ Place Card 2  │ │ Place Card 3  │ │ Place Card│ │ │
│ │ │ [Img + Prov.] │ │ [Img + Prov.] │ │ [Img + Prov.] │ │ [Img+Prov]│ │ │
│ │ │ Title / Meta  │ │ Title / Meta  │ │ Title / Meta  │ │ Title/Meta│ │ │
│ │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Mobile Breakdown (`390px` Stacking)

```
┌─────────────────────────────────────────┐
│ 1. Hero Banner (h-48 brand block)       │
│    [Headline + Map]  then 3 panels row  │
│    [Explore]  [Stay]  [Eat]             │
├─────────────────────────────────────────┤
│ 2. Feed Section                         │
│    [🔥] Title             [View All >]  │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Feed Card 1   │ │ Feed Card 2   │  │
│    └───────────────┘ └───────────────┘  │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Feed Card 3   │ │ Feed Card 4   │  │
│    └───────────────┘ └───────────────┘  │
├─────────────────────────────────────────┤
│ 3. Curated Places Section               │
│    Section Title                        │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Place Card 1  │ │ Place Card 2  │  │
│    └───────────────┘ └───────────────┘  │
└─────────────────────────────────────────┘
```

## Home Content Notes

- **Hero Split Ratio:** A left-weighted brand/map block (~1.4fr) paired with 3 category panels (`កន្លែងដើរលេង` / Visit, `កន្លែងស្នាក់នៅ` / Stay, `កន្លែងញ៉ាំ` / Eat) that act as quick-filter entry points.
- **Static Grids (no carousel):** Feed and Curated Places rows are responsive grids — `grid-cols-2 lg:grid-cols-4`. No prev/next arrows, swipe, or pagination dots.
- **Card Hierarchy:** Section 2 uses full social/promo cards (4-corner tags + author + engagement stats 👍💬👁), while Section 3 uses lighter destination cards (province/area + title + rating + category + actions).
