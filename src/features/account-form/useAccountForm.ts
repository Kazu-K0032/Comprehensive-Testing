"use client";

import { useState, useEffect, useCallback } from "react";
import { AccountType } from "@/types/account.types";
import { AccountFormData, AccountFormState } from "./AccountForm.types";
import { accountClient } from "@/lib/client-account";

export function useAccountForm(accountId?: string) {
  const [state, setState] = useState<AccountFormState>({
    loading: false,
    error: null,
    isEditing: false,
    formData: {
      accountName: "",
      icon: "",
    },
  });

  const [account, setAccount] = useState<AccountType | null>(null);

  // アカウントデータの読み込み
  const loadAccount = useCallback(async () => {
    if (!accountId) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const accountData = await accountClient.getAccountById(accountId);

      if (!accountData) {
        throw new Error("アカウントが見つかりません");
      }

      setAccount(accountData);
      setState((prev) => ({
        ...prev,
        loading: false,
        formData: {
          accountName: accountData.accountName,
          icon: accountData.icon,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "アカウント情報の読み込みに失敗しました",
      }));
    }
  }, [accountId]);

  // 編集モードの切り替え
  const toggleEdit = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isEditing: !prev.isEditing,
      error: null,
    }));
  }, []);

  // フォームデータの更新
  const updateFormData = useCallback(
    (field: keyof AccountFormData, value: string) => {
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

  // 保存処理
  const saveAccount = useCallback(async () => {
    if (!accountId) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const updatedAccount = await accountClient.updateAccount(
        accountId,
        state.formData.accountName,
        state.formData.icon
      );

      setAccount(updatedAccount);
      setState((prev) => ({
        ...prev,
        loading: false,
        isEditing: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "アカウント情報の保存に失敗しました",
      }));
    }
  }, [accountId, state.formData]);

  // キャンセル処理
  const cancelEdit = useCallback(() => {
    if (account) {
      setState((prev) => ({
        ...prev,
        isEditing: false,
        formData: {
          accountName: account.accountName,
          icon: account.icon,
        },
        error: null,
      }));
    }
  }, [account]);

  // 初期化
  useEffect(() => {
    if (accountId) {
      loadAccount();
    } else {
      // 新規作成モード
      setState((prev) => ({
        ...prev,
        isEditing: true,
        formData: {
          accountName: "",
          icon: "",
        },
      }));
    }
  }, [accountId, loadAccount]);

  return {
    account,
    state,
    toggleEdit,
    updateFormData,
    saveAccount,
    cancelEdit,
    loadAccount,
  };
}
