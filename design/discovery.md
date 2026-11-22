# Home Page Content Layout (Inside `<main>` Shell)

The **Home Page** serves as the primary promotion and discovery hub:
1. **Hero Promo Slider:** Auto-sliding infinite loop (`... -> end -> front -> ...`) showcasing the TvNa brand mark and official partner places (e.g., Rosewood, Malis, Tatsuya).
2. **Community Feed:** Highlights the top 4 community picks (`feedPosts.slice(0, 4)`). Clicking "View All" navigates to `/feed`.
3. **Places to Hang Out:** Reserved strictly for **official partner places** (`partneredPlaces.slice(0, 4)`). Clicking "View All" navigates to `/place` for the full catalog.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Centered Content Container (max-w-7xl, px-4, space-y-8 lg:space-y-10)   │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 1. Auto-Sliding Loop Hero Promo Banner (h-56 sm:h-64 lg:h-76)       │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [📍 TvNa Logo] [✨ Official Partner / Promotion Badge]           │ │ │
│ │ │ Headline: "ទៅណា?" / "Where to go?"                               │ │ │
│ │ │ Tagline: Partner feature / Discover Phnom Penh                   │ │ │
│ │ │ [ Explore Now > ]                                               │ │ │
│ │ │                                              [ • • • • ] (Pills)│ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 2. Section: Feed / ហ្វីត (Exactly 4 Cards)                            │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Header: [🔥 Icon] Title + Subtitle            [View All >] (/feed)│ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │ │
│ │ │ Feed Card 1   │ │ Feed Card 2   │ │ Feed Card 3   │ │ Feed Card 4│ │
│ │ │ [Img 4:3]     │ │ [Img 4:3]     │ │ [Img 4:3]     │ │ [Img 4:3]  │ │
│ │ │ Author ✓      │ │ Author ✓      │ │ Author ✓      │ │ Author ✓   │ │
│ │ │ Title + Desc  │ │ Title + Desc  │ │ Title + Desc  │ │ Title+Desc │ │
│ │ │     👍 💬 👁  │ │     👍 💬 👁  │ │     👍 💬 👁  │ │   👍 💬 👁 │ │
│ │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 3. Section: Partner Hangout Places (Partnered Only, 4 Cards)        │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Header: [✨ Icon] Places to Hang Out         [View All >](/place)│ │
│ │ │ Subtitle: Featured promotions from our official partners         │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │ │
│ │ │ Place Card 1  │ │ Place Card 2  │ │ Place Card 3  │ │ Place Card 4││
│ │ │ [Img 16:9]    │ │ [Img 16:9]    │ │ [Img 16:9]    │ │ [Img 16:9] │ │
│ │ │ Area · ★ 4.8  │ │ Area · ★ 4.9  │ │ Area · ★ 4.7  │ │ Area · ★4.9│ │
│ │ │ [Partner] tag │ │ [Partner] tag │ │ [Partner] tag │ │[Partner]tag│ │
│ │ │ [Go]   [Plan] │ │ [Go]   [Plan] │ │ [Go]   [Plan] │ │ [Go][Plan] │ │
│ │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Mobile Stacking (`390px`)

```
┌─────────────────────────────────────────┐
│ 1. Hero Promo Slider (h-56)             │
│    [Logo] [Partner Badge]               │
│    Headline + Tagline                   │
│    [ Explore Now > ]     [ • • • • ]    │
├─────────────────────────────────────────┤
│ 2. Feed Section (4 cards in 2x2 grid)   │
│    [🔥] ហ្វីត              [មើលទាំងអស់ >] │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Feed Card 1   │ │ Feed Card 2   │  │
│    └───────────────┘ └───────────────┘  │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Feed Card 3   │ │ Feed Card 4   │  │
│    └───────────────┘ └───────────────┘  │
├─────────────────────────────────────────┤
│ 3. Partner Hangout Places (2x2 grid)    │
│    [✨] កន្លែងដើរលេង        [មើលទាំងអស់ >] │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Place Card 1  │ │ Place Card 2  │  │
│    │ [Partner]     │ │ [Partner]     │  │
│    │ [Go]   [Plan] │ │ [Go]   [Plan] │  │
│    └───────────────┘ └───────────────┘  │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Place Card 3  │ │ Place Card 4  │  │
│    │ [Partner]     │ │ [Partner]     │  │
│    │ [Go]   [Plan] │ │ [Go]   [Plan] │  │
│    └───────────────┘ └───────────────┘  │
└─────────────────────────────────────────┘
```
