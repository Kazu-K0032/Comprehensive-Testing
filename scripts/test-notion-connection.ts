import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testNotionConnection(): Promise<void> {
  try {
    // Notionクライアントの初期化
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    console.log("🔍 Notion接続テストを開始...");

    // 1. ユーザー情報の取得（接続テスト）
    const user = await notion.users.me({});
    console.log("✅ Notion接続成功！");
    console.log(`👤 ユーザー: ${user.name}`);

    // 2. 検索テスト
    console.log("\n🔍 ページ検索テスト...");
    const searchResults = await notion.search({
      query: "",
      page_size: 5,
    });

    console.log(`📄 見つかったページ数: ${searchResults.results.length}`);

    if (searchResults.results.length > 0) {
      console.log("📋 利用可能なページ:");
      searchResults.results.forEach((page, index) => {
        const title =
          (page as any).properties?.title?.title?.[0]?.text?.content ||
          (page as any).properties?.Name?.title?.[0]?.text?.content ||
          "タイトルなし";
        console.log(`  ${index + 1}. ${title} (ID: ${page.id})`);
      });
    }

    console.log("\n🎉 すべてのテストが完了しました！");
    console.log("\n📝 次のステップ:");
    console.log("1. Cursorの設定でMCPサーバーを有効化");
    console.log("2. 環境変数を設定（.env.localファイル）");
    console.log("3. Cursorを再起動");
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error.message);
    console.log("\n🔧 トラブルシューティング:");
    console.log("1. NOTION_API_KEYが正しく設定されているか確認");
    console.log(
      "2. Notionインテグレーションがページにアクセス権限を持っているか確認"
    );
    console.log("3. インターネット接続を確認");
  }
}

// 環境変数の確認
if (!process.env.NOTION_API_KEY) {
  console.error("❌ NOTION_API_KEYが設定されていません");
  console.log("📝 .env.localファイルに以下を追加してください:");
  console.log("NOTION_API_KEY=your_notion_integration_token_here");
  process.exit(1);
}

testNotionConnection();
