# Birr — Personal Finance Tracker

Friendly, warm-toned **Android** money app for Ethiopian users. It auto-reads bank &
mobile-money SMS (CBE, BOA, telebirr, M-PESA, Awash…), parses them on-device, and files
them as categorized transactions. Dashboard, planner (budgets/bills/goals), and analytics
on top. Currency: **Ethiopian Birr (ETB)**.

Built with **Expo + React Native + TypeScript**. Two themes, one UI: **Bold Orange** (light,
default) and **Warm Dark**.

## Docs
- **[`CLAUDE.md`](CLAUDE.md)** — the full build spec (design system, data model, screens). Source of truth.
- **[`docs/conventions.md`](docs/conventions.md)** — engineering & clean-code rules.
- **[`docs/theme.md`](docs/theme.md)** — theme tokens for both themes.
- **[`docs/parser.md`](docs/parser.md)** — on-device SMS parser spec.

## Getting started
```bash
pnpm install
pnpm exec husky init && echo "pnpm exec lint-staged" > .husky/pre-commit

# SMS reading needs a custom dev client (not Expo Go), Android only:
pnpm expo install expo-dev-client
eas build --profile development --platform android
pnpm expo start --dev-client
```

> Uses **pnpm**. An `.npmrc` pins `node-linker=hoisted` — required for Expo/Metro to
> resolve dependencies in a pnpm workspace. Don't remove it.

## Working with Claude Code
`CLAUDE.md` loads automatically. Reusable slash commands live in `.claude/commands/`:
`/new-screen`, `/add-bank-parser`, `/component`, `/review`.

Suggested first steps are in `CLAUDE.md` §9 (build order).

## Important constraints
- **ETB only**, formatted `Br 12,500`; income green, expense ink (never red); no emoji; monograms not logos.
- **SMS is parsed & stored on-device only** — never uploaded. This is a core privacy promise.
- SMS reading is **Android-only** (iOS forbids it) and requires the custom dev client.
