#!/bin/bash

# JMeter 自動セットアップスクリプト
# 使用方法: ./scripts/setup-jmeter.sh

set -e

echo "🚀 JMeter セットアップを開始します..."

# 色付きログ関数
log_info() {
    echo -e "\033[32m[INFO]\033[0m $1"
}

log_warn() {
    echo -e "\033[33m[WARN]\033[0m $1"
}

log_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# 1. Java環境チェック・インストール
log_info "Java環境をチェックしています..."
if ! command -v java &> /dev/null; then
    log_info "Java 17をインストールしています..."
    sudo apt update
    sudo apt install -y openjdk-17-jre-headless
    
    if [ $? -eq 0 ]; then
        log_info "Java 17のインストールが完了しました"
    else
        log_error "Java 17のインストールに失敗しました"
        exit 1
    fi
else
    log_info "Java環境は既にインストールされています"
    java -version
fi

# 2. JMeterダウンロード・展開
JMETER_VERSION="5.6.3"
JMETER_DIR="apache-jmeter-${JMETER_VERSION}"
JMETER_ARCHIVE="${JMETER_DIR}.tgz"
JMETER_URL="https://archive.apache.org/dist/jmeter/binaries/${JMETER_ARCHIVE}"

if [ -d "$JMETER_DIR" ]; then
    log_warn "JMeterディレクトリが既に存在します: $JMETER_DIR"
    log_info "既存のJMeterを使用します"
else
    log_info "JMeter ${JMETER_VERSION}をダウンロードしています..."
    wget -q --show-progress "$JMETER_URL"
    
    if [ $? -eq 0 ]; then
        log_info "JMeterのダウンロードが完了しました"
    else
        log_error "JMeterのダウンロードに失敗しました"
        exit 1
    fi
    
    log_info "JMeterを展開しています..."
    tar -xzf "$JMETER_ARCHIVE"
    
    if [ $? -eq 0 ]; then
        log_info "JMeterの展開が完了しました"
        # アーカイブファイルを削除
        rm "$JMETER_ARCHIVE"
        log_info "アーカイブファイルを削除しました"
    else
        log_error "JMeterの展開に失敗しました"
        exit 1
    fi
fi

# 3. 権限設定
log_info "実行権限を設定しています..."
chmod +x "${JMETER_DIR}/bin"/*

# 4. 動作確認
log_info "JMeterの動作確認を行っています..."
cd "$JMETER_DIR"
./bin/jmeter --version > /dev/null 2>&1

if [ $? -eq 0 ]; then
    log_info "✅ JMeterのセットアップが完了しました！"
    echo ""
    echo "📋 使用方法:"
    echo "  GUI版:     cd $JMETER_DIR && ./bin/jmeter"
    echo "  コマンド版: cd $JMETER_DIR && ./bin/jmeter.sh -n -t test.jmx -l result.jtl"
    echo ""
    echo "📚 詳細な使用方法は docs/jmeter/JMETER_SETUP.md を参照してください"
else
    log_error "JMeterの動作確認に失敗しました"
    exit 1
fi
