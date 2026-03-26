create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.user_workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  selected_business_id text,
  active_blueprint_id text,
  workspace_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_workspaces_user_id_key unique (user_id)
);

create table if not exists public.user_benchmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id text not null,
  benchmark_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_benchmarks_user_business_key unique (user_id, business_id)
);

create table if not exists public.user_coach_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id text,
  output_mode text not null,
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_user_workspaces_updated_at on public.user_workspaces;
create trigger set_user_workspaces_updated_at
before update on public.user_workspaces
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_user_benchmarks_updated_at on public.user_benchmarks;
create trigger set_user_benchmarks_updated_at
before update on public.user_benchmarks
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_user_coach_outputs_updated_at on public.user_coach_outputs;
create trigger set_user_coach_outputs_updated_at
before update on public.user_coach_outputs
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.user_workspaces enable row level security;
alter table public.user_benchmarks enable row level security;
alter table public.user_coach_outputs enable row level security;

drop policy if exists "user_workspaces_select_own" on public.user_workspaces;
create policy "user_workspaces_select_own"
on public.user_workspaces
for select
using (auth.uid() = user_id);

drop policy if exists "user_workspaces_insert_own" on public.user_workspaces;
create policy "user_workspaces_insert_own"
on public.user_workspaces
for insert
with check (auth.uid() = user_id);

drop policy if exists "user_workspaces_update_own" on public.user_workspaces;
create policy "user_workspaces_update_own"
on public.user_workspaces
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_workspaces_delete_own" on public.user_workspaces;
create policy "user_workspaces_delete_own"
on public.user_workspaces
for delete
using (auth.uid() = user_id);

drop policy if exists "user_benchmarks_select_own" on public.user_benchmarks;
create policy "user_benchmarks_select_own"
on public.user_benchmarks
for select
using (auth.uid() = user_id);

drop policy if exists "user_benchmarks_insert_own" on public.user_benchmarks;
create policy "user_benchmarks_insert_own"
on public.user_benchmarks
for insert
with check (auth.uid() = user_id);

drop policy if exists "user_benchmarks_update_own" on public.user_benchmarks;
create policy "user_benchmarks_update_own"
on public.user_benchmarks
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_benchmarks_delete_own" on public.user_benchmarks;
create policy "user_benchmarks_delete_own"
on public.user_benchmarks
for delete
using (auth.uid() = user_id);

drop policy if exists "user_coach_outputs_select_own" on public.user_coach_outputs;
create policy "user_coach_outputs_select_own"
on public.user_coach_outputs
for select
using (auth.uid() = user_id);

drop policy if exists "user_coach_outputs_insert_own" on public.user_coach_outputs;
create policy "user_coach_outputs_insert_own"
on public.user_coach_outputs
for insert
with check (auth.uid() = user_id);

drop policy if exists "user_coach_outputs_update_own" on public.user_coach_outputs;
create policy "user_coach_outputs_update_own"
on public.user_coach_outputs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_coach_outputs_delete_own" on public.user_coach_outputs;
create policy "user_coach_outputs_delete_own"
on public.user_coach_outputs
for delete
using (auth.uid() = user_id);
