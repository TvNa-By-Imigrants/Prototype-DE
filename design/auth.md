# Auth Screens — Login, Register & Logout Confirmation (`DE-501`)

**Status:** Design hand-off, implemented as a working prototype.
**Form:** a **modal dialog**, not a route. Opened from the header's Login / Register buttons; there is no `/auth` URL. State lives in `App.tsx` (`authMode`), so the dialog closes on Esc, backdrop click or ✕ and the page underneath is never navigated away from.
**Errors:** a `toast` (Base UI `toast.add`) plus the red field treatment — no inline banner.
**Files:** `src/components/page/auth/auth-dialog.tsx`, `src/components/ui/toast.tsx`, `src/i18n/{en,km}.ts` (`auth.*`), header + `App.tsx` wiring.

---

## 1. Layout

Reference: **Trip.com sign-in** (`trip.com/account/signin`). The pattern that makes it read as trustworthy rather than a marketing page: *one* narrow card, nothing competing with it. No hero photo, no stats, no avatars, no tabs. TvNa keeps its own tokens and Khmer copy, and adds the fields Trip.com doesn't need (full name, confirm password, terms).

The card is now a **dialog** over the current page. Same component both modes; only the heading, fields and footer link swap.

### Desktop (`sm` and up)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ page behind — dimmed, blurred backdrop, unchanged shell visible          │
│                    ┌───────────────────────────────────┐                 │
│                    │ (TvNa mark) TvNa              ✕   │  max-w-[420px]  │
│                    │         Welcome back              │  rounded-2xl    │
│                    │  Sign in to save places…          │  border         │
│                    │                                   │                 │
│                    │  Email                            │                 │
│                    │  [ you@example.com          ]     │                 │
│                    │  Password            Forgot?      │                 │
│                    │  [ ••••••••              👁 ]      │                 │
│                    │  ☑ Remember me                    │                 │
│                    │  [        Sign in        ]        │  44px, full     │
│                    │  ───────────── or ─────────────   │                 │
│                    │  [ G Google ] [ f Facebook ]      │                 │
│                    │  Don't have an account?  Sign up  │                 │
│                    ├───────────────────────────────────┤                 │
│                    │ Default·Require·Wrong·Duplicate   │  preview strip  │
│                    └───────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────┘
```

Card is `max-w-[420px]`, `rounded-2xl`, 1px `border`, `shadow-sm`. The dialog's own `max-h-[calc(100vh-2rem)] overflow-y-auto` stays as a safety net, so a very short desktop window scrolls *inside* the card instead of clipping it.

### Mobile (`< sm`)

Full-screen sheet, **never scrolls in the default state**:

```
┌─────────────────────────────────────────┐
│ Welcome back                         ✕  │  heading + close only
│ Sign in to save places and plan…        │  (logo lockup is hidden)
│ Email                                   │
│ [ you@example.com             ]         │
│ Password                 Forgot?        │
│ [ ••••••••                   👁 ]        │
│ ☑ Remember me                           │
│ [           Sign in          ]          │
│ ────────────── or ──────────────        │
│ [ G Google ] [ f Facebook ]             │
│ Don't have an account?  Sign up         │
│ ⚠ toast (bottom, above the buttons)     │  auto-dismiss 6s
└─────────────────────────────────────────┘
```

`max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-0` — the sheet owns the viewport, so the page behind it cannot scroll and the sheet has no scrollbar of its own. Register (name, email, password, confirm, terms, submit) fits at **390×667** with the toast showing; verified.

Mobile trims, all `sm:`-prefixed back to the desktop values: `p-4`, `gap-3`, `gap-2.5` between fields, no logo lockup, and **inline field errors are hidden** (the red border + label carry the state; the toast carries the text). The preview strip is `hidden sm:grid` — it must never cost vertical space on a phone.

Register adds: Full name (above Email), Confirm password (with its own eye toggle, below Password), and the terms checkbox. Login adds Remember me + Forgot password and drops the rest.

Ordering note: primary email/password form first, social providers **below** the divider. That is Trip.com's order and it keeps the fastest path on top; the previous version put social buttons first, which pushed real fields below the fold on mobile.

## 2. Field anatomy

| Part | Component | Notes |
| :--- | :--- | :--- |
| Field wrapper | `Field` + `data-invalid` | Turns the label and border red in one attribute |
| Label | `FieldLabel` | 14px, `font-medium`, `text-foreground` |
| Input | plain `Input` | 44px (`h-11`), `rounded-lg`, `px-3`. No leading icons — Trip.com's fields are unlabelled-inside and it reads cleaner at this width |
| Password toggle | native `<button>` absolutely positioned in a `relative` wrapper | `EyeIcon` ⇄ `EyeOffIcon`, 44px hit target (`w-11`), `aria-pressed`, `aria-label` = show/hide password. `pr-11` on the input so text never runs under it |
| Field error | `FieldError` | 14px `text-destructive`, `role="alert"`. **`hidden sm:block`** — on a phone the toast says it, the red field shows it |
| Global error | `toast.add({ type: "error" })` | From `src/components/ui/toast.tsx`; requires the `Toaster` mounted in `App.tsx`. Viewport is `z-[60]` so it paints over the dialog's own `z-50` backdrop |
| Social buttons | `Button variant="outline"` | Full width, stacked, brand mark `<img>` + "Continue with …" |
| Divider | `h-px` rules + "or" | Plain text, not a sentence — sentence-length dividers truncate on Khmer |

## 3. Validation states

| State | Trigger | Field treatment | Toast |
| :--- | :--- | :--- | :--- |
| **Empty / required** | Submit with a blank field | `data-invalid` + "This field is required." | "Check your details" — some fields are missing or invalid |
| **Invalid email** | Email fails `x@y.z` | Same, "Enter a valid email address." | same generic toast |
| **Short password** | Register password < 8 chars | "At least 8 characters." | same generic toast |
| **Mismatch** | Confirm ≠ Password | Confirm field only | same generic toast |
| **Terms unchecked** | Register submit | `data-invalid` on the checkbox field | same generic toast |
| **Incorrect password** | Server rejects credentials | Password field + "Incorrect password" | **"Incorrect password"** — "The password you entered doesn't match this email. Try again or reset it." |
| **Duplicate email** | Register with an existing email | Email field + "That email is already registered" | **"That email is already registered"** — "An account with this email already exists. Sign in instead, or use another email." |
| **Submitting** | Valid submit | Button disabled, label "Please wait…" | — |

Toasts use `priority: "high"` (announced urgently) and `timeout: 6000`. The viewport sits bottom-right on desktop and bottom-centred on mobile — on a phone it must clear the submit button, which the sheet's own layout already guarantees since the toast is `fixed inset-x-4 bottom-4` over the social row, not the form.

Rules that keep it calm:
- A field error clears on the next keystroke in that field; a new toast replaces the previous one (Base UI stacks them, so fire one per submit, not one per field).
- Only one toast per failed submit — it lists the category, field messages carry the detail.
- `aria-invalid` mirrors `data-invalid` so the state is announced, not just coloured.
- Colour is never the only signal: icon + text + red border.

### Design-preview control (prototype only)

A dashed strip pinned to the **foot of the card**: `Default · Require fields · Wrong password · Duplicate email`. Each chip seeds the matching error state (fields + toast) so a reviewer can see all four without typing. **`hidden sm:grid`** — it is desktop-only, because on a phone those 30px are the difference between fitting 667px and scrolling. **It is a design-review aid — delete it (and `previewStates`, `applyPreview`, `seedEmail`) when the real API lands.**

## 4. Logout confirmation

`Dialog` (Base UI), centred, `max-w-sm`, default `rounded-xl`, `bg-card` background. Unlike the auth dialog this one is not full-screen on mobile — it is short enough to stay a card.

```
┌─────────────────────────────────────────┐
│ ⤴  (in a soft danger-tinted circle)  ✕  │   ← destructive-tinted icon, not a red fill
│ Sign out of TvNa?                       │
│ Your saved places and trip plans stay   │
│ on your account. You can sign back in   │
│ any time.                              │
│                                         │
│        [ Stay signed in ]  [ Sign out ] │   ← footer flips to column-reverse on mobile
└─────────────────────────────────────────┘
```

- Opened from the header: once signed in, Login/Register collapse into a single **Sign out** button.
- Confirm → back to a signed-out header and the Login screen. Cancel / Esc / backdrop → stays signed in.
- Safe default first in the markup, destructive action last; `variant="destructive"` is a tinted fill, not a solid red block.
- Mobile: full-width stacked buttons, destructive on top, cancel below.
- Confirming signs out **and reopens the Login dialog** — the user's next intent after signing out is almost always signing back in (or switching account).

## 5. Copy (km / en)

All strings live under `auth.*` in `src/i18n/en.ts` and `src/i18n/km.ts` — 45 keys, both languages complete. Khmer uses ≥14px and relaxed line-height on the secondary paragraph (`language === "km" && "leading-relaxed"`), per `Design.md`. No `uppercase` or letter-spacing anywhere in this screen, so Khmer never needs a special case.

## 6. Tokens used

No new colours, no hardcoded hex. `primary` for the submit button (`text-primary-foreground`; the theme has **no** `primary-button` / `on-primary` / `primary-strong` utilities — don't reach for them), `secondary-foreground` for links (never small text in `primary`), `destructive` / `destructive/10` / `/35` for errors and the logout icon, `muted-foreground` for secondary copy and placeholders, `border` for the card edge, inputs and dividers, `card` for the card surface, `muted/30` for the preview strip. The toast uses the stock shadcn surface (`bg-popover`, `text-popover-foreground`, `border`, `shadow-lg`) plus `text-destructive` for the error icon — no new colours. Radius: `rounded-2xl` card, `rounded-lg` inputs and buttons, 44px controls. Shadow: `shadow-sm` on the card only — the page background and the card border do the separating work.

That is the whole token story. The previous direction added a navy photo overlay, a layered card shadow, `rating` stars and `success` ticks; all of that is gone with the hero panel.

## 7. Open questions for build

1. Real API contract for login/register — error codes must map onto `auth.errIncorrectPassword` / `auth.errDuplicateEmail`.
2. Toast copy is duplicated from the field copy. If the copy diverges, the toast becomes the only explanation on mobile (inline errors are hidden there) — keep them in sync.
3. Forgot-password flow is a link with no destination yet.
4. Terms & Privacy links are inline text, no routes.
5. Auto dark mode is still not wired (pre-existing gap in `Design.md`), but the auth screens already respond to `.dark`.
