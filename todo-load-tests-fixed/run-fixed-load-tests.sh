#!/bin/bash

# 修正されたTodoアプリ負荷テスト実行スクリプト
# 使用方法: ./run-fixed-load-tests.sh

set -e

echo "🔧 修正されたTodoアプリ負荷テストを実行します..."

# JMeterディレクトリ確認
JMETER_DIR="../apache-jmeter-5.6.3"
if [ ! -d "$JMETER_DIR" ]; then
    echo "❌ JMeterディレクトリが見つかりません: $JMETER_DIR"
    echo "解決方法: ../scripts/setup-jmeter.sh を実行してください"
    exit 1
fi

# 結果ディレクトリ作成
RESULTS_DIR="results"
rm -rf "$RESULTS_DIR"
mkdir -p "$RESULTS_DIR"

# テスト実行
echo "📊 修正された基本負荷テスト（10ユーザー）を実行中..."
cd "$JMETER_DIR"
./bin/jmeter.sh -n -t "../todo-load-tests-fixed/basic-load-test-fixed.jmx" \
    -l "../todo-load-tests-fixed/$RESULTS_DIR/fixed-results.jtl" \
    -e -o "../todo-load-tests-fixed/$RESULTS_DIR/fixed-report"

if [ $? -eq 0 ]; then
    echo "✅ 修正された負荷テストが完了しました！"
    echo ""
    echo "📊 結果ファイル:"
    echo "  - テスト結果: $RESULTS_DIR/fixed-results.jtl"
    echo "  - HTML レポート: $RESULTS_DIR/fixed-report/index.html"
    echo ""
    echo "🌐 レポートを開く:"
    echo "  cd $RESULTS_DIR/fixed-report"
    echo "  python3 -m http.server 8080"
    echo "  ブラウザで http://localhost:8080 にアクセス"
else
    echo "❌ 負荷テストに失敗しました"
    exit 1
fi
