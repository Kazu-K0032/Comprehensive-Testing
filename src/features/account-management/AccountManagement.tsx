"use client";

import { AccountManagementProps } from "@/types/account.types";
import { AccountSelector } from "./components/AccountSelector";
import { useAccountManagement } from "./useAccountManagement";

export default function AccountManagement({
  selectedAccountId,
  onAccountSelect,
}: AccountManagementProps) {
  const { accounts, loading, error, selectAccount } = useAccountManagement();

  const handleAccountSelect = (accountId: string) => {
    selectAccount(accountId);
    onAccountSelect?.(accountId);
  };

  return (
    <AccountSelector
      accounts={accounts}
      selectedAccountId={selectedAccountId}
      onAccountSelect={handleAccountSelect}
      loading={loading}
      error={error}
    />
  );
}
