# User Feedback Analysis

**Product:** Apt.ly  
**Feedback Source:** Checkpoint 4 user testing  
**Total Items Analyzed:** 13

---

## Step 1: Classification

| # | Feedback Item | Category | Theme |
|---|---------------|----------|-------|
| 1 | Clean UI and simple navigation | Praise | Usability |
| 2 | Verified student reviews feel trustworthy | Praise | Trust |
| 3 | Ability to favorite apartments is useful | Praise | Product utility |
| 4 | Some apartments are missing or incomplete | UX Issue | Listing coverage |
| 5 | Not clear when login is required vs optional | Confusion | Onboarding and auth |
| 6 | "Write a review" flow is not obvious at first | UX Issue | Review submission discoverability |
| 7 | Occasional login/auth issues | Bug | Authentication reliability |
| 8 | Some images are not loading correctly | Bug | Listing quality |
| 9 | Review submission does not always save | Bug | Core review flow |
| 10 | Add more apartments | Feature Request | Listing coverage |
| 11 | Add filter/search by price, location, and rating | Feature Request | Discovery tools |
| 12 | Show average ratings at a glance | Feature Request | Decision support |
| 13 | Add sort by most popular or highest rated | Feature Request | Discovery tools |

### Breakdown
- **UX Issues (2):** listing completeness and review-flow discoverability
- **Feature Requests (4):** stronger search, filtering, sorting, and summary ratings
- **Bugs (3):** auth reliability, image loading, and review submission failures
- **Praise (3):** UI clarity, trusted reviews, and favorites
- **Confusion (1):** login expectations

---

## Step 2: Severity Rating

| Feedback Item | Category | Severity | Why |
|---------------|----------|----------|-----|
| Review submission does not always save | Bug | Critical | Breaks the core value loop of collecting trusted reviews |
| Occasional login/auth issues | Bug | Critical | Prevents verified users from accessing or contributing |
| Some apartments are missing or incomplete | UX Issue | Important | Weakens trust and reduces usefulness during search |
| Not clear when login is required vs optional | Confusion | Important | Creates friction early in the user journey |
| "Write a review" flow is not obvious | UX Issue | Important | Hides one of the most important actions in the product |
| Some images are not loading correctly | Bug | Important | Makes listings feel incomplete or broken |
| Add more apartments | Feature Request | Important | A larger inventory improves product utility and retention |
| Add filter/search by price, location, and rating | Feature Request | Important | Helps students make faster comparisons |
| Show average ratings at a glance | Feature Request | Nice-to-have | Improves scanning but does not block usage |
| Add sort by most popular or highest rated | Feature Request | Nice-to-have | Helps exploration but is secondary to stronger search |
| Clean UI and simple navigation | Praise | Positive signal | Confirms the design direction is working |
| Verified student reviews feel trustworthy | Praise | Positive signal | Reinforces the core differentiator |
| Favorites feature is useful | Praise | Positive signal | Shows the product already has decision-support value |

### Severity Picture
- **Critical (2):** auth reliability, review submission reliability
- **Important (6):** listing completeness, login clarity, review visibility, images, coverage, filters
- **Nice-to-have (2):** average ratings summary, popularity/highest-rated sorting
- **Positive signals (3):** UI clarity, trust, favorites

---

## Step 3: Pattern Detection

### Pattern 1: Trust breaks when the core review loop feels unreliable
**Count:** 4 items  
**Examples:** login/auth issues, review submission not always saving, unclear login expectations, verified-review trust being central to the product's value  
**Root cause:** Apt.ly's biggest differentiator is verified student reviews, so any weakness in auth or review submission damages both trust and contribution volume.

### Pattern 2: Students want faster apartment comparison, not just more information
**Count:** 4 items  
**Examples:** requests for filters, sorting, average ratings, and stronger apartment coverage  
**Root cause:** Users are not just browsing for curiosity. They are trying to make a high-stakes housing decision quickly, so comparison tools matter a lot.

### Pattern 3: Valuable actions need stronger visibility
**Count:** 3 items  
**Examples:** write-a-review flow not obvious, some apartments incomplete, image issues making listings feel partial  
**Root cause:** Key product actions and content are present, but not always surfaced clearly enough to feel complete and dependable.

These three patterns explain the majority of the feedback and point to a launch strategy that prioritizes reliability first, comparison tools second, and discoverability third.

---

## Key Quotes
- "This would've saved me so much time before signing my lease."
- "I like that it's only UIUC students, feels more real."

## Board Memo Talking Point
"We analyzed 13 pieces of user feedback across usability, feature requests, bugs, praise, and confusion. The clearest pattern is that Apt.ly's core trust loop depends on reliable login and review submission, so those issues are our top pre-launch priority."
