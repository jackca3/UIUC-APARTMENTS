# Supabase Setup for UIUC Apartments

This document explains how to set up the Real Database for this application using Supabase.

## 1. Create a Supabase Project
- Go to [Supabase](https://supabase.com) and create a new project.
- Once created, go to Project Settings -> API and find your `Project URL` and `anon public key`.

## 2. Environment Variables
Copy `.env.example` to `.env.local` in your root directory and set the values:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

*(Note: During initial development, the app uses a Mock Data Layer. Set `USE_MOCK_DATA=false` in your `.env.local` to switch to Supabase after setting it up.)*

## 3. Run Migrations & Seed Data
1. Go to your Supabase project dashboard.
2. Navigate to **SQL Editor** on the left menu.
3. Open the `supabase/schema.sql` file from this project and paste its contents into a new SQL snippet. Run the snippet to create tables and RLS policies.
4. Next, open the `supabase/seed.sql` file, paste and run it to add some initial leasing companies, apartments, and reviews.

## 4. Email Verification Configuration
To enforce illinois.edu emails and send actual verification emails:
1. Go to **Authentication** -> **Providers** -> **Email**.
2. Make sure Enable Email Provider is toggled ON.
3. Toggle ON "Confirm email".
4. Set up custom SMTP if you plan to send lots of verification emails, otherwise use Supabase's default for testing.
