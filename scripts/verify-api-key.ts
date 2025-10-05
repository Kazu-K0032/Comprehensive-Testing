import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function verifyApiKey(): Promise<void> {
  try {
    console.log("🔑 APIキーの確認中...");

    // APIキーの形式を確認
    const apiKey = process.env.NOTION_API_KEY;

    if (!apiKey) {
      console.error("❌ NOTION_API_KEYが設定されていません");
      return;
    }

    console.log(`🔑 APIキー: ${apiKey.substring(0, 10)}...`);

    // APIキーの形式チェック
    if (apiKey.startsWith("secret_")) {
      console.log("✅ 正しい形式のAPIキーです（secret_で始まっています）");
    } else {
      console.log("⚠️  APIキーが正しい形式ではない可能性があります");
      console.log(
        "💡 内部インテグレーションシークレットは'secret_'で始まる必要があります"
      );
    }

    // Notionクライアントでテスト
    const notion = new Client({
      auth: apiKey,
    });

    console.log("\n🔍 Notion接続テスト中...");
    const user = await notion.users.me({});

    console.log("✅ 接続成功！");
    console.log(`👤 インテグレーション名: ${user.name}`);
    console.log(`🆔 ID: ${user.id}`);
    console.log(`🤖 ボット: ${(user as any).bot ? "はい" : "いいえ"}`);

    // 利用可能なページを確認
    const searchResults = await notion.search({
      filter: {
        property: "object",
        value: "page",
      },
    });

    console.log(`\n📄 アクセス可能なページ数: ${searchResults.results.length}`);

    if (searchResults.results.length > 0) {
      console.log("✅ ページにアクセス可能です");
      searchResults.results.forEach((page, index) => {
        const title =
          (page as any).properties?.title?.title?.[0]?.text?.content ||
          (page as any).properties?.Name?.title?.[0]?.text?.content ||
          "タイトルなし";
        console.log(`  ${index + 1}. ${title} (ID: ${page.id})`);
      });
    } else {
      console.log("❌ アクセス可能なページがありません");
      console.log("💡 解決方法:");
      console.log("1. ページの「Share」でインテグレーションを追加");
      console.log("2. 権限を「フルアクセス権限」に設定");
    }
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error.message);

    if (error.message.includes("Unauthorized")) {
      console.log("\n🔧 トラブルシューティング:");
      console.log("1. APIキーが正しいか確認");
      console.log("2. 内部インテグレーションシークレットを使用しているか確認");
      console.log("3. インテグレーションが有効か確認");
    }
  }
}

verifyApiKey();
