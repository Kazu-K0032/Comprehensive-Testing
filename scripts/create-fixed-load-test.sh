#!/bin/bash

# 修正されたTodoアプリ負荷テスト作成スクリプト
# 使用方法: ./scripts/create-fixed-load-test.sh

set -e

echo "🔧 修正されたTodoアプリ負荷テストを作成します..."

# 色付きログ関数
log_info() {
    echo -e "\033[32m[INFO]\033[0m $1"
}

log_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

# テスト用ディレクトリ作成
TEST_DIR="todo-load-tests-fixed"
mkdir -p "$TEST_DIR"

# 修正された基本負荷テスト（10ユーザー）
log_info "修正された基本負荷テスト（10ユーザー）を作成しています..."
cat > "$TEST_DIR/basic-load-test-fixed.jmx" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Todo Basic Load Test Fixed" enabled="true">
      <stringProp name="TestPlan.comments">10ユーザーでの基本負荷テスト（修正版）</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="BASE_HOST" elementType="Argument">
            <stringProp name="Argument.name">BASE_HOST</stringProp>
            <stringProp name="Argument.value">localhost</stringProp>
          </elementProp>
          <elementProp name="BASE_PORT" elementType="Argument">
            <stringProp name="Argument.name">BASE_PORT</stringProp>
            <stringProp name="Argument.value">3000</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">10</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">10</stringProp>
        <stringProp name="ThreadGroup.ramp_time">30</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>
      <hashTree>
        <!-- アカウント一覧取得 -->
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Get Accounts" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">${__P(BASE_HOST,localhost)}</stringProp>
          <stringProp name="HTTPSampler.port">${__P(BASE_PORT,3000)}</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/accounts</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <JSONPostProcessor guiclass="JSONPostProcessorGui" testclass="JSONPostProcessor" testname="JSON PostProcessor" enabled="true">
            <stringProp name="JSONPostProcessor.referenceNames">accountId</stringProp>
            <stringProp name="JSONPostProcessor.jsonPathExprs">$.accounts[0].id</stringProp>
            <stringProp name="JSONPostProcessor.match_numbers">1</stringProp>
            <stringProp name="JSONPostProcessor.defaultValues">test-account-123</stringProp>
          </JSONPostProcessor>
          <hashTree/>
        </hashTree>
        
        <!-- タスク一覧取得 -->
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Get Tasks" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments">
              <elementProp name="" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">${accountId}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">accountId</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">${__P(BASE_HOST,localhost)}</stringProp>
          <stringProp name="HTTPSampler.port">${__P(BASE_PORT,3000)}</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/tasks</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
        
        <!-- タスク作成 -->
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Create Task" enabled="true">
          <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">${__P(BASE_HOST,localhost)}</stringProp>
          <stringProp name="HTTPSampler.port">${__P(BASE_PORT,3000)}</stringProp>
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
String title = "Load Test Task " + System.currentTimeMillis();
String description = "Description for load test task " + Thread.currentThread().getId();

// リクエストボディを設定
String requestBody = "{\"title\":\"" + title + "\",\"description\":\"" + description + "\",\"accountId\":\"" + vars.get("accountId") + "\"}";
vars.put("REQUEST_BODY", requestBody);</stringProp>
          </BeanShellPreProcessor>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
EOF

log_success "修正された基本負荷テストを作成しました: $TEST_DIR/basic-load-test-fixed.jmx"

# 実行スクリプト作成
log_info "実行スクリプトを作成しています..."
cat > "$TEST_DIR/run-fixed-load-tests.sh" << 'EOF'
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
EOF

chmod +x "$TEST_DIR/run-fixed-load-tests.sh"
log_success "実行スクリプトを作成しました: $TEST_DIR/run-fixed-load-tests.sh"

echo ""
log_success "🎉 修正されたTodoアプリ負荷テストの作成が完了しました！"
echo ""
echo "📁 作成されたファイル:"
echo "  - $TEST_DIR/basic-load-test-fixed.jmx     # 修正された基本負荷テスト"
echo "  - $TEST_DIR/run-fixed-load-tests.sh       # 実行スクリプト"
echo ""
echo "🚀 使用方法:"
echo "  cd $TEST_DIR"
echo "  ./run-fixed-load-tests.sh"
echo ""
echo "🔧 修正内容:"
echo "  - BASE_URL変数の正しい設定"
echo "  - 実際のAPIエンドポイントへの接続"
echo "  - 適切なリクエストフロー"
