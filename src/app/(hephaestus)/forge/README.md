```markdown
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
│   │   │   └── page.tsx              # → REDIRECT to /observatory/schema
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
├── careers/
│   └── page.tsx                      # The Calling (/careers)
├── contact/
│   └── page.tsx                      # The Hearth Call (/contact)
├── donate/
│   └── page.tsx                      # The Offering (/donate)
├── press/
│   └── page.tsx                      # The Scroll (/press)
├── privacy/
│   └── page.tsx                      # The Covenant (/privacy)
├── terms/
│   └── page.tsx                      # The Agreement (/terms)
├── transparency/
│   └── page.tsx                      # The Ledger (/transparency)
└── vision/
    └── page.tsx                      # The Prophecy (/vision)
```

---

## 🗺️ Page Status

### The Forge (Documentation)

| Page | Route | Status | Notes |
|------|-------|:------:|-------|
| Forge Hub | `/forge` | ✅ | Tabbed catalog — Architecture, Business, Guides, Sanctuary |
| Auth Flow | `/forge/architecture/auth-flow` | ✅ | Magic link auth documentation |
| Database Schema | `/forge/architecture/database-schema` | 🔀 | Redirect to `/observatory/schema` |
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
| The Calling | `/careers` | ⏳ | Not yet tackled |
| The Hearth Call | `/contact` | ✅ | Contact form |
| The Offering | `/donate` | ✅ | Donation page |
| The Scroll | `/press` | ✅ | Press kit |
| The Covenant | `/privacy` | ✅ | Privacy policy |
| The Agreement | `/terms` | ✅ | Terms of service |
| The Ledger | `/transparency` | ✅ | Financial transparency |
| The Prophecy | `/vision` | 🔀 | → Redirect to `/observatory/prophecy` |

---

## 🔀 Redirects Needed

| From | To | Reason |
|------|----|--------|
| `/forge/architecture/database-schema` | `/observatory/schema` | Schema explorer moved to Mnemosyne |
| `/vision` | `/observatory/prophecy` | Vision merged into Observatory |
| `/docs/*` | `/forge/*` | Renamed from docs to forge |

---

## 🏛️ Migration: `docs` → `forge`

The folder `src/app/(hephaestus)/docs/` has been renamed to `src/app/(hephaestus)/forge/`. All imports within those pages that reference `docs` paths must be updated.

**Next.js redirect in `next.config.js`:**
```javascript
async redirects() {
  return [
    {
      source: '/docs/:path*',
      destination: '/forge/:path*',
      permanent: true,
    },
    {
      source: '/forge/architecture/database-schema',
      destination: '/observatory/schema',
      permanent: true,
    },
    {
      source: '/vision',
      destination: '/observatory/prophecy',
      permanent: true,
    },
  ];
}
```

---

## 🎨 Components Used

**Documentation Components:**
- `DocsHero` — `src/components/asgard/domains/hephaestus/docs/DocsHero.tsx`
- `DocsContent` — `src/components/asgard/domains/hephaestus/docs/DocsContent.tsx`
- `StepCard` — `src/components/asgard/domains/hephaestus/onboarding/StepCard.tsx`
- `CodeBlock` — `src/components/asgard/domains/hephaestus/docs/CodeBlock.tsx`
- `FlowDiagram` — per-section flow diagrams

**Shared (from other layers):**
- `Card` (runes)
- `Tabs` (vegvisir) — for the Forge hub catalog
- `Button` (yggdrasil)
- `Badge` (runes)
- `Form`, `FormField`, `Input`, `Select`, `Switch` (forging) — for contact and settings
