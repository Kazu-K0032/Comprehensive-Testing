# Comprehensive-Testing

[English](./docs/lang/en.md) | 日本語

Next.js/Antd における高パフォーマンスな設計を考えるリポジトリ

## セットアップ手順

1. リポジトリのクローン

   ```bash
   git clone <repository-url>
   cd PerformanceAntd
   ```

2. 依存関係のインストール

   ```bash
   pnpm install
   ```

3. 仮想環境および DB のセットアップ

   ```bash
   # DockerでPostgreSQLを起動
   docker compose up -d

   # データベーススキーマの同期
   npx prisma db push

   # サンプルデータの投入
   pnpm db:seed
   ```

4. サーバーの起動

   ```bash
   pnpm dev
   ```

5. 動作確認
   - ブラウザで `http://localhost:3000` にアクセス
   - アカウント管理とタスク管理機能を確認

## JMeter セットアップ（パフォーマンステスト用）

### 自動セットアップ（推奨）

```bash
# JMeter自動セットアップ
./scripts/setup-jmeter.sh

# 動作確認
./scripts/verify-jmeter.sh
```

### 使用方法

```bash
# WSL2環境ではコマンドライン版を推奨
cd apache-jmeter-5.6.3

# ヘッドレスモードテスト（推奨）
./scripts/test-jmeter-headless.sh

# カスタムテスト実行
./bin/jmeter.sh -n -t test.jmx -l result.jtl -e -o report/
```

**注意:** WSL2 環境では GUI 版が制限される場合があります。詳細は [JMeter セットアップガイド](./docs/jmeter/JMETER_SETUP.md) を参照してください。

詳細な手順は [JMeter セットアップガイド](./docs/jmeter/JMETER_SETUP.md) を参照してください。
