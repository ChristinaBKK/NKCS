# UC Dashboard · 学生案例分析看板

> A bilingual (Chinese/English) read-only dashboard visualising structured student admission case studies collected from international school WeChat public accounts in China.

> 中英双语只读看板，把从中国国际学校微信公众号抓取到的学生录取案例数据可视化。

**Live demo / 在线看板：** https://christinabkk.github.io/NKCS/UC/reports/

---

## 🎯 这是什么 / What is this

A static HTML dashboard that visualises student admission case studies scraped from
~500+ WeChat public accounts operated by top international schools, school groups,
education media outlets, and overseas admissions agencies in China.

一个静态 HTML 看板，把从国内 500+ 个国际学校 / 教育集团 / 升学媒体 / 留学机构
公众号抓取到的学生录取案例数据可视化。

**Use cases / 用途：**
- 对标研究 / Benchmark admissions outcomes
- 升学指导 / College counseling
- 课程体系分析 / Curriculum analysis
- 招生宣传素材 / Marketing material
- 内部趋势跟踪 / Internal trend tracking

**Data is internal / 数据是内部的：**
- The dashboard reads from a private Supabase project; only the public anon key
  is embedded. All write paths require a separate service key.
- 数据从内部 Supabase 读取；只暴露 anon key，anon 角色 RLS 锁定只读。

---

## ✨ 核心功能 / Features

- **中英双语切换** / Bilingual UI (中文 / English) — instant toggle, all fields
- **响应式左栏筛选** / Responsive left filter sidebar
  — 学校 / 课程体系 / 国家 / 录取院校 / 文章类型 / 艺术 vs 学术 / 仅看本科申请
- **4 个核心指标卡** / 4 KPI cards (案例数 / 学校数 / 国家数 / 录取院校数)
- **每条案例详情可展开** / Per-case expandable detail
  — 学生别名、当前高中、课程体系、年级、录取国家 / 院校 / 专业、标化成绩、活动
- **关键词检索** / Free-text keyword search
- **分页** / Pagination for large result sets
- **应用层级智能识别** / Smart `application_level` detection
  (本科 / 研究生 / 高申, even when article text only lists G12 with no PhD keyword)
- **每条规则透明的清洗流水线** / Transparent cleaning pipeline
  (separate cleaner/ module with YAML rules + idempotent apply)

---

## 📊 数据规模 / Data Scale (snapshot)

| 项 / Item | 数量 / Count |
|------|------|
| 抓取公众号 / Accounts monitored | ~510 (A: 85 top schools · B: 8 chain brands · C: 392 media · D: 25 agencies) |
| 抓取文章 / Articles | ~11,000+ across 3-year window |
| 结构化案例 / Student cases | ~1,650+ (after cleaning) |
| 录取国家 / Admit countries | 美国 / 英国 / 中国香港 / 加拿大 / 澳大利亚 / 新加坡 / … |
| 课程体系 / Curricula | IB / AP / A-Level / BC / Mixed / Other |
| 抓取时段 / Scrape window | 最近 3 年 / Last 3 years |
| 更新频率 / Update freq | 每周日 04:00 Europe/Paris 自动增量 / Weekly auto-incremental |

---

## 🔐 安全模型 / Security Model

本看板**只读**，使用 Supabase **anon key**（设计为可公开），配合 **Row Level Security (RLS)**。

The dashboard is **read-only**, using the public Supabase **anon key** + **Row Level Security (RLS)**.

| 配置 / Config | 用途 / Purpose | 公网暴露？/ Public? |
|------|------|------|
| `SUPABASE_URL` | Supabase 项目地址 / Project URL | ✅ 安全 / Safe to expose |
| `SUPABASE_ANON_KEY` | 只读 key，配合 RLS / Read-only, with RLS | ✅ 安全 / Safe to expose |
| `SUPABASE_SERVICE_KEY` | admin 权限 / Admin | ❌ **绝对不能提交到 git 或公网** / **Never commit or expose** |

RLS 策略见 `rls.sql`，已对 anon 角色禁用 `INSERT / UPDATE / DELETE`。

RLS policies in `rls.sql` block `INSERT / UPDATE / DELETE` for the anon role.

---

## 📁 文件结构 / File Structure

```
UC/
├── README.md              # 本文档 / This file
├── app.py                 # Streamlit 入口（本地运行，备用）/ Streamlit entry (local, optional)
├── data.py                # Supabase 数据访问 / Data access layer
├── filters.py             # 侧边栏筛选 / Filter logic
├── i18n.py                # 中英双语字典 / Bilingual text dict
├── translations.py        # 数据库值翻译表（zh → en）/ DB value translations
├── config.py              # 配置加载 / Config loader
├── rls.sql                # RLS 策略 / RLS policies
├── requirements.txt       # 最小依赖 / Minimal deps
├── start.sh               # 启动脚本 / Launch script
└── reports/               # 静态 HTML 看板（GitHub Pages 入口）
    ├── index.html         # 静态看板主页 / Static dashboard home
    ├── dashboard.css      # 样式 / Styles
    └── dashboard.js       # 数据 + 过滤 + Chart.js / Data + filter + charts
```

> **Note / 说明**：项目实际使用 `reports/` 里的**静态 HTML 看板**
> （托管在 GitHub Pages），`app.py` 的 Streamlit 入口保留为本地分析备用。

---

## 🚀 3 步启动 / Quick Start (local)

### 1. 安装依赖 / Install dependencies

```bash
cd UC/
pip install -r requirements.txt
```

### 2. 配置环境变量 / Configure environment

```bash
cp .env.example .env
# 编辑 .env，填入：
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
```

### 3. 启动 / Launch

```bash
./start.sh
# 或 / or
streamlit run app.py --server.port 8501
```

打开浏览器访问 `http://localhost:8501` 即可。

如果只是想看静态看板，直接打开 `reports/index.html` 或访问
GitHub Pages 链接（无需任何配置）。

For the static dashboard only, just open `reports/index.html` or visit
the GitHub Pages link above (no setup needed).

---

## 🛠 维护 / Maintenance

### 自检 / Self-check

```bash
python3 config.py
# 应输出：✓ UC Dashboard 配置加载成功
```

### 调整 RLS 策略 / Adjust RLS

`rls.sql` 中所有策略都是只允许 `SELECT`，不允许写操作。修改前请先理解业务影响。

All policies in `rls.sql` are SELECT-only. Review business impact before changing.

### 缓存破坏 / Cache busting

静态 dashboard 通过 `?v=YYYYMMDDHHMM` 强制刷新。每次更新 `dashboard.js` /
`dashboard.css` / `index.html` 后，更新 `index.html` 顶部的版本号避免
浏览器缓存。

Static dashboard uses `?v=YYYYMMDDHHMM` for cache-bust. After editing
`dashboard.js` / `dashboard.css` / `index.html`, bump the version in `index.html`.

---

## 🧹 数据清洗 / Data Cleaning

The backend pipeline has a dedicated `cleaner/` module that normalises fields
in the database using YAML rules and idempotent apply.

后端流水线有独立的 `cleaner/` 模块，用 YAML 规则 + idempotent apply 来规范化
数据库字段。

- 规则文件 / Rules: `cleaner/rules/{country,curriculum,school}.yaml`
- 进度 / Progress: `cleaner/CHECKPOINT.md`
- 应用日志 / Apply log: `cleaner_logs/apply_*.json`

Pipeline philosophy: pipeline-level R1–R8 硬规则拒收"不应当存在"的 case
(non-cases, mainland-China admits, US/UK high-school admits, middle-school
grades, etc.). Cleaner-level YAML 规则规范化"已存在" case 的字段值
(admit_country variants, school 字段里误填的大学名, etc.).

---

## 📝 合规边界 / Compliance

- 数据来源于公众号**公开内容**，**仅用于内部对标研究**，不对外发布
- 看板暴露的仅是结构化、匿名化的字段；原文 HTML 走 Supabase Storage 私有
  bucket，**不公开访问**
- 抓取走 wechat-download-api + 保守节流 (12s + jitter + 30s break)，避免封号
- 抓取目标仅限公开**升学类**账号；不抓取个人微信、不抓取付费内容

Data is from publicly posted WeChat articles. For internal benchmarking only,
not for public distribution. Original article HTMLs stay in private storage.
Scraping is throttled (12s + jitter + 30s break) to avoid account bans.

---

## 📝 License

Internal use only. 内部使用。
