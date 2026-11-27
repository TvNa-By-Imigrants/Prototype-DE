# Profile — Personal & Public (`DE-502`)

**Status:** Design hand-off, implemented as a working prototype.
**Form:** a **route** (`/profile`), not a dialog. One component for both views; `isOwner` is the only switch. `App.tsx` holds `profileHandle`, so `/profile` with no handle falls back to `NotBuiltPage`.
**Files:** `src/components/page/profile/{profile-header,profile-page,edit-profile-dialog}.tsx`, `src/components/cards/plan-card.tsx`, `src/data/profiles.ts`, `src/i18n/{en,km}.ts` (`profile.*`), `AppShell` (`--header-h`), header dropdown + `App.tsx` wiring.

---

## 1. One page, two views

The personal profile and the public profile are the **same layout**. Nothing is hidden behind a second route, and the two never drift apart. Three things change:

| | Personal (owner) | Public (visitor) |
| :--- | :--- | :--- |
| Primary CTA | **Edit profile** | **Follow** / **Following** |
| Tabs | My Posts · Saved Plans | My Posts only |
| Back button | none (it is your own page) | ← back to the feed |

Saved Plans is **not rendered at all** for visitors — not disabled, not greyed out. A disabled tab still tells a visitor that private things exist; omitting it says nothing.

References, deliberately mixed:

- **Facebook** for the shell — a cardless full-width cover, the identity sitting on the page background, stats inline under the handle, tabs pinned while the feed scrolls, and a two-column layout on desktop with an Intro rail. This is the pattern that solves our actual problem: a header holding identity + actions + stats without crowding.
- **GitHub** for the tab treatment — underline under the label only, sitting on a hairline rule.
- **Instagram** for the identity rhythm — avatar left, name/handle beside it, one quiet stats line rather than a stat block.
- Trip.com's quiet labelled form is reused for editing.

### The cardless exception (important)

Every other page in TvNa is card-based. **The profile header is the one deliberate exception**, and it should stay that way: no `rounded-xl`, no `bg-card`, no ring, no shadow. The cover runs the full column width and the identity sits directly on `background`. A later reader who "fixes" this back into a card undoes the whole point — it turns the profile back into a settings page.

Cards resume *below* the header (Intro rail, saved-plan note), so the page is not card-free, just not card-*headed*.

## 2. Layout

### Desktop (`lg` and up)

```
┌───────────────────────────────────────────────────────────────────────┐
│ page shell, max-w-5xl                                                 │
│ ▓▓▓▓▓ cover: secondary → primary/25, square, h-48 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ (avatar, -mt-14)                                                      │
│ Dara ✓                                          [ ✎ Edit profile ]    │
│ @dara                                                                 │
│ 2 Posts · 256 Followers · 180 Following                               │
├───────────────────────────────────────────────────────────────────────┤
│ My Posts │ 🔒 Saved Plans [Only you]        ← sticky, blurred          │
│ ────────                                                              │
│ ┌──────────────────┐  ┌─────────────────────────────────────────────┐ │
│ │ Intro            │  │ ● Dara ✓                    4h ago          │ │
│ │ bio…             │  │ klengofvintage - Russian Market Thrift      │ │
│ │ 📍 Phnom Penh    │  │ Come and thrift for some clothes…           │ │
│ │ 📅 Joined Mar 25 │  │ 📍 Russian Market (TTP)                     │ │
│ └──────────────────┘  │ ▓▓▓▓▓ photo 16:9 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│   sticky rail         │ ─────────────────────────────────────────── │ │
│                       │  👍 154      💬 9            👁 1.2k        │ │
│                       ├─────────────────────────────────────────────┤ │
│                       │ ● Dara ✓                    1d ago          │ │
│                       │ Kaixin Hotpot with the Squad                │ │
│                       │ …                                           │ │
│                       └─────────────────────────────────────────────┘ │
│                          one post per row, scrolls down                │
└───────────────────────────────────────────────────────────────────────┘
```

- Header `<header>` is **plain** — cover `h-32 sm:h-40 lg:h-48`, no wrapper chrome.
- Avatar `size-20 shrink-0 sm:size-28`, pulled up `-mt-10 sm:-mt-14`, `after:border-background`. The seam is `background` (not `card`) because the lower half of the avatar now sits on the page background.
- Name + handle sit *beside* the avatar on the same baseline row (`items-end`), CTA on the right at `sm`; full-width under the stats on mobile.
- Stats are **one inline wrapping line** after the handle: `2 Posts · 256 Followers · 180 Following`, value in `font-semibold text-foreground`, label in `muted-foreground`, `·` separators in `text-border`.

> Why this replaced the 3-column stat grid: a grid gives each Khmer label one third of the width, and `អ្នកតាមដាន` does not fit — which is what forced the stacked number-over-label workaround and its `language === "km"` special case. An inline line wraps instead of clipping, so **both languages share one code path** with no language branch.

- Content grid: `lg:grid-cols-[280px_1fr]`, rail first in the DOM, `lg:gap-6`. Page column widened `max-w-3xl` → `max-w-5xl`.
- The feed is **one post per row at every width** (Facebook's shape), so a post gets the full column beside the rail (~660px at `lg`) rather than a cramped two-up cell.

### Mobile (`< lg`)

```
┌─────────────────────────────────────┐
│▓▓▓▓ cover h-32 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ (avatar)                            │
│ Dara ✓                              │
│ @dara                               │
│ 2 Posts · 256 Followers · 180 Fol…  │  wraps, never clips
│ [        ✎ Edit profile         ]   │  full width
├─────────────────────────────────────┤
│ My Posts │ 🔒 Saved Plans   ← sticky │  badge hidden < sm
│ ────────                            │
│ ┌─────────────────────────────────┐ │
│ │ Intro (bio, location, joined)   │ │  above the feed
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ● Dara ✓              4h ago    │ │
│ │ klengofvintage - Russian Market │ │
│ │ Come and thrift…                │ │
│ │ 📍 Russian Market (TTP)         │ │
│ │ ▓▓▓▓ photo 16:9 ▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │
│ │ ─────────────────────────────── │ │
│ │ 👍 154    💬 9    👁 1.2k        │ │
│ └─────────────────────────────────┘ │
│            ↓ scrolls down            │
└─────────────────────────────────────┘
```

Single column, Intro card above the feed (same order Facebook uses). Verified at **320**, **390** and **768**.

## 3. Sticky tabs and the `--header-h` variable

The tab bar pins under the header: `sticky top-[var(--header-h,4rem)] z-30` with `bg-background/95 backdrop-blur` and a bottom hairline. `z-30` is below the header's `z-40`, so the header always wins the overlap.

**The offset is measured, not hardcoded.** The mobile header is content-height (~112px at 390px with two rows) and changes with Khmer wrapping, font loading and browser zoom — a `top-[7rem]` would drift and leave a gap or a leak. So `AppShell` attaches a `ResizeObserver` to the `<header>` ref and publishes `--header-h` on the shell element; the CSS fallback `4rem` only applies for the first paint before the observer fires.

The **Intro rail** uses `lg:top-[calc(var(--header-h,4rem)+2.75rem)]` — it must clear the tab bar *as well as* the header, or it slides underneath the pinned tabs and its top edge is eaten. Verified: tab bar bottom 97px vs rail top 108px while scrolled.

Stock `Tabs` with `variant="line"` is **overridden**, because the shipped trigger draws a box border on all sides and its indicator sits 5px below the trigger (outside our border wrapper). The override (shared `tabTriggerClass` const) is a bottom rule only:

```
h-auto flex-none rounded-none border-0 pr-3 pl-0 pb-2.5 text-sm font-medium
text-muted-foreground after:bottom-0 after:h-0.5 after:bg-primary after:opacity-0
hover:text-foreground data-active:border-0 data-active:bg-transparent
data-active:text-foreground data-active:after:opacity-100
```

Active = `text-foreground` + a 2px `primary` underline under the label only (not the full tab-list width).

**The shared `pr-3 pl-0` is deliberate.** The original symmetric `px-3` indented every tab label 12px from the container edge while the underline (`after:inset-x-0`) still began at that edge, and the stats line above also began there — so the label, its own underline and the stats did not share an edge. Removing the left padding aligns all three. The right padding stays so consecutive tabs keep a 12px gap.

## 4. Content

**Intro card** (`profile.intro`) — bio, location, joined date. This is exactly the factual content the header gave up. One card, not a stack: "Intro" + "Details" would be two boxes holding one box of information. `size="sm"`, sticky on `lg`, above the feed on mobile. Uses the current language's `bio` / `bioKm` and `location` / `locationKm`.

**My Posts** — one post per row, full width, the way Facebook reads. Derived, never duplicated: `postsByHandle(profile.handle)` filters the existing `feedPosts` by author handle. Cards are `FeedCard full` in a `flex flex-col gap-3`.

The `full` card reorders for the reading order a single column needs: **author + timestamp → title → description → location → photo → actions**. The image is `16:9` (not 4:3) so a post stays roughly one screen tall instead of two; the compact home-grid card keeps photo-first at `16:9`. Same component, one boolean — the two orders are genuinely different, so a variant beats forcing one shape everywhere.

Empty state: dashed border, muted icon circle, title, one-line body, `Explore places` outline button → `/place`.

**Saved Plans** (owner only) — a muted note card up top (`bg-muted/40`, lock icon, "Only you can see your saved plans.") then `PlanCard` in `grid-cols-1 sm:grid-cols-2`. The note is the honest bit: it explains the privacy rule instead of assuming the badge did.

Empty states are the same component for both tabs — title, body, single exit action. No illustrations.

## 5. Edit profile dialog

Same responsive treatment as `design/auth.md`: a **full-screen sheet below `sm`**, a `max-w-[460px] rounded-2xl` dialog above it. Opened from the header CTA on the profile, and again from Settings → Profile (one component, used twice).

```
┌───────────────────────────────────────────┐
│ Edit profile                          ✕   │
│ This is how other travelers see you.      │
│ (avatar)  [ 🖼 Change photo ] [ 🗑 Remove ]│
│           JPG or PNG, square works best.  │
│                                           │
│ Display name                              │
│ [ Dara                            ]       │
│ Handle                                    │
│ [ @  dara                         ]       │
│ 3–20 characters: letters, numbers, …      │
│ Bio                          46/160       │
│ [ Thrift hunter | Vintage lover   ]       │
│ [                                  ]      │
│ Location                                  │
│ [ ភ្នំពេញ កម្ពុជា                  ]       │
│                                           │
│              [ Cancel ] [ Save changes ]  │
└───────────────────────────────────────────┘
```

| Field | Rule | Copy |
| :--- | :--- | :--- |
| Display name | non-empty | "Name can't be empty." |
| Handle | `/^[a-z0-9_]{3,20}$/`, unique across `profiles` | "Use 3–20 lowercase letters, numbers or underscores." / "That handle is already taken." |
| Bio | ≤ 160 chars, live counter turns `text-destructive` past the limit | "Keep your bio under 160 characters." |
| Location | free text, optional | — |

- Errors use `Field data-invalid` + red border; inline `FieldError` is **`hidden sm:block`** — on a phone the field shows red and the dialog height stays fixed (auth.md rule).
- Handle input is an `InputGroup` with a muted `@` addon, so the stored value never carries the prefix.
- Field error clears on the next keystroke in that field.
- Save: button disabled with "Saving…" for ~500ms (prototype stand-in for the API), then a **success toast** — "Profile updated / Your changes are now visible on your profile." — and the dialog closes.
- Cancel / Esc / backdrop close without saving. Values are seeded from the profile on open, so a cancelled edit leaves nothing behind.
- Bio and location are edited in the **current language only** (`language === "km"` writes `bioKm`/`locationKm`). The other locale's copy is untouched — see open questions.

## 6. Entry points

- **Header (signed in):** the Login/Register pair collapses into an avatar `DropdownMenu` → My profile · Settings · Sign out. It is the only place the account area is exposed, and it is identical on desktop and mobile (`size="sm"` on mobile).
- **Feed cards:** the author row is a `<button>` → that author's public profile. **Signed out, it opens the Login dialog instead** — browsing authors is a signed-in feature, and a dead profile page for an anonymous visitor is worse than an honest prompt.
- Signed-out + `/profile` with no handle → `NotBuiltPage`.

## 7. Tokens used

No new colours, no hardcoded hex, no stock cover photo. `bg-linear-to-br from-secondary to-primary/25` for the cover (the token palette dresses the header; we do not invent a photo for a user), `background` for the header's ground and the avatar seam, `primary` / `text-primary-foreground` for the CTA and the active tab underline, `primary/25` inside the cover gradient, `secondary` / `text-secondary-foreground` for avatar fallbacks and the `Only you` badge, `muted` / `muted-foreground` for stats labels, empty-state icon circles and the private note, `border` / `text-border` for the tab hairline and the `·` separators, `background/95` + `backdrop-blur` for the pinned tab bar, `destructive` for the bio over-limit counter (and Settings' sign-out button). Radius: `rounded-xl` on the Intro/note cards only (the header is square), `rounded-lg` inputs/buttons, `size-20/28` avatar. Khmer paragraphs get `leading-relaxed` at ≥14px; nothing uses uppercase or letter-spacing.

## 8. What was deliberately not taken from Facebook

Friends/requests, Story, Reels, the post composer, filter chips on Posts, the `⋯` overflow menu, cover-photo editing, and a Photos tab. Each needs a feature TvNa does not have, and a tab that leads nowhere is worse than a missing tab. Photos in particular would be a duplicate of the posts grid.

Also skipped: **viewport-edge bleed** for the cover. Facebook's runs to the window edge; ours runs to the column edge, because true bleed needs negative margins inside the shell's padded `<main>` and at 390px would buy 16px per side for a fragile layout.

## 9. Open questions for build

1. **Bilingual profile fields.** Editing in Khmer writes only `bioKm`/`locationKm`, so a Khmer edit and an English edit can diverge permanently. Real product needs either a single source field translated by the backend, or a bilingual editor.
2. Avatar change/remove are **inert buttons** — no upload endpoint, no local preview yet. Wire to a real uploader or drop them.
3. Handle change has no redirect story: `/profile/@old` (once URLs exist) must resolve or 404 honestly.
4. Follow is local state only — no counts move, and the four follow toast keys were removed rather than left dead.
5. Profile URLs are not real URLs yet; `profileHandle` lives in `App.tsx`. Routing to `/u/:handle` is a shell change.
6. Post cards on a profile open nothing (no post-detail screen exists).
7. Sticky tabs assume no ancestor sets `overflow` other than `visible` — that would silently disable stickiness. Checked today against `AppShell`; keep it true if the shell gains a scroll container.
