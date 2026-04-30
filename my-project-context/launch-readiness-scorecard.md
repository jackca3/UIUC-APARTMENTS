# Launch Readiness Scorecard

**Product:** Apt.ly  
**URL:** https://uiuc-apartments-two.vercel.app/  
**Date:** April 27, 2026  
**Assessment basis:** Source-code audit, prior user feedback, current route structure, and production build verification. This is a strong code-level readiness review, but not a full manual click-test on every live screen size.  
**Overall Readiness:** ALMOST READY

---

| Dimension | Status | Key Finding | Priority Fix |
|-----------|--------|-------------|--------------|
| Broken Links & Navigation | WARN | Core routes exist, but user expectations can break because homepage review counts are hardcoded and login/review entry points are still not always obvious. | Replace hardcoded homepage counts with real aggregated counts and add clearer “write review” entry cues. |
| Mobile Responsiveness | WARN | The app uses responsive grids and breakpoints well, but several pages rely on oversized typography, dense card layouts, and long buttons that still need real phone-width QA. | Run a focused phone-width pass on home, apartment detail, write-review, and content pages. |
| Empty States & Edge Cases | PASS | Empty states exist in important areas like favorites, reviews, drafts, and search results, and many of them include next-step CTAs. | Keep these patterns and add one more empty state for low-data homepage scenarios if featured apartments filter down to zero. |
| Error Handling | FAIL | The biggest launch risk: the data layer silently falls back to mock data when Supabase errors or returns nothing, which can make a live trust product feel fake. | Remove silent mock fallbacks in production and show honest error/loading states instead. |
| SEO Basics | WARN | Global metadata exists, but it is generic. Apartment detail pages, reviews, and other important routes do not appear to have route-specific metadata. | Add page-specific titles and descriptions, especially for apartment detail and reviews pages. |
| Accessibility | WARN | There is solid use of buttons and links, but very small uppercase text, image-heavy cards, and at least one icon-only favorite button without a clear label create usability risk. | Add missing labels, increase readability of tiny utility text, and run a keyboard/screen-reader pass on key flows. |

**Score:** 1/6 passing, 4 warnings, 1 failing dimension.  
**Summary:** Apt.ly is structurally close to launch, but trust and clarity issues need attention before pushing harder on acquisition. The app already looks polished and has good empty-state coverage, but the silent mock-data fallback and inconsistent review signaling are real credibility risks for early users.

---

## Detailed Findings

### 1. Broken Links & Navigation
**Status:** WARN

**What looks good**
- The main app routes exist and build successfully: home, apartments directory, apartment detail, write review, auth, profile, reviews, and content pages.
- Navigation includes clear top-level entry points for Apartments, Reviews, and Content.
- Apartment detail pages provide strong local navigation back to the directory and into review-writing.

**What is risky**
- The homepage featured cards currently pass hardcoded review counts (`1` for one apartment ID, `0` for everything else). That creates a direct trust mismatch when a user clicks into a building and sees a different review reality.
- Prior user testing already said the write-review flow was “not obvious at first,” which means navigation is functional but still not self-explanatory.
- Login requirements still become clear too late in some flows. Students may browse freely, then only discover the verification requirement when they try to contribute.

**Launch impact**
- This does not fully break the app, but it does weaken credibility fast, especially for a product whose whole value proposition is “trustworthy student information.”

### 2. Mobile Responsiveness
**Status:** WARN

**What looks good**
- The codebase consistently uses responsive utility classes (`md:`, `lg:`, `xl:`).
- Major pages are built with stacked mobile-first layouts before expanding into larger grids.
- Buttons and touch targets are generally generous in size.

**What is risky**
- Several pages use extremely large headings, tall button treatments, and high-density card layouts that may feel heavy or awkward on smaller screens.
- The apartment detail page and write-review page are especially information-dense and would benefit from real-device checks on narrow widths.
- The mobile menu exists, but this audit did not manually confirm every open/close path on the live deployment.

**Launch impact**
- This is likely good enough for soft launch, but not good enough to assume “mobile is done” without a short QA pass.

### 3. Empty States & Edge Cases
**Status:** PASS

**What looks good**
- Favorites page has a clear empty state with a recovery CTA.
- Apartment detail pages have a good “no reviews yet” state with a strong first-review call to action.
- Apartments directory has a meaningful no-results state and a helpful “add missing building” path.
- Draft queue and other newer flows also include explicit empty states instead of blank containers.

**Remaining edge cases**
- If the homepage featured-apartment filter excludes too many buildings, the page could end up looking sparse without a stronger fallback explanation.
- Data-poor apartment pages still rely heavily on users contributing the first review, so content depth remains a product risk even when the UI handles it gracefully.

**Launch impact**
- This area is stronger than most student products and is not the main blocker.

### 4. Error Handling
**Status:** FAIL

**What looks good**
- Review submission paths use `try/catch` and show user-facing toast feedback on failure.
- Verification and several server routes return explicit JSON error messages.
- Loading states exist across key pages.

**What is risky**
- The API layer silently falls back to mock apartments or mock reviews when Supabase is not configured, returns no data, or throws certain query errors.
- In a live student trust product, showing mock content when the real database fails is dangerous because users cannot tell whether the information is real.
- The product promise is “verified student reviews.” Silent fallback behavior undermines that promise more than a visible error state would.

**Launch impact**
- This is the biggest blocker in the entire audit.
- If real data fails and fake fallback content appears, early users may conclude the platform is unreliable or manufactured.

### 5. SEO Basics
**Status:** WARN

**What looks good**
- The app has a root-level metadata title and description.
- Page structure generally includes strong visible headings.

**What is missing**
- The metadata is generic and does not reflect page-level intent.
- Apartment detail pages do not appear to define their own titles/descriptions.
- Reviews and content pages would also benefit from clearer metadata if you want discoverability beyond direct campus sharing.

**Launch impact**
- This will not block a friends-and-classmates soft launch, but it limits search visibility and polish.

### 6. Accessibility
**Status:** WARN

**What looks good**
- Most user actions are built with standard buttons and links instead of custom div click-handlers.
- Many images include `alt` text.
- Keyboard focus should work reasonably well through standard components.

**What is risky**
- The design uses a lot of tiny uppercase helper text (`10px`-style microcopy), which can hurt readability.
- Some interactive icon treatments are visually clear but not always equally clear for assistive tech.
- The apartment detail favorite button is a likely example where a more explicit accessible label would help.

**Launch impact**
- Not a hard blocker for a soft student launch, but this should be improved before broader growth.

---

## Most Important Launch Risks

### 1. Trust risk from fallback behavior
If the real database fails and users see fallback content, the product loses its core promise.

### 2. Trust risk from inconsistent review signaling
If the homepage says “no reviews” and the detail page says otherwise, students will question the product’s reliability.

### 3. Adoption risk from contribution friction
Students already said the review flow is not always obvious and login expectations can be unclear.

---

## Board Memo Talking Point
"We ran a 6-dimension launch readiness audit covering navigation, mobile responsiveness, empty states, error handling, SEO, and accessibility. Apt.ly is close to launch but not fully ready. The highest-priority issue is trust protection: we need to remove silent mock-data fallback behavior and tighten review-count consistency before scaling traffic."
