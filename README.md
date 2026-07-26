# UC Dashboard · 学生案例分析看板

> Bilingual dashboard for analysing student admission case studies from international school WeChat public accounts.

> 中英双语看板，用于分析国际学校微信公众号发布的学生录取案例。

---

## 🎯 这是什么 / What is this

A read-only Streamlit dashboard that visualises structured student case data
collected from ~30+ top international school WeChat public accounts in China.
Data is stored in Supabase; this dashboard only reads.

一个只读 Streamlit 看板，把从国内 30+ 所头部国际学校微信公众号抓取到的
学生录取案例数据可视化。数据存在 Supabase，这个看板只读不写。

**Use case / 用途：**
- 对标研究 / Benchmark admissions outcomes
- 升学指导 / College counseling
- 课程体系分析 / Curriculum analysis
- 招生宣传素材 / Marketing material

---

## ✨ 核心功能 / Features

- **中英双语切换** / Bilingual UI (中文 / English)
- **4 个核心指标卡** / 4 KPI cards（总案例数 / 学校数 / 国家数 / 录取院校数）
- **6 个筛选维度** / 6 filters（学校 / 课程体系 / 国家 / 录取院校 / 文章类型 / 艺术 vs 学术）
- **4 个角色预设** / 4 role presets：
  - 校长 / Principal —— 近一年喜报 + 成长故事
  - 升学顾问 / Counselor —— 全部 5 年数据
  - 课程主任 / Curriculum —— 聚焦课程体系分布
  - 招生市场 / Marketing —— 仅录取喜报
- **详情展开** / Expandable case detail
- **关键词检索** / Free-text keyword search

---

## 🚀 3 步启动 / Quick Start

### 1. 安装依赖 / Install dependencies

```bash
cd UC/
pip install -r requirements.txt
```

### 2. 配置环境变量 / Configure environment

```bash
cp .env.example .env
# 编辑 .env，填入：
# - SUPABASE_URL  (https://your-project.supabase.co)
# - SUPABASE_ANON_KEY  (anon public key)
```

### 3. 启动 / Launch

```bash
./start.sh
# 或 / or
streamlit run app.py --server.port 8501
```

打开浏览器访问 `http://localhost:8501` 即可。

Open browser at `http://localhost:8501`.

---

## 🔐 安全模型 / Security Model

本看板**只读**，使用 Supabase **anon key**（公开 key），配合 **Row Level Security (RLS)** 策略。

This dashboard is **read-only**, using the public Supabase **anon key** + **Row Level Security (RLS)**.

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
├── app.py                # Streamlit 入口 / Streamlit entry
├── data.py               # Supabase 数据访问 / Data access layer
├── filters.py            # 侧边栏筛选 + 角色预设 / Filters + role presets
├── i18n.py               # 中英双语字典 / Bilingual text dict
├── config.py             # 配置加载（只读 Supabase）/ Config loader
├── rls.sql               # RLS 策略 / RLS policies
├── requirements.txt      # 最小依赖 / Minimal deps
├── .env.example          # 环境变量模板 / Env template
├── .gitignore
├── start.sh              # 启动脚本 / Launch script
└── README.md
```

---

## 🛠 维护 / Maintenance

### 更新数据 / Update data

看板只读，不直接修改数据。数据通过后台抓取 + LLM 抽取流程写入 Supabase。

Dashboard is read-only. Data is written by the backend scraping + LLM extraction pipeline
(which lives outside this folder — see main project).

### 自检 / Self-check

```bash
python3 config.py
# 应输出：✓ UC Dashboard 配置加载成功
```

### 调整 RLS 策略 / Adjust RLS

`rls.sql` 中所有策略都是只允许 `SELECT`，不允许写操作。修改前请先理解业务影响。

All policies in `rls.sql` are SELECT-only. Review business impact before changing.

---

## 📊 数据来源 / Data Source

| 项 / Item | 说明 / Description |
|------|------|
| 公众号数 / Accounts | 33+ 所中国头部国际学校（深国交 / 赫贤 / 包玉刚 / 星河湾 等）|
| 文章类型 / Article types | 录取喜报 / 成长故事 / 课程介绍 / 活动报道 |
| 字段 / Fields | 学生别名 / 学校 / 课程体系 / 录取国家 / 录取院校 / 专业 / 标化成绩 / 活动 |
| 抽取方式 / Extraction | LLM 结构化抽取（claude-sonnet-4）|
| 更新频率 / Update freq | 按需 / On demand |

> ⚠️ 数据来源于公众号公开内容，**仅用于内部对标研究**，不对外发布。
> Data is from publicly posted WeChat articles. For internal benchmarking only. Not for public distribution.

---

## 🌐 公网部署 / Public Deployment

如果需要部署到公网（如让海外同事访问），用 ngrok 做内网穿透：

For public access (e.g. for overseas colleagues), use ngrok:

```bash
# 看板启动后，另开终端 / After dashboard is running, in a new terminal:
ngrok http 8501
# ngrok 会给一个公网 URL，例如 https://xxxx.ngrok-free.app
```

> anon key 是设计为可公开的，配合 RLS 后无法写入数据，安全。
> The anon key is designed to be public; combined with RLS, no writes are possible.

---

## 📝 License

Internal use only. 内部使用。
