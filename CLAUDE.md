# Birr — Personal Finance Tracker (Android)

> A friendly, warm-toned Android money app for Ethiopian users that **auto-reads bank & mobile-money SMS** (CBE, BOA, telebirr, M-PESA, Awash…) and turns them into categorized transactions. It tracks income/expense, shows a dashboard, and includes a full planner (budgets, bills, goals) plus analytics.
>
> This document is the build spec for Claude Code. It is derived from an approved hi-fi prototype. **Follow it precisely** — the visual system, data model, and screen behaviors below are the source of truth.

---

## 0. What we're building (in one paragraph)

A native-feeling Android app. The signature feature: the app reads transaction SMS on-device, parses out amount / merchant / direction / account, auto-categorizes it, and drops it into the activity feed — **fully automatic**, no manual entry required (though the user can edit categories and add transactions by hand). Around that sit a Dashboard, Transactions list, Planner (budgets + bills + goals), Analytics, Accounts, and Goals screens. Currency is **Ethiopian Birr (ETB)**, formatted `Br 12,500`.

---

## 1. Design directions (BUILD BOTH AS THEMES)

The prototype explored three color directions. **We are shipping directions B and C.** Implement them as two selectable themes over one identical layout/component system — do **not** fork the UI.

| Theme | Role | Surface | Primary (orange) | Ink |
|-------|------|---------|------------------|-----|
| **Bold Orange** (`bold`) | Light / default | `#FBFAF7` bg, `#FFFFFF` cards | `#D85C32` | `#1C1A18` |
| **Warm Dark** (`dark`) | Dark mode | `#1A1613` bg, `#262019` cards | `#E08A5E` | `#F4ECE2` |

The two themes must be **the same screens, same spacing, same components** — only color tokens change. Default to **Bold Orange**; **Warm Dark** is the dark-mode counterpart (wire it to the system dark-mode setting plus a manual toggle in settings).

> The signature trait of **Bold Orange** is the **big orange hero block** on the dashboard (`heroBg = primary`, white text). In **Warm Dark** the hero is a raised dark surface (`heroBg = #2D261F`) instead of orange. Everything else is identical.

### Design feel
Friendly & approachable, **Claude-style warm oranges**. Rounded everything (cards `20px`, hero `24px`, sheets `26px` top corners, FAB `20px`, pills `999px`). Soft shadows in light theme; hairline borders instead of shadows in dark theme. Generous whitespace, big tabular-nums numbers, no clutter. **No emoji, no fake bank logos** (use monogram avatars).

---

## 2. Design tokens

Single source of truth. In a native build these map to a theme object / Compose `MaterialTheme` or CSS custom properties.

### 2.1 Bold Orange (light, default)
```
bg            #FBFAF7   screen background
bgAlt         #F3F0EA
surface       #FFFFFF   cards, nav, sheets
surfaceAlt    #F8F5EF   inset blocks (raw SMS box)
ink           #1C1A18   primary text
sub           #857D74   secondary text
faint         rgba(28,26,24,0.07)   dividers / track
hairline      rgba(28,26,24,0.09)   borders
primary       #D85C32   brand orange — FAB, active nav, accents
primaryDeep   #BC4A24   pressed states
primarySoft   #FBE2D5   active-nav pill bg, soft fills
onPrimary     #FFFFFF   text/icon on primary
income        #3E8E4F   positive amounts (green)
incomeSoft    #E4F0E2
expense       #1C1A18   negative amounts = ink (NOT red)
navBg         #FFFFFF
heroBg        #D85C32   ← big orange hero block
heroInk       #FFFFFF
heroSub       rgba(255,255,255,0.78)
chipBg        #F2ECE3
statusBarIcons  dark
```

### 2.2 Warm Dark
```
bg            #1A1613
bgAlt         #211C18
surface       #262019
surfaceAlt    #2D261F
ink           #F4ECE2
sub           #A89C8E
faint         rgba(244,236,226,0.08)
hairline      rgba(244,236,226,0.10)
primary       #E08A5E   glowing warm orange
primaryDeep   #C9744A
primarySoft   #3A2A20
onPrimary     #1A1613
income        #7CB97E
incomeSoft    rgba(38,48,36,0.25)
expense       #F4ECE2   = ink
navBg         #211C18
heroBg        #2D261F   ← raised dark surface (not orange)
heroInk       #F4ECE2
heroSub       #A89C8E
chipBg        #2D261F
statusBarIcons  light
```

### 2.3 Typography
- **UI font:** Plus Jakarta Sans (400/500/600/700/800). Big weights (700–800) for numbers and titles.
- **Monospace:** Space Mono — used **only** for the raw SMS text block, to make "this is the original message" legible.
- Scale (px): hero balance `38/800`, screen title `19/800`, section label `15.5/800`, card title `14/700`, body `13/600`, secondary `12.5/500`, caption `11.5/600`, micro-badge `9.5–10.5/800`.
- All money uses **tabular-nums** and letter-spacing `-0.2`.

### 2.4 Shape & elevation
- Radii: cards `20`, hero `24`, sheet top `26`, FAB `20`, icon buttons/monograms `11–14`, pills/progress `999`.
- Light theme: soft shadows — cards `0 1px 2px rgba(0,0,0,.04), 0 6px 16px rgba(0,0,0,.03)`; FAB `0 8px 20px primary@35%`.
- Dark theme: **no shadows** — use `1px solid hairline` borders on cards instead.

### 2.5 Spacing
8px base. Screen horizontal padding `16`. Card padding `14–16`. Scroll content bottom padding `96` (clears the nav + FAB). Gaps between stacked cards `12`.

### 2.6 Color helpers
- `fmt(n, {sign, decimals})` → `Br 12,500` / `+Br 4,500` / `−Br 850`. Minus is the unicode `−` (U+2212), plus only when `sign:true`. Default 0 decimals.
- `tint(color, surface, pct)` → soft background = `color-mix(in oklch, color pct%, surface)`. Category/brand chips use ~13–16% in light, ~24–26% in dark.

---

## 3. Information architecture

```
Bottom nav (5 slots): Home · Activity · [＋ FAB] · Planner · Insights
                       └ primary tabs reset the stack; secondary screens push onto it.

Home (Dashboard) ──► SMS Inbox      (bell icon, badge = # new SMS)
                 ├─► Analytics       ("Insights" link / nav)
                 ├─► Planner         ("Plan" link / nav)
                 ├─► Transactions    ("See all" link / nav)
                 ├─► Goals           ("All goals" link)
                 └─► Accounts        (from balance / accounts entry)

Tx Detail   = bottom sheet (tap any transaction row)
Add         = bottom sheet (FAB)
```

- **Primary tabs** (`home`, `transactions`, `planner`, `analytics`) reset the navigation stack.
- **Secondary screens** (`sms`, `accounts`, `goals`) push onto the stack and show a back chevron.
- **Sheets** (Tx Detail, Add) overlay the current screen; they don't navigate.

---

## 4. Screens (spec)

### 4.1 Dashboard (`home`) — the hub
Top-to-bottom:
1. **Greeting row** — avatar monogram (user initials, `AM`), "Good morning" + full name (`Abnet Melaku`), and a **bell IconBtn** on the right with a badge = number of new SMS. Tapping the bell → SMS Inbox.
2. **Balance hero** — the signature block. Shows "Total balance · June 2026", an eye (hide) icon, the summed balance across all accounts at `38/800`, then two inset stat tiles: **Income** (green, arrow-down icon) and **Spending** (arrow-up). In **Bold Orange** this whole block is orange with white text and a subtle circular highlight in the corner + orange glow shadow; in **Warm Dark** it's a raised dark surface.
3. **SMS auto-capture banner** — soft-orange button: scan icon + "**N new transactions read**" + "Auto-filed from CBE, M-PESA & telebirr SMS" + chevron. Taps → SMS Inbox. **This is the hero feature — keep it prominent, right under the balance.**
4. **"Where it went"** card — a **Donut** of category spend with center label "Spent / Br X", and a legend of the top 4 categories with %. "Insights" link → Analytics.
5. **Budgets** preview card — top 3 budgets by % used, each a label + `spent / limit` + progress bar (bar turns `primary` when over limit). "Plan" link → Planner.
6. **Recent activity** card — 4 most recent `TxRow`s. "See all" → Transactions.
7. **Goals** — horizontal scroll of goal cards (icon, %, name, progress bar, `saved / target`). "All goals" → Goals.

### 4.2 SMS Inbox (`sms`) — signature auto-parse screen
- Header "SMS Inbox" / "Auto-parsed from your banks" + back.
- **Privacy reassurance banner**: shield icon + "**Read on-device only**" + "We detect transaction texts and file them by category. Your messages never leave the phone." — **Required. Privacy is a core promise of the feature.**
- "Recently captured" list. Each item is a card:
  - Bank **Monogram** + merchant + "`{bank full name} · {time ago}`" + signed amount.
  - **Raw SMS** rendered verbatim in a `surfaceAlt` inset box, **Space Mono**, `11px` — shows the user exactly what was parsed.
  - **"Auto-filed as {category}"** chip (category color + icon) and a **"Change"** action (edit icon) to recategorize.
  - A confirm button that toggles "**Looks right**" → "**Added to activity**" (green check state). Tapping it files the item (local state).
- Tapping a parsed chip's edit / "Change" opens the Tx Detail sheet for editing category.

> **Parsing note for the implementer:** the SMS objects carry both the structured fields (`amount`, `merchant`, `cat`, `dir`, `bank`) and the original `raw` string. In the real app, an on-device parser produces the structured fields from `raw`. The mock data already has both — see §5. Build the real parser as a per-bank set of regex/format rules keyed by sender ID; each bank's SMS format differs (examples in §5.4).

### 4.3 Transactions (`transactions`)
Full activity feed. Provide: filter pills (All / Income / Expense, and/or by account), grouping by day (June 2026), each row = `TxRow` (category icon, merchant, bank label, an "SMS" badge when `parsed:true`, signed amount). Tapping a row → Tx Detail sheet.

### 4.4 Planner (`planner`) — budgets + bills + goals
"All of the above" planner:
- **Monthly budgets** by category (label, `spent / limit`, progress bar, over-limit emphasis in `primary`).
- **Upcoming bills / recurring** — name, category, amount, due date, cadence ("Monthly"), source account. (Rent, DStv, internet, gym in mock data.)
- **Savings goals** — entry points to the Goals screen.
- Consider a small **calendar / money-in-vs-out** affordance (the user asked for a calendar view of money in/out).

### 4.5 Analytics / Insights (`analytics`)
- **Income vs expense** grouped **BarChart** over the last 6 months (`HISTORY`).
- **Spending by category** Donut + ranked list with %.
- **Expense trend** smooth area **Spark** line.
- Month switcher; key stats (total in, total out, net, savings rate).

### 4.6 Accounts (`accounts`)
Aggregated accounts & wallets: each row = bank monogram, account name, masked number, type (Bank / Savings / Mobile wallet), balance. Sum = the dashboard hero balance. Entry to add/link an account (SMS-sender mapping).

### 4.7 Goals (`goals`)
Savings goals with target + saved + ETA + colored icon + progress. Add-goal affordance.

### 4.8 Add transaction (FAB → bottom sheet)
Manual entry: amount keypad, in/out toggle, category picker (the `CATEGORIES` set), account picker, merchant/note, date. Saves into the feed (`parsed:false`).

### 4.9 Tx Detail (tap row → bottom sheet)
Amount, merchant, category (editable — this is where "Change category" lands), account, date/time, and — when `parsed` — the original raw SMS shown in the Space Mono box. Edit category / delete.

---

## 5. Data model

Currency is integer **ETB** (no cents in mock; support decimals in real). All mock data is for one Addis Ababa user, **June 2026**.

### 5.1 Entities
```ts
User      { name, full, initials, month }
Account   { id, bank, name, number(masked), balance, type }
Category  { key, label, icon, color(oklch) }
Bank      { key, label, full, mono(1 char), color(oklch) }   // monogram, no logo
Tx        { id, d(day 1-30), t("HH:MM"), dir:'in'|'out', amount,
            cat, acct, merchant, parsed:bool, bank, raw?:string }
SmsInbox  { id, bank, time("2 min ago"), dir, amount, cat, merchant, raw }
Budget    { cat, limit, spent }
Bill      { id, name, cat, amount, due, every, acct }
Goal      { id, name, target, saved, color, icon, eta }
History   { m("Jan"), income, expense }   // 6 months
```

### 5.2 Categories (warm-leaning, shared chroma — keep these exact keys)
`food` Food & Dining · `groceries` Groceries · `transport` Transport · `shopping` Shopping · `bills` Bills & Utilities · `airtime` Airtime & Data · `health` Health · `fun` Entertainment · `transfer` Transfers · `rent` Rent & Home · `income` Income.
Colors are oklch with shared chroma/lightness so they harmonize — see prototype `theme.js` `CATEGORIES`.

### 5.3 Banks / services (monogram avatars)
`cbe` Commercial Bank of Ethiopia · `boa` Bank of Abyssinia · `telebirr` · `mpesa` M-PESA · `awash` Awash Bank · `cbebirr` CBE Birr wallet. Each has a 1-char monogram + brand-ish oklch color. **Never render fake official logos** — monogram tiles only.

### 5.4 Real bank SMS formats (for the parser)
Each bank/service phrases its SMS differently — the parser needs per-sender rules. Representative shapes from the mock data:
- **CBE:** `Dear {name}, your account 1000xxxx4789 has been debited ETB 850.00 on 09/06/2026 at SHOA SUPERMARKET BOLE. Current Balance ETB 42,850.00. Thank you for banking with CBE.`
- **M-PESA:** `Confirmed. ETB 78.00 paid to KALDIS COFFEE on 09/06/26 at 7:55 AM. New M-PESA balance is ETB 1,925.00. Ref QGR4T8KLP0.`
- **telebirr (out):** `You have transferred ETB 220.00 to FERES TECHNOLOGIES. Service fee ETB 0.00. Your telebirr balance is ETB 3,140.00. Ref CL8H2K9D.`
- **telebirr (in):** `You have received ETB 4,500.00 from TIGIST A (2519xxxx3321). Your telebirr balance is ETB 4,860.00. Ref CL2290KK.`
- **BOA (credit/salary):** `Your BOA account 0150xxxx2231 has been credited ETB 28,000.00 - SALARY ROHA TECH. Available balance ETB 71,400.00.`

Parser must extract: **direction** (debited/paid/transferred→out; credited/received→in), **amount**, **merchant/counterparty**, **balance** (to reconcile account), **ref**, **date/time**, and map sender→`bank`/`acct`. Then **auto-categorize** the merchant string (rules + editable overrides).

### 5.5 Derived values
- Dashboard total balance = Σ account balances.
- Income / Spending = Σ `TX` where `dir==='in' / 'out'`.
- Category donut = group `out` TX by `cat`, sorted desc.
- Budget ratio = `spent / limit`; `>1` ⇒ over (emphasize in `primary`).

---

## 6. Shared components (reuse everywhere)

| Component | Purpose |
|-----------|---------|
| `PhoneShell` / `StatusBar` | device frame + Android-style status bar (icons follow `statusBarIcons`) |
| `BottomNav` | 5-slot nav with center **FAB**; active item gets `primarySoft` pill + `primary` icon/label |
| `ScreenHeader` | back chevron + title + optional subtitle + right slot |
| `IconBtn` | square icon button with optional badge (used for the SMS bell) |
| `Card` | rounded surface; shadow in light, hairline border in dark |
| `Monogram` | bank avatar (1-char, tinted brand color) |
| `CatIcon` | category icon tile (tinted category color) |
| `Pill` | filter/segmented chip |
| `ProgressBar` | budget/goal progress |
| `Amount` | signed money, green when income, ink when expense, tabular-nums |
| `Donut` | spending ring with rounded segment caps + center slot |
| `BarChart` | grouped income/expense bars over months |
| `Spark` | smooth area sparkline (expense trend) |
| `Sheet` | bottom sheet (scrim + slide-up, `26px` top radius, grab handle) |
| `TxRow` | transaction list row (CatIcon + merchant + bank + SMS badge + Amount) |
| `SectionLabel` | section title + optional action link |

**Money color rule:** income = `income` green; expense = `ink` (NOT red). Only over-budget bars use `primary`.

---

## 7. Interaction & motion
- Sheets slide up `transform: translateY(100%→0)` over `~320ms cubic-bezier(.2,.8,.3,1)`, scrim fades.
- Progress bars animate width `~500ms`.
- Nav active-pill background transitions `~200ms`.
- FAB sits raised (`-16px`) above the nav bar with an orange glow.
- Keep motion subtle and physical; respect reduced-motion.

---

## 8. Tech stack (Expo / React Native)
- **Framework:** Expo (SDK latest) + React Native + **TypeScript (`strict`)**. Repo name: **`birr-finance`**.
- **Build:** EAS Build with a **custom dev client** — **not Expo Go** (Expo Go can't read SMS). `expo run:android` for local native builds.
- **Navigation:** Expo Router (or React Navigation) for the stack model in §3 — primary tabs reset the stack, secondary screens push.
- **Theme:** map §2 tokens to a JS theme object + `ThemeProvider`/`useTheme()`; `useColorScheme()` drives system dark mode + a manual toggle. See `docs/theme.md`.
- **SMS access (Android-only):** `RECEIVE_SMS` / `READ_SMS` via a **config plugin + native module / BroadcastReceiver** in the custom dev client. Parse on-device, persist with **`expo-sqlite`**. **Process and store SMS locally only — never upload raw messages** (the in-app privacy promise). Show a clear runtime-permission rationale. **iOS cannot read SMS** — that feature is Android-only; the rest of the UI can still run on iOS.
- **Charts:** hand-built with **`react-native-svg`** (donut/bars/spark) to keep the exact rounded look — see prototype.
- **Fonts:** `expo-font` — Plus Jakarta Sans (UI) + Space Mono (raw SMS only).
- **Validation:** **Zod** at all boundaries (parsed SMS, persisted rows).

> **Engineering conventions, project structure, tooling, and testing rules live in [`docs/conventions.md`](docs/conventions.md).** Theme tokens in [`docs/theme.md`](docs/theme.md); SMS parser spec in [`docs/parser.md`](docs/parser.md). Reusable Claude Code commands are in `.claude/commands/` (`/new-screen`, `/add-bank-parser`, `/component`, `/review`).

---

## 9. Build order
1. Theme system + tokens (both themes) + `fmt`/`tint` helpers.
2. `PhoneShell`, `BottomNav`, navigation stack, shared components (§6).
3. Mock data layer (§5) so screens render before the SMS pipeline exists.
4. **Dashboard** (the hub) → **SMS Inbox** (signature) → Transactions → Planner → Analytics → Accounts → Goals.
5. Tx Detail + Add sheets.
6. Real SMS receiver + per-bank parser (§5.4) + auto-categorizer, behind the same data interfaces.
7. Persistence (expo-sqlite, local), dark-mode toggle, permission flows.

> Scaffold each piece with the matching Claude Code command: `/component` for §6 primitives, `/new-screen` per screen, `/add-bank-parser` per bank, and `/review` before every PR.

---

## 10. Hard rules (do not violate)
- **ETB only**, formatted `Br 12,500`; unicode minus `−`; tabular-nums for all money.
- **Two themes, one UI.** Bold Orange default + Warm Dark. No layout divergence.
- **Expenses are ink-colored, income is green.** No red for normal spending.
- **No emoji. No fake bank logos** — monograms only.
- **SMS is parsed and stored on-device only.** Surface that promise in the UI.
- Rounded, warm, friendly, spacious — Claude-style oranges. No gradients-as-decoration, no clutter, no filler stats.
- Auto-categorization is automatic **but editable** everywhere a category appears.
