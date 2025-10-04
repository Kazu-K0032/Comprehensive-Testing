import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function createJmeterDocs(): Promise<void> {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    console.log("📝 J Meterドキュメントを作成中...");

    // 親ページIDを取得（環境変数から）
    const parentPageId = process.env.NOTION_DATABASE_ID;
    if (!parentPageId) {
      console.error("❌ NOTION_DATABASE_IDが設定されていません");
      return;
    }

    // 指定されたページに直接コンテンツを追加
    const jmeterPage = await notion.blocks.children.append({
      block_id: parentPageId,
      children: [
        // 概要セクション
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ type: "text", text: { content: "J Meter 概要" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "Apache JMeterは、WebアプリケーションやAPIのパフォーマンステストを実行するためのオープンソースのJavaアプリケーションです。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "主にロードテスト、ストレステスト、機能テストに使用され、Webアプリケーションの性能を測定・分析するための包括的なツールセットを提供します。",
                },
              },
            ],
          },
        },

        // 特徴セクション
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ type: "text", text: { content: "J Meter の特徴" } }],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "GUIとコマンドラインの両方で実行可能" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "多様なプロトコルサポート（HTTP、HTTPS、FTP、SOAP、REST等）",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "プラグインによる機能拡張が可能" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "詳細なレポート生成機能" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "分散テスト実行が可能" },
              },
            ],
          },
        },

        // 機能セクション
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [
              { type: "text", text: { content: "J Meter の主要機能" } },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "ロードテスト" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "複数のユーザーが同時にアプリケーションにアクセスする状況をシミュレートし、システムの性能を測定します。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "ストレステスト" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "システムの限界点を特定するため、通常の負荷を超えた状況でのテストを実行します。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "機能テスト" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "APIエンドポイントの動作確認や、特定のシナリオでのアプリケーションの動作を検証します。",
                },
              },
            ],
          },
        },

        // セットアップ手順セクション
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [
              {
                type: "text",
                text: { content: "J Meter セットアップ手順" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              { type: "text", text: { content: "1. Java環境の確認" } },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "JMeterはJavaアプリケーションのため、Java 8以上が必要です。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: { content: "java -version" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              { type: "text", text: { content: "2. JMeterのダウンロード" } },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "Apache JMeterの公式サイトから最新版をダウンロードします。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.6.3.tgz",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              { type: "text", text: { content: "3. JMeterの展開と起動" } },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: { content: "tar -xzf apache-jmeter-5.6.3.tgz" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: { content: "cd apache-jmeter-5.6.3/bin" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: { content: "./jmeter.sh  # Linux/Mac" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: { content: "jmeter.bat  # Windows" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: { content: "4. 基本的なテスト計画の作成" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "Test Planを作成" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "Thread Groupを追加（ユーザー数、ランプアップ時間を設定）",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "HTTP Request Samplerを追加（テスト対象URLを設定）",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: { content: "リスナーを追加（結果の表示・保存設定）" },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "5. テストの実行" } }],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "bash",
            rich_text: [
              {
                type: "text",
                text: {
                  content: "./jmeter -n -t test_plan.jmx -l results.jtl",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "GUIモードでテストを実行する場合は、JMeterのGUI上で「Start」ボタンをクリックします。",
                },
              },
            ],
          },
        },
      ],
    });

    console.log("✅ J Meterドキュメントが指定ページに追加されました！");
    console.log(`📄 対象ページID: ${parentPageId}`);
    console.log(`📝 追加されたブロック数: ${jmeterPage.results.length}`);
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error.message);
    console.log("\n🔧 トラブルシューティング:");
    console.log("1. NOTION_API_KEYが正しく設定されているか確認");
    console.log("2. NOTION_DATABASE_IDが正しく設定されているか確認");
    console.log(
      "3. インテグレーションがページにアクセス権限を持っているか確認"
    );
  }
}

// 環境変数の確認
if (!process.env.NOTION_API_KEY) {
  console.error("❌ NOTION_API_KEYが設定されていません");
  process.exit(1);
}

if (!process.env.NOTION_DATABASE_ID) {
  console.error("❌ NOTION_DATABASE_IDが設定されていません");
  process.exit(1);
}

createJmeterDocs();
