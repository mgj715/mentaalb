## Plan

### Change 1: Build the About page

Create `src/pages/About.tsx` that reuses existing components to mirror the original homepage content below the entry points:

- `WhatIsMentaal` — existing component with description and video placeholder
- `FAQSection` — existing accordion with all FAQ items
- A soft closing section with the heading "Ready to find your space?" and two side-by-side buttons styled identically to the homepage entry-point cards:
  - "I'm exploring →" → `/exploring`
  - "I need tailored support →" → `/quiz`
- Wrap everything in the same layout shell as other pages (`SoftBackdrop`, `Header`, `Footer`, `max-w-md mx-auto`, etc.)

Add the `/about` route in `src/App.tsx`.

Update `src/components/Header.tsx` to include an "About" link in the hamburger menu.

Update `src/components/Footer.tsx` to point the "About" footer link to `/about` instead of `#`.

### Change 2: Subtle pointer in Your Space

In `src/pages/YourSpace.tsx`, just above the "Want to wander further?" section, insert a single line of small muted text:

> "New to Mentaal or want to learn more? → About Mentaal"

"About Mentaal" is a plain text link (`<Link>`) to `/about`. Styled with small font, muted color (`text-charcoal/55` or similar), no button styling. It should blend in for users who don't need it.

### What won't change
- Homepage (`Index.tsx`) — stays exactly as-is
- Quiz flow
- Your Space layout and existing sections
- Any other pages or components
