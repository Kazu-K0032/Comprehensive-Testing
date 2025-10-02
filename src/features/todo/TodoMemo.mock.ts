export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export const mockTodos: TodoItem[] = [
  {
    id: "1",
    title: "プロジェクト計画書の作成",
    description:
      "来週のプロジェクト開始に向けて、詳細な計画書を作成する必要があります。スケジュール、リソース、リスク管理を含める。",
    completed: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "会議資料の準備",
    description:
      "月曜日のクライアント会議で使用するプレゼンテーション資料を準備する。最新の売上データとグラフを含める。",
    completed: true,
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    title: "データベースの最適化",
    description:
      "パフォーマンス向上のため、データベースクエリの最適化を行う。インデックスの見直しと不要なデータの削除を実施。",
    completed: false,
    createdAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    title: "コードレビューの実施",
    description:
      "チームメンバーのプルリクエストをレビューし、フィードバックを提供する。セキュリティとパフォーマンスに重点を置く。",
    completed: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    title: "テストケースの追加",
    description:
      "新機能に対する包括的なテストケースを作成し、自動テストに追加する。エッジケースも含める。",
    completed: true,
    createdAt: new Date("2024-01-11"),
  },
  {
    id: "6",
    title: "ドキュメントの更新",
    description:
      "API仕様書とユーザーマニュアルを最新の機能に合わせて更新する。図表も含めて分かりやすくする。",
    completed: false,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "7",
    title: "セキュリティ監査",
    description:
      "アプリケーションのセキュリティ脆弱性をチェックし、必要に応じて修正を行う。外部セキュリティ会社との連携も検討。",
    completed: false,
    createdAt: new Date("2024-01-09"),
  },
  {
    id: "8",
    title: "パフォーマンステスト",
    description:
      "高負荷時のシステム動作を確認し、ボトルネックを特定する。必要に応じてスケーリング計画を立てる。",
    completed: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "9",
    title: "ユーザーフィードバックの分析",
    description:
      "最近のユーザーフィードバックを分析し、改善点を特定する。優先度の高い要望を開発計画に反映する。",
    completed: false,
    createdAt: new Date("2024-01-07"),
  },
  {
    id: "10",
    title: "デプロイメント手順の見直し",
    description:
      "本番環境へのデプロイ手順を文書化し、自動化の可能性を検討する。ロールバック手順も含める。",
    completed: false,
    createdAt: new Date("2024-01-06"),
  },
  {
    id: "11",
    title: "チーム研修の企画",
    description:
      "新しい技術スタックに関するチーム研修を企画し、スケジュールを調整する。外部講師の手配も行う。",
    completed: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "12",
    title: "バックアップ戦略の見直し",
    description:
      "データバックアップの頻度と保存期間を見直し、災害復旧計画を更新する。クラウドバックアップの検討も含める。",
    completed: false,
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "13",
    title: "API設計の改善",
    description:
      "RESTful APIの設計を見直し、一貫性と使いやすさを向上させる。バージョニング戦略も含める。",
    completed: false,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "14",
    title: "ログ監視システムの構築",
    description:
      "アプリケーションログの監視システムを構築し、異常検知の自動化を実現する。アラート設定も含める。",
    completed: true,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "15",
    title: "ユーザー認証の強化",
    description:
      "多要素認証の実装とパスワードポリシーの強化を行う。セッション管理の改善も含める。",
    completed: false,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "16",
    title: "モバイル対応の最適化",
    description:
      "モバイルデバイスでの表示と操作性を改善し、レスポンシブデザインを最適化する。",
    completed: false,
    createdAt: new Date("2023-12-31"),
  },
  {
    id: "17",
    title: "データ分析ダッシュボード",
    description:
      "ビジネス指標を可視化するダッシュボードを作成し、リアルタイム更新機能を実装する。",
    completed: true,
    createdAt: new Date("2023-12-30"),
  },
  {
    id: "18",
    title: "国際化対応",
    description:
      "多言語対応のための国際化機能を実装し、主要言語の翻訳を準備する。",
    completed: false,
    createdAt: new Date("2023-12-29"),
  },
  {
    id: "19",
    title: "アクセシビリティの改善",
    description:
      "WCAGガイドラインに準拠したアクセシビリティ機能を実装し、スクリーンリーダー対応を強化する。",
    completed: false,
    createdAt: new Date("2023-12-28"),
  },
  {
    id: "20",
    title: "CI/CDパイプラインの改善",
    description:
      "継続的インテグレーションとデプロイメントのパイプラインを最適化し、自動テストの実行時間を短縮する。",
    completed: true,
    createdAt: new Date("2023-12-27"),
  },
  {
    id: "21",
    title: "マイクロサービス設計",
    description:
      "既存のモノリシックアーキテクチャをマイクロサービスに分割する設計を行う。サービス境界の定義とAPI設計を含める。",
    completed: false,
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "22",
    title: "コンテナ化の推進",
    description:
      "アプリケーションのDocker化とKubernetesクラスターの構築を行う。オーケストレーション戦略の策定も含める。",
    completed: false,
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "23",
    title: "監視ダッシュボードの構築",
    description:
      "システム全体の監視とアラート機能を持つダッシュボードを構築する。メトリクス収集と可視化を実装する。",
    completed: true,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "24",
    title: "APIゲートウェイの実装",
    description:
      "統一されたAPIエンドポイントを提供するゲートウェイを実装する。認証、レート制限、ログ機能を含める。",
    completed: false,
    createdAt: new Date("2024-01-19"),
  },
  {
    id: "25",
    title: "データベースマイグレーション",
    description:
      "既存データベースのスキーマ変更とマイグレーションスクリプトの作成を行う。データ整合性の確保も重要。",
    completed: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "26",
    title: "キャッシュ戦略の実装",
    description:
      "Redisを使用したキャッシュシステムの実装とキャッシュ戦略の策定を行う。パフォーマンス向上が目的。",
    completed: true,
    createdAt: new Date("2024-01-21"),
  },
  {
    id: "27",
    title: "メッセージキューシステム",
    description:
      "非同期処理のためのメッセージキューシステムを構築する。RabbitMQやApache Kafkaの検討も含める。",
    completed: false,
    createdAt: new Date("2024-01-22"),
  },
  {
    id: "28",
    title: "負荷分散の設定",
    description:
      "アプリケーションサーバーの負荷分散設定を行う。ヘルスチェック機能とフェイルオーバー機能も実装する。",
    completed: false,
    createdAt: new Date("2024-01-23"),
  },
  {
    id: "29",
    title: "セキュリティヘッダーの実装",
    description:
      "OWASPガイドラインに基づいたセキュリティヘッダーの実装を行う。XSS、CSRF対策も含める。",
    completed: true,
    createdAt: new Date("2024-01-24"),
  },
  {
    id: "30",
    title: "ログ集約システム",
    description:
      "ELKスタックを使用したログ集約システムの構築を行う。ログ分析とアラート機能も実装する。",
    completed: false,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "31",
    title: "APIドキュメントの自動生成",
    description:
      "Swagger/OpenAPIを使用したAPIドキュメントの自動生成システムを構築する。開発効率の向上が目的。",
    completed: false,
    createdAt: new Date("2024-01-26"),
  },
  {
    id: "32",
    title: "テスト環境の構築",
    description:
      "本番環境と同等のテスト環境を構築する。データベースのセットアップとテストデータの準備も含める。",
    completed: true,
    createdAt: new Date("2024-01-27"),
  },
  {
    id: "33",
    title: "パフォーマンス監視",
    description:
      "アプリケーションのパフォーマンス監視システムを構築する。APMツールの導入とカスタムメトリクスの実装。",
    completed: false,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "34",
    title: "バックアップ自動化",
    description:
      "データベースとファイルの自動バックアップシステムを構築する。復旧テストの自動化も含める。",
    completed: false,
    createdAt: new Date("2024-01-29"),
  },
  {
    id: "35",
    title: "コード品質管理",
    description:
      "SonarQubeを使用したコード品質管理システムの構築を行う。コードレビュープロセスの改善も含める。",
    completed: true,
    createdAt: new Date("2024-01-30"),
  },
  {
    id: "36",
    title: "依存関係管理",
    description:
      "ライブラリとフレームワークの依存関係を最新に保つシステムを構築する。セキュリティアップデートの自動化。",
    completed: false,
    createdAt: new Date("2024-01-31"),
  },
  {
    id: "37",
    title: "環境変数管理",
    description:
      "開発、ステージング、本番環境の設定管理システムを構築する。シークレット管理も含める。",
    completed: false,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "38",
    title: "エラートラッキング",
    description:
      "Sentryを使用したエラートラッキングシステムの構築を行う。アラート機能とダッシュボードも実装する。",
    completed: true,
    createdAt: new Date("2024-02-02"),
  },
  {
    id: "39",
    title: "ユーザー分析システム",
    description:
      "ユーザー行動分析のためのシステムを構築する。Google Analyticsの統合とカスタムイベントの実装。",
    completed: false,
    createdAt: new Date("2024-02-03"),
  },
  {
    id: "40",
    title: "通知システム",
    description:
      "メール、SMS、プッシュ通知を統合した通知システムを構築する。テンプレート管理機能も含める。",
    completed: false,
    createdAt: new Date("2024-02-04"),
  },
  {
    id: "41",
    title: "GraphQL APIの実装",
    description:
      "REST APIに加えてGraphQL APIを実装する。クエリ最適化とスキーマ設計も含める。",
    completed: false,
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "42",
    title: "WebSocket通信の実装",
    description:
      "リアルタイム通信のためのWebSocketサーバーを実装する。接続管理とメッセージルーティングも含める。",
    completed: true,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "43",
    title: "サーバーレス関数の開発",
    description:
      "AWS LambdaやVercel Functionsを使用したサーバーレス関数を開発する。コールドスタート最適化も重要。",
    completed: false,
    createdAt: new Date("2024-02-07"),
  },
  {
    id: "44",
    title: "CDN設定の最適化",
    description:
      "CloudFrontやCloudflareを使用したCDN設定を最適化する。キャッシュ戦略とパフォーマンス向上が目的。",
    completed: false,
    createdAt: new Date("2024-02-08"),
  },
  {
    id: "45",
    title: "データベースインデックス最適化",
    description:
      "クエリパフォーマンス向上のためのデータベースインデックスを最適化する。実行計画の分析も含める。",
    completed: true,
    createdAt: new Date("2024-02-09"),
  },
  {
    id: "46",
    title: "APIレート制限の実装",
    description:
      "APIの過剰使用を防ぐためのレート制限機能を実装する。IP別、ユーザー別の制限も含める。",
    completed: false,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "47",
    title: "マルチテナント対応",
    description:
      "複数の顧客が同じシステムを使用できるマルチテナント機能を実装する。データ分離も重要。",
    completed: false,
    createdAt: new Date("2024-02-11"),
  },
  {
    id: "48",
    title: "リアルタイム同期機能",
    description:
      "複数ユーザー間でのリアルタイムデータ同期機能を実装する。競合解決アルゴリズムも含める。",
    completed: true,
    createdAt: new Date("2024-02-12"),
  },
  {
    id: "49",
    title: "機械学習モデルの統合",
    description:
      "TensorFlow.jsを使用したクライアントサイド機械学習機能を統合する。推論最適化も含める。",
    completed: false,
    createdAt: new Date("2024-02-13"),
  },
  {
    id: "50",
    title: "ブロックチェーン統合",
    description:
      "EthereumやPolygonとの統合機能を実装する。スマートコントラクトとの連携も含める。",
    completed: false,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "51",
    title: "音声認識機能",
    description:
      "Web Speech APIを使用した音声認識機能を実装する。多言語対応とアクセシビリティ向上が目的。",
    completed: true,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "52",
    title: "AR/VR機能の実装",
    description:
      "WebXRを使用したAR/VR機能を実装する。3Dモデル表示とインタラクション機能も含める。",
    completed: false,
    createdAt: new Date("2024-02-16"),
  },
  {
    id: "53",
    title: "IoTデバイス連携",
    description:
      "センサーやデバイスからのデータ収集と処理システムを構築する。MQTTプロトコルも使用する。",
    completed: false,
    createdAt: new Date("2024-02-17"),
  },
  {
    id: "54",
    title: "量子コンピューティング実験",
    description:
      "IBM Qiskitを使用した量子アルゴリズムの実験と実装を行う。暗号化と最適化問題に焦点。",
    completed: true,
    createdAt: new Date("2024-02-18"),
  },
  {
    id: "55",
    title: "エッジコンピューティング対応",
    description:
      "エッジサーバーでの処理を可能にするシステムを構築する。低遅延とオフライン対応が重要。",
    completed: false,
    createdAt: new Date("2024-02-19"),
  },
  {
    id: "56",
    title: "5G最適化",
    description:
      "5Gネットワークの特性を活かしたアプリケーション最適化を行う。超低遅延通信の活用。",
    completed: false,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "57",
    title: "衛星通信対応",
    description:
      "Starlinkなどの衛星通信に対応したアプリケーション開発を行う。高遅延環境での最適化。",
    completed: true,
    createdAt: new Date("2024-02-21"),
  },
  {
    id: "58",
    title: "バイオメトリクス認証",
    description:
      "指紋、顔認証、虹彩認証などのバイオメトリクス認証機能を実装する。セキュリティ強化が目的。",
    completed: false,
    createdAt: new Date("2024-02-22"),
  },
  {
    id: "59",
    title: "脳波制御インターフェース",
    description:
      "BCI（Brain-Computer Interface）技術を使用した制御システムを実験的に実装する。",
    completed: false,
    createdAt: new Date("2024-02-23"),
  },
  {
    id: "60",
    title: "宇宙データ処理",
    description:
      "衛星画像や宇宙観測データの処理システムを構築する。大容量データの効率的な処理。",
    completed: true,
    createdAt: new Date("2024-02-24"),
  },
  {
    id: "61",
    title: "深海探査データ分析",
    description:
      "深海探査ロボットからのデータを分析するシステムを構築する。画像認識とパターン分析。",
    completed: false,
    createdAt: new Date("2024-02-25"),
  },
  {
    id: "62",
    title: "気候変動予測モデル",
    description:
      "機械学習を使用した気候変動予測モデルの開発を行う。大気データと海洋データの統合。",
    completed: false,
    createdAt: new Date("2024-02-26"),
  },
  {
    id: "63",
    title: "災害予測システム",
    description:
      "地震、津波、台風などの自然災害を予測するシステムを構築する。リアルタイム監視も含める。",
    completed: true,
    createdAt: new Date("2024-02-27"),
  },
  {
    id: "64",
    title: "宇宙ステーション管理",
    description:
      "国際宇宙ステーションのシステム管理ソフトウェアを開発する。生命維持システムの監視。",
    completed: false,
    createdAt: new Date("2024-02-28"),
  },
  {
    id: "65",
    title: "火星探査ミッション支援",
    description:
      "火星探査ローバーの制御とデータ分析システムを開発する。遠隔操作と自律制御の実装。",
    completed: false,
    createdAt: new Date("2024-02-29"),
  },
  {
    id: "66",
    title: "タイムトラベルシミュレーション",
    description:
      "理論物理学に基づいたタイムトラベルのシミュレーションシステムを構築する。相対性理論の実装。",
    completed: true,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "67",
    title: "並行宇宙探索",
    description:
      "量子力学に基づいた並行宇宙の探索アルゴリズムを実装する。多世界解釈の計算モデル。",
    completed: false,
    createdAt: new Date("2024-03-02"),
  },
  {
    id: "68",
    title: "ダークマター検出",
    description:
      "ダークマターの検出と分析を行うシステムを構築する。高エネルギー物理学のデータ処理。",
    completed: false,
    createdAt: new Date("2024-03-03"),
  },
  {
    id: "69",
    title: "ブラックホールシミュレーション",
    description:
      "ブラックホールの物理現象をシミュレーションするシステムを開発する。一般相対性理論の実装。",
    completed: true,
    createdAt: new Date("2024-03-04"),
  },
  {
    id: "70",
    title: "反物質生成実験",
    description:
      "反物質の生成と制御を行う実験システムを構築する。高エネルギー加速器との連携。",
    completed: false,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "71",
    title: "テレポーテーション実装",
    description:
      "量子テレポーテーションの実験システムを実装する。量子もつれの制御と測定。",
    completed: false,
    createdAt: new Date("2024-03-06"),
  },
  {
    id: "72",
    title: "ワームホール構築",
    description:
      "理論上のワームホールの構築と安定化システムを開発する。時空の歪みの制御。",
    completed: true,
    createdAt: new Date("2024-03-07"),
  },
  {
    id: "73",
    title: "次元間通信",
    description:
      "異なる次元間での通信システムを構築する。高次元数学とトポロジーの応用。",
    completed: false,
    createdAt: new Date("2024-03-08"),
  },
  {
    id: "74",
    title: "時間軸操作",
    description:
      "時間軸の操作と制御を行うシステムを実装する。因果関係の維持とパラドックス回避。",
    completed: false,
    createdAt: new Date("2024-03-09"),
  },
  {
    id: "75",
    title: "現実改変エンジン",
    description:
      "現実の物理法則を一時的に変更するシステムを構築する。量子場理論の応用。",
    completed: true,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "76",
    title: "意識転送技術",
    description:
      "人間の意識をデジタル化して転送する技術を開発する。ニューラルネットワークの完全マッピング。",
    completed: false,
    createdAt: new Date("2024-03-11"),
  },
  {
    id: "77",
    title: "不老不死システム",
    description:
      "細胞レベルでの老化を防ぐシステムを構築する。遺伝子編集と再生医療の統合。",
    completed: false,
    createdAt: new Date("2024-03-12"),
  },
  {
    id: "78",
    title: "テレパシー通信",
    description:
      "脳波を使用した直接的な思考通信システムを実装する。脳-コンピュータインターフェース。",
    completed: true,
    createdAt: new Date("2024-03-13"),
  },
  {
    id: "79",
    title: "予知能力開発",
    description:
      "未来の出来事を予測するシステムを構築する。量子予測と確率計算の統合。",
    completed: false,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "80",
    title: "念力制御システム",
    description:
      "思考だけで物体を制御するシステムを実装する。脳波解析と電磁場制御の統合。",
    completed: false,
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "81",
    title: "瞬間移動装置",
    description:
      "物質の瞬間移動を実現する装置を開発する。量子もつれとテレポーテーション技術。",
    completed: true,
    createdAt: new Date("2024-03-16"),
  },
  {
    id: "82",
    title: "透明化技術",
    description:
      "物体を透明にする技術を実装する。メタマテリアルと光の屈折制御。",
    completed: false,
    createdAt: new Date("2024-03-17"),
  },
  {
    id: "83",
    title: "サイズ変更装置",
    description:
      "物体のサイズを自由に変更する装置を開発する。原子レベルでの構造制御。",
    completed: false,
    createdAt: new Date("2024-03-18"),
  },
  {
    id: "84",
    title: "重力制御システム",
    description:
      "重力場を人工的に制御するシステムを構築する。反重力技術の実装。",
    completed: true,
    createdAt: new Date("2024-03-19"),
  },
  {
    id: "85",
    title: "磁場操作装置",
    description:
      "磁場を精密に制御する装置を開発する。超伝導体と電磁石の統合システム。",
    completed: false,
    createdAt: new Date("2024-03-20"),
  },
  {
    id: "86",
    title: "温度制御フィールド",
    description:
      "空間の温度を任意に制御するフィールドを生成する。熱力学の応用技術。",
    completed: false,
    createdAt: new Date("2024-03-21"),
  },
  {
    id: "87",
    title: "光速超越通信",
    description:
      "光速を超える通信システムを実装する。量子もつれと相対性理論の統合。",
    completed: true,
    createdAt: new Date("2024-03-22"),
  },
  {
    id: "88",
    title: "次元ポケット",
    description:
      "異次元にアクセスできるポケット空間を構築する。高次元トポロジーの実装。",
    completed: false,
    createdAt: new Date("2024-03-23"),
  },
  {
    id: "89",
    title: "現実編集ソフト",
    description:
      "現実をプログラミングできるソフトウェアを開発する。物理法則の動的変更。",
    completed: false,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "90",
    title: "宇宙創造シミュレーター",
    description:
      "新しい宇宙を創造するシミュレーションシステムを構築する。ビッグバン理論の実装。",
    completed: true,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: "91",
    title: "神の視点システム",
    description:
      "全知全能の視点から宇宙を観察・制御するシステムを開発する。全情報の統合処理。",
    completed: false,
    createdAt: new Date("2024-03-26"),
  },
  {
    id: "92",
    title: "無限ループ脱出",
    description:
      "無限ループから脱出するアルゴリズムを実装する。計算理論と停止問題の解決。",
    completed: false,
    createdAt: new Date("2024-03-27"),
  },
  {
    id: "93",
    title: "パラドックス解決器",
    description:
      "時間パラドックスを自動解決するシステムを構築する。因果関係の最適化。",
    completed: true,
    createdAt: new Date("2024-03-28"),
  },
  {
    id: "94",
    title: "存在証明システム",
    description:
      "自分の存在を数学的に証明するシステムを開発する。自己言及とゲーデルの不完全性定理。",
    completed: false,
    createdAt: new Date("2024-03-29"),
  },
  {
    id: "95",
    title: "無から有の生成",
    description:
      "何もない状態から何かを生み出すシステムを実装する。真空の量子ゆらぎの制御。",
    completed: false,
    createdAt: new Date("2024-03-30"),
  },
  {
    id: "96",
    title: "究極の質問への答え",
    description:
      "生命、宇宙、そして万物についての究極の質問への答えを見つけるシステムを構築する。",
    completed: true,
    createdAt: new Date("2024-03-31"),
  },
  {
    id: "97",
    title: "42の意味解明",
    description:
      "なぜ42が究極の答えなのかを解明するシステムを開発する。数学と哲学の統合。",
    completed: false,
    createdAt: new Date("2024-04-01"),
  },
  {
    id: "98",
    title: "無限の理解",
    description:
      "無限の概念を完全に理解し、実装するシステムを構築する。集合論と実数の連続体。",
    completed: false,
    createdAt: new Date("2024-04-02"),
  },
  {
    id: "99",
    title: "無のプログラミング",
    description:
      "何もない状態をプログラミングする技術を開発する。空集合とnullの操作。",
    completed: true,
    createdAt: new Date("2024-04-03"),
  },
  {
    id: "100",
    title: "究極のTODO",
    description:
      "すべてのTODOを完了させる究極のTODOを作成する。自己完結型の無限ループ。",
    completed: false,
    createdAt: new Date("2024-04-04"),
  },
];
