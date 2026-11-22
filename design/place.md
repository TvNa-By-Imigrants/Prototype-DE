# Place Page Layout & Spec

The dedicated **Place Discovery & Browsing** page (`/place`) allows users to search, filter by category (All, Visit, Eat, Cafe, Stay), and browse places with infinite scroll pagination.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Centered Content Container (max-w-7xl, px-4, space-y-6 lg:space-y-8)   │
│                                                                         │
│ 1. Header (Title + Subtitle)                                            │
│    • "ស្វែងរកកន្លែង" / "Discover Places"                               │
│    • Khmer-friendly line-height and typography                          │
│                                                                         │
│ 2. Filter & Search Controls                                             │
│    ┌─────────────────────────────────┐                                  │
│    │ 🔍 Search by name or area…      │                                  │
│    └─────────────────────────────────┘                                  │
│    ┌───────────┬───────────┬───────────┬───────────┬───────────┐        │
│    │ ✨ ទាំងអស់ │ 👟 ដើរលេង  │ 🍴 ញ៉ាំ    │ ☕ ហាងកាហ្វេ│ 🛏️ ស្នាក់នៅ │        │
│    └───────────┴───────────┴───────────┴───────────┴───────────┘        │
│    • Showing X places indicator + Reset filters                         │
│                                                                         │
│ 3. Places Grid (2-col mobile, 4-col desktop, static grid)               │
│    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────┐  │
│    │ Place Card 1  │ │ Place Card 2  │ │ Place Card 3  │ │ Place Card│  │
│    │ [16:9 Img]    │ │ [16:9 Img]    │ │ [16:9 Img]    │ │ [16:9 Img]│  │
│    │ Area · ★ Rating│ │ Area · ★ Rating│ │ Area · ★ Rating│ │ Area·★   │  │
│    │ Title         │ │ Title         │ │ Title         │ │ Title     │  │
│    │ Category pill │ │ Category pill │ │ Category pill │ │ Cat pill  │  │
│    │ [Go] [Plan]   │ │ [Go] [Plan]   │ │ [Go] [Plan]   │ │ [Go][Plan]│  │
│    └───────────────┘ └───────────────┘ └───────────────┘ └───────────┘  │
│                                                                         │
│ 4. Infinite Scroll Sentinel & Pagination                                │
│    • Initial batch: 8 cards                                             │
│    • IntersectionObserver loads +4 cards on bottom reach                │
│    • While loading: 4 Skeleton cards displayed                          │
│    • On complete: "បានបង្ហាញទាំងអស់ហើយ" (Reached the end)                 │
└─────────────────────────────────────────────────────────────────────────┘
```

## Mobile Breakdown (`390px`)

```
┌─────────────────────────────────────────┐
│ 1. Page Header                          │
│    ស្វែងរកកន្លែង                        │
│    រុករកកន្លែងដើរលេង ញ៉ាំ និងស្នាក់នៅ…   │
├─────────────────────────────────────────┤
│ 2. Search & Filter Bar                  │
│    [🔍 ស្វែងរកតាមឈ្មោះ ឬតំបន់…     ]   │
│    [✨ ទាំងអស់] [👟 ដើរលេង] [🍴 ញ៉ាំ]…   │
│    (Horizontal scrollable chips)        │
│    បង្ហាញ 24 កន្លែង                     │
├─────────────────────────────────────────┤
│ 3. Places Grid (2 Columns)              │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Place Card 1  │ │ Place Card 2  │  │
│    │ [Go]   [Plan] │ │ [Go]   [Plan] │  │
│    └───────────────┘ └───────────────┘  │
│    ┌───────────────┐ ┌───────────────┐  │
│    │ Place Card 3  │ │ Place Card 4  │  │
│    └───────────────┘ └───────────────┘  │
├─────────────────────────────────────────┤
│ 4. Infinite Scroll Sentinel             │
│    [⟳ កំពុងផ្ទុកបន្ថែម…] / [✓ បង្ហាញអស់ហើយ]│
└─────────────────────────────────────────┘
```

## Category Filter Mapping

| Category ID | Icon | Khmer Label | English Label | Included Types |
| :--- | :--- | :--- | :--- | :--- |
| `all` | `SparklesIcon` | ទាំងអស់ | All | All categories |
| `visit` | `FootprintsIcon` | កន្លែងដើរលេង | Visit | Parks, historical sites, attractions, museums |
| `eat` | `UtensilsCrossedIcon` | កន្លែងញ៉ាំ | Eat | Restaurants, noodle shops, street BBQ, seafood |
| `cafe` | `CoffeeIcon` | ហាងកាហ្វេ | Cafe | Coffee roasteries, dessert, bakeries, brunch |
| `stay` | `BedDoubleIcon` | កន្លែងស្នាក់នៅ | Stay | Hotels, resorts, boutique stays |

## Pagination & Infinite Scroll Mechanics

1. **Initial Page Load:** Renders first 8 items (`INITIAL_BATCH_SIZE = 8`).
2. **IntersectionObserver Trigger:** An invisible sentinel `<div ref={sentinelRef} />` at the bottom triggers `handleLoadMore()` when within 200px of viewport.
3. **Skeleton Loading:** Displays 4 placeholder `<PlaceCardSkeleton />` items during fetch delay to prevent layout jump.
4. **Batch Increment:** Appends 4 cards per scroll (`LOAD_MORE_BATCH_SIZE = 4`) until all filtered items are rendered.
5. **Filter Change Handling:** Switching categories or typing into search immediately resets visible count to 8 and scrolls view smoothly.
6. **Reached End State:** Renders `t("placePage.reachedEnd")` with a green checkmark once `visibleCount >= filteredPlaces.length`.
7. **Empty State:** If query matches 0 items, displays an empty illustration with `t("placePage.noResults")` and a reset button.
