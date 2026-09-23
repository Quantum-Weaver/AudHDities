# Support cadences in the Loom — realm journal

## What was built

- `src/lib/economics/recurrence.ts:26-40` — the three cadence labels in plain words (`One time — nothing repeats`, `Each month, until it is ended`, `Each month, until a date you set`); `SUPPORT_END_DATE_NEEDED`, the words a form says when the cadence is until a date and no date is named; `supportEndsAtForCadence(cadence, dateInput)`, returning the ISO end for `month_until`, null for the other two, undefined when `month_until` carries no date.
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx:21-25, 182-186` — the write reads the end through `supportEndsAtForCadence` and refuses to save `month_until` without a date.
- `src/components/asgard/domains/hermes/studio/StudioEdit.tsx:21-28, 120-125` — the same on the edit face.

## The design

`SUPPORT_CADENCES` is the one list both forms read. `cadenceOf` reads a saved ware back as `once`, `month` or `month_until`; `dateInputFromSupportEndsAt` fills the date field. `WareDetail.tsx:171-190` tells each cadence: no renewal line for one time, "until you end it" for each month, "until <date>, then stops on its own" for until a date.

## What stands

- The select offers all three in both forms; `billing_interval` is written as null for one time and `month` otherwise.
- Probe: `supportEndsAtForCadence` gives null, null, the ISO, undefined for once, month, month_until with a date, month_until without; `cadenceOf` reads back once, month, month_until.

## What waits

- `src/lib/generated/validators/plutus-economics/wares.ts:46-104` has no `support_ends_at` in `WaresInsertSchema` or `WaresUpdateSchema`, and `src/lib/generated/supabase/database.types.ts:6004` has none on `wares`. `zod`'s `z.object` strips unknown keys, so `POST /api/generated/plutus-economics/wares` and `PUT .../wares/[id]` drop the end date before the insert and update. Probe: `insert keeps support_ends_at: false`, `update keeps support_ends_at: false`. The end date lands once `docs/sql/053-the-standing-support-ends.sql` stands in the live base and the generated types, validators and routes are regenerated from `resonance-gaia`.
- Until then an edit that moves only the end date reports `Work updated.` while nothing is saved (`StudioEdit.tsx:136-154`).

## Files

- `src/lib/economics/recurrence.ts`
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx`
- `src/components/asgard/domains/hermes/studio/StudioEdit.tsx`

A hand dealt by Thermocline (Fable) built this at KP's word, 2026-09-23.
