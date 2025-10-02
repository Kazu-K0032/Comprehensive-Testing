import { getSelectedAccountId } from "./cookies";
import { prisma } from "./prisma";
import { Account } from "@prisma/client";

/**
 * サーバーサイドで選択されたアカウント情報を取得
 */
export async function getServerSelectedAccount(): Promise<Account | null> {
  try {
    const selectedAccountId = await getSelectedAccountId();
    if (!selectedAccountId) return null;

    const account = await prisma.account.findUnique({
      where: {
        id: selectedAccountId,
        deletedAt: null,
      },
    });

    return account;
  } catch (error) {
    console.error("サーバーサイドアカウント取得エラー:", error);
    return null;
  }
}

/**
 * サーバーサイドでアカウント一覧を取得
 */
export async function getServerAccounts(): Promise<Account[]> {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return accounts;
  } catch (error) {
    console.error("サーバーサイドアカウント一覧取得エラー:", error);
    return [];
  }
}
