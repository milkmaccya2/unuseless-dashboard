# Implementation Plan - Modern Dashboard Redesign

The goal is to transform the current "AI-generated" look into a premium, modern dashboard aesthetic (resembling highly polished SaaS products like Linear or Vercel).

## User Review Required
> [!IMPORTANT]
> I will be switching the default design to a **Dark Mode** aesthetic with high contrast and subtle borders, as this is currently the standard for "modern dashboards".

## Proposed Changes

### 1. Design System & CSS (`app/style.css`)
- **Theme**: Switch to a minimalist "Zinc/Slate" color palette.
- **Typography**: Keep "LINE Seed JP" but adjust tracking and line-heights for a tighter feel. Use `Inter` or system-ui for numbers if possible for tabular look.
- **Background**: Remove the pastel gradient. Use a solid deep background (`#09090b`) with subtle dot/grid pattern.
- **Glassmorphism**: Reduce heavy blur/opacity; use thin borders (`1px solid rgba(255,255,255,0.1)`) and subtle gradients.

### 2. Layout Structure (`app/routes/_renderer.tsx`, `app/components/Layout.tsx`)
- **Move to App Shell**: Instead of a centered container, use a full-screen App Shell.
    - **Sidebar**: Icons for navigation (Home, Settings, About).
    - **Header**: Breadcrumbs, Date/Time, Status indicator.
    - **Main Content**: Scrollable area.

### 3. Dashboard Grid (`app/islands/Dashboard.tsx`)
- **Bento Grid**: Use CSS Grid to make some cards span 2 columns or 2 rows.
    - *Example*: "Sea Level" or "ISS Tracker" map could be larger.
- **Sections**: Group "Body" stats and "World" stats.

### 4. Components
- **Card**:
    - Remove the top "accent bar".
    - Use a glowing border effect on hover or a simple scale.
    - Add "noise" texture to cards for a tactile feel.
- **Typography**:
    - Labels: Uppercase, tracking-wide, small text (e.g., `text-[10px] text-zinc-500`).
    - Values: Large, bold, tighter tracking.

## Verification Plan
### Automated Tests
- Run `npm run dev` to verify updated styles load correctly.
- Check console for any React/Hydration errors.

### Manual Verification
- Verify responsiveness (Mobile vs Desktop).
- Check contrast ratios.
- Verify animations (GSAP) still trigger correctly.
