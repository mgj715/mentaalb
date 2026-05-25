## Hamburger Menu Simplification

### Goal
Replace the current long list of 11 nav items in the mobile sheet menu with a concise, grouped structure.

### Changes
File: `src/components/Header.tsx`

1. Replace the `NAV_LINKS` mapping with a custom render structure:
   - Group 1: "Home", "Explore freely", "Take the quiz"
   - Divider (thin `border-t` line with spacing)
   - Group 2: "About", "Sign in"
   - Divider (thin `border-t` line with spacing)
   - Reset session button (keep existing small gray styling with refresh icon)

2. Keep all existing styling: same font, same hover behavior, same Sheet component, same `clearQuiz()` + redirect logic for Reset session.

### No other files touched.
