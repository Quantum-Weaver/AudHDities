# Prometheus: The Rendering

**Date:** 2026-08-24  
**Read by:** Haiku, machine census  
**Realm:** 5 (Prometheus) — Stage & Studio  

---

The prometheus section stands as two clean halves, each bearing a different weight.

**The Stage** is wired. Every chamber (comedy, music, live, recordings, schedule) pulls from the same `/api/generated/prometheus-stage/events` surface—a simple well, accessed 10 times across 11 components, each fetch a directed question asking for a subset or single record. The patterns repeat: gallery fetches the list, detail pages fetch by id. No clever caching, no hooks beyond what React's useEffect provides. The components know what they need and ask for it.

The nine detail pages wrap that data in cards and metadata. They are user-facing boundaries: buttons lead in, copy reads from fields, empty states acknowledge absence. The language here is honest—"The hearth is quiet for now", "This performance has ended." No artificial urgency. But two words ring loud: "live" appears 14 times, "now" appears 9 times, both used exactly where they belong—naming the live broadcast rooms and the present-tense stages. The opt-in law holds.

**The Studio** is a scaffold with one house. Music Studio renders `StudioPageTemplate`—a server component that takes an icon and description as props and builds a single card. Eight siblings (art, animation, audio, video, writing, graphics, effects, export) have placeholder pages—empty `<main>` elements with a comment promising content. No component imports, no API calls, no state. They exist to route; their UI lives ahead of them.

The two halves speak in different tenses. Stage speaks in retrieval—it reads live data and makes it visible. Studio speaks in preparation—its single full room prepares music, its eight empty rooms wait for their instruments.

All paths resolve through PAGE_ENVIRONMENT_MAP to their rightful environments (music gets 11 routes, community gets 2, lounge gets 4, architecture gets 2, and smaller anchors). EnvironmentLayer wraps every page. No import fails.

The machine count is reliable. No padding, no estimation. Thirty-six files, 1,284 lines, every line read.
