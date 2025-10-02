import { cookies } from "next/headers";

const SELECTED_ACCOUNT_COOKIE = "selectedAccountId";

/**
 * サーバーサイドで選択されたアカウントIDを取得
 */
export async function getSelectedAccountId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SELECTED_ACCOUNT_COOKIE)?.value;
}

/**
 * サーバーサイドで選択されたアカウントIDを設定
 */
export async function setSelectedAccountId(accountId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SELECTED_ACCOUNT_COOKIE, accountId, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

/**
 * サーバーサイドで選択されたアカウントIDを削除
 */
export async function clearSelectedAccountId(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SELECTED_ACCOUNT_COOKIE);
}
