#!/bin/bash

# JMeter ヘッドレスモードテストスクリプト
# 使用方法: ./scripts/test-jmeter-headless.sh

set -e

echo "🧪 JMeter ヘッドレスモードテストを開始します..."

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

# JMeterディレクトリ確認
JMETER_DIR="apache-jmeter-5.6.3"
if [ ! -d "$JMETER_DIR" ]; then
    log_error "JMeterディレクトリが見つかりません: $JMETER_DIR"
    echo "解決方法: ./scripts/setup-jmeter.sh を実行してください"
    exit 1
fi

# テスト用ディレクトリ作成
TEST_DIR="jmeter-tests"
mkdir -p "$TEST_DIR"

# サンプルテスト計画作成
log_info "サンプルテスト計画を作成しています..."
cat > "$TEST_DIR/sample-test.jmx" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Sample Test Plan" enabled="true">
      <stringProp name="TestPlan.comments">Sample test plan for headless mode</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1</stringProp>
        <stringProp name="ThreadGroup.ramp_time">1</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">httpbin.org</stringProp>
          <stringProp name="HTTPSampler.port">80</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/get</stringProp>
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
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
EOF

log_success "サンプルテスト計画を作成しました: $TEST_DIR/sample-test.jmx"

# ヘッドレスモードでテスト実行
log_info "ヘッドレスモードでテストを実行しています..."
cd "$JMETER_DIR"

# 結果ディレクトリ作成
RESULTS_DIR="../$TEST_DIR/results"
mkdir -p "$RESULTS_DIR"

# テスト実行
./bin/jmeter.sh -n -t "../$TEST_DIR/sample-test.jmx" -l "$RESULTS_DIR/test-results.jtl" -e -o "$RESULTS_DIR/report"

if [ $? -eq 0 ]; then
    log_success "✅ ヘッドレスモードテストが完了しました！"
    echo ""
    echo "📊 結果ファイル:"
    echo "  - テスト結果: $TEST_DIR/results/test-results.jtl"
    echo "  - HTML レポート: $TEST_DIR/results/report/index.html"
    echo ""
    echo "📋 使用方法:"
    echo "  # カスタムテスト計画で実行"
    echo "  cd apache-jmeter-5.6.3"
    echo "  ./bin/jmeter.sh -n -t your_test.jmx -l results.jtl -e -o report/"
    echo ""
    echo "📚 詳細な使用方法は docs/jmeter/JMETER_SETUP.md を参照してください"
else
    log_error "ヘッドレスモードテストに失敗しました"
    exit 1
fi
