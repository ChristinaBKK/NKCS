"""
数据访问层 - 从 Supabase 拉数据

支持两种模式：
- service_key: 全权限（开发/管理用）
- anon_key: 只读（公网公开看板用，配合 RLS）
"""
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

import pandas as pd
from supabase import create_client

sys.path.insert(0, str(Path(__file__).parent.parent))

from config import get_config
from i18n import Lang, t


_clients = {}


def get_db(mode: str = "service"):
    """
    获取 Supabase 客户端
    mode="service": service_role key（默认，admin 权限）
    mode="anon": anon key（只读，配合 RLS）
    """
    if mode in _clients:
        return _clients[mode]

    cfg = get_config()
    if mode == "anon":
        key = cfg.supabase.anon_key
        if not key:
            raise ValueError("SUPABASE_ANON_KEY 未配置")
    else:
        key = cfg.supabase.service_key

    _clients[mode] = create_client(cfg.supabase.url, key)
    return _clients[mode]


def fetch_cases(
    lang: Lang = "zh",
    mode: str = "service",
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
    mode="service": service_role key（admin）
    mode="anon": anon key（只读，配合 RLS）
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
    # 注意：v_cases_full 视图可能缺 is_arts 字段；为了兼容性，先不传，
    # 在 pandas 层用 case_id 反查 student_cases 表
    if date_from:
        q = q.gte("published_at", date_from.isoformat())
    if date_to:
        q = q.lte("published_at", date_to.isoformat())
    if keyword:
        like = f"%{keyword}%"
        q = q.or_(
            f"student_alias.ilike.{like},"
            f"school.ilike.{like},"
            f"article_title.ilike.{like},"
            f"admit_schools.cs.{{{keyword}}}"
        )

    result = q.order("published_at", desc=True).limit(1000).execute()
    rows = result.data or []
    df = pd.DataFrame(rows)

    # is_arts 过滤（v_cases_full 可能没有该字段，所以用 case_id 反查）
    if is_arts is not None and not df.empty and "case_id" in df.columns:
        case_ids = df["case_id"].tolist()
        is_arts_map = {}
        for cid in case_ids:
            r = db.table("student_cases").select("id, is_arts").eq("id", cid).execute()
            for c in r.data or []:
                is_arts_map[c["id"]] = c.get("is_arts", False)
        df = df[df["case_id"].map(lambda x: is_arts_map.get(x, False) == is_arts)]

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


def fetch_metrics(lang: Lang = "zh", mode: str = "service") -> dict:
    """总览指标"""
    db = get_db(mode)
    cases = db.table("v_cases_full").select(
        "case_id, school, admit_country, admit_schools, published_at"
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
    for ts in df["published_at"]:
        if not ts:
            continue
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00")).replace(tzinfo=None)
            if dt > cutoff:
                last_30d += 1
        except:
            pass

    pubs = [datetime.fromisoformat(ts.replace("Z", "+00:00")).replace(tzinfo=None)
            for ts in df["published_at"] if ts]

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
    db = get_db("anon")  # 用 anon 模式（只读，配合 RLS）
    cases = db.table("v_cases_full").select(
        "school, curriculum, admit_country, admit_schools, article_purpose"
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
