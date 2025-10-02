import { DateTime } from "luxon";

/**
 * 日付をJSTに変換してフォーマットする
 * @param date 日付（string | Date | DateTime）
 * @param options フォーマットオプション
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  date: string | Date | DateTime,
  options: {
    format?: "date" | "datetime" | "time";
    locale?: string;
  } = {}
): string {
  const { format = "date", locale = "ja-JP" } = options;

  let dateTime: DateTime;

  if (DateTime.isDateTime(date)) {
    dateTime = date;
  } else if (typeof date === "string") {
    dateTime = DateTime.fromISO(date);
  } else {
    dateTime = DateTime.fromJSDate(date);
  }

  // JSTに変換
  const jstDateTime = dateTime.setZone("Asia/Tokyo");

  switch (format) {
    case "date":
      return jstDateTime.toLocaleString(DateTime.DATE_MED, { locale });
    case "datetime":
      return jstDateTime.toLocaleString(DateTime.DATETIME_MED, { locale });
    case "time":
      return jstDateTime.toLocaleString(DateTime.TIME_SIMPLE, { locale });
    default:
      return jstDateTime.toLocaleString(DateTime.DATE_MED, { locale });
  }
}
