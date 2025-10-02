"use client";

/**
 * アカウント選択APIクライアント
 */
export class AccountSelectClient {
  private baseUrl = "";

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  }

  /**
   * アカウントを選択
   */
  async selectAccount(accountId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts/select`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "アカウントの選択に失敗しました");
      }
    } catch (error) {
      console.error("アカウント選択エラー:", error);
      throw error;
    }
  }

  /**
   * アカウント選択を解除
   */
  async clearSelection(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts/select`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "アカウント選択の解除に失敗しました");
      }
    } catch (error) {
      console.error("アカウント選択解除エラー:", error);
      throw error;
    }
  }
}

export const accountSelectClient = new AccountSelectClient();
