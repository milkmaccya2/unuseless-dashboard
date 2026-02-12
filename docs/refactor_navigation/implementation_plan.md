# Implementation Plan - Refactor Navigation

The goal is to extract the usage of Sidebar and Mobile Header (and potentially Footer) from `app/routes/_renderer.tsx` into separate components to improve maintainability and readability.

## User Review Required
> [!IMPORTANT]
> This is a pure refactor. No new visual features will be added.

## Proposed Changes

### `app/components/icons.tsx`
- Add `LayoutDashboard`, `Info`, `Settings`, `Menu` icons to support the extracted components.

### `app/components/Sidebar.tsx`
- New component containing the desktop sidebar logic (currently lines 24-58 of `_renderer.tsx`).
- Will import icons from `./icons.tsx`.

### `app/components/MobileHeader.tsx`
- New component containing the mobile header logic (currently lines 62-73 of `_renderer.tsx`).
- Will import icons from `./icons.tsx`.

### `app/routes/_renderer.tsx`
- Import `Sidebar` and `MobileHeader`.
- Replace the inline JSX with the component usage.

## Verification Plan

### Automated Tests
- Build verification: `npm run build` (or equivalent if available, purely to check for TS errors).
- Lint check: `npm run lint` (if available), or rely on editor checks.

### Manual Verification
- Start the dev server: `npm run dev`.
- 1. Open the dashboard on Desktop size (>1024px usually `lg` in Tailwind) and verify the Sidebar appears and looks identical to before.
- 2. Resize to Mobile size and verify the Mobile Header appears and looks identical to before.
- 3. Verify links still point to the correct places.
