import { Account } from "@prisma/client";

// アカウント関連の型定義
export type AccountType = Account;

// UI関連の型
export interface AccountManagementProps {
  selectedAccountId?: string;
  onAccountSelect?: (accountId: string) => void;
}

// API通信の型定義
export interface BaseApiResponse {
  success: boolean;
  error?: string;
}

// アカウント一覧取得API
export interface GetAccountsResponse extends BaseApiResponse {
  accounts: AccountType[];
}

// アカウント詳細取得API
export interface GetAccountResponse extends BaseApiResponse {
  account: AccountType;
}
