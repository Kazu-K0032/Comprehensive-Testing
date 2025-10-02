import {
  AccountType,
  GetAccountsResponse,
  GetAccountResponse,
} from "@/types/account.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class AccountClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * アカウント一覧を取得する
   * @returns アカウント一覧
   */
  async getAccounts(): Promise<AccountType[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetAccountsResponse = await response.json();
      return data.accounts;
    } catch (error) {
      console.error("アカウント取得エラー:", error);
      throw error;
    }
  }

  /**
   * アカウントを取得する
   * @param id アカウントID
   * @returns アカウント
   */
  async getAccountById(id: string): Promise<AccountType | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetAccountResponse = await response.json();
      return data.account;
    } catch (error) {
      console.error("アカウント取得エラー:", error);
      throw error;
    }
  }

  /**
   * アカウントを更新する
   * @param id アカウントID
   * @param accountName アカウント名
   * @param icon アイコンURL
   * @returns 更新されたアカウント
   */
  async updateAccount(
    id: string,
    accountName: string,
    icon: string
  ): Promise<AccountType> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountName,
          icon,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetAccountResponse = await response.json();
      return data.account;
    } catch (error) {
      console.error("アカウント更新エラー:", error);
      throw error;
    }
  }
}

export const accountClient = new AccountClient();
