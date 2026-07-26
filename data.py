"""
数据访问层 - 从 Supabase 拉数据

支持两种模式：
- service_key: 全权限（本地调试用）
- anon_key: 只读（公网公开看板用，配合 RLS）
"""
from datetime import datetime, timedelta
from typing import Optional

import pandas as pd
from supabase import create_client

from config import get_config
from i18n import Lang


_clients = {}


def get_db(mode: str = "anon"):
    """
    获取 Supabase 客户端
    mode="anon": anon key（只读，配合 RLS，公网部署推荐）
    mode="service": service_role key（admin 权限，仅本地调试）
    """
    if mode in _clients:
        return _clients[mode]

    cfg = get_config()
    if mode == "anon":
        if not cfg.supabase.anon_key:
            raise ValueError("SUPABASE_ANON_KEY 未配置")
        key = cfg.supabase.anon_key
    elif mode == "service":
        if not cfg.supabase.service_key:
            raise ValueError("SUPABASE_SERVICE_KEY 未配置")
        key = cfg.supabase.service_key
    else:
        raise ValueError(f"未知 mode: {mode}（应为 anon 或 service）")

    _clients[mode] = create_client(cfg.supabase.url, key)
    return _clients[mode]


def fetch_cases(
    lang: Lang = "zh",
    mode: str = "anon",
    school: Optional[list] = None,
    curriculum: Optional[list] = None,
    country: Optional[list] = None,
    admit_school: Optional[list] = None,
    purpose: Optional[list] = None,
    is_arts: Optional[bool] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    keyword: Optional[str] = None,
) -> pd.DataFrame:
    """
    拉取学生案例（应用所有 filter）
    """
    db = get_db(mode)
    # 用 v_cases_full 视图
    q = db.table("v_cases_full").select("*")

    if school:
        q = q.in_("school", school)
    if curriculum:
        q = q.in_("curriculum", curriculum)
    if purpose:
        q = q.in_("article_purpose", purpose)
    if is_arts is not None:
        q = q.eq("is_arts", is_arts)
    if date_from:
        q = q.gte("article_published_at", date_from.isoformat())
    if date_to:
        q = q.lte("article_published_at", date_to.isoformat())
    if keyword:
        like = f"%{keyword}%"
        q = q.or_(
            f"student_alias.ilike.{like},"
            f"school.ilike.{like},"
            f"article_title.ilike.{like},"
            f"admit_schools.cs.{{{keyword}}}"
        )

    result = q.order("article_published_at", desc=True).limit(1000).execute()
    rows = result.data or []
    df = pd.DataFrame(rows)

    # country / admit_school 是数组列，需要在 pandas 层过滤
    if country and not df.empty and "admit_country" in df.columns:
        df = df[df["admit_country"].apply(
            lambda lst: any(c in (lst or []) for c in country)
        )]
    if admit_school and not df.empty and "admit_schools" in df.columns:
        df = df[df["admit_schools"].apply(
            lambda lst: any(s in (lst or []) for s in admit_school)
        )]

    return df.reset_index(drop=True)


def fetch_metrics(lang: Lang = "zh", mode: str = "anon") -> dict:
    """总览指标"""
    db = get_db(mode)
    cases = db.table("v_cases_full").select(
        "id, school, admit_country, admit_schools, article_published_at"
    ).execute().data or []

    df = pd.DataFrame(cases)
    if df.empty:
        return {
            "total": 0, "schools": 0, "countries": 0, "admit_schools": 0,
            "last_30d": 0, "earliest": None, "latest": None,
        }

    countries = set()
    for lst in df["admit_country"]:
        if lst:
            countries.update(lst)
    admit_schools = set()
    for lst in df["admit_schools"]:
        if lst:
            admit_schools.update(lst)

    last_30d = 0
    cutoff = datetime.now() - timedelta(days=30)
    for ts in df["article_published_at"]:
        if not ts:
            continue
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00")).replace(tzinfo=None)
            if dt > cutoff:
                last_30d += 1
        except Exception:
            pass

    pubs = [datetime.fromisoformat(ts.replace("Z", "+00:00")).replace(tzinfo=None)
            for ts in df["article_published_at"] if ts]

    return {
        "total": len(df),
        "schools": df["school"].nunique() if "school" in df.columns else 0,
        "countries": len(countries),
        "admit_schools": len(admit_schools),
        "last_30d": last_30d,
        "earliest": min(pubs) if pubs else None,
        "latest": max(pubs) if pubs else None,
    }


def get_filter_options(lang: Lang = "zh") -> dict:
    """获取所有 filter 的可选值"""
    db = get_db("anon")
    cases = db.table("v_cases_full").select(
        "school, curriculum, admit_country, admit_schools, article_purpose, is_arts"
    ).limit(1000).execute().data or []

    schools = set()
    curriculums = set()
    countries = set()
    admit_schools = set()
    purposes = set()
    for c in cases:
        if c.get("school"):
            schools.add(c["school"])
        if c.get("curriculum"):
            curriculums.add(c["curriculum"])
        for co in c.get("admit_country") or []:
            countries.add(co)
        for s in c.get("admit_schools") or []:
            admit_schools.add(s)
        if c.get("article_purpose"):
            purposes.add(c["article_purpose"])

    return {
        "school": sorted(schools),
        "curriculum": sorted(curriculums),
        "country": sorted(countries),
        "admit_school": sorted(admit_schools),
        "purpose": sorted(purposes),
    }
