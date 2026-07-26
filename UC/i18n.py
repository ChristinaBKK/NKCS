"""
中英双语字典
"""
from typing import Literal

Lang = Literal["zh", "en"]


TEXTS = {
    # ===== App =====
    "app_title": {
        "zh": "🎓 Student Case Study · 学生案例分析",
        "en": "🎓 Student Case Study · Case Analysis",
    },
    "app_subtitle": {
        "zh": "对标研究 · 升学趋势 · 课程策略",
        "en": "Benchmarking · Admissions Trends · Curriculum Strategy",
    },

    # ===== Navigation =====
    "nav_overview": {"zh": "📊 总览", "en": "📊 Overview"},
    "nav_by_school": {"zh": "🏫 按学校", "en": "🏫 By School"},
    "nav_by_curriculum": {"zh": "📚 按课程", "en": "📚 By Curriculum"},
    "nav_case_list": {"zh": "📋 案例列表", "en": "📋 Case List"},
    "nav_case_detail": {"zh": "🔍 案例详情", "en": "🔍 Case Detail"},

    # ===== Filters =====
    "filter_title": {"zh": "🔍 筛选", "en": "🔍 Filters"},
    "filter_role": {"zh": "👤 角色预设", "en": "👤 Role Preset"},
    "role_principal": {"zh": "校长（趋势 + overview）", "en": "Principal (Trends)"},
    "role_counselor": {"zh": "升学指导（全部 + 详情）", "en": "Counselor (All)"},
    "role_curriculum": {"zh": "课程主任（课程对比）", "en": "Curriculum Head"},
    "role_marketing": {"zh": "市场招生（喜报类）", "en": "Marketing (Good News)"},
    "role_custom": {"zh": "自定义", "en": "Custom"},
    "filter_school": {"zh": "学校", "en": "School"},
    "filter_curriculum": {"zh": "课程体系", "en": "Curriculum"},
    "filter_country": {"zh": "录取国家", "en": "Admit Country"},
    "filter_admit_school": {"zh": "录取学校", "en": "Admit School"},
    "filter_purpose": {"zh": "文章类型", "en": "Article Purpose"},
    "filter_is_arts": {"zh": "艺术方向", "en": "Arts Track"},
    "filter_date_range": {"zh": "时间范围", "en": "Date Range"},
    "filter_keyword": {"zh": "🔎 关键词搜索", "en": "🔎 Keyword Search"},
    "filter_reset": {"zh": "重置筛选", "en": "Reset Filters"},
    "filter_active": {"zh": "已生效筛选", "en": "Active Filters"},

    # ===== Metrics =====
    "metric_total": {"zh": "总案例数", "en": "Total Cases"},
    "metric_schools": {"zh": "学校数", "en": "Schools"},
    "metric_countries": {"zh": "录取国家", "en": "Countries"},
    "metric_admit_schools": {"zh": "录取学校", "en": "Admit Schools"},
    "metric_recent": {"zh": "近 30 天新增", "en": "Last 30 Days"},
    "metric_period": {"zh": "时间区间", "en": "Period"},

    # ===== Tables / Lists =====
    "col_student": {"zh": "学生", "en": "Student"},
    "col_school": {"zh": "所在学校", "en": "School"},
    "col_curriculum": {"zh": "课程", "en": "Curriculum"},
    "col_admit_country": {"zh": "国家", "en": "Country"},
    "col_admit_schools": {"zh": "录取学校", "en": "Admitted To"},
    "col_purpose": {"zh": "文章类型", "en": "Purpose"},
    "col_published": {"zh": "发布日期", "en": "Published"},
    "col_confidence": {"zh": "置信度", "en": "Confidence"},
    "col_activities": {"zh": "活动/竞赛", "en": "Activities"},
    "col_takeaways": {"zh": "经验要点", "en": "Key Takeaways"},

    # ===== Empty / Error =====
    "empty_no_data": {"zh": "没有匹配的数据", "en": "No matching data"},
    "empty_try_change": {"zh": "试试调整筛选条件", "en": "Try adjusting filters"},
    "error_load": {"zh": "数据加载失败：", "en": "Failed to load data: "},

    # ===== Welcome =====
    "welcome_title": {"zh": "👋 欢迎使用", "en": "👋 Welcome"},
    "welcome_text": {
        "zh": "这是 Student Case Study 看板。\n\n用左侧筛选器找到你感兴趣的对标案例。所有数据来自微信公众号公开内容，仅用于内部对标研究。",
        "en": "This is the Student Case Study dashboard.\n\nUse the filters on the left to find benchmark cases. Data is sourced from public WeChat content for internal research only.",
    },
}


def t(key: str, lang: Lang) -> str:
    """获取中英文文案"""
    return TEXTS.get(key, {}).get(lang, key)


def all_languages() -> list[str]:
    return ["zh", "en"]
