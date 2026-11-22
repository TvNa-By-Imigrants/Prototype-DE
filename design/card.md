# Place Card Specification (`Design.md` + shadcn/ui)

Built with **shadcn/ui** `Card` (`size="sm"`), `AspectRatio` (`16:9`), `Badge`, and `Button`.

## Place Card Structure

```
┌─────────────────────────────────────────┐
│ Image Container (AspectRatio 16:9)      │
├─────────────────────────────────────────┤
│ CardHeader                              │
│   Province / Area        ★ 4.8          │
│   Place Name (CardTitle, 2-line max)    │
│                                         │
│ CardContent                             │
│   [Category]  [24 hours]                │
├─────────────────────────────────────────┤
│ CardFooter (actions)                    │
│   [Go Now]              [Add to Plan]   │
└─────────────────────────────────────────┘
```

## Section Row Context (Mobile 2-Col → Desktop 4-Col)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Section Title                                                 View All >│
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ │
│ │ [Img 16:9]    │ │ [Img 16:9]    │ │ [Img 16:9]    │ │ [Img 16:9]    │ │
│ │ BKK1    ★ 4.8 │ │ Toul Kork     │ │ Chamkar Mon   │ │ Doun Penh     │ │
│ │ Place Name    │ │ Place Name    │ │ Place Name    │ │ Place Name    │ │
│ │ [Cafe]        │ │ [Restaurant]  │ │ [Park]        │ │ [Park] [24h]  │ │
│ ├───────────────┤ ├───────────────┤ ├───────────────┤ ├───────────────┤ │
│ │[Go Now][+Plan]│ │[Go Now][+Plan]│ │[Go Now][+Plan]│ │[Go Now][+Plan]│ │
│ └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Anatomy & Token Rules

- **Surface & Shape:** `bg-card` (`--surface`), `rounded-xl`, `ring-1 ring-foreground/10` (`--border`), top image flush (`pt-0 overflow-hidden`), compact spacing via `size="sm"` (`--card-spacing` 12px).
- **Media Zone:** `AspectRatio` at `16 / 9` (`ratio={16 / 9}`) with `object-cover`.
- **Header (`CardHeader`):**
  - Province / area label in `text-muted-foreground` (`text-xs` in English, `text-sm` 14px minimum in Khmer), with the rating on the same row (`★ 4.8` in `--rating` / `text-rating`). **Rating omitted when missing.**
  - Place title in `CardTitle` (`font-semibold text-foreground line-clamp-2`).
- **Tags (`CardContent`):**
  - Category tag: `<Badge variant="secondary">` (`--primary-tint` background, `--primary-strong` text).
  - Operating hours badge: `"24 hours"` badge in `--success` (`bg-success/15 text-success`). **Omitted when `is24Hours` / `hours` is missing.**
- **Actions (`CardFooter`, `mt-auto`, single `flex-row`):**
  - `Go Now` → `<Button variant="outline">` (secondary), `NavigationIcon`.
  - `Add to Plan` → `<Button>` (default, `--primary` fill), `CalendarPlusIcon` — **the primary action**.
  - Both are `flex-1` in one row on all breakpoints. Text labels are `hidden sm:inline` (icon-only on the narrow mobile 2-column grid, with `aria-label`/`title`; icon + text from `sm:` up).
