# 🦉 ATHENA — The Library

**Feeling:** Peaceful, wise, expansive, curious  
**Environment:** `library` (Ancient, Awe-inspiring variants)  
**Status:** ✅ All pages built | ⏳ Detail pages for courses, lessons, knowledge

---

## 📂 Route Structure

```
src/app/(athena)/
├── library/
│   ├── page.tsx                      # ✅ The Library hub (/library)
│   │
│   ├── quests/
│   │   ├── page.tsx                  # ✅ The Path — quests gallery (/library/quests)
│   │   └── [id]/
│   │       └── page.tsx              # ✅ Quest Detail (/library/quests/[id])
│   │
│   ├── bubbles/
│   │   ├── page.tsx                  # ✅ The Floating Stars — bubbles gallery (/library/bubbles)
│   │   └── [slug]/
│   │       └── page.tsx              # ✅ Bubble Detail (/library/bubbles/[slug])
│   │
│   ├── courses/
│   │   ├── page.tsx                  # ✅ The Curriculum — courses gallery (/library/courses)
│   │   └── [slug]/
│   │       └── page.tsx              # ⏳ Course Detail (/library/courses/[slug])
│   │
│   ├── lessons/
│   │   ├── page.tsx                  # ✅ The Lessons — lessons gallery (/library/lessons)
│   │   └── [slug]/
│   │       └── page.tsx              # ⏳ Lesson Detail (/library/lessons/[slug])
│   │
│   ├── knowledge/
│   │   ├── page.tsx                  # ✅ The Archive — knowledge gallery (/library/knowledge)
│   │   └── [slug]/
│   │       └── page.tsx              # ⏳ Scroll Detail (/library/knowledge/[slug])
│   │
│   └── badges/
│       ├── page.tsx                  # ✅ The Honors — badges gallery (/library/badges)
│       └── [slug]/
│           └── page.tsx              # ✅ Badge Detail (/library/badges/[slug])
```

---

## 📊 Component Map

| Page | Server Page | Client Component | Location |
|------|:----------:|-----------------|----------|
| Library Hub | `library/page.tsx` | `LibraryHub` | `components/asgard/domains/athena/library/LibraryHub.tsx` |
| Quests Gallery | `library/quests/page.tsx` | `QuestsGallery` | `components/asgard/domains/athena/quests/QuestsGallery.tsx` |
| Quest Detail | `library/quests/[id]/page.tsx` | `QuestDetail` | `components/asgard/domains/athena/quests/QuestDetail.tsx` |
| Bubbles Gallery | `library/bubbles/page.tsx` | `BubblesGallery` | `components/asgard/domains/athena/bubbles/BubblesGallery.tsx` |
| Bubble Detail | `library/bubbles/[slug]/page.tsx` | `BubbleDetail` | `components/asgard/domains/athena/bubbles/BubbleDetail.tsx` |
| Courses Gallery | `library/courses/page.tsx` | `CoursesGallery` | `components/asgard/domains/athena/courses/CoursesGallery.tsx` |
| Course Detail | `library/courses/[slug]/page.tsx` | ⏳ Not built | — |
| Lessons Gallery | `library/lessons/page.tsx` | `LessonsGallery` | `components/asgard/domains/athena/lessons/LessonsGallery.tsx` |
| Lesson Detail | `library/lessons/[slug]/page.tsx` | ⏳ Not built | — |
| Knowledge Gallery | `library/knowledge/page.tsx` | `KnowledgeGallery` | `components/asgard/domains/athena/knowledge/KnowledgeGallery.tsx` |
| Scroll Detail | `library/knowledge/[slug]/page.tsx` | ⏳ Not built | — |
| Badges Gallery | `library/badges/page.tsx` | `BadgesGallery` | `components/asgard/domains/athena/badges/BadgesGallery.tsx` |
| Badge Detail | `library/badges/[slug]/page.tsx` | `BadgeDetail` | `components/asgard/domains/athena/badges/BadgeDetail.tsx` |

---

## 🗄️ Data Sources

| Gallery | Table | Deity Group | Public SELECT Policy |
|---------|-------|------------|:---:|
| Quests | `quests` | athena-gamification | `is_active = true` |
| Bubbles | `bubbles` | athena-gamification | `true` |
| Courses | `learning_paths` | athena-gamification | `is_published = true` |
| Lessons | `lessons` | athena-gamification | `is_published = true` |
| Knowledge | `mythology` | mnemosyne-assessment | ⚠️ Verify policy exists |
| Badges | `badges` | athena-gamification | `true` |

---

## 🔒 RLS Status

| Table | RLS Enabled | Policies |
|-------|:----------:|----------|
| `quests` | ✅ | Public can view active, Admins full access, Service role manage |
| `bubbles` | ✅ | Public can view all |
| `badges` | ✅ | Public can view all, Admins full access |
| `learning_paths` | ✅ | Public can view published, Creators manage own |
| `lessons` | ✅ | Public can view published, Creators manage own, Admins full |
| `path_lessons` | ✅ | Public can view |
| `user_quests` | ✅ | Users view/manage own |
| `user_badges` | ✅ | Users view/update own |
| `user_bubble_pops` | ✅ | Users view/insert own |
| `user_bubble_limits` | ✅ | Users view/update own |
| `mythology` | ✅ | ⚠️ Verify policy |

---

## ⏳ Remaining Work

| Task | Priority |
|------|:--------:|
| Course Detail page (`/library/courses/[slug]`) | Medium |
| Lesson Detail page (`/library/lessons/[slug]`) | Medium |
| Scroll Detail page (`/library/knowledge/[slug]`) | Medium |
| Verify `mythology` table has public SELECT policy | High |
| Seed data for courses, lessons, and knowledge | High |

---

## 🎯 Pattern Reference

Every gallery follows this pattern:

1. **Server page** — imports `Page` from bifrost, renders client component
2. **Client gallery component** — `useState` + `useEffect` fetch from generated API
3. **Search + filter** — `useMemo` for filtering, search input + filter buttons
4. **Three states** — Loading (Skeleton), Empty (icon + message), Populated (Card grid)
5. **Card data** — Each item maps to a `CardData` object with `type` matching a renderer
6. **Navigation** — Back link to parent hub, links to detail pages

---

*Built with sovereignty. The Library is open.* 🦉✨
