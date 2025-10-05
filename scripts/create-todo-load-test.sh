#!/bin/bash

# Todoアプリ負荷テスト作成スクリプト
# 使用方法: ./scripts/create-todo-load-test.sh

set -e

echo "🧪 Todoアプリ負荷テストを作成します..."

# 色付きログ関数
log_info() {
    echo -e "\033[32m[INFO]\033[0m $1"
}

log_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

log_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# テスト用ディレクトリ作成
TEST_DIR="todo-load-tests"
mkdir -p "$TEST_DIR"

# 1. 基本負荷テスト（10ユーザー）
log_info "基本負荷テスト（10ユーザー）を作成しています..."
cat > "$TEST_DIR/basic-load-test.jmx" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Todo Basic Load Test" enabled="true">
      <stringProp name="TestPlan.comments">10ユーザーでの基本負荷テスト</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="BASE_URL" elementType="Argument">
            <stringProp name="Argument.name">BASE_URL</stringProp>
            <stringProp name="Argument.value">http://localhost:3000</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">true</boolProp>
          <stringProp name="LoopController.loops">-1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">10</stringProp>
        <stringProp name="ThreadGroup.ramp_time">60</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">300</stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>
      <hashTree>
        <!-- アカウント作成 -->
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Create Account" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">${BASE_URL}</stringProp>
          <stringProp name="HTTPSampler.port">80</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/accounts</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Content-Type</stringProp>
                <stringProp name="Header.value">application/json</stringProp>
              </elementProp>
            </collectionProp>
          </HeaderManager>
          <hashTree/>
          <BeanShellPreProcessor guiclass="TestBeanGUI" testclass="BeanShellPreProcessor" testname="BeanShell PreProcessor" enabled="true">
            <stringProp name="filename"></stringProp>
            <stringProp name="parameters"></stringProp>
            <boolProp name="resetInterpreter">false</boolProp>
            <stringProp name="script">// ランダムなアカウント名を生成
String accountName = "TestUser" + System.currentTimeMillis() + Thread.currentThread().getId();
String icon = "user" + (int)(Math.random() * 10);

// リクエストボディを設定
String requestBody = "{\"accountName\":\"" + accountName + "\",\"icon\":\"" + icon + "\"}";
vars.put("REQUEST_BODY", requestBody);</stringProp>
          </BeanShellPreProcessor>
          <hashTree/>
          <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
            <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
            <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
              <collectionProp name="Arguments.arguments"/>
            </elementProp>
            <stringProp name="HTTPSampler.domain"></stringProp>
            <stringProp name="HTTPSampler.port"></stringProp>
            <stringProp name="HTTPSampler.protocol"></stringProp>
            <stringProp name="HTTPSampler.contentEncoding"></stringProp>
            <stringProp name="HTTPSampler.path"></stringProp>
            <stringProp name="HTTPSampler.method">POST</stringProp>
            <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
            <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
            <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
            <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
            <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
            <stringProp name="HTTPSampler.connect_timeout"></stringProp>
            <stringProp name="HTTPSampler.response_timeout"></stringProp>
          </HTTPSamplerProxy>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
EOF

log_success "基本負荷テストを作成しました: $TEST_DIR/basic-load-test.jmx"

# 2. ストレステスト（100ユーザー）
log_info "ストレステスト（100ユーザー）を作成しています..."
cat > "$TEST_DIR/stress-test.jmx" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Todo Stress Test" enabled="true">
      <stringProp name="TestPlan.comments">100ユーザーでのストレステスト</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="BASE_URL" elementType="Argument">
            <stringProp name="Argument.name">BASE_URL</stringProp>
            <stringProp name="Argument.value">http://localhost:3000</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">true</boolProp>
          <stringProp name="LoopController.loops">-1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">100</stringProp>
        <stringProp name="ThreadGroup.ramp_time">120</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">600</stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>
      <hashTree>
        <!-- タスク作成 -->
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Create Task" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">${BASE_URL}</stringProp>
          <stringProp name="HTTPSampler.port">80</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/tasks</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Content-Type</stringProp>
                <stringProp name="Header.value">application/json</stringProp>
              </elementProp>
            </collectionProp>
          </HeaderManager>
          <hashTree/>
          <BeanShellPreProcessor guiclass="TestBeanGUI" testclass="BeanShellPreProcessor" testname="BeanShell PreProcessor" enabled="true">
            <stringProp name="filename"></stringProp>
            <stringProp name="parameters"></stringProp>
            <boolProp name="resetInterpreter">false</boolProp>
            <stringProp name="script">// ランダムなタスクデータを生成
String title = "Test Task " + System.currentTimeMillis();
String description = "Description for task " + Thread.currentThread().getId();
String accountId = "test-account-" + (int)(Math.random() * 100);

// リクエストボディを設定
String requestBody = "{\"title\":\"" + title + "\",\"description\":\"" + description + "\",\"accountId\":\"" + accountId + "\"}";
vars.put("REQUEST_BODY", requestBody);</stringProp>
          </BeanShellPreProcessor>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
EOF

log_success "ストレステストを作成しました: $TEST_DIR/stress-test.jmx"

# 3. 実行スクリプト作成
log_info "実行スクリプトを作成しています..."
cat > "$TEST_DIR/run-load-tests.sh" << 'EOF'
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
JMETER_DIR="../../apache-jmeter-5.6.3"
if [ ! -d "$JMETER_DIR" ]; then
    echo "❌ JMeterディレクトリが見つかりません: $JMETER_DIR"
    echo "解決方法: ../../scripts/setup-jmeter.sh を実行してください"
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
EOF

chmod +x "$TEST_DIR/run-load-tests.sh"
log_success "実行スクリプトを作成しました: $TEST_DIR/run-load-tests.sh"

# 4. README作成
log_info "READMEを作成しています..."
cat > "$TEST_DIR/README.md" << 'EOF'
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
EOF

log_success "READMEを作成しました: $TEST_DIR/README.md"

echo ""
log_success "🎉 Todoアプリ負荷テストの作成が完了しました！"
echo ""
echo "📁 作成されたファイル:"
echo "  - $TEST_DIR/basic-load-test.jmx     # 基本負荷テスト"
echo "  - $TEST_DIR/stress-test.jmx         # ストレステスト"
echo "  - $TEST_DIR/run-load-tests.sh       # 実行スクリプト"
echo "  - $TEST_DIR/README.md               # 使用方法"
echo ""
echo "🚀 使用方法:"
echo "  cd $TEST_DIR"
echo "  ./run-load-tests.sh basic    # 基本負荷テスト"
echo "  ./run-load-tests.sh stress   # ストレステスト"
echo ""
echo "📚 詳細な使用方法は $TEST_DIR/README.md を参照してください"
