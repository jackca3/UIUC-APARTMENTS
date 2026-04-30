-- Apt.ly X Integration
-- Apply this in Supabase SQL Editor before using the X Studio routes.

CREATE TABLE IF NOT EXISTS public.x_account_connections (
    id                      UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_email             TEXT UNIQUE NOT NULL,
    x_user_id               TEXT NOT NULL,
    x_username              TEXT NOT NULL,
    x_name                  TEXT,
    x_profile_image_url     TEXT,
    scopes                  TEXT[] DEFAULT '{}',
    encrypted_access_token  TEXT NOT NULL,
    encrypted_refresh_token TEXT,
    token_expires_at        TIMESTAMP WITH TIME ZONE,
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at              TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.x_post_drafts (
    id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_email       TEXT NOT NULL,
    text              TEXT NOT NULL,
    status            TEXT NOT NULL DEFAULT 'draft'
                      CHECK (status IN ('draft', 'published', 'failed')),
    scheduled_for     TIMESTAMP WITH TIME ZONE,
    published_post_id TEXT,
    last_error        TEXT,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.x_account_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.x_post_drafts ENABLE ROW LEVEL SECURITY;

-- No public policies are created on purpose.
-- These tables are intended to be accessed only through server-side route handlers
-- using the Supabase service role key.

DROP TRIGGER IF EXISTS handle_updated_at_x_account_connections ON public.x_account_connections;
CREATE TRIGGER handle_updated_at_x_account_connections
    BEFORE UPDATE ON public.x_account_connections
    FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_x_post_drafts ON public.x_post_drafts;
CREATE TRIGGER handle_updated_at_x_post_drafts
    BEFORE UPDATE ON public.x_post_drafts
    FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
