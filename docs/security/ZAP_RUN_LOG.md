# OWASP ZAP 実行コマンドと結果概要

本プロジェクトで実行した ZAP のコマンドと主要な結果を記録します。

## 実行環境

- 画像: `ghcr.io/zaproxy/zaproxy:stable`
- 実行方法: 付属スクリプト（Docker）
- ネットワーク: `--network host`（WSL2/Linux）

---

## 1) Baseline Scan（非破壊）

### コマンド

```bash
./scripts/zap-baseline.sh http://localhost:3000
```

### サマリ

- URLs: 19
- FAIL: 0
- WARN: 11（ヘッダ系の指摘が中心、後述の `next.config.js` で一部解消）

主な WARN（抜粋）:

- Missing Anti-clickjacking Header [10020]
- X-Content-Type-Options Header Missing [10021]
- X-Powered-By 情報露出 [10037]
- Content Security Policy (CSP) Header Not Set [10038]
- Permissions Policy Header Not Set [10063]

対応: `next.config.js` でセキュリティヘッダを追加済み。

---

## 2) API Scan（OpenAPI）

OpenAPI の公開 URL が未配信だったため、スクリプト側でローカル `openapi.json` に自動フォールバックする仕組みを追加しました。

### コマンド

```bash
# 公開URLがあればURLを指定、なければフォールバックで ./openapi.json を利用
./scripts/zap-api.sh http://localhost:3000/openapi.json
# または
./scripts/zap-api.sh
```

### サマリ

- Imported URLs: 2〜3
- Total URLs: 7〜12（実行タイミングによって差異）
- FAIL: 0
- WARN: 3〜7（ヘッダ系/CSP 詳細・一部 404 由来）

主な WARN（抜粋）:

- Unexpected Content-Type was returned [100001]（404 応答やルートパスの 200 応答由来）
- CSP: Failure to Define Directive with No Fallback [10055]
- Insufficient Site Isolation Against Spectre Vulnerability [90004]

対応:

- `next.config.js` に CSP/COOP/CORP を追加し段階的に低減
- CI 上は `zap.conf`（タブ区切り）でしきい値を INFO に調整可能

```text
zap.conf（タブ区切り）
10055	INFO
90004	INFO
100001	INFO
```

---

## 3) 参考スクリーン（抜粋ログ）

Baseline 抜粋:

```text
FAIL-NEW: 0  WARN-NEW: 11  PASS: 56
```

API 抜粋:

```text
FAIL-NEW: 0  WARN-NEW: 3  PASS: 112
```

---

## 付記

- 本番相当の厳格 CSP/COEP が必要な場合は、外部スクリプト・フォント・画像 CDN 等の実態に合わせた allow-list へ調整してください。
- CI で閾値制御する場合は `zap.conf`（タブ区切り形式、`<ruleId>\t<level>`）を併用してください。

---

## 初学者向けメモ: 今回「見つからなかった（PASS だった）」代表的な脆弱性

ZAP のレポートで PASS になっていた項目を、初心者にもわかる言葉で説明します。以下はいずれも「今回のサイトでは検出されなかった（＝少なくとも自動診断の範囲では問題が見つからなかった）」ものです。

- SQL インジェクション（SQL Injection）
  - 入力値を使って DB クエリを壊す攻撃。ZAP の複数ルール（各 DB 製品向け Time Based など）が PASS でした。
- XSS（クロスサイト・スクリプティング）
  - 画面にスクリプトを仕込む攻撃。反射/持続/DOM ベースなど複数観点で PASS でした。
- パストラバーサル / ファイル包含
  - `../` などで本来見せないファイルへアクセスする攻撃。PASS でした。
- CSRF（の兆候の一部）
  - 完全な自動判定は困難ですが、ZAP が見る一般的なヘッダやフォーム遷移の観点では致命的な失敗は検出されませんでした（ルール 10202 は情報レベル）。
- ディレクトリリスティング
  - フォルダ内容が丸見えになる問題。PASS でした。
- 既知の脆弱 JS ライブラリの利用
  - Retire.js による既知 CVE 対象確認。PASS でした。
- .env や .htaccess など機密ファイルの露出
  - 直接取得できる形では検出されませんでした（PASS）。
- サーバ/アプリ一般の重大なリモートコード実行（RCE）系シグネチャ
  - 代表的な既知パターン（Log4Shell、Spring4Shell など）は PASS でした。

注意:

- 自動診断は「発見可能な範囲」の確認です。認可（アクセス制御）やビジネスロジックの穴などは手動テストが必要です。
- 本番運用では、CSP/COOP/COEP や各種セキュリティヘッダを実環境に合わせて堅牢化することを推奨します。
