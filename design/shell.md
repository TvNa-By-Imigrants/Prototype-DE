# This is the shell for the site(nav included)
**Goal** is to make a shell and nav for the site so we have a consistance build and only need to build the page content

**Important** : the shell is mobile focus

## mobile
### Mobile Page Structure (398px)

```
┌─────────────────────────────────────────┐
│ Mobile Header                           │
│ ┌─────────────────────────────────────┐ │
│ │ [Logo]     [Login] [Register][Lang] │ │
│ ├─────────────────────────────────────┤ │
│ │ [Search General...            ] [☀] │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Main Content (scrollable)               │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Hero Carousel (Swipeable)           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Section: Feed          [View All >] │ │
│ │ ┌───────────────┐ ┌───────────────┐ │ │
│ │ │ Card 1        │ │ Card 2        │ │ │
│ │ │ [Img+Badges]  │ │ [Img+Badges]  │ │ │
│ │ │ Author        │ │ Author        │ │ │
│ │ │ Title/Desc    │ │ Title/Desc    │ │ │
│ │ │ Stats Row     │ │ Stats Row     │ │ │
│ │ └───────────────┘ └───────────────┘ │ │
│ │ ┌───────────────┐ ┌───────────────┐ │ │
│ │ │ Card 3        │ │ Card 4        │ │ │
│ │ │ [Img+Badges]  │ │ [Img+Badges]  │ │ │
│ │ └───────────────┘ └───────────────┘ │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Fixed Bottom Navigation Bar             │
│ [Home]  [Feed]  [Plan ]  [Map ]  [Hub ] │
└─────────────────────────────────────────┘

```

### Desktop Page Structure (1280px+)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Desktop Header (Sticky)                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ [Logo]  [Home] [Feed] [Plan] [Map] [Hub]                            │ │
│ │                                 [Search General...] [☀] [Lang]      │ │
│ │                                 [Login] [Register]                  │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│ Centered Main Container (max-width: 1280px, scrollable)                 │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Hero Carousel                                                   │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Section: Feed                               [View All >] [<][>] │   │
│   │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│   │ │ Card 1      │ │ Card 2      │ │ Card 3      │ │ Card 4      │ │   │
│   │ │ [Img+Badges]│ │ [Img+Badges]│ │ [Img+Badges]│ │ [Img+Badges]│ │   │
│   │ │ Author      │ │ Author      │ │ Author      │ │ Author      │ │   │
│   │ │ Title/Desc  │ │ Title/Desc  │ │ Title/Desc  │ │ Title/Desc  │ │   │
│   │ │ Stats Row   │ │ Stats Row   │ │ Stats Row   │ │ Stats Row   │ │   │
│   │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

```

### Key Responsive Shell Rules

* **Navigation Shift:** The fixed bottom bar (`[Home] [Feed] [Plan] [Map] [Hub]`) promotes directly into the horizontal top header on `md:` / `lg:` screens—no extra links, keeping route parity 1:1 with mobile.
* **Header Consolidation:** The two-row mobile header merges into a single horizontal bar containing the brand logo, the 5 primary nav links, the search input, theme/language toggles (`[☀]`, `[Lang]`), and auth actions (`[Login]`, `[Register]`).
* **Content Grid:** The 2-column mobile feed grid expands to a 4-column grid (`grid-cols-2 lg:grid-cols-4`) inside a centered `max-w-7xl` container, dropping the ticker, upload CTA, and floating action buttons to match your stripped-back mobile shell.
