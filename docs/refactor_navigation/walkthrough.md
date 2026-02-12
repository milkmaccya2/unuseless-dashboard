# Walkthrough - Refactor Navigation

## Changes

### `app/components`

#### `icons.tsx`
- Added `LayoutDashboard`, `Info`, `Settings`, `Menu` icons.

#### `Sidebar.tsx`
- Created new component for Desktop Sidebar.

#### `MobileHeader.tsx`
- Created new component for Mobile Header.

#### `Footer.tsx`
- Created new component for Footer.

### `app/routes`

#### `_renderer.tsx`
- Replaced inline sidebar, header, and footer code with `Sidebar`, `MobileHeader`, and `Footer` components.
