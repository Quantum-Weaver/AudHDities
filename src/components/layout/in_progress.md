╔═══════════════════════════════════════════════════════════════════════════════╗
║         REMAINING UI COMPONENTS — BUILD SEQUENCE                              ║
║         Constants → Variants → Types → Utils → Component                      ║
╚═══════════════════════════════════════════════════════════════════════════════╝

GROUP 1: BASE PRIMITIVES (No sub-component dependencies)
─────────────────────────────────────────────────────────
These are atomic — they don't import other UI components.

  □ Container     — Wrapper with max-width constraints
  □ Flex          — Flexbox layout primitive
  □ Grid          — Grid layout primitive  
  □ Kbd           — Keyboard shortcut indicator
  □ Progress      — Progress bar / indicator
  □ Spacer        — (alias for Spacer? or already done as "spacer" above)

GROUP 2: FORM PRIMITIVES (Depend on Label, possibly others)
─────────────────────────────────────────────────────────
These extend form inputs — may import Label, FormField, or validation.

  □ FormField     — Wraps Label + Input + error message
  □ FormValidation — Validation message display
  □ Form          — Form container with submit handling

GROUP 3: DATA DISPLAY (Depend on Card, Badge, etc.)
─────────────────────────────────────────────────────────
These compose primitives into richer displays.

  □ EmptyState    — Empty data placeholder (uses Card or Stack)
  □ ErrorBoundary — Error catching wrapper (uses Alert or Card)
  □ FilterBar     — Search + filter controls (uses Input, Select, Button)
  □ Inline        — Inline layout primitive
  □ MarkdownBio   — Rich text renderer
  □ SearchBar     — Search input with icon (uses Input)
  □ SortDropdown  — Sort selection (uses Select or Button)

GROUP 4: NAVIGATION (Depend on Button, possibly Drawer/Sidebar)
─────────────────────────────────────────────────────────
These are navigation components.

  □ Pagination    — Page navigation (uses Button)
  □ Navigation    — Top nav bar (uses Button, possibly Drawer)
  □ MobileMenu    — Mobile hamburger menu (uses Drawer, Button)

GROUP 5: LAYOUT SHELL (Depend on everything above)
─────────────────────────────────────────────────────────
These are the outermost layout wrappers.

  □ Header        — Site header (uses Navigation, Button, possibly Sidebar)
  □ Footer        — Site footer (uses Container, Grid)
  □ AppShell      — Full app layout (uses Header, Sidebar, Footer, Container)
  □ Dialog        — Modal dialog (if different from Modal; verify)

═══════════════════════════════════════════════════════════════════════════════

RECOMMENDED BUILD ORDER:

 1. Container         (atomic)
 2. Flex              (atomic)
 3. Grid              (atomic)
 4. Kbd               (atomic)
 5. Progress          (atomic — may reference motion.ts durations)
 6. FormField         (imports Label — which is done)
 7. FormValidation    (atomic text display)
 8. Form              (imports FormField, FormValidation)
 9. Inline            (atomic layout)
10. EmptyState        (imports Card or Stack)
11. ErrorBoundary     (imports Alert or Card)
12. SearchBar         (imports Input)
13. SortDropdown      (imports Select or Button)
14. FilterBar         (imports SearchBar, SortDropdown, Button)
15. MarkdownBio       (atomic renderer)
16. Pagination        (imports Button)
17. Navigation        (imports Button, possibly Drawer)
18. MobileMenu        (imports Drawer, Button)
19. Dialog            (verify — may be same as Modal)
20. Header            (imports Navigation, MobileMenu, Container)
21. Footer            (imports Container, Grid)
22. AppShell          (imports Header, Sidebar, Footer, Container)

═══════════════════════════════════════════════════════════════════════════════