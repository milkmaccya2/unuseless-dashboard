# Bio Dashboard Expansion Implementation Plan

## Goal Description
Expand the dashboard with 5 new "useless" bio-metrics based on birthdate, displaying cumulative life totals + real-time increments.

## Proposed Changes

### `app/islands`

#### [NEW] `HairGrowth.tsx`
- **Concept**: Calculate total hair length grown since birth.
- **Logic**: Birthdate inputs -> `(now - birth) * speed`.
- **Speed**: ~0.4mm/day (average scalp hair growth).
- **Animation**: `requestAnimationFrame` for real-time nanometer updates.

#### [NEW] `NailGrowth.tsx`
- **Concept**: Total length of all 20 nails grown.
- **Logic**: Fingers (~3.5mm/mo) + Toes (~1.6mm/mo) * 10 fingers/toes each.
- **Speed**: Combined ~51mm/month (~1.7mm/day).

#### [NEW] `MikanConsumption.tsx`
- **Concept**: Total Mandarin Oranges consumed.
- **Logic**: Base avg ~2.5kg/year.
- **Modifier**: Ehime/Wakayama = 15kg/year (High), Others = Base.
- **Input**: Requires Prefecture.

#### [NEW] `GyozaConsumption.tsx`
- **Concept**: Total Gyoza consumed.
- **Logic**: Base avg ~2000 yen/year (~400 pieces?).
- **Modifier**: Tochigi (Utsunomiya) / Shizuoka (Hamamatsu) = 4000 yen/year (~800 pieces).

#### [NEW] `Heartbeat.tsx`
- **Concept**: Total heartbeats.
- **Logic**: Avg 80 bpm (1.33 beats/sec).
- **Animation**: Pulse animation on update? Simple counter first.

#### [NEW] `SalivaLake.tsx`
- **Concept**: Total saliva produced.
- **Logic**: ~1.5 Liters/day (~0.017 ml/sec).
- **Display**: Liters + "Bathtubs" (approx 200L)? Just Liters for now.

### `app/islands/Dashboard.tsx`
- **Onboarding**: Add `Select` for Prefecture (1-47).
- **State**: Save `prefecture` to `localStorage` alongside `birthday`.
- **Layout**: Import new components and add to Grid.

## Verification Plan

### Manual Verification
1.  **Start Dev Server**: `pnpm dev`
2.  **Input Birthdate**: Use a known date (e.g., 2000-01-01).
3.  **Check Values**:
    - **Hair**: Should be around `AgeInYears * 15cm`. (e.g. 26 years -> ~3.9 meters).
    - **Heartbeat**: Should be increasing ~80 times/min.
    - **Saliva**: Should be increasing.
4.  **Real-time Update**: Verify numbers are ticking up smoothly.
5.  **Responsiveness**: Check mobile/desktop layout.
