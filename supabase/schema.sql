-- UIUC Apartment Review Platform — Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  first_name text,
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- LEASING COMPANIES TABLE
create table public.leasing_companies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  website text,
  phone text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- APARTMENTS TABLE
create table public.apartments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  address text not null,
  city text default 'Champaign',
  state text default 'IL',
  zip text,
  description text,
  latitude decimal(9,6),
  longitude decimal(9,6),
  management_company text,
  official_website text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REVIEWS TABLE
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    maintenance_rating INTEGER CHECK (maintenance_rating >= 1 AND maintenance_rating <= 5) NOT NULL,
    noise_rating INTEGER CHECK (noise_rating >= 1 AND noise_rating <= 5) NOT NULL,
    management_rating INTEGER CHECK (management_rating >= 1 AND management_rating <= 5) NOT NULL,
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5) NOT NULL,
    monthly_rent_paid NUMERIC,
    written_review TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(apartment_id, user_id) -- One review per user per apartment
);

-- FAVORITES TABLE
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, apartment_id)
);

-- COMMENTS TABLE
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  review_id uuid references public.reviews(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  body text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- HELPFUL VOTES TABLE
create table public.helpful_votes (
  id uuid default uuid_generate_v4() primary key,
  review_id uuid references public.reviews(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(review_id, user_id) -- One vote per user per review
);

-- ROW LEVEL SECURITY (RLS) POLICIES --

alter table public.profiles enable row level security;
alter table public.leasing_companies enable row level security;
alter table public.apartments enable row level security;
alter table public.reviews enable row level security;
alter table public.comments enable row level security;
alter table public.helpful_votes enable row level security;

-- Profiles: Users can view all, but only update their own
create policy "Public Profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Leasing Companies: Publicly readable, no edits
create policy "Leasing companies are viewable by everyone." on leasing_companies for select using (true);

-- Apartments: Publicly readable, no edits
create policy "Apartments are viewable by everyone." on apartments for select using (true);

-- Reviews: Viewable by everyone, created/updated/deleted by owners
create policy "Reviews are viewable by everyone." on reviews for select using (true);
create policy "Users can insert own reviews." on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews." on reviews for update using (auth.uid() = user_id);
create policy "Users can delete own reviews." on reviews for delete using (auth.uid() = user_id);

-- Comments: Viewable by everyone, created/updated/deleted by owners
create policy "Comments are viewable by everyone." on comments for select using (true);
create policy "Users can insert own comments." on comments for insert with check (auth.uid() = user_id);
create policy "Users can update own comments." on comments for update using (auth.uid() = user_id);
create policy "Users can delete own comments." on comments for delete using (auth.uid() = user_id);

-- Helpful Votes: Viewable by everyone, created/deleted by owners
create policy "Helpful votes are viewable by everyone." on helpful_votes for select using (true);
create policy "Users can insert own helpful votes." on helpful_votes for insert with check (auth.uid() = user_id);
create policy "Users can delete own helpful votes." on helpful_votes for delete using (auth.uid() = user_id);

-- TRIGGERS --

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at for reviews
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at_reviews
  before update on reviews
  for each row execute procedure public.set_updated_at();

create trigger handle_updated_at_comments
  before update on comments
  for each row execute procedure public.set_updated_at();
