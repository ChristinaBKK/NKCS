"""
Student Case Study Web 看板 - 中英双语
"""
import sys
from pathlib import Path

import pandas as pd
import streamlit as st

sys.path.insert(0, str(Path(__file__).parent.parent))

from data import fetch_cases, fetch_metrics
from filters import render_sidebar
from i18n import Lang, t
from translations import (
    translate_school, translate_curriculum, translate_purpose,
    translate_country, translate_university,
    translate_school_list, translate_country_list, translate_university_list,
)


# ===== 页面配置 =====
st.set_page_config(
    page_title="Student Case Study",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ===== 自定义 CSS =====
st.markdown("""
<style>
/* 主色：深蓝 #1e3a8a */
/* 辅色：金色 #d4a373 */
.stApp { background: #fafbfc; }
section[data-testid="stSidebar"] { background: #f3f4f6; }
h1, h2, h3 { color: #1e3a8a; font-weight: 700; }
.metric-card {
    background: white;
    border-left: 4px solid #1e3a8a;
    padding: 16px 20px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.metric-card .label { color: #6b7280; font-size: 13px; margin-bottom: 4px; }
.metric-card .value { color: #1e3a8a; font-size: 28px; font-weight: 700; }
.metric-card .sub { color: #9ca3af; font-size: 11px; margin-top: 4px; }
.metric-card.gold { border-left-color: #d4a373; }
.metric-card.gold .value { color: #b8842f; }
.welcome {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
    padding: 32px 40px;
    border-radius: 12px;
    margin-bottom: 24px;
}
.welcome h1 { color: white; margin: 0 0 12px 0; }
.welcome p { color: rgba(255,255,255,0.9); margin: 0; line-height: 1.7; }
</style>
""", unsafe_allow_html=True)


# ===== 顶部：标题 + 语言切换 =====
col_title, col_lang = st.columns([4, 1])
with col_title:
    st.markdown(f"# {t('app_title', 'zh')}")
    st.caption(t("app_subtitle", "zh"))
with col_lang:
    lang_choice = st.radio(
        "🌐",
        options=["中文", "English"],
        horizontal=True,
        label_visibility="collapsed",
        key="lang_radio",
    )
    lang: Lang = "zh" if lang_choice == "中文" else "en"

st.divider()

# ===== 侧边栏筛选 =====
filters = render_sidebar(lang)

# ===== 主区 =====
# 使用 anon key 模式（只读，配合 RLS），适合公网部署
try:
    df = fetch_cases(
        lang=lang,
        mode="anon",  # 只读模式
        school=filters["school"] or None,
        curriculum=filters["curriculum"] or None,
        country=filters["country"] or None,
        admit_school=filters["admit_school"] or None,
        purpose=filters["purpose"] or None,
        is_arts=filters["is_arts"],
        date_from=filters["date_from"],
        date_to=filters["date_to"],
        keyword=filters["keyword"],
    )
    metrics = fetch_metrics(lang, mode="anon")
except Exception as e:
    st.error(f"{t('error_load', lang)}{e}")
    st.stop()


# ===== 指标卡片 =====
def metric_card(label: str, value, sub: str = "", gold: bool = False) -> str:
    cls = "metric-card gold" if gold else "metric-card"
    return f"""
    <div class="{cls}">
        <div class="label">{label}</div>
        <div class="value">{value}</div>
        <div class="sub">{sub}</div>
    </div>
    """


# 4 个指标卡
c1, c2, c3, c4 = st.columns(4)
with c1:
    st.markdown(metric_card(
        t("metric_total", lang),
        metrics["total"],
        f"across {metrics['schools']} {t('metric_schools', lang)}",
        gold=True,
    ), unsafe_allow_html=True)
with c2:
    st.markdown(metric_card(
        t("metric_schools", lang),
        metrics["schools"],
        t("metric_period", lang) + " " + (
            metrics["earliest"].strftime("%Y-%m") if metrics["earliest"] else "-"
        ) + " ~ " + (
            metrics["latest"].strftime("%Y-%m") if metrics["latest"] else "-"
        ),
    ), unsafe_allow_html=True)
with c3:
    st.markdown(metric_card(
        t("metric_countries", lang),
        metrics["countries"],
        f"{metrics['admit_schools']} {t('metric_admit_schools', lang)}",
    ), unsafe_allow_html=True)
with c4:
    st.markdown(metric_card(
        t("metric_recent", lang),
        metrics["last_30d"],
        "new in last 30 days" if lang == "en" else "近 30 天新增",
    ), unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)


# ===== 案例列表 =====
if df.empty:
    st.info(f"📭 {t('empty_no_data', lang)} · {t('empty_try_change', lang)}")
else:
    # 准备表格数据
    display = df.copy()

    # 列表字段合并（应用翻译）
    def join_list(x, translate_fn=None):
        if isinstance(x, list):
            items = [translate_fn(v) if translate_fn else v for v in x] if x else []
            return ", ".join(str(v) for v in items) if items else "—"
        return str(x) if x else "—"

    display["school_str"] = display["school"].apply(lambda x: translate_school(x, lang) or "—")
    display["curriculum_str"] = display["curriculum"].apply(lambda x: translate_curriculum(x, lang) or "—")
    display["article_purpose_str"] = display["article_purpose"].apply(lambda x: translate_purpose(x, lang) or "—")
    display["admit_country_str"] = display["admit_country"].apply(
        lambda x: join_list(x, lambda v: translate_country(v, lang))
    )
    display["admit_schools_str"] = display["admit_schools"].apply(
        lambda x: join_list(x, lambda v: translate_university(v, lang))
    )
    display["admit_majors_str"] = display["admit_majors"].apply(join_list)
    display["test_scores_str"] = display["test_scores"].apply(
        lambda d: ", ".join(f"{k}={v}" for k, v in (d or {}).items()) if d else "—"
    )

    cols_map = {
        t("col_student", lang): "student_alias",
        t("col_school", lang): "school_str",
        t("col_curriculum", lang): "curriculum_str",
        t("col_admit_country", lang): "admit_country_str",
        t("col_admit_schools", lang): "admit_schools_str",
        t("col_purpose", lang): "article_purpose_str",
        t("col_published", lang): "article_published_at",
        t("col_confidence", lang): "confidence_score",
    }
    display_view = display[list(cols_map.values())].rename(columns={v: k for k, v in cols_map.items()})

    # 格式化时间
    if t("col_published", lang) in display_view.columns:
        display_view[t("col_published", lang)] = pd.to_datetime(
            display_view[t("col_published", lang)], errors="coerce"
        ).dt.strftime("%Y-%m-%d").fillna("—")

    # 格式化置信度
    conf_col = t("col_confidence", lang)
    if conf_col in display_view.columns:
        display_view[conf_col] = display_view[conf_col].apply(
            lambda x: f"{float(x):.0%}" if pd.notna(x) else "—"
        )

    st.dataframe(
        display_view,
        use_container_width=True,
        hide_index=True,
        height=min(35 * len(display_view) + 40, 600),
    )

    # 案例详情 - 可展开
    with st.expander(f"🔍 {t('nav_case_detail', lang)}", expanded=False):
        for _, row in display.head(10).iterrows():
            student = row.get("student_alias") or "—"
            school = translate_school(row.get("school"), lang) or "—"
            st.markdown(f"#### {student} @ {school}")
            st.markdown(
                f"**{t('col_admit_schools', lang)}:** {row.get('admit_schools_str')}  \n"
                f"**{t('col_curriculum', lang)}:** {row.get('curriculum_str') or '—'}  \n"
                f"**{t('col_purpose', lang)}:** {row.get('article_purpose_str') or '—'}  \n"
                f"**📰 {row.get('article_title') or ''}**  \n"
                f"🔗 {row.get('article_url') or ''}"
            )
            st.divider()


st.caption(
    f"📊 {len(df)} cases shown · 数据来自微信公众号公开内容，仅用于内部对标研究"
    if lang == "en"
    else f"📊 显示 {len(df)} 条案例 · 数据来自微信公众号公开内容，仅用于内部对标研究"
)
