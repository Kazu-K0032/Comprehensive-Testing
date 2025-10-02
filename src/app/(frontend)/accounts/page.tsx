"use client";

import { AccountForm } from "@/features/account-form";
import { AccountType } from "@/types/account.types";

export default function AccountPage() {
  const handleAccountUpdate = (account: AccountType) => {
    console.log("アカウントが更新されました:", account);
  };

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <AccountForm onAccountUpdate={handleAccountUpdate} />
    </div>
  );
}
