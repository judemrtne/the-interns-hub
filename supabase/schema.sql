-- ═══════════════════════════════════════════════════════════
--  INTERN PLATFORM — SUPABASE DATABASE SETUP
--  Run this in the Supabase SQL Editor for your project:
--  https://ntbqdkfxcnditgdxdipb.supabase.co
-- ═══════════════════════════════════════════════════════════

-- ─── 1. USERS TABLE ────────────────────────────────────────
create table if not exists users (
  id uuid primary key default auth.uid(),
  name text,
  email text unique,
  department text,
  role text default 'intern',
  created_at timestamp default now()
);

-- Auto-insert user profile on signup via Supabase auth trigger
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.email,
    'intern'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─── 2. TIME LOGS TABLE ────────────────────────────────────
create table if not exists time_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  date date,
  am_in time,
  am_out time,
  pm_in time,
  pm_out time,
  total_hours numeric,
  created_at timestamp default now(),
  unique(user_id, date)
);

-- ─── 3. MESSAGES TABLE ─────────────────────────────────────
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references users(id) on delete cascade,
  receiver_id uuid references users(id) on delete cascade,
  message text not null,
  created_at timestamp default now()
);

-- Enable realtime for messages
alter table messages replica identity full;

-- ─── 4. ANNOUNCEMENTS TABLE ────────────────────────────────
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  created_by uuid references users(id) on delete set null,
  created_at timestamp default now()
);

-- ═══════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table users enable row level security;
alter table time_logs enable row level security;
alter table messages enable row level security;
alter table announcements enable row level security;

-- USERS: Anyone logged in can read all users (for intern search)
-- Users can only update their own profile
drop policy if exists "Users can read all profiles" on users;
create policy "Users can read all profiles"
  on users for select using (auth.uid() is not null);

drop policy if exists "Users can update own profile" on users;
create policy "Users can update own profile"
  on users for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on users;
create policy "Users can insert own profile"
  on users for insert with check (auth.uid() = id);

-- TIME LOGS: Users see own logs; admins see all
drop policy if exists "Users can manage own logs" on time_logs;
create policy "Users can manage own logs"
  on time_logs for all
  using (
    auth.uid() = user_id
    or exists (select 1 from users where id = auth.uid() and role = 'admin')
  );

-- MESSAGES: Users can read/write their own messages
drop policy if exists "Users can access their messages" on messages;
create policy "Users can access their messages"
  on messages for all
  using (
    auth.uid() = sender_id or auth.uid() = receiver_id
  )
  with check (auth.uid() = sender_id);

-- ANNOUNCEMENTS: Everyone can read; only admins can write
drop policy if exists "Everyone can read announcements" on announcements;
create policy "Everyone can read announcements"
  on announcements for select using (auth.uid() is not null);

drop policy if exists "Admins can manage announcements" on announcements;
create policy "Admins can manage announcements"
  on announcements for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));

-- ═══════════════════════════════════════════════════════════
--  REALTIME PUBLICATION
-- ═══════════════════════════════════════════════════════════
-- Enable realtime for messages table
-- (Run in Supabase Dashboard > Database > Replication > Tables)
-- Or run:
begin;
  -- drop publication if exists supabase_realtime;
  -- create publication supabase_realtime;
  alter publication supabase_realtime add table messages;
commit;

-- ═══════════════════════════════════════════════════════════
--  DONE! Your database is ready.
-- ═══════════════════════════════════════════════════════════
