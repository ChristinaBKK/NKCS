"""
UC/ 看板 - 配置加载模块（精简版，只读 Supabase 配置）

从 .env 读取并校验：
- SUPABASE_URL
- SUPABASE_ANON_KEY（只读，公网部署用）
- SUPABASE_SERVICE_KEY（管理用，部署到公网时建议留空）
"""
import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseModel, field_validator


# 项目根目录 = 当前文件所在目录
PROJECT_ROOT = Path(__file__).parent.resolve()

# 强制从项目根目录加载 .env
load_dotenv(PROJECT_ROOT / ".env")


class SupabaseConfig(BaseModel):
    url: str
    anon_key: Optional[str] = None  # 公网只读看板必须
    service_key: Optional[str] = None  # 可选，仅本地调试

    @field_validator("url")
    @classmethod
    def check_url(cls, v: str) -> str:
        if not v.startswith("https://") or ".supabase.co" not in v:
            raise ValueError(
                f"SUPABASE_URL 格式不对: {v}（应为 https://*.supabase.co）"
            )
        return v


class AppConfig(BaseModel):
    supabase: SupabaseConfig

    @classmethod
    def from_env(cls) -> "AppConfig":
        url = os.environ.get("SUPABASE_URL", "").strip()
        anon_key = os.environ.get("SUPABASE_ANON_KEY", "").strip() or None
        service_key = os.environ.get("SUPABASE_SERVICE_KEY", "").strip() or None

        if not url:
            raise ValueError("SUPABASE_URL 未配置（请在 .env 中设置）")
        if not anon_key and not service_key:
            raise ValueError(
                "至少需要配置 SUPABASE_ANON_KEY（公网只读）或 "
                "SUPABASE_SERVICE_KEY（管理权限）"
            )

        return cls(
            supabase=SupabaseConfig(
                url=url,
                anon_key=anon_key,
                service_key=service_key,
            )
        )


_cached_cfg: Optional[AppConfig] = None


def get_config() -> AppConfig:
    """单例 + 缓存"""
    global _cached_cfg
    if _cached_cfg is None:
        _cached_cfg = AppConfig.from_env()
    return _cached_cfg


if __name__ == "__main__":
    # 自检：python config.py
    cfg = get_config()
    print("✓ UC Dashboard 配置加载成功")
    print(f"  Supabase URL: {cfg.supabase.url}")
    print(f"  anon_key: {'已配置' if cfg.supabase.anon_key else '未配置'}")
    print(f"  service_key: {'已配置' if cfg.supabase.service_key else '未配置'}")
