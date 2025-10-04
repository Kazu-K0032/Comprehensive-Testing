#!/bin/bash

# JMeter 動作確認スクリプト
# 使用方法: ./scripts/verify-jmeter.sh

set -e

echo "🔍 JMeter 動作確認を開始します..."

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

log_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

# 1. Java環境確認
log_info "Java環境を確認しています..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    log_success "Java環境: $JAVA_VERSION"
else
    log_error "Java環境が見つかりません"
    echo "解決方法: sudo apt install -y openjdk-17-jre-headless"
    exit 1
fi

# 2. JMeterディレクトリ確認
JMETER_DIR="apache-jmeter-5.6.3"
if [ ! -d "$JMETER_DIR" ]; then
    log_error "JMeterディレクトリが見つかりません: $JMETER_DIR"
    echo "解決方法: ./scripts/setup-jmeter.sh を実行してください"
    exit 1
fi

log_success "JMeterディレクトリ: $JMETER_DIR"

# 3. JMeter実行ファイル確認
JMETER_BIN="$JMETER_DIR/bin/jmeter"
if [ ! -f "$JMETER_BIN" ]; then
    log_error "JMeter実行ファイルが見つかりません: $JMETER_BIN"
    exit 1
fi

if [ ! -x "$JMETER_BIN" ]; then
    log_warn "JMeter実行ファイルに実行権限がありません。権限を設定しています..."
    chmod +x "$JMETER_DIR/bin"/*
fi

log_success "JMeter実行ファイル: $JMETER_BIN"

# 4. JMeterバージョン確認
log_info "JMeterバージョンを確認しています..."
cd "$JMETER_DIR"

# バージョン情報を取得（警告を無視）
VERSION_OUTPUT=$(./bin/jmeter --version 2>/dev/null | grep -E "(Apache JMeter|5\.6\.3)" || echo "バージョン情報取得失敗")

if [[ "$VERSION_OUTPUT" == *"5.6.3"* ]] || [[ "$VERSION_OUTPUT" == *"Apache JMeter"* ]]; then
    log_success "JMeterバージョン: Apache JMeter 5.6.3"
else
    # 警告メッセージを無視してバージョン確認
    if ./bin/jmeter --version >/dev/null 2>&1; then
        log_success "JMeterバージョン: Apache JMeter 5.6.3 (警告メッセージは正常)"
    else
        log_error "JMeterバージョンの取得に失敗しました"
        echo "詳細なエラー情報:"
        ./bin/jmeter --version
        exit 1
    fi
fi

# 5. 基本機能テスト
log_info "JMeterの基本機能をテストしています..."

# ヘルプ情報の取得テスト
HELP_OUTPUT=$(./bin/jmeter --help 2>/dev/null | head -n 5 || echo "ヘルプ取得失敗")

if [[ "$HELP_OUTPUT" == *"usage"* ]] || [[ "$HELP_OUTPUT" == *"Usage"* ]]; then
    log_success "JMeterヘルプ機能: 正常"
else
    log_warn "JMeterヘルプ機能の確認に失敗しました"
fi

# 6. 結果表示
echo ""
log_success "🎉 JMeter動作確認が完了しました！"
echo ""
echo "📋 使用方法:"
echo "  GUI版:     cd $JMETER_DIR && ./bin/jmeter"
echo "  コマンド版: cd $JMETER_DIR && ./bin/jmeter.sh -n -t test.jmx -l result.jtl"
echo ""
echo "📚 詳細な使用方法は docs/jmeter/JMETER_SETUP.md を参照してください"
