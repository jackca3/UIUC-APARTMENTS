CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.launch_events (
    id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_name     TEXT NOT NULL,
    page_path      TEXT,
    user_id        UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    apartment_id   UUID NULL REFERENCES public.apartments(id) ON DELETE SET NULL,
    apartment_slug TEXT,
    metadata       JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS launch_events_event_name_idx ON public.launch_events(event_name);
CREATE INDEX IF NOT EXISTS launch_events_created_at_idx ON public.launch_events(created_at DESC);
CREATE INDEX IF NOT EXISTS launch_events_apartment_slug_idx ON public.launch_events(apartment_slug);

ALTER TABLE public.launch_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Launch events are only writable by service role" ON public.launch_events;
CREATE POLICY "Launch events are only writable by service role"
    ON public.launch_events
    FOR ALL
    USING (false)
    WITH CHECK (false);
