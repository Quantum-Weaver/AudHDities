# DISTRIBUTED MIRROR — the source of truth lives in resonance-awen

The envelope's single editable truth is:

    ../resonance-awen/tools/the-envelope/src/index.ts
    ../resonance-awen/tools/the-envelope/src/host-surface.ts

Source: `the-envelope` v0.1.0.

Do not edit these two files here — they are byte-faithful mirrors:

    index.ts         sha256 b52f553e8cbdecea3071c8ff20a2a2774de5087f265d66a7003852aa32d84b89
    host-surface.ts  sha256 ebe4334cfb2782af9edc8db655cae54a32678e292f02df9f1ed297feac4dc9c7

`host-surface.ts` carries the types `index.ts` imports.
The two reference hosts under the tool's `src/hosts/` are not mirrored: the
Sanctuary's host is the uploaded request, in
`src/app/api/auth/import/route.ts`.

The site uses `open`, `openFrom` and `ENVELOPE`. It seals nothing: the apps
seal, the site reads. The envelope is
`{ envelope, envelopeVersion, app, appVersion, exportedAt, counts, data }`,
counted on the outside; the per-app readers under `src/lib/import/` take
`data` and land it.
