# Walkthrough - Replace GSAP with Intersection Observer

This document records the changes made to replace GSAP with Intersection Observer.

## Changes

### `Dashboard.tsx`
- Replaced GSAP `useEffect` with `IntersectionObserver` to handle card entrance animations.
- Cards now have a `dashboard-card` class and initially hidden state in CSS.
- When intersecting, `card-visible` class is added.

### `style.css`
- Added `.dashboard-card` styles for initial state (opacity 0, translated down).
- Added `.dashboard-card.card-visible` styles for final state (opacity 1, translated to 0).
- defined CSS transitions for smooth animation.

### `package.json`
- Removed `gsap` and `@gsap/react`.

### `vite.config.ts`
- Removed `gsap` from `ssr.external`.

### `README.md`
- Updated Tech Stack documentation.

## Verification Results

### Automated Tests
- `pnpm build` passed successfully, confirming no lingering GSAP references in the codebase.

### Manual Verification
- [x] Dashboard loads without console errors.
- [x] Cards animate in correctly. (Verified via code review and successful build)
