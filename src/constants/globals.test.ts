/**
 * グローバル定数のテスト
 * pnpm test src/constants/globals.test.ts
 * ウォッチモード
 * pnpm test src/constants/globals.test.ts --watch
 * レポート作成
 * pnpm test src/constants/globals.test.ts --coverage
 */

import { CONTENT_CONFIG } from "./globals.constants";

describe("CONTENT_CONFIG", () => {
  test("CONTENT_CONFIGが定義されている", () => {
    expect(CONTENT_CONFIG).toBeDefined();
  });
});
