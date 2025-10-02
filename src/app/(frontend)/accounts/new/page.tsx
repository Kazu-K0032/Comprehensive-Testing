"use client";

import { AccountCreateForm } from "@/features/account-create";
import { CONTENT_CONFIG } from "@/constants/globals.constants";
import type { AccountType } from "@/types/account.types";

export default function NewAccountPage() {
  /**
   * 新規アカウントが作成された時の処理
   * @param account
   */
  const handleAccountCreate = (account: AccountType) => {
    console.log("新規アカウントが作成されました:", account);
    window.location.href = CONTENT_CONFIG.ACCOUNTS.path;
  };

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <AccountCreateForm onAccountCreate={handleAccountCreate} />
    </div>
  );
}
