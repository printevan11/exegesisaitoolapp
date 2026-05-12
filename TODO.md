# TODO

- [ ] Update `my-project/src/services/bibleService.js`
  - Remove all non-ESV translation IDs
  - Force default translation to ESV everywhere

- [ ] Update `my-project/src/pages/BibleReader.jsx`
  - Remove translations dropdown
  - Remove `selectedTranslation` state and other-translation references
  - Ensure UI always shows ESV

- [ ] Improve “chapter not available” handling in `BibleReader.jsx`
  - Better detection when API returns empty/null
  - Clearer user-facing error + safe empty-state

- [ ] Run project lint/build (best-effort)

