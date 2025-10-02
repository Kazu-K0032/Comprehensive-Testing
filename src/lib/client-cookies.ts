"use client";

const SELECTED_ACCOUNT_COOKIE = "selectedAccountId";

/**
 * クライアントサイドで選択されたアカウントIDを取得
 */
export function getSelectedAccountIdFromCookie(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const cookies = document.cookie.split(";");
  console.log("解析するCookie:", cookies);
  const accountCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${SELECTED_ACCOUNT_COOKIE}=`)
  );
  console.log("見つかったアカウントCookie:", accountCookie);

  const accountId = accountCookie?.split("=")[1];
  console.log("抽出されたアカウントID:", accountId);
  return accountId;
}

/**
 * クライアントサイドで選択されたアカウントIDを設定
 */
export function setSelectedAccountIdToCookie(accountId: string): void {
  if (typeof window === "undefined") return;

  const maxAge = 60 * 60 * 24 * 30; // 30日間
  const cookieString = `${SELECTED_ACCOUNT_COOKIE}=${accountId}; max-age=${maxAge}; path=/; samesite=lax`;
  console.log("設定するCookie:", cookieString);
  document.cookie = cookieString;
  console.log("Cookie設定後の全Cookie:", document.cookie);
}

/**
 * クライアントサイドで選択されたアカウントIDを削除
 */
export function clearSelectedAccountIdFromCookie(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${SELECTED_ACCOUNT_COOKIE}=; max-age=0; path=/`;
}
