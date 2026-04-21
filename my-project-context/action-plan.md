# User Feedback Action Plan

**Product:** Apt.ly  
**Feedback Source:** Checkpoint 4 user testing  
**Total Items Analyzed:** 13

---

## Priority 1: Strengthen the trust and review loop
**Impact:** This directly affects whether students can log in, contribute reviews, and trust the platform's core value proposition. Fixing it should improve both review volume and user confidence.  
**Root Cause:** Authentication reliability and review submission reliability are weak points in the exact workflow that makes Apt.ly valuable.  
**Specific Action:** Audit the login flow and Supabase auth states, add clearer UI around when login is required, and instrument the review form so failed submissions show a visible error instead of silently failing.  
**Effort:** Multi-day  
**Evidence:**  
- "Occasional login/auth issues"  
- "Review submission not always saving"  
- "I like that it's only UIUC students, feels more real"

## Priority 2: Make apartment comparison faster
**Impact:** Better comparison tools should improve retention, repeat visits, and overall product usefulness during apartment search.  
**Root Cause:** Users need faster decision support, not just a list of apartments and reviews.  
**Specific Action:** Add filters for price, location, and rating first, then introduce average ratings and simple sorting by popularity or highest rated.  
**Effort:** Multi-day  
**Evidence:**  
- "Filter/search (price, location, rating)"  
- "See average ratings at a glance"  
- "Sort by most popular / highest rated"

## Priority 3: Improve discoverability and listing completeness
**Impact:** This should reduce user confusion and make the product feel more complete and polished on first use.  
**Root Cause:** Important actions and listing details are not consistently visible or complete enough.  
**Specific Action:** Make the "Write a review" CTA more prominent, fix image loading issues, and prioritize filling missing apartment profiles in the listings students are most likely to search first.  
**Effort:** Half-day to Multi-day, depending on apartment data updates  
**Evidence:**  
- "Write a review flow not obvious at first"  
- "Some apartments missing or incomplete"  
- "Some images not loading correctly"

---

## Quick Wins (Can Do Today)
- Add a clearer message on browse pages and apartment detail pages showing when login is required
- Increase visual prominence of the "Write a review" button or entry point
- Add fallback image behavior for broken apartment images
- Draft a shortlist of the most-requested apartments to add next

## Board Memo Talking Point
"We analyzed 13 pieces of user feedback, identified 3 core patterns, and built a prioritized action plan. Our top priority is strengthening the login and review-submission flow because that is the trust engine behind Apt.ly's verified-review model."
