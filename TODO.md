- [ ] Investigate why clicking “Overview” moves the timeline card only (inspect history.tsx state/visibility/DOM layout).
- [ ] Reproduce issue: compare behavior when clicking year ranges vs Overview.
- [ ] Fix layout shift by ensuring cards are not removed/reflowed or sticky column remains stable.
- [ ] Verify styles/transition logic (no height:auto transitions causing jump).
- [ ] Build/test the app to confirm no regression.

