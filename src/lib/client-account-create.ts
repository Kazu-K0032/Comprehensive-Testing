"use client";

import { AccountType } from "@/types/account.types";

export interface CreateAccountRequest {
  accountName: string;
  icon: string;
}

export interface CreateAccountResponse {
  success: boolean;
  account?: AccountType;
  error?: string;
}

/**
 * アカウント作成APIクライアント
 */
export class AccountCreateClient {
  private baseUrl = "";

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  }

  /**
   * 新規アカウントを作成
   */
  async createAccount(data: CreateAccountRequest): Promise<AccountType> {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CreateAccountResponse = await response.json();

      if (!result.success || !result.account) {
        throw new Error(result.error || "アカウントの作成に失敗しました");
      }

      return result.account;
    } catch (error) {
      console.error("アカウント作成エラー:", error);
      throw error;
    }
  }
}

export const accountCreateClient = new AccountCreateClient();
