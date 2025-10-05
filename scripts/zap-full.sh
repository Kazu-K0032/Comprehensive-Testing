#!/bin/bash

set -e

TARGET_URL=${1:-"http://localhost:3000"}
OUT_DIR=${2:-"zap-reports"}
ZAP_IMG=${ZAP_IMG:-"ghcr.io/zaproxy/zaproxy:stable"}
DOCKER_FLAGS=${DOCKER_FLAGS:---network host}

mkdir -p "$OUT_DIR"

docker run --rm -t $DOCKER_FLAGS -v "$PWD:/zap/wrk" "$ZAP_IMG" \
  zap-full-scan.py -t "$TARGET_URL" -r "$OUT_DIR/full.html"

echo "Full scan report: $OUT_DIR/full.html"


