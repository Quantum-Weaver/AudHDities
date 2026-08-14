-- ============================================================================
-- 005 — MYTHOLOGY RETURNS: the Archive's source comes home
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane athena-realm) for KP's dashboard hand —
-- the two-hand rhythm. Run ONCE, top to bottom.
--
-- Provenance:
--   KP's word (2026-07-29, verbatim, spelling kept): "i intend to bring
--     mythology back, it was dropped simply because it had no data and was
--     considered for the resonamce-knowledge base, but it belongs here i
--     think." (Supersedes the Superposition Review's Grammar earmark; the
--     drop — 2026-07-28, KP's hand — was for emptiness, not wrongness.)
--   The shape: excavated whole from the pre-drop typegen (git c4e20332~1,
--     database.types.ts) — the table had ALREADY been through the schema
--     evolution (name/slug/status dialect). This is a restoration, not a
--     redesign. Design rulings at the realm bus (src/app/(athena)/
--     REALM-BUS.md), KP's yes 2026-07-30:
--       * Hearth pattern — this table is the shared canon; personal
--         story-frames arrive as vessel_mythologies when their day comes.
--       * myth_type stays plain text until the vocabulary settles in real
--         data (ritual lesson: enums bite at insert time). Promote at row 10
--         if it stabilizes.
--       * deity_group: athena-gamification — the Archive is Athena's hall
--         (the ledger's listing; the old mnemosyne-assessment wires were the
--         disagreement, and the registry row below settles it).
--   One assumption for the dashboard's eye: created_by/updated_by drafted
--     as uuid (the typegen renders uuid and text identically; uuid is the
--     house's auth-adjacent convention). No FK on purpose — the pre-drop
--     table carried none (Relationships: []).
--
-- Laws worn: the new-table ritual (resonance-grammar/docs/sql/000 — RLS +
-- door, plain statements, no DO blocks) · the 004 lesson (GRANTs open the
-- door; RLS decides which rows walk through) · anti-scarcity (nothing here
-- gamifies; the Archive is shelves, not chase).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — THE TABLE (the excavated shape, whole)
-- ----------------------------------------------------------------------------

CREATE TABLE public.mythology (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  slug                text NOT NULL UNIQUE,
  description         text,          -- the card's short truth (gallery preview)
  story               text,          -- the telling itself (detail page body)
  teachings           text,          -- what the telling carries
  myth_type           text,          -- plain text until the vocabulary settles
  related_entity      text,          -- a myth may point at anything in the house
  related_entity_type text,          --   (council seat, realm, person, place)
  icon_url            text,
  display_order       integer NOT NULL DEFAULT 0,
  status              public.content_status NOT NULL DEFAULT 'draft',
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  created_by          uuid,
  updated_by          uuid
);

COMMENT ON TABLE public.mythology IS
  'The Archive''s source: story-frames, shared canon (the Hearth pattern — personal frames arrive vessel-side when their day comes). Returned at KP''s word 2026-07-29 after the 07-28 prune; shape restored from the pre-drop typegen.';

-- ----------------------------------------------------------------------------
-- STEP 2 — THE DOORS (grants first, then RLS, then the one clean policy —
-- the 004 lesson: a policy without grants still reads 42501)
-- ----------------------------------------------------------------------------

GRANT SELECT ON public.mythology TO anon, authenticated;

ALTER TABLE public.mythology ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published mythology"
  ON public.mythology FOR SELECT
  USING (status = 'published');

-- Writes stay with the service key; no anon/authenticated write policies.

-- ----------------------------------------------------------------------------
-- STEP 3 — THE REGISTRY (gaia_config: revive the old row if the prune left
-- one behind, else lay a fresh one; guarded plain statements, no DO blocks)
-- ----------------------------------------------------------------------------

UPDATE public.gaia_config
   SET deity_group = 'athena-gamification',
       is_active   = true,
       status      = 'active',
       notes       = 'Returned at KP''s word 2026-07-29 — dropped 07-28 for emptiness only; the Archive (athena realm) is its hall. Shape restored from pre-drop typegen; see docs/sql/005.'
 WHERE table_name = 'mythology';

INSERT INTO public.gaia_config (table_name, deity_group, notes)
SELECT 'mythology', 'athena-gamification',
       'Returned at KP''s word 2026-07-29 — dropped 07-28 for emptiness only; the Archive (athena realm) is its hall. Shape restored from pre-drop typegen; see docs/sql/005.'
 WHERE NOT EXISTS
       (SELECT 1 FROM public.gaia_config WHERE table_name = 'mythology');

-- ----------------------------------------------------------------------------
-- STEP 4 — VERIFY (expect: the table standing + RLS on + one policy + one
-- registry row; the row count reads 0 and that is honest — the shelves wait
-- for their first scrolls)
-- ----------------------------------------------------------------------------

SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
 WHERE n.nspname = 'public' AND c.relname = 'mythology';

SELECT policyname, cmd FROM pg_policies
 WHERE schemaname = 'public' AND tablename = 'mythology';

SELECT table_name, deity_group, status, is_active
  FROM public.gaia_config WHERE table_name = 'mythology';

SELECT count(*) AS scrolls FROM public.mythology;

-- ----------------------------------------------------------------------------
-- AFTER THE RUN (Fable's side, at KP's word): typegen repull + GAIA regen
-- rebirth the generated types/routes/hooks under athena-gamification; the
-- Archive's two components then retrue to the returned shape as part of the
-- realm's rewiring season. Anon-door verify from the workspace after regen.
-- ============================================================================
