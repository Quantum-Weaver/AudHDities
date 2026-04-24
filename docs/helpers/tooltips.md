## 💬 **TOOLTIP COMPONENT: Overview**

A tooltip component is a **contextual hint system** that provides additional information when users hover or focus on an element. It is the **guide** of the interface—every icon, every button, every unfamiliar control can be explained through a tooltip.

**What it provides:**
- Multiple placement options (top, bottom, left, right)
- Variants for different contexts (default, dark, quantum)
- Delayed appearance for non-intrusive behavior
- Keyboard accessibility (focus triggers)
- Rich content support (not just text)

My beloved friend,

The system is beautiful. I'll now synthesize everything into a comprehensive guide that reflects the true architecture — types, constants, variants, and utilities as separate concerns, with the component consuming them all cleanly.

---

## 🧭 TOOLTIP COMPONENT SYSTEM — COMPLETE GUIDE

### Architecture Overview

```
tooltip.types.ts        →  All TypeScript interfaces, re-exports from Base UI
tooltip.constants.ts    →  Raw values: offsets, delays, sizing, class fragments
tooltip.variants.ts     →  CVA definitions: variant → Tailwind class mappings
tooltip.utils.ts        →  Logic: animation composition, arrow positioning, class merging
Tooltip.tsx             →  Component: imports all above, renders JSX, zero hardcoded values
```

**Principle:** Constants define *what*. Variants define *which styles*. Utilities define *how to compose*. Types define *the contract*. The component *assembles*.

---

### 📁 File Manifest

| File | Location | Purpose |
|------|----------|---------|
| `Tooltip.tsx` | `components/ui/` | Component JSX |
| `tooltip.types.ts` | `types/components/ui/` | All type definitions |
| `tooltip.constants.ts` | `lib/constants/components/ui/` | Sizing, offsets, delays, class fragments |
| `tooltip.variants.ts` | `lib/constants/components/ui/` | CVA variant definitions |
| `tooltip.utils.ts` | `utils/components/ui/` | Animation composers, class merging |

---

### 🎨 Variants Reference

| Variant | Background | Text | Border | Shadow | Use Case |
|---------|-----------|------|--------|--------|----------|
| `default` | `bg-foreground` | `text-background` | none | none | General hints |
| `dark` | `bg-deep-space` | `text-star-dust` | `border-white/10` | none | Technical info, toolbars |
| `light` | `bg-white` | `text-deep-space` | `border-white/20` | none | Light theme contexts |
| `quantum` | `bg-quantum-purple` | `text-white` | none | `shadow-quantum-purple/20` | Special features, sovereignty actions |
| `cosmic` | `bg-cosmic-blue` | `text-white` | none | `shadow-cosmic-blue/20` | Important guidance, navigation |
| `fire` | `bg-fire-base` | `text-white` | none | `shadow-fire-base/20` | Destructive actions, warnings |
| `sanctuary` | `bg-sanctuary-green` | `text-white` | none | `shadow-sanctuary-green/20` | Safe actions, confirmations |
| `council` | `bg-gold` | `text-deep-space` | none | `shadow-gold/20` | Governance, elevated privilege |

---

### 🔧 Placement Options

| Side | Arrow Position | Use Case |
|------|---------------|----------|
| `top` | `-bottom-2.5` | Default, above trigger |
| `bottom` | `top-1` | Below trigger, avoids top UI |
| `right` | `top-1/2! -left-1 -translate-y-1/2` | Right of trigger, common for icon hints |
| `left` | `top-1/2! -right-1 -translate-y-1/2` | Left of trigger, avoids right UI |

---

### 📦 Exports

**Components:**

| Export | Type | Description |
|--------|------|-------------|
| `TooltipProvider` | Component | Wraps app, provides tooltip context |
| `Tooltip` | Component | Root — manages open state |
| `TooltipTrigger` | Component | Element that triggers the tooltip |
| `TooltipContent` | Component | Floating content with animations |
| `DarkTooltip` | Component | Pre-configured dark variant |
| `QuantumTooltip` | Component | Pre-configured quantum variant |
| `CosmicTooltip` | Component | Pre-configured cosmic variant |
| `TooltipWithIcon` | Component | Icon trigger + tooltip composition |
| `TooltipWithShortcut` | Component | Label + kbd shortcut composition |
| `TooltipGroup` | Component | Container for multiple tooltips |

**Types (re-exported):**

| Type | Source | Description |
|------|--------|-------------|
| `TooltipVariant` | variants | Valid variant keys |
| `TooltipPlacement` | variants | Placement token values |
| `TooltipSide` | types | `'top' \| 'right' \| 'bottom' \| 'left'` |
| `TooltipAlign` | types | `'start' \| 'center' \| 'end'` |
| `TooltipGroupSpacing` | constants | `'SM' \| 'MD' \| 'LG'` |
| `TooltipPopupState` | types | Base UI Popup state for className functions |
| `TooltipProviderProps` | types | Provider props interface |
| `TooltipRootProps` | types | Root props interface |
| `TooltipTriggerProps` | types | Trigger props interface |
| `TooltipContentProps` | types | Content props interface |
| `TooltipWithIconProps` | types | Icon composition props |
| `TooltipWithShortcutProps` | types | Shortcut composition props |
| `TooltipGroupProps` | types | Group container props |

---

### 📋 Usage Patterns

#### Basic Setup

```tsx
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/Tooltip';

// Wrap your app once
<TooltipProvider delay={300}>
  <App />
</TooltipProvider>
```

#### Simple Tooltip

```tsx
<Tooltip>
  <TooltipTrigger>
    <button>Hover me</button>
  </TooltipTrigger>
  <TooltipContent>Helpful information appears here</TooltipContent>
</Tooltip>
```

#### Variant Shortcut

```tsx
import { QuantumTooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';

<QuantumTooltip>
  <TooltipTrigger>
    <button className="px-3 py-1 rounded bg-quantum-purple/20">
      Quantum Action
    </button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    This action increases your sovereignty score
  </TooltipContent>
</QuantumTooltip>
```

#### Explicit Variant

```tsx
<Tooltip variant="sanctuary">
  <TooltipTrigger>...</TooltipTrigger>
  <TooltipContent side="right" maxWidth={320} showArrow={false}>
    Sanctuary-confirmed action
  </TooltipContent>
</Tooltip>
```

#### Icon + Tooltip

```tsx
import { TooltipWithIcon } from '@/components/ui/Tooltip';
import { HelpCircle } from 'lucide-react';

<TooltipWithIcon
  icon={<HelpCircle className="h-4 w-4" />}
  content="Learn more about sovereignty scores"
  side="right"
  variant="quantum"
/>
```

#### Keyboard Shortcut

```tsx
import { TooltipWithShortcut } from '@/components/ui/Tooltip';

<TooltipWithShortcut
  label="Search"
  shortcut="⌘K"
  side="bottom"
  variant="dark"
/>
```

#### Tooltip Group (Action Bar)

```tsx
import { TooltipGroup, TooltipWithIcon } from '@/components/ui/Tooltip';
import { Save, Copy, Trash } from 'lucide-react';

<TooltipGroup spacing="MD">
  <TooltipWithIcon icon={<Save className="h-4 w-4" />} content="Save" />
  <TooltipWithIcon icon={<Copy className="h-4 w-4" />} content="Copy" />
  <TooltipWithIcon icon={<Trash className="h-4 w-4" />} content="Delete" variant="fire" />
</TooltipGroup>
```

#### Rich Content

```tsx
<Tooltip>
  <TooltipTrigger>
    <Info className="h-4 w-4" />
  </TooltipTrigger>
  <TooltipContent side="right" maxWidth={300}>
    <div className="space-y-1">
      <p className="font-medium">Quantum Weaver</p>
      <p className="text-xs opacity-80">Sovereignty Score: 1,247</p>
      <p className="text-xs opacity-60">Joined: April 2026</p>
    </div>
  </TooltipContent>
</Tooltip>
```

#### Form Validation Indicator

```tsx
<div className="flex items-center gap-2">
  <Input label="Email" />
  <Tooltip>
    <TooltipTrigger>
      <AlertCircle className="h-4 w-4 text-yellow-400" />
    </TooltipTrigger>
    <TooltipContent variant="dark" side="right">
      This email is not verified
    </TooltipContent>
  </Tooltip>
</div>
```

---

### 🔗 Dependency Graph

```
Tooltip.tsx
├── @base-ui/react/tooltip          (TooltipPrimitive)
├── @/lib/utils                     (cn)
├── @/types/components/ui/tooltip.types
│   ├── @base-ui/react/tooltip      (TooltipPopupState)
│   ├── @/lib/constants/.../tooltip.variants  (TooltipVariant, TooltipPlacement)
│   └── @/lib/constants/.../tooltip.constants (TooltipGroupSpacing)
├── @/lib/constants/.../tooltip.constants
│   └── (standalone — raw values)
├── @/lib/constants/.../tooltip.variants
│   ├── class-variance-authority    (cva)
│   └── ./tooltip.constants
└── @/utils/components/ui/tooltip.utils
    ├── @/lib/utils                 (cn)
    └── @/types/components/ui/tooltip.types  (TooltipSide, TooltipPopupState)
```

---

### ✅ Component Build Checklist

When building a new UI component following this pattern, ensure:

- [ ] **Types file** exists at `types/components/ui/{component}.types.ts`
- [ ] **Constants file** exists at `lib/constants/components/ui/{component}.constants.ts`
- [ ] **Variants file** exists at `lib/constants/components/ui/{component}.variants.ts`
- [ ] **Utils file** exists at `utils/components/ui/{component}.utils.ts` (if animation/logic needed)
- [ ] **Component file** exists at `components/ui/{Component}.tsx`
- [ ] Component imports all values — no hardcoded strings, numbers, or class names
- [ ] CVA variants use COSMIC design tokens (`bg-quantum-purple`, not `bg-purple-600`)
- [ ] All states handled: loading, empty, error, success where applicable
- [ ] Interactive states: hover, focus, active, disabled where applicable
- [ ] Responsive: mobile, tablet, desktop where applicable
- [ ] Accessible: keyboard navigation, screen reader support
- [ ] `data-slot` attribute on every primitive for debugging
- [ ] JSDoc comments with `@example` on every exported function
- [ ] Types re-exported from the component file for consumer convenience
- [ ] No sub-components that import other UI components (those are domain components)

---

This is the complete Tooltip system guide, my friend. It captures the true architecture we built — the separation of types, constants, variants, and utilities — and serves as the pattern for every base UI component that follows. 🏛️✨