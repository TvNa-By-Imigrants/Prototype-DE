# Card Specifications (`Design.md` + shadcn/ui)

Built using **shadcn/ui** with Base UI, semantic tokens, and Tailwind CSS v4.

---

## 1. Place Card (`PlaceCard`)

Compact destination and partner card built from `Card` (`size="sm"`), `AspectRatio` (`16:9`), `Badge`, and `Button`.

### Structure

```
┌─────────────────────────────────────────┐
│ Image Container (AspectRatio 16:9)      │
├─────────────────────────────────────────┤
│ CardHeader                              │
│   Area / Province        ★ 4.8          │
│   Place Name (CardTitle, 2-line max)    │
│                                         │
│ CardContent                             │
│   [Category] [Partner] [24 hours]       │
├─────────────────────────────────────────┤
│ CardFooter (actions)                    │
│   [Go Now]              [Add to Plan]   │
└─────────────────────────────────────────┘
```

### Anatomy & Token Rules

- **Surface & Shape:** `bg-card` (`--surface`), `rounded-xl`, `ring-1 ring-foreground/10` (`--border`), top image flush (`pt-0 overflow-hidden`), compact padding via `size="sm"` (`--card-spacing` 12px).
- **Media Zone:** `AspectRatio` at `16 / 9` (`ratio={16 / 9}`) with `object-cover` and gentle hover scale.
- **Header (`CardHeader`):**
  - Province / area label in `text-muted-foreground` (`text-xs` in English, `text-sm` 14px minimum in Khmer).
  - Rating on the same row (`★ 4.8` in `--rating` / `text-rating`). Omitted when missing.
  - Place title in `CardTitle` (`font-semibold text-foreground line-clamp-2`).
- **Tags (`CardContent`):**
  - Category badge: `<Badge variant="secondary">` (`bg-secondary text-secondary-foreground`).
  - Partner badge: `<Badge variant="outline">` with `border-primary/40 bg-primary/10 text-primary font-medium` (`ដៃគូសហការ` / `Partner`) shown on official partner places.
  - Operating hours badge: `"24 hours"` badge in `--success` (`bg-success/15 text-success`). Omitted when not 24 hours.
- **Actions (`CardFooter`, `mt-auto`, single `flex-row`):**
  - `Go Now` → `<Button variant="outline">` (secondary), `NavigationIcon`.
  - `Add to Plan` → `<Button>` (default, `--primary` fill), `CalendarPlusIcon` — primary action.
  - Both are `flex-1` in one row. Labels are `hidden sm:inline` (icon-only on mobile 2-col grids).

---

## 2. Feed Card (`FeedCard`)

Community discovery card showcasing traveler posts, tips, and photo stories.

### Structure

```
┌─────────────────────────────────────────┐
│ Image Container (AspectRatio 4:3)       │
├─────────────────────────────────────────┤
│ CardHeader                              │
│   [Avatar] Author Name [✓]              │
│   Post Title                            │
│   Post Description (2-line max)         │
├─────────────────────────────────────────┤
│ CardFooter (3 equal-width ghost actions)│
│   [👍 Likes]  [💬 Comments]  [👁 Views] │
└─────────────────────────────────────────┘
```

### Anatomy & Token Rules

- **Surface & Shape:** `bg-card` (`--surface`), `rounded-xl`, `ring-1 ring-foreground/10` (`--border`).
- **Media Zone:** `AspectRatio` at `4 / 3` (`ratio={4 / 3}`) with `object-cover`.
- **Author Row:** Initial avatar circle (`bg-primary/10 text-primary`), author name, and optional verified check badge (`BadgeCheckIcon` in `text-primary`).
- **Typography:**
  - Post Title: `font-semibold text-foreground text-sm line-clamp-1`.
  - Post Description: `text-xs sm:text-sm text-muted-foreground line-clamp-2`.
- **Interaction Bar (`CardFooter`):**
  - 3 equal-width ghost buttons (`flex-1`) in a Facebook-style engagement row:
    - **Likes** (`ThumbsUpIcon`)
    - **Comments** (`MessageSquareIcon`)
    - **Views** (`EyeIcon`)
  - Styled with `text-muted-foreground hover:text-foreground hover:bg-muted/60`.
