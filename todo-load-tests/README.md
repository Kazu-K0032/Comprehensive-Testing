# Todoアプリ負荷テスト

## 概要

Next.js/TypeScript + Prisma + PostgreSQL を使用したTodoアプリの負荷テストです。

## テストファイル

- `basic-load-test.jmx` - 基本負荷テスト（10ユーザー）
- `stress-test.jmx` - ストレステスト（100ユーザー）
- `run-load-tests.sh` - テスト実行スクリプト

## 使用方法

### 1. 前提条件

```bash
# JMeterのセットアップ
cd ../../
./scripts/setup-jmeter.sh

# Todoアプリの起動
pnpm dev
```

### 2. 基本負荷テスト実行

```bash
# 10ユーザーでの基本負荷テスト
./run-load-tests.sh basic

# カスタムURLでのテスト
./run-load-tests.sh basic http://localhost:3001
```

### 3. ストレステスト実行

```bash
# 100ユーザーでのストレステスト
./run-load-tests.sh stress

# カスタムURLでのテスト
./run-load-tests.sh stress http://localhost:3001
```

## テスト内容

### 基本負荷テスト
- **ユーザー数**: 10
- **継続時間**: 5分
- **操作**: アカウント作成、タスク作成
- **目的**: 通常の負荷での性能測定

### ストレステスト
- **ユーザー数**: 100
- **継続時間**: 10分
- **操作**: タスク作成、取得、更新
- **目的**: システム限界の特定

## 結果の確認

### HTMLレポート
```bash
# ブラウザでレポートを開く
open results/basic-report/index.html
open results/stress-report/index.html
```

### 主要指標
- **応答時間**: 平均、95パーセンタイル
- **スループット**: リクエスト/秒
- **エラー率**: 4xx, 5xxエラーの割合
- **スレッド数**: アクティブユーザー数

## カスタマイズ

### テストパラメータの変更
JMeterテストファイル（.jmx）を編集して以下を調整可能：

- スレッド数（ユーザー数）
- 継続時間
- ランプアップ時間
- リクエスト間隔
- テストデータ

### 新しいテストの追加
1. JMeterでテスト計画を作成
2. .jmxファイルとして保存
3. 実行スクリプトに新しいケースを追加

## トラブルシューティング

### よくある問題

1. **接続エラー**
   - Todoアプリが起動しているか確認
   - ポート番号が正しいか確認

2. **メモリ不足**
   - JMeterのヒープサイズを調整
   - スレッド数を減らす

3. **データベース接続エラー**
   - PostgreSQLが起動しているか確認
   - 接続プールの設定を確認

## 参考資料

- [JMeter セットアップガイド](../../docs/jmeter/JMETER_SETUP.md)
- [負荷テストパターン](../../docs/load-testing/LOAD_TESTING_PATTERNS.md)
