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
