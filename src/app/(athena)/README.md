# 🦉 ATHENA — The Library

**Feeling:** Peaceful, wise, expansive, curious
**Environment:** `library` (Ancient, Awe-inspiring variants)
**Status:** ✅ All pages built and speaking the evolved schema (trued 2026-07-30, the rewiring season)

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
│   └── badges/
│       ├── page.tsx                  # ✅ The Honors — sigils gallery (/library/badges)
│       └── [slug]/page.tsx           # ✅ Sigil Detail (/library/badges/[slug])
```

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
| Bubbles | `bubbles` | athena-gamification | points + colors DERIVE from `rarity`; collections resolve via `collection_sets` (hestia-core); pops record to `vessel_bubbles` (hestia-core) |
| Courses | `learning_paths` | athena-gamification | `name`/`path_type`/`difficulty`/`estimated_duration` |
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
through published-gate policies. New tables follow the ritual:
`resonance-grammar/docs/sql/000-NEW-TABLE-RITUAL.md`.

---

## ⏳ Remaining Work

| Task | Owner |
|------|-------|
| Seed content — courses, lessons, quests | KP's content season |
| More scrolls for the Archive | the myth lane's looms, KP's eye per scroll |
| Row 10 design sitting (dailies, Json shapes, Grammar data contract) | KP convenes; opening frame waits on the REALM-BUS |

---

## 🎯 Realm law

The Floating Stars game guards against its own compulsion loop
(breath reminders, limits kept as a device-local boundary) — nothing
built or redrawn in this realm may undo that. Attention returned,
never harvested.

*Built with sovereignty. The Library is open.* 🦉✨
