# 🏗️ HEPHAESTUS — The Forge

> *Feeling: Intelligent, transparent, powerful, sacred*

The Forge is where the Sanctuary's infrastructure becomes visible. Documentation, architecture guides, business plans, and the living policies that govern the community. Hephaestus crafts the tools that make sovereignty possible — and shows every visitor exactly how they work.

---

## 📂 Directory Structure

```
src/app/(hephaestus)/
│
├── forge/                            # The Forge — documentation hub
│   ├── page.tsx                      # The Forge — catalog of all documents
│   ├── architecture/
│   │   ├── auth-flow/
│   │   │   └── page.tsx              # Authentication Flow
│   │   ├── database-schema/
│   │   │   └── page.tsx              # → in-page redirect to /observatory/schema
│   │   └── residual-system/
│   │       └── page.tsx              # Residual System
│   ├── business/
│   │   ├── ecosystem/
│   │   │   └── page.tsx              # Financial Ecosystem
│   │   └── plan/
│   │       └── page.tsx              # Business Plan
│   └── guides/
│       ├── creator-onboarding/
│       │   └── page.tsx              # Creator Onboarding
│       ├── neurodivergent-ux/
│       │   └── page.tsx              # Neurodivergent UX
│       └── vendor-onboarding/
│           └── page.tsx              # Vendor Onboarding
│
├── about/
│   └── page.tsx                      # The Origin (/about)
├── accessibility/
│   └── page.tsx                      # The Welcome (/accessibility)
├── calling/
│   └── page.tsx                      # The Calling (/calling — was /careers; renamed 2026-07-31, KP's ⚛ ruling: no company, no careers)
├── contact/
│   └── page.tsx                      # The Hearth Call (/contact)
├── donate/
│   └── page.tsx                      # The Offering (/donate)
├── press/
│   └── page.tsx                      # The Scroll (/press)
├── privacy/
│   └── page.tsx                      # The Covenant (/privacy)
├── sanctuary/
│   └── page.tsx                      # The Sanctuary (/sanctuary)
├── terms/
│   └── page.tsx                      # The Agreement (/terms)
├── transparency/
│   └── page.tsx                      # The Ledger (/transparency)
├── vision/
│   └── page.tsx                      # The Prophecy (/vision)
│
└── REALM-BUS.md                      # The realm's standing tabletop
```

---

## 🗺️ Page Status

### The Forge (Documentation)

| Page | Route | Status | Notes |
|------|-------|:------:|-------|
| Forge Hub | `/forge` | ✅ | Tabbed catalog — Architecture, Business, Guides, Sanctuary |
| Auth Flow | `/forge/architecture/auth-flow` | ✅ | Magic link auth documentation |
| Database Schema | `/forge/architecture/database-schema` | 🔀 | In-page redirect to `/observatory/schema` |
| Residual System | `/forge/architecture/residual-system` | ✅ | Value flow documentation |
| Financial Ecosystem | `/forge/business/ecosystem` | ✅ | Two-stream economic model |
| Business Plan | `/forge/business/plan` | ✅ | Projections, pillars, economics |
| Creator Onboarding | `/forge/guides/creator-onboarding` | ✅ | Step-by-step creator guide |
| Neurodivergent UX | `/forge/guides/neurodivergent-ux` | ✅ | Design philosophy |
| Vendor Onboarding | `/forge/guides/vendor-onboarding` | ✅ | Step-by-step vendor guide |

### Sanctuary Pages (Static Content)

| Page | Route | Status | Notes |
|------|-------|:------:|-------|
| The Origin | `/about` | ✅ | Sanctuary origin story |
| The Welcome | `/accessibility` | ✅ | Accessibility commitment |
| The Calling | `/calling` | ✅ | The truth season, 2026-07-31 — no company, no careers: just us and the community that arrives (KP's ⚛ ruling). Fabricated team retired; voices wait for real ones; the repo set shows at the Nexus Gateway |
| The Hearth Call | `/contact` | ✅ | Contact form → `contact_submissions` (iris) |
| The Offering | `/donate` | ✅ | Donation page |
| The Scroll | `/press` | ✅ | Press kit |
| The Covenant | `/privacy` | ✅ | Privacy policy |
| The Sanctuary | `/sanctuary` | ✅ | Eight-section showpiece — hero, problem, pillars, economics, Acid Test, pathways, transparency, footer |
| The Agreement | `/terms` | ✅ | Terms of service |
| The Ledger | `/transparency` | ✅ | Financial transparency |
| The Prophecy | `/vision` | ✅ | Public manifesto (Four Pillars) — distinct from `/observatory/prophecy` by ruling, 2026-07-30 |

---

## 🔀 Redirects

| From | To | Status |
|------|----|--------|
| `/docs` and `/docs/*` | `/forge` and `/forge/*` | ✅ Installed in `next.config.ts` (2026-07-30) — the docs → forge rename's legacy addresses |
| `/forge/architecture/database-schema` | `/observatory/schema` | ✅ In-page `redirect()` — schema explorer lives in Mnemosyne |
| `/vision` | `/observatory/prophecy` | ❌ **Ruled off (KP's word "merge if logical," judged 2026-07-30): not logical — no merge, no redirect.** They are different organs sharing a word: `/vision` is the public manifesto (Four Pillars, static, for visitors); `/observatory/prophecy` is a sovereign's personal horizon (milestones, quests — live, logged-in). The merge idea came from crossed names (the prophecy page titles itself "The Vision"); flagged to mnemosyne's realm bus. Both pages stand. |

---

## 🏛️ Migration: `docs` → `forge` (completed)

The documentation hub was renamed from `src/app/(hephaestus)/docs/` to `src/app/(hephaestus)/forge/`. History of the seam, for the record:

- The rename originally swept seven sanctuary-wide pages (`accessibility`, `careers`, `contact`, `donate`, `press`, `transparency`, `vision`) *into* `forge/`, giving them unintended `/forge/` route prefixes. **Moved back to the realm root 2026-07-30 at KP's ruling** — their own header comments, this README's map, and the chrome's address book (`page_mapping.ts`) had root all along.
- Legacy `/docs/*` addresses redirect permanently to `/forge/*` via `next.config.ts`.
- In-app `/docs` links (SanctuaryHero, SanctuaryPathways) updated to `/forge` the same sitting.

---

## 🎨 Components Used

**Documentation Components:**
- `DocsHero` — `src/components/asgard/domains/hephaestus/forge/DocsHero.tsx`
- `DocsContent` — `src/components/asgard/domains/hephaestus/forge/DocsContent.tsx`
- `StepCard` — `src/components/asgard/domains/hephaestus/onboarding/StepCard.tsx`
- `CodeBlock` — `src/components/asgard/domains/hephaestus/forge/CodeBlock.tsx`
- `FlowDiagram` — per-section flow diagrams

**Shared (from other layers):**
- `Card` (runes)
- `Tabs` (vegvisir) — for the Forge hub catalog
- `Button` (yggdrasil)
- `Badge` (runes)
- `Form`, `FormField`, `Input`, `Select`, `Switch` (forging) — for contact and settings
