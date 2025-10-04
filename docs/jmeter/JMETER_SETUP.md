# JMeter セットアップガイド

## 概要

このドキュメントでは、チームメンバーがリポジトリをクローンした後、JMeter を迅速にセットアップし動作確認するための手順を説明します。

## 前提条件

- Ubuntu/Debian 系 OS（WSL2 含む）
- sudo 権限
- インターネット接続

## 自動セットアップ（推奨）

### 1. セットアップスクリプト実行

```bash
# リポジトリクローン後
cd comprehensive-testing

# 自動セットアップ実行
chmod +x scripts/setup-jmeter.sh
./scripts/setup-jmeter.sh
```

### 2. 動作確認

```bash
# JMeter動作確認
./scripts/verify-jmeter.sh
```

## 手動セットアップ

### 1. Java 環境のインストール

```bash
# パッケージ更新
sudo apt update

# Java 17 インストール
sudo apt install -y openjdk-17-jre-headless

# インストール確認
java -version
```

### 2. JMeter ダウンロード・展開

```bash
# JMeter 5.6.3 ダウンロード
wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.6.3.tgz

# 展開
tar -xzf apache-jmeter-5.6.3.tgz

# 権限設定
chmod +x apache-jmeter-5.6.3/bin/jmeter
```

### 3. 動作確認

```bash
# JMeterバージョン確認
cd apache-jmeter-5.6.3
./bin/jmeter --version
```

## 使用方法

### GUI 版（推奨）

```bash
cd apache-jmeter-5.6.3
./bin/jmeter
```

### コマンドライン版

```bash
cd apache-jmeter-5.6.3
./bin/jmeter.sh -n -t test.jmx -l result.jtl
```

## トラブルシューティング

### Java が見つからない場合

```bash
# Java環境変数設定
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

### 権限エラーの場合

```bash
# 実行権限付与
chmod +x apache-jmeter-5.6.3/bin/*
```

## ファイル構成

```markdown
comprehensive-testing/
├── apache-jmeter-5.6.3/ # JMeter 本体
├── scripts/
│ ├── setup-jmeter.sh # 自動セットアップ
│ └── verify-jmeter.sh # 動作確認
└── docs/jmeter/
└── JMETER_SETUP.md # このドキュメント
```

## WSL2 環境での制限事項

### GUI 版が起動しない場合

WSL2 環境では GUI 版の JMeter が起動できない場合があります。以下のエラーが発生した場合：

```bash
java.lang.UnsatisfiedLinkError: Can't load library: /usr/lib/jvm/java-17-openjdk-amd64/lib/libawt_xawt.so
```

**解決方法：**

1. **コマンドライン版を使用（推奨）**

   ```bash
   cd apache-jmeter-5.6.3
   ./bin/jmeter.sh -n -t test.jmx -l result.jtl
   ```

2. **X11 転送を有効にする**

   ```bash
   # Windows側でX11サーバー（VcXsrv等）を起動
   export DISPLAY=:0
   ./bin/jmeter
   ```

3. **ヘッドレスモードで実行**
   ```bash
   # テスト計画ファイルを作成してから実行
   ./bin/jmeter.sh -n -t your_test.jmx -l results.jtl -e -o report/
   ```

## 注意事項

- JMeter ファイルは`.gitignore`に含まれているため、リポジトリには含まれません
- 初回セットアップ時は約 100MB のダウンロードが必要です
- **WSL2 環境では GUI 版の制限があります** - コマンドライン版の使用を推奨します
