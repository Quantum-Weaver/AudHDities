-- ============================================================================
-- 012 — THE AVATARS BUCKET (RECORD OF APPLIED WORK — already live, do not
-- re-run; kept so the ledger holds every change made to the base)
-- ============================================================================
-- Applied 2026-07-30 by Fable (lane hestia-realm) at KP's ⚛ word ("we need
-- the bucket for vessel profile image created please") — bucket via the
-- storage API (server key), policies via the management API, both verified
-- the same sitting.
--
-- The bucket, matched to the app's own validators
-- (avatar_upload.constants.ts: AVATAR_STORAGE_BUCKET='avatars', 5MB max,
-- png/jpeg/webp/gif; upload path `<userId>/avatar-<timestamp>.<ext>`;
-- getPublicUrl => bucket must be public):
--
--   id/name:            avatars
--   public:             true
--   file_size_limit:    5242880 (5MB — the app's own ceiling)
--   allowed_mime_types: image/png, image/jpeg, image/webp, image/gif
--
-- The walls on storage.objects (uploads run in the browser as
-- authenticated; ownership = the first path folder is your own uid,
-- which is exactly the path shape generateAvatarPath writes):

-- ~~CREATE POLICY "Avatar images are publicly viewable" ...~~ — DROPPED the
-- same sitting (linter's catch, KP's paste): a PUBLIC bucket serves object
-- URLs with no SELECT policy at all; the broad policy only added a
-- list-all-files door nobody needed (the app's getPublicUrl is pure URL
-- construction, no API call). Struck through, not erased — the record of
-- a door opened and closed the same hour is itself worth keeping.

CREATE POLICY "Vessel uploads own avatar" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Vessel updates own avatar" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Vessel deletes own avatar" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Verified live 2026-07-30: bucket confirmed via storage API (public,
-- limits as above); final policy set on storage.objects = exactly three
-- (upload/update/delete, own-folder only). Reads ride the bucket's own
-- public-URL door; listing is nobody's.
-- ============================================================================
