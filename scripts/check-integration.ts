import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkIntegration(): Promise<void> {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    console.log("🔍 インテグレーション情報を確認中...");

    // 1. ユーザー情報の取得
    const user = await notion.users.me({});
    console.log("✅ インテグレーション情報:");
    console.log(`👤 名前: ${user.name}`);
    console.log(`🆔 ID: ${user.id}`);
    console.log(`📧 メール: ${(user as any).person?.email || "N/A"}`);
    console.log(`🤖 ボット: ${(user as any).bot ? "はい" : "いいえ"}`);

    // 2. 利用可能なページの検索
    console.log("\n🔍 利用可能なページを検索中...");
    const searchResults = await notion.search({
      filter: {
        property: "object",
        value: "page",
      },
    });

    console.log(`📄 見つかったページ数: ${searchResults.results.length}`);

    if (searchResults.results.length > 0) {
      console.log("\n📋 利用可能なページ:");
      searchResults.results.forEach((page, index) => {
        const title =
          (page as any).properties?.title?.title?.[0]?.text?.content ||
          (page as any).properties?.Name?.title?.[0]?.text?.content ||
          "タイトルなし";
        console.log(`\n${index + 1}. ${title}`);
        console.log(`   ID: ${page.id}`);
        console.log(`   URL: ${page as any}.url`);
        console.log(`   作成日: ${page as any}.created_time`);
      });
    } else {
      console.log("❌ アクセス可能なページがありません");
      console.log("\n💡 解決方法:");
      console.log("1. 正しいインテグレーションのAPIキーを使用");
      console.log("2. ページの「Share」でインテグレーションを追加");
      console.log("3. 権限を「フルアクセス権限」に設定");
    }
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error.message);
    console.log("\n🔧 トラブルシューティング:");
    console.log("1. NOTION_API_KEYが正しいか確認");
    console.log("2. インテグレーションが有効か確認");
    console.log("3. インターネット接続を確認");
  }
}

// 環境変数の確認
if (!process.env.NOTION_API_KEY) {
  console.error("❌ NOTION_API_KEYが設定されていません");
  process.exit(1);
}

checkIntegration();
