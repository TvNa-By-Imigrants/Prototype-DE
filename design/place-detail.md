# Place Detail Full Page Design Specification

**Feature:** Place Detail View (`SCRUM-17`)  
**Design Phase:** DE (Design) Complete Hand-off  
**Architecture:** Full Page View with Dedicated Back Navigation Button

---

## 1. Overview & Information Architecture

The Place Detail view allows users to transition smoothly from browsing (Home Hangout or Place Discovery grid) into an immersive venue profile without losing context. 

### Reading Order & Content Stacking
1. **Top Navigation Header:**
   - Left: `← Back` (`ត្រឡប់ក្រោយ`) button returning to the previous view with scroll position preserved.
   - Right: Quick Share button (`Share2Icon`), Category badge (`📍 Cafe`), and Partner badge (`ដៃគូសហការ`).
2. **Hero Photo Gallery:**
   - 16:9 Aspect Ratio primary image with smooth object-cover scaling.
   - Overlaid tags: Partner badge, "24 Hours" badge, and photo count pill (`📷 1/6`).
   - Prev/Next chevron arrow overlays for cycling through gallery photos.
   - Touch-friendly thumbnail strip below the main image for instant photo selection.
3. **Place Title & Metadata:**
   - Khmer Title (`text-2xl sm:text-3xl font-bold`, min 14px, unclipped stacked marks).
   - English subtitle (`text-sm sm:text-base text-muted-foreground`).
   - Price Tier badge (`$` Budget, `$$` Moderate, `$$$` Upscale, `$$$$` Luxury).
   - Operating hours with live `ClockIcon`.
4. **Interactive Rating & Review Card:**
   - Verified aggregate score (`4.8 ★★★★★`) + Google Maps review count.
   - Interactive 5-star rating widget with hover states and feedback confirmation badge (`Thank you for rating!`).
5. **About & Description Card:**
   - Multi-line descriptive copy.
   - Topic tags (`#books`, `#matcha`, `#coworking`).
6. **Location & Address Card:**
   - Map pin icon, Area, Province, and verified Google Maps coordinates.
7. **Prominent Action CTAs:**
   - Primary Solid: **“Add to Plan”** (`ដាក់ចូលផែនការ` with `CalendarPlusIcon` and added confirmation feedback).
   - Secondary Outline: **“View on Map”** (`មើលលើផែនទី` with `NavigationIcon`).

---

## 2. Responsive Layout Wireframes

### Mobile Layout (`390px` Mobile Viewport)

```
┌─────────────────────────────────────────┐
│ [← Back]              [🔗 Share] [📍Cafe]│
├─────────────────────────────────────────┤
│ 1. Hero Image Gallery (16:9)            │
│ ┌─────────────────────────────────────┐ │
│ │ [ដៃគូសហការ]               [24h]     │ │
│ │ [ < ]                         [ > ] │ │
│ │                        [📷 1/6 photos]│
│ └─────────────────────────────────────┘ │
│  [Img 1] [Img 2] [Img 3] [Img 4] [Img 5]│
│                                         │
│ 2. Title & Operating Hours              │
│ [$$ Moderate]  [★ 4.8 (342)]            │
│ Tatsuya Bookstore Cafe                  │
│ ហាងសៀវភៅ និងកាហ្វេ តាតស៊ូយ៉ា           │
│ 🕒 08:00 AM – 09:00 PM                   │
│                                         │
│ 3. Rating & Review Card                 │
│ ┌─────────────────────────────────────┐ │
│ │ 4.8  ★★★★★   342 Google reviews     │ │
│ │ ─────────────────────────────────── │ │
│ │ Rate this place: [★][★][★][★][★]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 4. Description Card                     │
│ ┌─────────────────────────────────────┐ │
│ │ About this place                    │ │
│ │ Pherk matcha, open your MacBook,    │ │
│ │ listen to music on wired earphones  │ │
│ │ and read books. Cozy atmosphere...  │ │
│ │ [#books] [#coffee] [#matcha]        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 5. Location / Address Card              │
│ ┌─────────────────────────────────────┐ │
│ │ 📍 Location & Address               │ │
│ │ BKK1, Phnom Penh (11.5564, 104.9282)│ │
│ │ Street 240, BKK1, Phnom Penh        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 6. Fixed Sticky Bottom Action Bar (z-50)│
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ 🗺️ View on Map   │ │ ➕ Add to Plan   │ │
│ │ (Outline)       │ │ (Primary Solid) │ │
│ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────┘
```

### Desktop Layout (`1280px+` Two-Column Split)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [← Back to Places]                    [🔗 Share] [📍 Cafe] [ដៃគូសហការ]  │
├─────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────┬─────────────────────────────────┐ │
│ │ Left Content Column (7 cols / 58%)│ Right Sticky Action Card (5 cols│ │
│ │                                   │ ┌─────────────────────────────┐ │ │
│ │ ┌───────────────────────────────┐ │ │ [📍 Cafe] [$$ Moderate] ★4.8│ │ │
│ │ │ 1. Hero Photo Gallery (16:9)  │ │ │                             │ │ │
│ │ │ [ដៃគូសហការ]             [24h] │ │ │ Tatsuya Bookstore Cafe      │ │ │
│ │ │ [<]                       [>] │ │ │ ហាងសៀវភៅ និងកាហ្វេ តាតស៊ូយ៉ា│ │ │
│ │ └───────────────────────────────┘ │ │ 🕒 08:00 AM – 09:00 PM        │ │ │
│ │  [Img 1][Img 2][Img 3][Img 4]...  │ │ ─────────────────────────── │ │ │
│ │                                   │ │ Prominent CTAs:             │ │ │
│ │ ┌───────────────────────────────┐ │ │ ┌─────────────────────────┐ │ │ │
│ │ │ 2. Rating & Review Card       │ │ │ │ ➕ Add to Plan (Solid)   │ │ │ │
│ │ │ 4.8 ★★★★★ (342 reviews)       │ │ │ └─────────────────────────┘ │ │ │
│ │ │ Rate: [★][★][★][★][★] [Reset] │ │ │ ┌─────────────────────────┐ │ │ │
│ │ └───────────────────────────────┘ │ │ │ 🗺️ View on Map (Outline) │ │ │ │
│ │                                   │ │ └─────────────────────────┘ │ │ │
│ │ ┌───────────────────────────────┐ │ └─────────────────────────────┘ │ │
│ │ │ 3. About this place           │ │                                 │ │
│ │ │ Full description paragraph... │ │                                 │ │
│ │ │ [#books] [#coffee] [#matcha]  │ │                                 │ │
│ │ └───────────────────────────────┘ │                                 │ │
│ │                                   │                                 │ │
│ │ ┌───────────────────────────────┐ │                                 │ │
│ │ │ 4. Location & Address         │ │                                 │ │
│ │ │ 📍 BKK1, Phnom Penh (Coords)  │ │                                 │ │
│ │ │ Street 240, BKK1, Phnom Penh  │ │                                 │ │
│ │ └───────────────────────────────┘ │                                 │ │
│ └───────────────────────────────────┴─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Token Mapping & States

| Element | Component / Primitive | Token / Class | Interaction States |
| :--- | :--- | :--- | :--- |
| **Back Button** | `Button variant="ghost"` | `text-muted-foreground hover:text-foreground` | Returns to previous page |
| **Hero Image** | `AspectRatio ratio={16/9}` | `rounded-2xl border-border/80 bg-muted` | Next/Prev chevron overlay buttons |
| **Thumbnails** | Interactive button row | `ring-2 ring-primary scale-95` on active | Horizontal scrolling strip |
| **Price Tier** | `Badge variant="outline"` | `border-border text-foreground` | `$` Budget to `$$$$` Luxury |
| **Interactive Stars** | `button` with `StarIcon` | `fill-rating text-rating` | Hover highlight, click to rate, reset |
| **CTA: Add to Plan** | `Button variant="default"` | `bg-primary text-primary-foreground` | Hover darkens, click gives "Added!" feedback |
| **CTA: View on Map** | `Button variant="outline"` | `border-border text-foreground` | Hover muted, navigates to `/map` |
| **Mobile Sticky Bar** | Fixed container | `fixed inset-x-0 bottom-0 z-50 bg-card/95 backdrop-blur-md` | Pinned with safe-area padding |
