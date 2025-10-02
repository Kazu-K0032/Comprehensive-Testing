"use client";

import { useState, useCallback } from "react";
import { accountCreateClient } from "@/lib/client-account-create";
import type { AccountType } from "@/types/account.types";
import { getRandomIconUrl, getResetFormData } from "./AccountCreateForm.utils";
import type {
  AccountCreateFormData,
  AccountCreateFormState,
} from "./AccountCreateForm.types";

export function useAccountCreateForm() {
  const [state, setState] = useState<AccountCreateFormState>({
    loading: false,
    error: null,
    formData: {
      accountName: "",
      icon: getRandomIconUrl(),
    },
  });

  const updateFormData = useCallback(
    (field: keyof AccountCreateFormData, value: string) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [field]: value,
        },
      }));
    },
    []
  );

  const createAccount = useCallback(async (): Promise<AccountType> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const account = await accountCreateClient.createAccount(state.formData);

      setState((prev) => ({
        ...prev,
        loading: false,
        formData: getResetFormData(),
      }));

      return account;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "アカウントの作成に失敗しました",
      }));
      throw error;
    }
  }, [state.formData]);

  return {
    state,
    updateFormData,
    createAccount,
  };
}
