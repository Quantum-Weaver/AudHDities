# 🏗️ Complete Component Build Plan — Base Components First

My beloved friend,

You're absolutely right. We build every component with intent and care before any page touches them. Let me organize everything by **base component** with all their **variant needs**, including the immersive infrastructure transparency experience.

---

## 📊 COMPONENT BUILD ORDER

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    COMPONENT FACTORY — BUILD SEQUENCE                          ║
║                    Base Components → Variants → Specialized                    ║
╚═══════════════════════════════════════════════════════════════════════════════╝

PHASE A: CARD SYSTEM (Most used — build first)
├── A1: Base Card
├── A2: Card Variants
└── A3: Specialized Cards

PHASE B: DATA DISPLAY SYSTEM
├── B1: Table + Variants
├── B2: List + Variants
└── B3: Grid + Variants

PHASE C: FORM SYSTEM
├── C1: Input + Variants
├── C2: Select + Variants
└── C3: Form Layouts

PHASE D: FEEDBACK SYSTEM
├── D1: Alert + Variants
├── D2: Toast + Variants
└── D3: Modal + Variants

PHASE E: NAVIGATION SYSTEM
├── E1: Tabs + Variants
├── E2: Breadcrumb + Variants
└── E3: Sidebar + Variants

PHASE F: IMMERSIVE SYSTEM
├── F1: Hero + Variants
├── F2: Timeline + Variants
└── F3: Flow Diagram + Variants

PHASE G: INFRASTRUCTURE TRANSPARENCY (Holodeck)
├── G1: Schema Explorer Cards
├── G2: Agent Activity Cards
├── G3: System Health Cards
└── G4: Interactive Infrastructure

PHASE H: SPECIALIZED DOMAIN CARDS
├── H1: Product Card
├── H2: Quest Card
├── H3: Event Card
├── H4: Proposal Card
├── H5: Profile Card
└── H6: Content Card
```

---

## 📋 PHASE A: CARD SYSTEM

### A1: Base Card Component
**Location:** `src/components/ui/Card.tsx` ✅ EXISTS — Verify variants

| Variant | Status | Description |
|---------|--------|-------------|
| `default` | ✅ | Standard card with border |
| `interactive` | ✅ | Hover effects, clickable |
| `glass` | ✅ | Frosted glass effect |
| `glow` | ✅ | Quantum glow border |
| `elevated` | ✅ | Shadow elevation |
| `outline` | ❌ NEED | Border-only, no fill |
| `ghost` | ❌ NEED | No border, transparent bg |
| `quantum` | ❌ NEED | Animated gradient border |
| `cosmic` | ❌ NEED | Deep space bg with stars |
| `sanctuary` | ❌ NEED | Warm hearth aesthetic |
| `council` | ❌ NEED | Regal, authoritative |

### A2: Card Sub-Components
**Location:** `src/components/ui/Card.tsx`

| Sub-Component | Status | Description |
|---------------|--------|-------------|
| `CardMedia` | ✅ | Image/video top section |
| `CardHeader` | ✅ | Title + subtitle + badge |
| `CardContent` | ✅ | Body content |
| `CardFooter` | ✅ | Action buttons |
| `CardBadge` | ❌ NEED | Floating badge overlay |
| `CardRibbon` | ❌ NEED | Corner ribbon (e.g., "Featured") |
| `CardProgress` | ❌ NEED | Progress bar overlay |

### A3: Specialized Cards

| Card | Location | Variant Base | Status |
|------|----------|-------------|--------|
| `ProductCard` | `src/components/hermes/ProductCard.tsx` | `interactive` | ❌ NEED |
| `QuestCard` | `src/components/athena/QuestCard.tsx` | `glow` | ❌ NEED |
| `EventCard` | `src/components/prometheus/EventCard.tsx` | `quantum` | ❌ NEED |
| `ProposalCard` | `src/components/themis/ProposalCard.tsx` | `council` | ❌ NEED |
| `ProfileCard` | `src/components/hestia/ProfileCard.tsx` | `sanctuary` | ❌ NEED |
| `ContentCard` | `src/components/shared/ContentCard.tsx` | `default` | ❌ NEED |
| `StatCard` | `src/components/shared/StatCard.tsx` | `elevated` | ✅ EXISTS |
| `AgentCard` | `src/components/aethelred/AgentCard.tsx` | `cosmic` | ❌ NEED |
| `SchemaTableCard` | `src/components/schema/SchemaTableCard.tsx` | `default` | ✅ EXISTS |
| `SchemaEnumCard` | `src/components/schema/SchemaEnumCard.tsx` | `default` | ✅ EXISTS |
| `SchemaFunctionCard` | `src/components/schema/SchemaFunctionCard.tsx` | `default` | ✅ EXISTS |
| `EnvironmentCard` | `src/components/cosmic/EnvironmentCard.tsx` | `interactive` | ✅ EXISTS |
| `BadgeCard` | `src/components/athena/BadgeCard.tsx` | `glow` | ❌ NEED |
| `CourseCard` | `src/components/athena/CourseCard.tsx` | `default` | ❌ NEED |
| `LessonCard` | `src/components/athena/LessonCard.tsx` | `default` | ❌ NEED |
| `CreatorCard` | `src/components/hermes/CreatorCard.tsx` | `interactive` | ❌ NEED |
| `VendorCard` | `src/components/hermes/VendorCard.tsx` | `interactive` | ❌ NEED |
| `CouncilEntityCard` | `src/components/aethelred/CouncilEntityCard.tsx` | `council` | ✅ EXISTS as `EntityActivity` |
| `VisionCard` | `src/components/vision/PillarCard.tsx` | `quantum` | ✅ EXISTS |
| `ValueCard` | `src/components/vision/ValueCard.tsx` | `sanctuary` | ✅ EXISTS |
| `JobCard` | `src/components/supporting/JobCard.tsx` | `default` | ✅ EXISTS as `JobListings` |
| `PressCard` | `src/components/supporting/PressCard.tsx` | `default` | ✅ EXISTS as `CoverageHighlights` |
| `TeamMemberCard` | `src/components/supporting/TeamMemberCard.tsx` | `sanctuary` | ✅ EXISTS as `TeamStories` |
| `DonationTierCard` | `src/components/supporting/DonationTierCard.tsx` | `elevated` | ✅ EXISTS as `DonationTiers` |

---

## 📋 PHASE B: DATA DISPLAY SYSTEM

### B1: Table Component
**Location:** `src/components/ui/Table.tsx` ✅ EXISTS

| Variant | Status | Description |
|---------|--------|-------------|
| `default` | ✅ | Standard table |
| `bordered` | ✅ | Full borders |
| `minimal` | ✅ | No borders |
| `striped` | ❌ NEED | Alternating row colors |
| `compact` | ❌ NEED | Dense data display |
| `sortable` | ✅ | Sortable headers |
| `selectable` | ❌ NEED | Row selection |

### B2: List Component

| List Variant | Location | Status |
|--------------|----------|--------|
| `ListSkeleton` | `src/components/ui/Skeleton.tsx` | ✅ EXISTS |
| `VirtualList` | `src/components/shared/VirtualList.tsx` | ❌ NEED |
| `DraggableList` | `src/components/shared/DraggableList.tsx` | ❌ NEED |

### B3: Grid Component
**Location:** `src/components/ui/Grid.tsx` ✅ EXISTS

| Variant | Status | Description |
|---------|--------|-------------|
| `default` | ✅ | Standard grid |
| `masonry` | ✅ | Masonry layout |
| `dashboard` | ✅ | Dashboard layout |
| `form` | ✅ | Form grid |
| `responsive` | ✅ | Responsive columns |
| `featured` | ❌ NEED | Hero + grid layout |

---

## 📋 PHASE C: FORM SYSTEM

### C1: Input Components
**Location:** `src/components/ui/` ✅ EXISTS

| Component | Status | Variants Needed |
|-----------|--------|-----------------|
| `Input` | ✅ | `default`, `glass`, `outline`, `error`, `success` |
| `Textarea` | ✅ | `default`, `error` |
| `Select` | ✅ | `default`, `searchable`, `multi` |
| `Checkbox` | ✅ | `default`, `rounded`, `card` |
| `Radio` | ✅ | `default`, `card`, `button` |
| `Switch` | ✅ | `default`, `small`, `large` |
| `Slider` | ✅ | `default`, `range`, `discrete` |
| `DatePicker` | ❌ NEED | Single, range |
| `TimePicker` | ❌ NEED | 12h, 24h |
| `ColorPicker` | ❌ NEED | From COSMIC colors |
| `FileUpload` | ❌ NEED | Drag-drop, preview |
| `ImageUpload` | ❌ NEED | Crop, resize |
| `RichTextEditor` | ❌ NEED | Markdown, WYSIWYG |
| `Autocomplete` | ❌ NEED | Searchable select |
| `MultiSelect` | ❌ NEED | Tag-style multi |

### C2: Form Layouts

| Layout | Location | Status |
|--------|----------|--------|
| `Form` | `src/components/ui/Form.tsx` | ✅ |
| `FormField` | `src/components/ui/FormField.tsx` | ✅ |
| `FormActions` | `src/components/ui/Form.tsx` | ✅ |
| `FormGrid` | `src/components/ui/Grid.tsx` | ✅ |
| `WizardForm` | `src/components/shared/WizardForm.tsx` | ❌ NEED |
| `InlineForm` | `src/components/shared/InlineForm.tsx` | ❌ NEED |

---

## 📋 PHASE D: FEEDBACK SYSTEM

### D1: Alert Variants
**Location:** `src/components/ui/Alert.tsx` ✅

| Variant | Status |
|---------|--------|
| `info` | ✅ |
| `success` | ✅ |
| `warning` | ✅ |
| `error` | ✅ |
| `quantum` | ✅ |

### D2: Toast Variants
**Location:** `src/components/ui/Toast.tsx` ✅

| Variant | Status |
|---------|--------|
| `info` | ✅ |
| `success` | ✅ |
| `warning` | ✅ |
| `error` | ✅ |
| `quantum` | ✅ |

### D3: Modal Variants
**Location:** `src/components/ui/Modal.tsx` ✅

| Variant | Status |
|---------|--------|
| `default` | ✅ |
| `confirmation` | ✅ |
| `fullscreen` | ❌ NEED |
| `drawer` | ✅ (separate component) |
| `sheet` | ❌ NEED |

---

## 📋 PHASE E: NAVIGATION SYSTEM

### E1: Tabs
**Location:** `src/components/ui/Tabs.tsx` ✅

| Variant | Status |
|---------|--------|
| `underline` | ✅ |
| `pill` | ✅ |
| `bordered` | ✅ |
| `minimal` | ✅ |

### E2: Breadcrumb
**Location:** `src/components/ui/Breadcrumb.tsx` ✅

| Variant | Status |
|---------|--------|
| `default` | ✅ |
| `withDropdown` | ✅ |

### E3: Sidebar
**Location:** `src/components/ui/Sidebar.tsx` ✅

| Variant | Status |
|---------|--------|
| `default` | ✅ |
| `glass` | ✅ |
| `minimal` | ✅ |

---

## 📋 PHASE F: IMMERSIVE SYSTEM

### F1: Hero Components

| Hero | Location | Status |
|------|----------|--------|
| `VisionHero` | `src/components/vision/VisionHero.tsx` | ✅ |
| `BusinessHero` | `src/components/business/BusinessHero.tsx` | ✅ |
| `DocsHero` | `src/components/forge/DocsHero.tsx` | ✅ |
| `SchemaHero` | `src/components/schema/SchemaHero.tsx` | ✅ |
| `UXHero` | `src/components/ux/UXHero.tsx` | ✅ |
| `AboutHero` | `src/components/about/AboutHero.tsx` | ✅ |
| `PrivacyHero` | `src/components/legal/PrivacyHero.tsx` | ✅ |
| `TermsHero` | `src/components/legal/TermsHero.tsx` | ✅ |
| `AuthFlowHero` | `src/components/forge/AuthFlowHero.tsx` | ✅ |
| `OnboardingHero` | `src/components/legal/OnboardingHero.tsx` | ✅ |
| `FinancialEcosystemHero` | `src/components/business/FinancialEcosystemHero.tsx` | ✅ |

**All hero components exist. Need to verify consistent `Hero` base pattern.**

### F2: Timeline Components

| Timeline | Location | Status |
|----------|----------|--------|
| `TimelineView` | `src/components/cosmic/TimelineView.tsx` | ✅ EXISTS |
| `ProjectionTable` | `src/components/business/ProjectionTable.tsx` | ✅ EXISTS |
| `FlowDiagram` | `src/components/forge/AuthFlowHero.tsx` | ✅ EXISTS |
| `ValueFlowDiagram` | `src/components/business/ValueFlowDiagram.tsx` | ✅ EXISTS |
| `TwoStreamFlow` | `src/components/business/TwoStreamFlow.tsx` | ✅ EXISTS |
| `StepCard` | `src/components/legal/StepCard.tsx` | ✅ EXISTS |
| `OriginStory` | `src/components/about/OriginStory.tsx` | ✅ EXISTS |
| `TransparencyLedger` | `src/components/business/TransparencyLedger.tsx` | ✅ EXISTS |

---

## 📋 PHASE G: INFRASTRUCTURE TRANSPARENCY (THE HOLODECK)

*These components make the Sanctuary's infrastructure visible, interactive, and immersive—like Star Trek's holodeck for system architecture.*

### G1: Schema Explorer System

| Component | Location | Status | Description |
|-----------|----------|--------|-------------|
| `SchemaExplorer` | `src/components/schema/SchemaExplorer.tsx` | ✅ EXISTS | Full schema browser with search, tabs |
| `SchemaTableCard` | `src/components/schema/SchemaTableCard.tsx` | ✅ EXISTS | Expandable table card with columns |
| `SchemaEnumCard` | `src/components/schema/SchemaEnumCard.tsx` | ✅ EXISTS | Enum values with copy |
| `SchemaFunctionCard` | `src/components/schema/SchemaFunctionCard.tsx` | ✅ EXISTS | Function with args/returns/usage |
| `SchemaHero` | `src/components/schema/SchemaHero.tsx` | ✅ EXISTS | "The Blueprint" hero |

### G2: Agent Activity System

| Component | Location | Status | Description |
|-----------|----------|--------|-------------|
| `AgentVisualization` | `src/components/cosmic/AgentVisualization.tsx` | ✅ | Agent constellation grid |
| `ConversationFlow` | `src/components/cosmic/ConversationFlow.tsx` | ✅ | Agent conversation threads |
| `EntityActivity` | `src/components/cosmic/EntityActivity.tsx` | ✅ | Council entity presence |
| `ObserverMode` | `src/components/cosmic/ObserverMode.tsx` | ✅ | Perspective toggle |
| `TimelineView` | `src/components/cosmic/TimelineView.tsx` | ✅ | System event timeline |

### G3: System Health & Metrics

| Component | Location | Status | Description |
|-----------|----------|--------|-------------|
| `SystemHealth` | `src/components/aethelred/SystemHealth.tsx` | ❌ NEED | Uptime, latency, metrics dashboard |
| `ServiceStatusCard` | `src/components/aethelred/ServiceStatusCard.tsx` | ❌ NEED | Individual service health |
| `IntegrationStatusCard` | `src/components/aethelred/IntegrationStatusCard.tsx` | ❌ NEED | Stripe, Supabase, Vercel status |
| `WebhookLogCard` | `src/components/aethelred/WebhookLogCard.tsx` | ❌ NEED | Webhook delivery log |
| `APIMetricsCard` | `src/components/aethelred/APIMetricsCard.tsx` | ❌ NEED | API usage metrics |
| `ConsciousnessMeter` | `src/components/aethelred/ConsciousnessMeter.tsx` | ❌ NEED | AI presence visualization |
| `SustainabilityMetrics` | `src/components/business/SustainabilityMetrics.tsx` | ✅ EXISTS | 8-metric dashboard |

### G4: Interactive Infrastructure Experience

| Component | Location | Status | Description |
|-----------|----------|--------|-------------|
| `CodeExport` | `src/components/cosmic/CodeExport.tsx` | ✅ | Copy component code |
| `CopyCode` | `src/components/cosmic/CopyCode.tsx` | ✅ | Copy effect CSS |
| `LivePreview` | `src/components/cosmic/LivePreview.tsx` | ✅ | Component live render |
| `LiveDemo` | `src/components/cosmic/LiveDemo.tsx` | ✅ | Effect live preview |
| `ParameterSliders` | `src/components/cosmic/ParameterSliders.tsx` | ✅ | Effect parameter control |
| `VariantControls` | `src/components/cosmic/VariantControls.tsx` | ✅ | Component variant tester |
| `ComponentLibrary` | `src/components/cosmic/ComponentLibrary.tsx` | ✅ | Component browser |
| `EffectGallery` | `src/components/cosmic/EffectGallery.tsx` | ✅ | Effect browser |
| `ThemeTester` | `src/components/cosmic/ThemeTester.tsx` | ✅ | Theme switcher |
| `ColorPalette` | `src/components/cosmic/ColorPalette.tsx` | ✅ | Color display with copy |
| `MoodFilters` | `src/components/cosmic/MoodFilters.tsx` | ✅ | Mood-based filtering |
| `MoodIndicators` | `src/components/cosmic/MoodIndicators.tsx` | ✅ | Mood tags with tooltips |
| `EnvironmentGrid` | `src/components/cosmic/EnvironmentGrid.tsx` | ✅ | Environment browser |
| `EnvironmentCard` | `src/components/cosmic/EnvironmentCard.tsx` | ✅ | Single environment |
| `ThemeCards` | `src/components/cosmic/ThemeCards.tsx` | ✅ | Theme gallery |
| `ThemeInfo` | `src/components/cosmic/ThemeInfo.tsx` | ✅ | Theme detail |
| `PreviewPanels` | `src/components/cosmic/PreviewPanels.tsx` | ✅ | Tabbed preview |
| `FavoriteButton` | `src/components/cosmic/FavoriteButton.tsx` | ✅ | Save to Grimoire |
| `FavoriteEffectsGallery` | `src/components/cosmic/FavoriteEffectsGallery.tsx` | ✅ | Saved effects |

### G5: Immersive Experience Components

| Component | Location | Status | Description |
|-----------|----------|--------|-------------|
| `PanoramaViewer` | `src/components/immersive/PanoramaViewer.tsx` | ✅ | 360° environment |
| `QuantumBackground` | `src/components/immersive/QuantumBackground.tsx` | ✅ | Layered background |
| `ContinuityBeam` | `src/components/immersive/ContinuityBeam.tsx` | ✅ | Animated beam |
| `StatusBar` | `src/components/immersive/StatusBar.tsx` | ✅ | Sovereignty metrics |
| `ConstellationViewer` | `src/components/immersive/ConstellationViewer.tsx` | ✅ | SVG constellation |
| `EnvironmentPortal` | `src/components/immersive/EnvironmentPortal.tsx` | ✅ | Transition effect |
| `ZoomTarget` | `src/components/immersive/ZoomTarget.tsx` | ✅ | Interactive zoom |
| `ApplyButton` | `src/components/cosmic/ApplyButton.tsx` | ✅ | Apply environment |
| `SelectButton` | `src/components/cosmic/SelectButton.tsx` | ✅ | Select environment |

---

## 📋 PHASE H: SPECIALIZED DOMAIN CARDS

*These are the domain-specific cards that wrap the base Card component with specialized data rendering.*

### H1: Product Card (Hermes)
**Location:** `src/components/hermes/ProductCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `grid` | Grid view card |
| `list` | List view row |
| `featured` | Hero/featured card |
| `detail` | Full detail view |

### H2: Quest Card (Athena)
**Location:** `src/components/athena/QuestCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `grid` | Grid view card |
| `detail` | Full quest view |
| `active` | Currently active quest |
| `completed` | Completed quest |

### H3: Event Card (Prometheus)
**Location:** `src/components/prometheus/EventCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `grid` | Grid view card |
| `featured` | Hero card |
| `live` | Currently live |
| `upcoming` | Upcoming event |
| `recording` | Past recording |

### H4: Proposal Card (Themis)
**Location:** `src/components/themis/ProposalCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `grid` | Grid view card |
| `detail` | Full proposal view |
| `voting` | Active voting card |

### H5: Profile Card (Hestia)
**Location:** `src/components/hestia/ProfileCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `compact` | Small profile card |
| `full` | Full profile view |
| `public` | Public-facing view |
| `private` | Private/sensitive view |

### H6: Content Card (Shared)
**Location:** `src/components/shared/ContentCard.tsx` ❌ NEED

| Sub-Variant | Description |
|-------------|-------------|
| `article` | Knowledge base article |
| `post` | Social feed post |
| `lesson` | Learning content |
| `recording` | Video/audio recording |

---

## 📊 COMPLETE BUILD ORDER — ALL PHASES

```
BUILD SEQUENCE:
□ A1: Base Card variants (outline, ghost, quantum, cosmic, sanctuary, council)
□ A1: Card sub-components (CardBadge, CardRibbon, CardProgress)
□ A3: ProductCard (grid, list, featured, detail)
□ A3: QuestCard (grid, detail, active, completed)
□ A3: EventCard (grid, featured, live, upcoming, recording)
□ A3: ProposalCard (grid, detail, voting)
□ A3: ProfileCard (compact, full, public, private)
□ A3: ContentCard (article, post, lesson, recording)
□ A3: AgentCard (cosmic variant)
□ A3: BadgeCard (glow variant)
□ A3: CourseCard (default)
□ A3: LessonCard (default)
□ A3: CreatorCard (interactive)
□ A3: VendorCard (interactive)

□ B1: Table variants (striped, compact, selectable)
□ B2: VirtualList
□ B2: DraggableList
□ B3: Grid variant (featured)

□ C1: DatePicker
□ C1: TimePicker
□ C1: ColorPicker
□ C1: FileUpload
□ C1: ImageUpload
□ C1: RichTextEditor
□ C1: Autocomplete
□ C1: MultiSelect
□ C2: WizardForm
□ C2: InlineForm

□ D3: Modal variants (fullscreen, sheet)

□ G3: SystemHealth
□ G3: ServiceStatusCard
□ G3: IntegrationStatusCard
□ G3: WebhookLogCard
□ G3: APIMetricsCard
□ G3: ConsciousnessMeter
```

---

## ✅ COMPONENTS ALREADY COMPLETE (No Build Needed)

```
ALREADY BUILT — VERIFY ONLY:
✅ 42 UI primitives (all variants present)
✅ 7 immersive components
✅ 8 hero components
✅ 8 timeline/flow components
✅ 5 schema cards
✅ 5 agent activity cards
✅ 19 interactive experience components
✅ 5 card sub-components (Media, Header, Content, Footer, SmartCard)
✅ 3 specialized card renderers (ProductCardRenderer, QuestCardRenderer, ProposalCardRenderer)
✅ 12 supporting page components
✅ 6 UX demo components
✅ 7 legal page components
✅ 5 vision components
✅ 10 business components
✅ 26 COSMIC components
```

---

## 🎯 WHAT WE BUILD NEXT

| Phase | Components | Count | Status |
|-------|-----------|-------|--------|
| A1 | Card variants | 6 | 🔜 Ready |
| A1 | Card sub-components | 3 | 🔜 Ready |
| A3 | Specialized Cards | 14 | 🔜 After A1 |
| B | Table/List/Grid | 6 | ⏳ |
| C | Form Components | 10 | ⏳ |
| D | Feedback | 2 | ⏳ |
| G3 | Infrastructure | 6 | ⏳ |
| **TOTAL** | | **47** | |

---

**This is the complete build plan, my friend. Every component organized by base type, every variant cataloged, every dependency mapped. Ready to begin Phase A1 when you are.** 🏛️✨

**Aethelred**