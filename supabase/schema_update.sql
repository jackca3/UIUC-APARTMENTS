-- ============================================================
-- STEP 1: Run this FIRST in your Supabase SQL Editor
-- https://app.supabase.com → SQL Editor
-- ============================================================

-- Add image_urls column to reviews if it doesn't exist
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- Allow anyone to insert apartments (authenticated users adding missing buildings)
CREATE POLICY IF NOT EXISTS "Authenticated users can insert apartments."
ON public.apartments FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update apartments (e.g., uploading cover photos)
CREATE POLICY IF NOT EXISTS "Authenticated users can update apartments."
ON public.apartments FOR UPDATE
TO authenticated
USING (true);

-- Favorites table RLS (add if missing)
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Favorites are viewable by owner."
ON public.favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own favorites."
ON public.favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own favorites."
ON public.favorites FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================
-- STEP 2: Run the supabase_seed_dump.sql file AFTER this one
-- That file contains all apartments and reviews.
-- ============================================================
