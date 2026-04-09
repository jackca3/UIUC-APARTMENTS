-- ================================================================
-- HARDENED SECURITY FIX (CIA Triad Edition)
-- ================================================================

-- ── 1. CLEANUP OLD POLICIES ──────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can upsert profiles." ON public.profiles;
DROP POLICY IF EXISTS "Anyone can update reviews." ON public.reviews;
DROP POLICY IF EXISTS "Anyone can update apartments." ON public.apartments;

-- ── 2. INDENTITY INTEGRITY (Postgres Trigger) ────────────────────
-- Protects Integrity: Prevents someone from "stealing" a review 
-- or backdating it after it is created.
CREATE OR REPLACE FUNCTION public.protect_review_integrity()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent changing the author (user_id)
    IF NEW.user_id <> OLD.user_id THEN
        RAISE EXCEPTION 'CANNOT CHANGE REVIEW AUTHOR: Integrity Violation';
    END IF;
    -- Prevent backdating
    IF NEW.created_at <> OLD.created_at THEN
        NEW.created_at = OLD.created_at;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_review_integrity ON public.reviews;
CREATE TRIGGER ensure_review_integrity
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE PROCEDURE public.protect_review_integrity();

-- ── 3. HARDENED ROW LEVEL SECURITY (RLS) ─────────────────────────

-- [CONFIDENTIALITY/INTEGRITY] Profiles: Read-only + Create-only
-- Anyone can see/create a profile, but NO ONE can update/delete 
-- without official admin credentials (not even the public app).
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read: Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Create: Profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- [INTEGRITY] Reviews: Owner-Lock
-- You can't update other people's reviews. 
-- For this demo, we allow INSERT, but we block randomized UPDATE.
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read: Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public Create: Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
-- Note: User update is blocked unless specifically authorized.

-- [AVAILABILITY] Apartments: Public Read-Only
-- Removes the "Anyone can update apartments" vulnerability. 
-- Prevents defacement of the 131 buildings.
ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read: Apartments" ON public.apartments FOR SELECT USING (true);
-- Update/Delete are now effectively DISABLED for the public API.

-- ── 4. VERIFY HARDENING ───────────────────────────────────────────
SELECT 
    'HARDENED' as security_status,
    schemaname, tablename, policyname, cmd
FROM pg_policies 
WHERE tablename IN ('reviews', 'profiles', 'apartments');




