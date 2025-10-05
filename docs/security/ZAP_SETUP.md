# OWASP ZAP セットアップと実行ガイド

## 概要

- 無料の DAST（動的アプリ脆弱性診断）ツール。
- GUI/CLI/Docker/REST API に対応し、CI/CD へ容易に組み込み可能。

## 最短セットアップ（Docker 推奨）

```
# Baseline（非破壊・短時間）
docker run --rm -t -v "$PWD:/zap/wrk" owasp/zap2docker-stable \
  zap-baseline.py -t http://localhost:3000 -r zap-report.html

# Full Scan（破壊的・ステージングで実行推奨）
docker run --rm -t -v "$PWD:/zap/wrk" owasp/zap2docker-stable \
  zap-full-scan.py -t http://localhost:3000 -r zap-full.html

# API Scan（OpenAPI/Swagger）
docker run --rm -t -v "$PWD:/zap/wrk" owasp/zap2docker-stable \
  zap-api-scan.py -t http://localhost:3000/openapi.json -f openapi -r zap-api.html
```

## 失敗条件（CI 向け）

```
# アラート数が1件以上で失敗
zap-baseline.py -t http://localhost:3000 -m 0 -r report.html
```

## 認証が必要な場合のヒント

- ZAP のコンテキストを GUI で作成しエクスポートして利用
- または `-z "-config ..."` でフォーム認証・ユーザを指定

## レポート

- 生成ファイル: `zap-report.html`, `zap-full.html`, `zap-api.html`
- HTML をブラウザで開いて確認（リポジトリにはコミットしない）
