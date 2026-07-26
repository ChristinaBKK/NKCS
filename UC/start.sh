#!/bin/bash
# UC Dashboard 启动脚本
# 用法：./start.sh

set -e

# 切到脚本所在目录
cd "$(dirname "$0")"

# 检查 .env
if [ ! -f .env ]; then
  echo "❌ .env 文件不存在，请先："
  echo "   cp .env.example .env"
  echo "   然后填入 SUPABASE_URL 和 SUPABASE_ANON_KEY"
  exit 1
fi

# 检查依赖
if ! python3 -c "import streamlit, supabase, pandas" 2>/dev/null; then
  echo "📦 缺少依赖，正在安装..."
  pip install -r requirements.txt
fi

# 配置自检
python3 config.py

# 启动
echo ""
echo "🚀 启动 UC Dashboard..."
echo "   访问 http://localhost:8501"
echo ""
streamlit run app.py --server.port 8501 --server.address 0.0.0.0
