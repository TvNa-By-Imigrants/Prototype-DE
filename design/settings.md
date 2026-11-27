# Account Settings (`DE-502`)

**Status:** Design hand-off, implemented as a working prototype.
**Form:** a **route** (`/settings`), reached from the header avatar menu. Wide single column, no modal.
**Files:** `src/components/page/settings/settings-page.tsx`, the shared `EditProfileDialog`, `src/i18n/{en,km}.ts` (`settings.*`), `App.tsx` wiring.

---

## 1. Principle: only what is real

Three sections. Everything on the page does something today or says why it can't. There is no "Notifications", no "Privacy", no "Connected accounts" row with a chevron leading nowhere — those get added when they exist, not as scaffolding.

| Section | Contains |
| :--- | :--- |
| **Profile** | avatar + name + handle preview, bio, Edit profile button |
| **Account** | email (with "contact support to change" note), account type, Sign out |
| **Language & appearance** | language toggle, light/dark toggle |

Reference: the **GitHub / Linear settings** shape — a left section index on desktop, cards on the right, each card headed by a title and one line of prose that says what the section is for. The prose is the whole difference between a settings page that feels designed and a list of labels.

## 2. Layout

### Desktop (`lg` and up)

```
┌───────────────────────────────────────────────────────────────────┐
│ Account settings                                                  │
│ Manage your profile, account and how TvNa looks to you.           │
│                                                                   │
│ ┌────────────┐  ┌───────────────────────────────────────────────┐ │
│ │ Profile    │  │ Profile                                       │ │
│ │ Account    │  │ How you appear to other travelers.            │ │
│ │ Language…  │  │ (avatar) Dara                                 │ │
│ │            │  │          @dara                                │ │
│ │ sticky     │  │ ───────────────────────────────────────────── │ │
│ │ top-24     │  │ Thrift hunter | Vintage lover  [Edit profile] │ │
│ │            │  └───────────────────────────────────────────────┘ │
│ │            │  ┌───────────────────────────────────────────────┐ │
│ │            │  │ Account                                       │ │
│ │            │  │ Your sign-in details.                         │ │
│ │            │  │ ✉ Email  dara@example.com                     │ │
│ │            │  │          Contact support to change your email.│ │
│ │            │  │ ───────────────────────────────────────────── │ │
│ │            │  │ Account type  Traveler       [→ Sign out ]    │ │
│ │            │  └───────────────────────────────────────────────┘ │
│ │            │  ┌───────────────────────────────────────────────┐ │
│ │            │  │ Language & appearance                         │ │
│ │            │  │ Change the app language and theme.            │ │
│ │            │  │ Language   [ ភាសាខ្មែរ | English ]             │ │
│ │            │  │ ───────────────────────────────────────────── │ │
│ │            │  │ Theme      [ ☀ Light | ☾ Dark ]               │ │
│ │            │  └───────────────────────────────────────────────┘ │
│ └────────────┘  └───────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

- Page column `max-w-4xl`; the grid is `lg:grid-cols-[200px_1fr]` with `lg:gap-8`. The section index is `lg:sticky lg:top-24 lg:self-start` — it clears the sticky header and stops before the footer.
- Each card is `scroll-mt-24` so an anchor jump doesn't land under the header.
- The index is plain `<a href="#id">` links, not tabs: three sections fit on one scroll, and tabs would hide the answer to "where do I change the language?" behind a click.

### Mobile (`< lg`)

```
┌─────────────────────────────────────┐
│ Account settings                    │
│ Manage your profile, account…       │
│ ┌─────────────────────────────────┐ │
│ │ Profile                         │ │
│ │ How you appear to other…        │ │
│ │ (avatar) Dara                   │ │
│ │          @dara                  │ │
│ │ ─────────────────────────────── │ │
│ │ bio…              [Edit profile]│ │
│ └─────────────────────────────────┘ │
│ ┌ Account ────────────────────────┐ │
│ │ …                               │ │
│ └─────────────────────────────────┘ │
│ ┌ Language & appearance ──────────┐ │
│ │ …                               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

No index (it would be three links pointing at content already on screen), cards stacked with `gap-4`. Verified at **390×844** — nothing overflows, both toggle groups stay on their own row.

## 3. Section anatomy

| Part | Component | Notes |
| :--- | :--- | :--- |
| Card | `Card` | Stock surface, `id` + `scroll-mt-24` for the anchors |
| Heading | `CardTitle` | Section name only — no decorative icon |
| Prose | `CardDescription` | One sentence, `muted-foreground`. Khmer gets `leading-relaxed` via the page-level `language === "km"` check |
| Rows | `flex flex-wrap items-center justify-between gap-3` | `flex-wrap` is load-bearing: Khmer labels are much wider than English and must be allowed to drop to their own line instead of squeezing the control |
| Splitter | `Separator` | Between the identity block and the actions, never between each row |
| Language / theme | `ToggleGroup variant="outline"` | Two mutually exclusive segments. `value` is an array, `onValueChange` validates to `"km" \| "en"` / `"dark" \| "light"` before applying |
| Sign out | `Button variant="destructive"` | Tinted, not a solid red block. Opens the shared `LogoutDialog` (see `design/auth.md` §4), it does not sign out on the first click |

## 4. Behaviour

- **Language** writes through the i18n provider and re-renders the entire app immediately. The page copy, the section index and the toggle labels themselves all switch in place — this is the control's own proof that it works.
- **Theme** toggles `.dark` on `<html>`, and also persists `localStorage.theme`. The write is wrapped in `try/catch` because private-mode browsers throw on `localStorage` — the toggle must still work, just without memory. Initial state is read from `document.documentElement.classList`, so the control reflects reality rather than a second source of truth.
- **Edit profile** opens the same dialog as the profile page, seeded from the current profile, and writes back through `onSaveProfile` — one edit surface, two entry points, no divergence.
- **Email** is read-only text with an honest explanation, not a fake input. `dara@example.com` is hardcoded prototype data.
- **Sign out** confirms first (safe by default: "Stay signed in" is the first button, and the dialog explains that plans stay on the account).

## 5. Tokens used

No new colours, no hardcoded hex. Card surfaces and edges come from the stock `Card`/`Separator`/`Toggle` components; `muted-foreground` for prose, labels and the email note; `foreground` for values; `secondary` / `text-secondary-foreground` for the avatar fallback; `destructive` (tinted) for sign out only. Layout is plain Tailwind grid/flex — no new spacing scale. Khmer prose is ≥14px with `leading-relaxed`; no uppercase, no letter-spacing, so no language special cases beyond line-height.

## 6. Open questions for build

1. Language and theme preferences are **not persisted server-side**. Language resets with the session; theme persists locally per browser. Real accounts need both stored on the user record.
2. Auto dark mode (system preference) is still not wired — `Design.md` gap, out of scope here. The toggle is explicit light/dark only, which is why there is no "System" option.
3. Email change is a support ticket. If self-serve is wanted, it needs a verification flow (send code to new address), not just an editable field.
4. Account type ("Traveler") is a display-only row. Whether hosts/business accounts ever exist is a product decision.
5. Settings has no route-level deep link (`/settings#appearance` works via anchor, but the app uses local `active` state, not a router).
6. No notification, privacy or session-management sections exist — deliberately, per §1.
