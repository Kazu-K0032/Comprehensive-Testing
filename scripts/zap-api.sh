#!/bin/bash

set -e

SPEC_URL=${1:-"http://localhost:3000/openapi.json"}
OUT_DIR=${2:-"zap-reports"}
ZAP_OPTS=${ZAP_OPTS:-""}
ZAP_IMG=${ZAP_IMG:-"ghcr.io/zaproxy/zaproxy:stable"}
DOCKER_FLAGS=${DOCKER_FLAGS:---network host}

mkdir -p "$OUT_DIR"

# if default SPEC_URL is used and local openapi.json exists, use local file to avoid 404
if [ -z "${1:-}" ] && [ -f "openapi.json" ]; then
  SPEC_URL="/zap/wrk/openapi.json"
fi

# If SPEC_URL is http(s) and not reachable (or 404), fallback to local file if present
if echo "$SPEC_URL" | grep -Eq '^https?://'; then
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SPEC_URL" || echo "000")
  if [ "$HTTP_CODE" != "200" ]; then
    if [ -f "openapi.json" ]; then
      echo "WARN: $SPEC_URL returned HTTP $HTTP_CODE. Falling back to local openapi.json" >&2
      SPEC_URL="/zap/wrk/openapi.json"
    else
      # 最小のOpenAPIスケルトンを生成してフォールバック
      BASE_URL=$(echo "$SPEC_URL" | sed -E 's#(https?://[^/]+).*#\1#')
      [ -z "$BASE_URL" ] && BASE_URL="http://localhost:3000"
      cat > openapi.json <<'EOF'
{
  "openapi": "3.0.0",
  "info": { "title": "Temporary Spec", "version": "0.0.1" },
  "servers": [ { "url": "__BASE_URL__" } ],
  "paths": {
    "/": { "get": { "responses": { "200": { "description": "OK" } } } }
  }
}
EOF
      # BASE_URL を置換
      sed -i "s#__BASE_URL__#$BASE_URL#g" openapi.json
      echo "WARN: $SPEC_URL returned HTTP $HTTP_CODE. Generated minimal ./openapi.json and will use it." >&2
      SPEC_URL="/zap/wrk/openapi.json"
    fi
  fi
fi

CONFIG_ARG=""
# ZAPの -c はタブ区切りの設定ファイル専用（YAML不可）
if [ -f "zap.conf" ]; then
  CONFIG_ARG="-c /zap/wrk/zap.conf"
elif [ -f "zap.yaml" ]; then
  echo "WARN: zap.yaml is not supported by -c (expects tab-separated file). Skipping config file." >&2
fi

docker run --rm -t $DOCKER_FLAGS -v "$PWD:/zap/wrk" "$ZAP_IMG" \
  zap-api-scan.py -t "$SPEC_URL" -f openapi $CONFIG_ARG -r "$OUT_DIR/api.html" $ZAP_OPTS

echo "API scan report: $OUT_DIR/api.html"
