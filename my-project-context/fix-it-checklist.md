# Launch Readiness Fix-It Checklist

**Product:** Apt.ly  
**Generated:** April 27, 2026  
**Scorecard result:** 1/6 passing, 4 warnings, 1 fail  

Fixes are ordered by impact, highest first.

---

## Critical (Fix Before Launch)
- [ ] **Remove silent mock-data fallback in production** — When Supabase errors or returns no data, the live app should show a real error state or “no data yet” state, not fallback content that can be mistaken for real student information.
  - Dimension: Error Handling
  - Effort: Half-day

- [ ] **Fix homepage review-count mismatch** — The homepage currently injects hardcoded review counts into featured apartment cards. Replace this with real aggregated counts so homepage and detail-page expectations match.
  - Dimension: Broken Links & Navigation
  - Effort: Quick fix

- [ ] **Clarify when login is required to contribute** — Add clearer messaging near review CTAs so students understand they can browse freely but must verify with `@illinois.edu` to post.
  - Dimension: Broken Links & Navigation
  - Effort: Quick fix

## Important (Fix This Week)
- [ ] **Run a real mobile QA pass on the top 4 screens** — Test home, apartments directory, apartment detail, and write-review on phone width and note any spacing, overflow, or button issues.
  - Dimension: Mobile Responsiveness
  - Effort: Half-day

- [ ] **Add route-specific metadata** — Give apartment pages, reviews, and major discovery pages their own titles and descriptions instead of relying only on the global default.
  - Dimension: SEO Basics
  - Effort: Quick fix

- [ ] **Strengthen accessibility on icon-heavy controls and microcopy** — Add missing labels to interactive icon buttons and reduce reliance on very small uppercase helper text.
  - Dimension: Accessibility
  - Effort: Half-day

- [ ] **Tighten review submission confidence messaging** — Since user testing flagged submission reliability concerns, add clearer success/failure confirmation and verify the full happy path once on the live site.
  - Dimension: Error Handling
  - Effort: Half-day

## Nice to Have (Polish When You Can)
- [ ] **Add a low-data homepage fallback** — If too few featured apartments qualify for the homepage grid, show a stronger message or alternate featured set instead of relying on a thin layout.
  - Dimension: Empty States & Edge Cases
  - Effort: Quick fix

- [ ] **Improve apartment contribution prompts** — Add stronger hints for adding missing buildings and leaving first reviews to help solve the “coverage gap” problem faster.
  - Dimension: Empty States & Edge Cases
  - Effort: Quick fix

- [ ] **Add simple analytics on review-start and review-submit events** — This will make it easier to tell whether user drop-off is happening at login, verification, or the form itself.
  - Dimension: Operations / Error Handling
  - Effort: Half-day

---

## Recommended Order
1. Remove production mock fallback
2. Fix homepage review counts
3. Clarify login/verification expectations
4. Run a mobile QA pass
5. Improve metadata and accessibility polish

---

## Board Memo Talking Point
"We completed a launch readiness audit and identified the highest-priority fixes before broader rollout. The top issue is protecting trust: Apt.ly must never blur real student data with fallback content. We also identified quick wins around review-count consistency, login clarity, and mobile QA."
