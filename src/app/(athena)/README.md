# 🦉 ATHENA — The Library

**Feeling:** Peaceful, wise, expansive, curious
**Environment:** `library` (Ancient, Awe-inspiring variants)
**Status:** ✅ Built, wired, seeded, and open (trued 2026-07-31 — rewiring season + first seeds 008 + doors 009 + the course path walk + the game detiered)

> Realm coordination: [`REALM-BUS.md`](REALM-BUS.md) (the standing tabletop — laws, census, open edges).

---

## 📂 Route Structure

```
src/app/(athena)/
├── library/
│   ├── page.tsx                      # ✅ The Library hub (/library)
│   │
│   ├── quests/
│   │   ├── page.tsx                  # ✅ The Path — quests gallery (/library/quests)
│   │   └── [slug]/page.tsx           # ✅ Quest Detail (/library/quests/[slug])
│   │
│   ├── bubbles/
│   │   ├── page.tsx                  # ✅ The Floating Stars — bubbles gallery (/library/bubbles)
│   │   ├── play/page.tsx             # ✅ Pop the Stars — the bubble game (/library/bubbles/play)
│   │   └── [slug]/page.tsx           # ✅ Bubble Detail (/library/bubbles/[slug])
│   │
│   ├── courses/
│   │   ├── page.tsx                  # ✅ The Curriculum — courses gallery (/library/courses)
│   │   └── [slug]/page.tsx           # ✅ Course Detail (/library/courses/[slug])
│   │
│   ├── lessons/
│   │   ├── page.tsx                  # ✅ The Lessons — lessons gallery (/library/lessons)
│   │   └── [slug]/page.tsx           # ✅ Lesson Detail (/library/lessons/[slug])
│   │
│   ├── knowledge/
│   │   ├── page.tsx                  # ✅ The Archive — scrolls gallery (/library/knowledge)
│   │   └── [slug]/page.tsx           # ✅ Scroll Detail (/library/knowledge/[slug])
│   │
│   ├── badges/
│   │   ├── page.tsx                  # ✅ The Honors — sigils gallery (/library/badges)
│   │   └── [slug]/page.tsx           # ✅ Sigil Detail (/library/badges/[slug])
│   │
│   └── dailies/
│       └── page.tsx                  # ✅ The Dailies — word scramble (/library/dailies)
```

**The Dailies (born 2026-08-24)** is the one hall that does NOT read through a
generated API route. Its shelf is fetched server-side, with the anon key and no
cookie, and handed to the page whole (`src/lib/dailies/shelf.ts`) — because a
generated GET carries the vessel's session into the vendor's logs, and a
per-puzzle request keyed to a person is an attendance ledger however device-local
the rest of the design is. There is deliberately no `[slug]` route: the whole
shelf arrives with the page, so the browser never asks for a particular puzzle.

---

## 📊 Component Map

All client components live at `src/components/asgard/domains/athena/`:

| Hall | Gallery | Detail | Extra |
|------|---------|--------|-------|
| Library Hub | `library/LibraryHub` | — | — |
| The Path | `quests/QuestsGallery` | `quests/QuestDetail` | — |
| The Floating Stars | `bubbles/BubblesGallery` | `bubbles/BubbleDetail` | `bubbles/BubblePopGame` + `bubbles/BubbleLimitSlider` |
| The Curriculum | `courses/CoursesGallery` | `courses/CourseDetail` | — |
| The Lessons | `lessons/LessonsGallery` | `lessons/LessonDetail` | — |
| The Archive | `knowledge/KnowledgeGallery` | `knowledge/KnowledgeDetail` | — |
| The Honors | `badges/BadgesGallery` | `badges/BadgeDetail` | — |

---

## 🗄️ Data Sources (the evolved dialect — trued 2026-07-30)

All halls read published rows (`status = 'published'`) through the
generated hooks; details fetch by `slug`.

| Hall | Table | Deity Group | Notes |
|------|-------|-------------|-------|
| Quests | `quests` | athena-gamification | `name`/`quest_type`/`difficulty`; `objectives`/`rewards` are Json (rendering beyond string-lists waits for row 10) |
| Bubbles | `bubbles` | athena-gamification | points + colors DERIVE from `rarity`; collections resolve via `collection_sets` (hestia-core); pops record to `vessel_bubbles` (hestia-core). **The game has NO tiers** (detiered 2026-07-31, KP's word): flat charter caps — 500 points/day · 100 pops/hour — every rarity open to every vessel; personal boundaries device-local, always allowed lower |
| Courses | `learning_paths` | athena-gamification | `name`/`path_type`/`difficulty`/`estimated_duration`; **CourseDetail walks the path** — `path_lessons` (ordered, via the generated route) joined to published lessons, rendered as numbered steps, no completion percentages |
| Lessons | `lessons` | athena-gamification | `lesson_type`; `content` is Json (body/url shapes rendered, richer waits for row 10) |
| Knowledge | `mythology` | athena-gamification | RETURNED at KP's word 2026-07-29 (docs/sql/005); story-frames shape: `story` + `teachings` + `provenance` (the myth lane's law, docs/sql/007) |
| Badges | `sigils` | athena-gamification | the badge successor; `rarity`/`category`/`icon_emoji` |

**Cross-realm seams:** the collection machinery (`vessel_bubbles`,
`collection_sets`, `vessel_sigils`, `vessel_quests`) is the Hearth's
(hestia-core); this realm reads/writes it only through the generated
doors.

## 🔒 RLS / Doors

Base-wide posture (see `docs/sql/004` + `006`): RLS ON everywhere,
grants restored for `anon`/`authenticated`, content tables readable
through published-gate policies — **extended to the anon door for all
Library shelves by `docs/sql/009`** (the policies said "Anyone"; 009
made the roles agree, so signed-out browsing works). New tables follow
the ritual: `resonance-grammar/docs/sql/000-NEW-TABLE-RITUAL.md`.

## 🌱 Seeded (2026-07-30, KP's hand, `docs/sql/008`)

5 collections · 30 bubbles (rarity census 10/8/6/4/2) · 10 sigils
(markers of becoming) · 6 opt-in quests · The Settled Tongue (1 course
→ 6 lessons via `path_lessons`) · 1 Archive scroll (docs/sql/005+007).
All anon-door verified.

---

## ⏳ Remaining Work

| Task | Owner |
|------|-------|
| More scrolls for the Archive | the myth lane's looms, KP's eye per scroll |
| Row 10 design sitting (dailies, Json shapes, Grammar data contract) | KP convenes; opening frame waits on the REALM-BUS |
| 🚩 VITAL-REVISIT trio: completion_points math · sigil award triggers · quest submission machinery | with row 10 or its own sitting |

---

## 🎯 Realm law

The Floating Stars game guards against its own compulsion loop
(breath reminders, limits kept as a device-local boundary) — nothing
built or redrawn in this realm may undo that. Attention returned,
never harvested.

*Built with sovereignty. The Library is open.* 🦉✨
