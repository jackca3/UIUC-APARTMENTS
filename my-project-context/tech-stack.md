# Tech Stack

| Layer | Service | Notes |
|-------|---------|-------|
| App Builder / Frontend | Antigravity | React-based UI layer |
| Database | Supabase (PostgreSQL) | Stores apartment, review, and user data |
| Auth | Supabase Auth | Restricted to `@illinois.edu` emails for verified student access |
| Hosting | Vercel | Live deployment hosting |
| Maps / Location | Google Maps / Places API | Used for apartment location details and images |
| Version Control | GitHub | Used for source control and project history |

## Architecture Notes
Apt.ly uses a React-based frontend built in Antigravity, with Supabase handling the backend database and authentication. Users sign in with verified UIUC emails, apartment and review data are stored in PostgreSQL through Supabase, and the app is deployed on Vercel. Google Maps / Places API supports location details and visual context for apartment listings.
