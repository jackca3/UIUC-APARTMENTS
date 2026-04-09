-- UIUC Apartment Review Platform — Database Schema
-- Run this entire file once in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES TABLE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
    id          UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email       TEXT UNIQUE,
    username    TEXT UNIQUE,
    first_name  TEXT,
    last_name   TEXT,
    avatar_url  TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── LEASING COMPANIES TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leasing_companies (
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name       TEXT NOT NULL,
    slug       TEXT UNIQUE NOT NULL,
    website    TEXT,
    phone      TEXT,
    email      TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── APARTMENTS TABLE ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.apartments (
    id                 UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name               TEXT NOT NULL,
    slug               TEXT UNIQUE NOT NULL,
    address            TEXT NOT NULL,
    city               TEXT DEFAULT 'Champaign',
    state              TEXT DEFAULT 'IL',
    zip                TEXT,
    description        TEXT,
    latitude           DECIMAL(9,6),
    longitude          DECIMAL(9,6),
    management_company TEXT,
    official_website   TEXT,
    image_url          TEXT,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── REVIEWS TABLE ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
    id                 UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    apartment_id       UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
    user_id            UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    maintenance_rating INTEGER CHECK (maintenance_rating >= 1 AND maintenance_rating <= 5) NOT NULL,
    noise_rating       INTEGER CHECK (noise_rating >= 1 AND noise_rating <= 5) NOT NULL,
    management_rating  INTEGER CHECK (management_rating >= 1 AND management_rating <= 5) NOT NULL,
    value_rating       INTEGER CHECK (value_rating >= 1 AND value_rating <= 5) NOT NULL,
    monthly_rent_paid  NUMERIC,
    written_review     TEXT NOT NULL,
    image_urls         TEXT[] DEFAULT '{}',
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(apartment_id, user_id)
);

-- ── FAVORITES TABLE ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.favorites (
    id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id      UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, apartment_id)
);

-- ── COMMENTS TABLE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    review_id  UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    body       TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── HELPFUL VOTES TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.helpful_votes (
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    review_id  UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(review_id, user_id)
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leasing_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apartments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helpful_votes  ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone."   ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile."  ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile."        ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone."   ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile."  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile."        ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Leasing Companies
DROP POLICY IF EXISTS "Leasing companies are viewable by everyone." ON public.leasing_companies;
CREATE POLICY "Leasing companies are viewable by everyone." ON public.leasing_companies FOR SELECT USING (true);

-- Apartments (public read, authenticated write)
DROP POLICY IF EXISTS "Apartments are viewable by everyone."        ON public.apartments;
DROP POLICY IF EXISTS "Authenticated users can insert apartments."  ON public.apartments;
DROP POLICY IF EXISTS "Authenticated users can update apartments."  ON public.apartments;
CREATE POLICY "Apartments are viewable by everyone."        ON public.apartments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert apartments."  ON public.apartments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update apartments."  ON public.apartments FOR UPDATE TO authenticated USING (true);

-- Reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone."   ON public.reviews;
DROP POLICY IF EXISTS "Users can insert own reviews."       ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews."       ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews."       ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone."   ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews."       ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews."       ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews."       ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Favorites
DROP POLICY IF EXISTS "Favorites are viewable by owner."    ON public.favorites;
DROP POLICY IF EXISTS "Users can insert own favorites."     ON public.favorites;
DROP POLICY IF EXISTS "Users can delete own favorites."     ON public.favorites;
CREATE POLICY "Favorites are viewable by owner."    ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites."     ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites."     ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Comments
DROP POLICY IF EXISTS "Comments are viewable by everyone."  ON public.comments;
DROP POLICY IF EXISTS "Users can insert own comments."      ON public.comments;
DROP POLICY IF EXISTS "Users can update own comments."      ON public.comments;
DROP POLICY IF EXISTS "Users can delete own comments."      ON public.comments;
CREATE POLICY "Comments are viewable by everyone."  ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can insert own comments."      ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments."      ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments."      ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Helpful Votes
DROP POLICY IF EXISTS "Helpful votes are viewable by everyone." ON public.helpful_votes;
DROP POLICY IF EXISTS "Users can insert own helpful votes."     ON public.helpful_votes;
DROP POLICY IF EXISTS "Users can delete own helpful votes."     ON public.helpful_votes;
CREATE POLICY "Helpful votes are viewable by everyone." ON public.helpful_votes FOR SELECT USING (true);
CREATE POLICY "Users can insert own helpful votes."     ON public.helpful_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own helpful votes."     ON public.helpful_votes FOR DELETE USING (auth.uid() = user_id);


-- ── TRIGGERS ──────────────────────────────────────────────────────

-- Auto-create profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_updated_at_comments ON public.comments;
CREATE TRIGGER handle_updated_at_comments
    BEFORE UPDATE ON public.comments
    FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
