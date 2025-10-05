#!/bin/bash

# Todoアプリ負荷テスト実行スクリプト
# 使用方法: ./run-load-tests.sh [test-type]

set -e

TEST_TYPE=${1:-"basic"}
BASE_URL=${2:-"http://localhost:3000"}

echo "🧪 Todoアプリ負荷テストを実行します..."
echo "テストタイプ: $TEST_TYPE"
echo "ベースURL: $BASE_URL"

# JMeterディレクトリ確認
JMETER_DIR="../apache-jmeter-5.6.3"
if [ ! -d "$JMETER_DIR" ]; then
    echo "❌ JMeterディレクトリが見つかりません: $JMETER_DIR"
    echo "解決方法: ../scripts/setup-jmeter.sh を実行してください"
    exit 1
fi

# 結果ディレクトリ作成
RESULTS_DIR="results"
mkdir -p "$RESULTS_DIR"

# テスト実行
case $TEST_TYPE in
    "basic")
        echo "📊 基本負荷テスト（10ユーザー）を実行中..."
        cd "$JMETER_DIR"
        ./bin/jmeter.sh -n -t "../todo-load-tests/basic-load-test.jmx" \
            -l "../todo-load-tests/$RESULTS_DIR/basic-results.jtl" \
            -e -o "../todo-load-tests/$RESULTS_DIR/basic-report" \
            -J BASE_URL="$BASE_URL"
        ;;
    "stress")
        echo "📊 ストレステスト（100ユーザー）を実行中..."
        cd "$JMETER_DIR"
        ./bin/jmeter.sh -n -t "../todo-load-tests/stress-test.jmx" \
            -l "../todo-load-tests/$RESULTS_DIR/stress-results.jtl" \
            -e -o "../todo-load-tests/$RESULTS_DIR/stress-report" \
            -J BASE_URL="$BASE_URL"
        ;;
    *)
        echo "❌ 無効なテストタイプ: $TEST_TYPE"
        echo "使用可能なタイプ: basic, stress"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo "✅ 負荷テストが完了しました！"
    echo ""
    echo "📊 結果ファイル:"
    echo "  - テスト結果: $RESULTS_DIR/${TEST_TYPE}-results.jtl"
    echo "  - HTML レポート: $RESULTS_DIR/${TEST_TYPE}-report/index.html"
    echo ""
    echo "📚 詳細な使用方法は ../../docs/load-testing/LOAD_TESTING_PATTERNS.md を参照してください"
else
    echo "❌ 負荷テストに失敗しました"
    exit 1
fi
