# Implementation Plan - Replace GSAP with Intersection Observer

This plan outlines the steps to remove GSAP dependencies and verify the Intersection Observer implementation.

## Proposed Changes

### Configuration Cleanup

#### [package.json]
- Remove `gsap` and `@gsap/react` from dependencies.
- Execute `pnpm remove gsap @gsap/react` to update `pnpm-lock.yaml`.

#### [vite.config.ts]
- Remove `gsap` from `ssr.external` array.

#### [README.md]
- Remove GSAP from the "Animation" row in the Tech Stack table.

### Verification Plan

#### Automated Tests
- Verified `pnpm build` passed successfully.

#### Manual Verification
- [x] Run `pnpm dev`.
- [x] Check if the dashboard loads correctly without errors.
- [x] Confirm that cards animate in (fade in and slide up) as you scroll or on initial load.
- [x] specific focus on `Dashboard.tsx` functionality.
