import { DateTime } from "luxon";

/**
 * 日付をJSTに変換してフォーマットする
 * @param date 日付（Date型）
 * @param options フォーマットオプション
 * @returns フォーマットされた日付文字列
 * @example
 * formatDate(new Date(), { format: "date" });     // 日付のみ
 * formatDate(new Date(), { format: "datetime" }); // 日付+時刻
 */
export function formatDate(
  date: Date,
  options: {
    format?: "date" | "datetime";
  } = {}
): string {
  const { format = "date" } = options;

  // Date型をDateTimeに変換
  const dateTime = DateTime.fromJSDate(date);

  // JSTに変換
  const jstDateTime = dateTime.setZone("Asia/Tokyo");

  switch (format) {
    case "date":
      return jstDateTime.toLocaleString(DateTime.DATE_MED, { locale: "ja-JP" });
    case "datetime":
      return jstDateTime.toLocaleString(DateTime.DATETIME_MED, {
        locale: "ja-JP",
      });
    default:
      return jstDateTime.toLocaleString(DateTime.DATE_MED, { locale: "ja-JP" });
  }
}

// 手動テスト
// npx tsx src/utils/date.utils.ts
/* istanbul ignore next */
if (require.main === module) {
  let result = formatDate(new Date("2024-01-15T10:30:00Z"), {
    format: "date",
  });
  console.log("date:", result, typeof result);

  // 実際の使用パターン2: 日付+時刻
  result = formatDate(new Date("2024-01-15T10:30:00Z"), { format: "datetime" });
  console.log("datetime:", result, typeof result);
}
