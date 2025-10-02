import React from "react";
import { AccountType } from "@/types/account.types";

export interface AccountContextType {
  selectedAccountId: string | undefined;
  setSelectedAccountId: (accountId: string | undefined) => void;
  selectedAccount: AccountType | null;
  setSelectedAccount: (account: AccountType | null) => void;
}

export interface AccountProviderProps {
  children: React.ReactNode;
}
