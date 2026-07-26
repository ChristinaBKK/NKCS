-- ============================================================
-- 启用 Row Level Security (RLS) - 让 anon 角色只能 SELECT
-- 在 Supabase SQL Editor 跑这个文件
-- ============================================================

-- 1. 启用 RLS on all tables
alter table public.accounts enable row level security;
alter table public.articles enable row level security;
alter table public.student_cases enable row level security;
alter table public.extraction_jobs enable row level security;

-- 2. 删除已存在的同名 policy（避免重复跑出错）
drop policy if exists "anon_read_all" on public.accounts;
drop policy if exists "anon_read_all" on public.articles;
drop policy if exists "anon_read_all" on public.student_cases;
drop policy if exists "anon_read_all" on public.extraction_jobs;

-- 3. 创建 SELECT policy（anon 角色可读，不可写）
create policy "anon_read_all"
  on public.accounts
  for select
  to anon
  using (true);

create policy "anon_read_all"
  on public.articles
  for select
  to anon
  using (true);

create policy "anon_read_all"
  on public.student_cases
  for select
  to anon
  using (true);

create policy "anon_read_all"
  on public.extraction_jobs
  for select
  to anon
  using (true);

-- 4. 显式拒绝 INSERT/UPDATE/DELETE（即使将来忘了也安全）
-- 实际上 to anon 配合 policy 已经能阻止写入，无需额外操作

-- 5. 验证（应该在 anon 角色下能 SELECT 4 张表）
select 'accounts' as table_name, count(*) as rows from public.accounts
union all
select 'articles', count(*) from public.articles
union all
select 'student_cases', count(*) from public.student_cases;

-- 6. 给视图也加权限（v_cases_full, v_recent_cases）
-- 视图默认继承 base table 的 RLS，所以应该已经生效
-- 如需验证：select * from v_cases_full limit 1;
