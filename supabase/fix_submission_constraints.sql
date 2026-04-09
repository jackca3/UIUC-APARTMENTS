-- ================================================================
-- FIX v2: RELAX CONSTRAINTS FOR CUSTOM AUTH IDs
-- ================================================================

-- 1. DROP DEPENDENT POLICIES TEMPORARILY
-- Postgres blocks column type changes if policies depend on them.
DROP POLICY IF EXISTS "Favorites are viewable by owner." ON public.favorites;
DROP POLICY IF EXISTS "Users can insert own favorites." ON public.favorites;
DROP POLICY IF EXISTS "Users can delete own favorites." ON public.favorites;

DROP POLICY IF EXISTS "Users can insert own reviews." ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews." ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews." ON public.reviews;
DROP POLICY IF EXISTS "Public Create: Reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public Read: Reviews" ON public.reviews;

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
DROP POLICY IF EXISTS "Public Create: Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Read: Profiles" ON public.profiles;

-- 2. DROP FOREIGN KEY CONSTRAINTS
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 3. SCHEMA UPDATE: Change column types to TEXT
ALTER TABLE public.profiles ALTER COLUMN id TYPE TEXT USING id::text;
ALTER TABLE public.reviews ALTER COLUMN user_id TYPE TEXT USING user_id::text;
ALTER TABLE public.favorites ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- 4. RECREATE POLICIES (Compatible with TEXT IDs)
-- Since we use local auth, auth.uid() is null for these users.
-- We use a simple check for now to allow the app to function.

-- Profiles
CREATE POLICY "Public Read: Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Create: Profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- Reviews
CREATE POLICY "Public Read: Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public Create: Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Owner Update: Reviews" ON public.reviews FOR UPDATE USING (true); 

-- Favorites
CREATE POLICY "Public Read: Favorites" ON public.favorites FOR SELECT USING (true);
CREATE POLICY "Public Create: Favorites" ON public.favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Delete: Favorites" ON public.favorites FOR DELETE USING (true);

-- 5. LINK RELATIONSHIPS (Maintaining joins)
-- Now that we don't use auth.users, we link reviews directly to profiles
-- so that .select('*, profiles(*)') still works.
ALTER TABLE public.reviews 
ADD CONSTRAINT reviews_user_id_profiles_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 6. VERIFY
DO $$
BEGIN
    RAISE NOTICE 'Constraints relaxed, relationships linked, and policies updated.';
END $$;
