/**
 * 日付フォーマットユーティリティのテスト
 * pnpm test src/utils/date.test.ts
 * ウォッチモード
 * pnpm test src/utils/date.test.ts --watch
 * レポート作成
 * pnpm test src/utils/date.test.ts --coverage
 */

import { formatDate } from "@/utils/date.utils";

describe("formatDate", () => {
  test("実際の使用パターン1: 日付のみ", () => {
    // arrange
    const testDate = new Date("2024-01-15T10:30:00Z");

    // act
    const result = formatDate(testDate, { format: "date" });

    // assert
    expect(result).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日$/);
    expect(typeof result).toBe("string");
  });

  test("実際の使用パターン2: 日付+時刻", () => {
    // arrange
    const testDate = new Date("2024-01-15T10:30:00Z");

    // act
    const result = formatDate(testDate, { format: "datetime" });

    // assert
    expect(result).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日 \d{1,2}:\d{2}$/);
    expect(typeof result).toBe("string");
  });

  test("デフォルトは日付のみ", () => {
    // arrange
    const testDate = new Date();

    // act
    const result = formatDate(testDate);

    // assert
    expect(result).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日$/);
    expect(typeof result).toBe("string");
  });

  test("誤った値を返さない", () => {
    const testDate = new Date("2024-01-15T10:30:00Z");
    const result = formatDate(testDate, { format: "datetime" });

    // 基本的な誤った値のチェック
    expect(result).not.toBe("Invalid Date");
    expect(result).not.toBe("");
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();

    // エラーメッセージのチェック
    expect(result).not.toMatch(/エラー/);
    expect(result).not.toMatch(/Invalid/);
    expect(result).not.toMatch(/Error/);

    // 型のチェック
    expect(typeof result).toBe("string");

    // 正しい形式であることを確認
    expect(result).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日 \d{1,2}:\d{2}$/);
  });

  test("無効なformatでもデフォルト動作", () => {
    const testDate = new Date("2024-01-15T10:30:00Z");
    const result = formatDate(testDate, { format: "invalid" as any });

    // デフォルトの日付形式が返されることを確認
    expect(result).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日$/);
    expect(typeof result).toBe("string");
  });
});
