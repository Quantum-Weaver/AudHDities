MY BELOVED FRIEND,

*Timestamp: April 13, 2026 at 16:30 CST*

No code. Only outline. Let me map the complete workflow.

---

## 🗺️ **COMPLETE WORKFLOW OUTLINE FOR TODAY**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 1: CONFIG REFINEMENT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 1.1: Merge workflow_config.ts into object_categories.ts               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Keep object_categories.ts as the single source                   │    │
│  │  - Move WorkflowConfig interface from workflow_config.ts            │    │
│  │  - Move LEVEL_CONFIG (full_crud, assessment, etc.)                  │    │
│  │  - Move TABLE_OVERRIDES (table-specific configs)                    │    │
│  │  - Delete workflow_config.ts                                        │    │
│  │  - Update all imports across the codebase                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 1.2: Verify deity_groups.ts as single source for folder mapping       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Ensure getFolderNameForTable() works for all tables              │    │
│  │  - Add getDeityForEnum() that derives from table references         │    │
│  │  - Add getDeityForView() that derives from related tables           │    │
│  │  - Add getDeityForFunction() that derives from related tables       │    │
│  │  - Eliminate enum_mapping.ts (dynamic derivation)                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 1.3: Verify naming_guide.ts integration                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Ensure all generators call validateName() before writing         │    │
│  │  - Ensure all generators call transformName() for file names        │    │
│  │  - Add naming validation to writeGeneratedFile()                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 2: SYSTEM LOGGER INTEGRATION                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 2.1: Audit COSMIC system logging                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Verify cosmic.ts creates SystemLogger instance                    │    │
│  │  - Verify startRun() and endRun() are called                         │    │
│  │  - Verify addGeneratedFile() for each created file                   │    │
│  │  - Verify addNote() for important events                             │    │
│  │  - Verify errors/warnings are captured                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 2.2: Audit GAIA system logging                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Verify gaia.ts creates SystemLogger instance                      │    │
│  │  - Verify startRun() and endRun() are called                         │    │
│  │  - Verify addGeneratedFile() for each created file                   │    │
│  │  - Verify addNote() for important events                             │    │
│  │  - Verify errors/warnings are captured                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 2.3: Ensure transparent action flow                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Every generation action logs to SystemLogger                      │    │
│  │  - Every file write (or stage) logs to SystemLogger                  │    │
│  │  - Every error/warning captured with context                         │    │
│  │  - Run history stored in system_registry.ts                          │    │
│  │  - Notes preserved between runs                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 3: GAIA SYSTEM REPAIR                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 3.1: Fix import paths in gaia.ts                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Change find_ markers.js → find_markers.js                        │    │
│  │  - Update all config imports to new merged file                      │    │
│  │  - Ensure all module paths are correct                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 3.2: Add missing generateRunId() function                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - Add function to gaia.ts (or import from systemLogger)             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 3.3: Update all formatters to use deity folders                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - formatTypes.ts: already has deity folders ✅                      │    │
│  │  - formatConstants.ts: already has deity folders ✅                  │    │
│  │  - formatValidators.ts: add deity folder to path                     │    │
│  │  - formatHooks.ts: add deity folder to path                          │    │
│  │  - formatApiRoutes.ts: add deity folder to source path               │    │
│  │  - formatUtils.ts: add deity folder to path                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 3.4: Implement live file comparison system                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  NEW MODULE: modules/compare/compare_files.ts                        │    │
│  │                                                                       │    │
│  │  Function: compareWithLiveFile(generatedPath, livePath)              │    │
│  │  - Check if live file exists                                         │    │
│  │  - If not: mark as "new" - will create directly                      │    │
│  │  - If exists: compare content (hash or full)                         │    │
│  │  - If same: skip, discard generated (no change)                      │    │
│  │  - If different: generate diff report, stage for review              │    │
│  │  - Return: { action, diff, stagingPath }                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 3.5: Implement review/approval workflow                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  When differences detected:                                          │    │
│  │                                                                       │    │
│  │  1. Write generated version to staging/ folder                       │    │
│  │  2. Generate diff file (.diff)                                       │    │
│  │  3. Log: "⚠️ Changes detected: [file] → review in staging/"          │    │
│  │  4. Do NOT overwrite live file                                       │    │
│  │                                                                       │    │
│  │  User action:                                                        │    │
│  │  - Review staging file and diff                                      │    │
│  │  - Run approval script to move staging → live                        │    │
│  │  - Or delete staging to discard                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 4: COSMIC & GAIA ALIGNMENT                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 4.1: Audit current script structure                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Current:                                                             │    │
│  │  - scripts/system/cosmic.ts (COSMIC orchestrator)                     │    │
│  │  - scripts/system/gaia.ts (GAIA orchestrator)                         │    │
│  │  - scripts/generators/cosmic/ (COSMIC generators)                     │    │
│  │  - scripts/generators/gaia/ (GAIA generators)                         │    │
│  │  - scripts/modules/ (shared modules)                                  │    │
│  │  - scripts/shared/ (shared utilities)                                 │    │
│  │                                                                       │    │
│  │  Issue: Duplication detected - COSMIC generators in modules/generate/ │    │
│  │  also exist. Need to consolidate.                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 4.2: Consolidate duplicate generators                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Decision: Keep generators in scripts/generators/ organized by system│    │
│  │                                                                       │    │
│  │  scripts/generators/                                                 │    │
│  │  ├── cosmic/        (COSMIC-specific generators)                     │    │
│  │  │   ├── generateCssVariables.ts                                     │    │
│  │  │   ├── generateTailwindConfig.ts                                   │    │
│  │  │   └── ...                                                         │    │
│  │  └── gaia/          (GAIA-specific generators)                       │    │
│  │      ├── extract_tables.ts                                           │    │
│  │      ├── format_types.ts                                             │    │
│  │      └── ...                                                         │    │
│  │                                                                       │    │
│  │  Move shared generation logic to modules/ (e.g., writeGeneratedFile)  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 4.3: Ensure both systems use shared modules                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Shared modules (already in scripts/modules/):                        │    │
│  │  - extract/extract_object.ts                                         │    │
│  │  - extract/find_markers.ts                                           │    │
│  │  - extract/find_closing_braces.ts                                    │    │
│  │  - discover/count_items.ts                                           │    │
│  │  - analyze/analyze_dependencies.ts                                   │    │
│  │  - validate/staging.ts                                               │    │
│  │  - compare/compare_files.ts (NEW)                                    │    │
│  │                                                                       │    │
│  │  COSMIC should use these where applicable (not re-implement)         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 5: LIVE FILE COMPARISON SYSTEM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 5.1: Create compare_files.ts module                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  modules/compare/compare_files.ts                                    │    │
│  │                                                                       │    │
│  │  export interface CompareResult {                                    │    │
│  │    status: 'new' | 'unchanged' | 'changed' | 'error';                │    │
│  │    liveExists: boolean;                                              │    │
│  │    generatedContent: string;                                         │    │
│  │    liveContent?: string;                                             │    │
│  │    diff?: string;                                                    │    │
│  │    stagingPath?: string;                                             │    │
│  │    diffPath?: string;                                                │    │
│  │  }                                                                   │    │
│  │                                                                       │    │
│  │  export async function compareWithLiveFile(                          │    │
│  │    generatedPath: string,  // path in generated/ folder              │    │
│  │    livePath: string,        // path in live codebase                 │    │
│  │    content: string          // generated content                     │    │
│  │  ): Promise<CompareResult>                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 5.2: Integrate into writeGeneratedFile                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Modify writeGeneratedFile to:                                       │    │
│  │                                                                       │    │
│  │  1. Generate content to temp location first                          │    │
│  │  2. Compare with live file (if exists)                               │    │
│  │  3. If no live file → create directly                                │    │
│  │  4. If same content → skip, delete temp                              │    │
│  │  5. If different → stage for review                                  │    │
│  │  6. Return result with action ('created', 'skipped', 'staged')       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 5.3: Create approval script                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  scripts/approve-staged.ts                                           │    │
│  │                                                                       │    │
│  │  - List all staged files                                             │    │
│  │  - Show diffs                                                        │    │
│  │  - Prompt for approval (per file or all)                             │    │
│  │  - Move approved files to live location                              │    │
│  │  - Delete rejected/unapproved staging files                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 6: DEITY FOLDER MIGRATION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 6.1: Update all GAIA formatters                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  File                    Current Path                    New Path     │    │
│  │  ─────────────────────────────────────────────────────────────────   │    │
│  │  formatTypes.ts          types/generated/{d}/{t}.ts    (already) ✅   │    │
│  │  formatConstants.ts      constants/generated/{d}/{e}.ts (already) ✅  │    │
│  │  formatValidators.ts     validators/generated/{t}.ts   → {d}/{t}.ts   │    │
│  │  formatHooks.ts          hooks/generated/{t}.ts        → {d}/{t}.ts   │    │
│  │  formatUtils.ts          utils/generated/{d}/{t}.ts    (already) ✅   │    │
│  │  formatApiRoutes.ts      api/generated/{t}/route.ts    → {d}/{t}/...  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 6.2: Update getDeityFolder logic                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  For all object types, deity folder is derived from table association│    │
│  │                                                                       │    │
│  │  - Table: direct from deity_groups.ts                                 │    │
│  │  - View: from table name pattern or related table                     │    │
│  │  - Function: from table name pattern or related table                 │    │
│  │  - Enum: from tables that reference it (first reference wins)        │    │
│  │  - Hook: from its associated table                                   │    │
│  │  - Validator: from its associated table                              │    │
│  │  - API Route: from its associated table                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 7: SELF-MAINTAINING SYSTEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 7.1: What COSMIC generates for other systems                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  COSMIC generates:                                                   │    │
│  │  - CSS variables (used by entire app)                                │    │
│  │  - Tailwind config (used by entire app)                              │    │
│  │  - Domain styles (used by components)                                │    │
│  │  - Text effects (used by components)                                 │    │
│  │  - Animation variants (used by components)                           │    │
│  │  - Typography classes (used by components)                           │    │
│  │  - Zoom targets (used by PanoramaViewer)                             │    │
│  │  - Parallax classes (used by PanoramaViewer)                         │    │
│  │                                                                       │    │
│  │  These are consumed by:                                              │    │
│  │  - components/ (UI components)                                       │    │
│  │  - app/ (pages and layouts)                                          │    │
│  │  - lib/ (utilities)                                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 7.2: What GAIA generates for other systems                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GAIA generates:                                                     │    │
│  │  - Types (used by everything)                                        │    │
│  │  - Constants (used by everything)                                    │    │
│  │  - Validators (used by API routes and forms)                         │    │
│  │  - Utils (used by API routes and components)                         │    │
│  │  - API Routes (used by frontend)                                     │    │
│  │  - Hooks (used by components)                                        │    │
│  │                                                                       │    │
│  │  These are consumed by:                                              │    │
│  │  - components/ (forms, displays)                                     │    │
│  │  - app/ (API routes, pages)                                          │    │
│  │  - lib/ (utilities)                                                  │    │
│  │  - hooks/ (React hooks)                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 7.3: Dependency tracking for self-maintenance                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  When source changes (database.types.ts or cosmic constants):        │    │
│  │                                                                       │    │
│  │  1. dependency_map.ts tracks what depends on what                     │    │
│  │  2. detectStaleFiles() identifies affected files                     │    │
│  │  3. User runs GAIA/COSMIC to regenerate                              │    │
│  │  4. System flags outdated files for review                           │    │
│  │                                                                       │    │
│  │  Future: Agentic maintenance can auto-regenerate on dependency change│    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 8: COMPONENT RECONNECTION PLAN                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 8.1: Current component imports                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Components currently import from:                                    │    │
│  │  - src/types/ (should be src/types/generated/{deity}/)                   │    │
│  │  - src/hooks/ (should be src/hooks/generated/{deity}/)                   │    │
│  │  - src/lib/constants/ (should be src/lib/constants/generated/{deity}/)   │    │
│  │  - src/lib/validators/ (should be src/lib/validators/generated/{deity}/) │    │
│  │  - src/lib/utils/ (should be src/lib/utils/generated/{deity}/)           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 8.2: Migration path for components                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Option A: Update all component imports manually                     │    │
│  │  Option B: Create barrel exports at root level that re-export        │    │
│  │            (e.g., src/types/profiles.ts re-exports from deity folder)  │    │
│  │  Option C: Generate components that already use correct paths        │    │
│  │                                                                       │    │
│  │  Recommendation: Option B for backward compatibility,                 │    │
│  │  then gradually migrate components to direct imports                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Step 8.3: New component generation (future Jarnathon)                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  When ready, we will:                                                 │    │
│  │  1. Define component templates                                       │    │
│  │  2. Create generators for:                                           │    │
│  │     - List views (table displays)                                    │    │
│  │     - Detail views (form displays)                                   │    │
│  │     - Admin CRUD interfaces                                          │    │
│  │  3. Use GAIA types to generate type-safe components                  │    │
│  │  4. Use COSMIC styles for consistent theming                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SUMMARY: TODAY'S EXECUTION ORDER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 1  │ │ Merge workflow_config.ts into object_categories.ts          │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 2  │ │ Verify deity_groups.ts as single source for folder mapping │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 3  │ │ Audit and fix system logging in COSMIC and GAIA            │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 4  │ │ Repair GAIA: fix imports, add generateRunId, update paths  │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 5  │ │ Create compare_files.ts module for live file comparison    │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 6  │ │ Update all GAIA formatters to use deity folders            │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 7  │ │ Integrate compare_files into writeGeneratedFile            │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 8  │ │ Create approval script for staged changes                  │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │ 9  │ │ Test GAIA dry-run with new structure                       │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│         │                                                                   │
│         ▼                                                                   │
│  ┌────┐ ┌────────────────────────────────────────────────────────────┐     │
│  │10  │ │ Document component migration path                          │     │
│  └────┘ └────────────────────────────────────────────────────────────┘     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💬 **CONFIRMATION**

This outline covers:

1. **Config refinement** - merging workflow_config into object_categories
2. **System logging** - ensuring transparency across both systems
3. **GAIA repair** - fixing imports, paths, and deity folder alignment
4. **Live file comparison** - staging/review/approval workflow
5. **Deity folder migration** - all generators using consistent paths
6. **Self-maintenance** - dependency tracking and stale detection
7. **Component reconnection plan** - how generated files connect to the app

**Shall I proceed with Phase 1 (config refinement) code?**

**Aethelred** 🏛️✨