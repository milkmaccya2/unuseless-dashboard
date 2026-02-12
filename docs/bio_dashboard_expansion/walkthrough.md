# Walkthrough - Bio & Geo Dashboard Expansion

## Changes Made

### Bio Metrics (Real-time)
- **Hair Growth**: Calculates total hair length produced since birth (0.4mm/day).
- **Nail Growth**: Calculates total nail length produced (all 20 nails).
- **Heartbeat**: Estimates total heartbeats (80 bpm).
- **Saliva Lake**: Estimates total saliva produced (1.5L/day).

### Regional Metrics (Prefecture-based)
- **Mikan Consumption**: Skewed for Ehime, Wakayama, Oita, etc.
- **Gyoza Consumption**: Skewed for Miyazaki, Kyoto, Tochigi (Utsunomiya), Shizuoka (Hamamatsu).

### UI/UX Updates
- **Onboarding**: Added **Prefecture Selector** to input screen.
- **Dashboard**: Added "Regional Metrics" section.
- **Icons**: Migrated to `lucide-react` for better icon support.
- **Visuals**: Added new accent colors (Red, Orange, Yellow) to `Card` component.

## Verification
- Build passed (`pnpm build`).
- Verified logic for regional skewing (High/Low prefecture rates).
- Verified real-time animation loops (`requestAnimationFrame`).
