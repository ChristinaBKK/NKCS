"""
侧边栏筛选器
"""
from datetime import datetime, timedelta

import streamlit as st

from data import fetch_cases, get_filter_options
from i18n import Lang, t
from translations import translate_school, translate_curriculum, translate_country, translate_purpose, translate_university


ROLE_PRESETS = {
    "role_principal": {
        "purpose": ["录取喜报", "成长故事"],
        "days_back": 365,
    },
    "role_counselor": {
        # 全部
    },
    "role_curriculum": {
        "curriculum": ["IB", "A-Level", "AP", "IGCSE", "BC", "Mixed"],
    },
    "role_marketing": {
        "purpose": ["录取喜报"],
    },
    "role_custom": {},
}


def render_sidebar(lang: Lang) -> dict:
    """渲染侧边栏 filter，返回当前所有 filter 值"""
    options = get_filter_options(lang)
    preset = ROLE_PRESETS

    with st.sidebar:
        st.markdown(f"### {t('filter_title', lang)}")

        # 角色预设
        role_keys = list(preset.keys())
        role_choice = st.selectbox(
            t("filter_role", lang),
            options=role_keys,
            format_func=lambda x: t(x, lang),
            key="role_preset",
        )
        role_cfg = preset[role_choice]

        st.divider()

        # 应用预设默认值
        default_school = []
        default_curriculum = role_cfg.get("curriculum", [])
        default_purpose = role_cfg.get("purpose", [])
        default_country = []

        # 各个 filter（option 显示英文标签，但 value 保留中文用于查询）
        school_sel = st.multiselect(
            t("filter_school", lang),
            options=options["school"],
            default=default_school,
            format_func=lambda x: translate_school(x, lang) if lang == "en" else x,
            key="filter_school",
        )
        curriculum_sel = st.multiselect(
            t("filter_curriculum", lang),
            options=options["curriculum"],
            default=default_curriculum,
            format_func=lambda x: translate_curriculum(x, lang) if lang == "en" else x,
            key="filter_curriculum",
        )
        country_sel = st.multiselect(
            t("filter_country", lang),
            options=options["country"],
            default=default_country,
            format_func=lambda x: translate_country(x, lang) if lang == "en" else x,
            key="filter_country",
        )
        admit_sel = st.multiselect(
            t("filter_admit_school", lang),
            options=options["admit_school"],
            default=[],
            format_func=lambda x: translate_university(x, lang) if lang == "en" else x,
            key="filter_admit_school",
        )
        purpose_sel = st.multiselect(
            t("filter_purpose", lang),
            options=options["purpose"],
            default=default_purpose,
            format_func=lambda x: translate_purpose(x, lang) if lang == "en" else x,
            key="filter_purpose",
        )
        is_arts = st.checkbox(t("filter_is_arts", lang), value=False, key="filter_arts")

        # 时间范围
        days_back = role_cfg.get("days_back", 365 * 3)
        if role_choice == "role_counselor":
            days_back = 365 * 5
        default_to = datetime.now()
        default_from = default_to - timedelta(days=days_back)
        date_range = st.date_input(
            t("filter_date_range", lang),
            value=(default_from.date(), default_to.date()),
            key="filter_dates",
        )
        if isinstance(date_range, tuple) and len(date_range) == 2:
            date_from, date_to = date_range
        else:
            date_from, date_to = default_from.date(), default_to.date()

        st.divider()

        # 关键词
        keyword = st.text_input(t("filter_keyword", lang), "", key="filter_keyword")

        # 重置
        if st.button(t("filter_reset", lang), use_container_width=True):
            for k in list(st.session_state.keys()):
                if k.startswith("filter_") or k == "role_preset":
                    del st.session_state[k]
            st.rerun()

    return {
        "school": school_sel,
        "curriculum": curriculum_sel,
        "country": country_sel,
        "admit_school": admit_sel,
        "purpose": purpose_sel,
        "is_arts": is_arts if is_arts else None,
        "date_from": datetime.combine(date_from, datetime.min.time()) if date_from else None,
        "date_to": datetime.combine(date_to, datetime.max.time()) if date_to else None,
        "keyword": keyword or None,
    }
