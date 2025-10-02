import { useState, useCallback, useEffect } from "react";
import { Account } from "@prisma/client";
import { accountClient } from "@/lib/client-account";

const SELECTED_ACCOUNT_KEY = "selectedAccountId";

export const useAccountManagement = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<
    string | undefined
  >(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAccounts = await accountClient.getAccounts();
      setAccounts(fetchedAccounts);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "アカウントの読み込みに失敗しました"
      );
      console.error("アカウント読み込みエラー:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ローカルストレージからアカウントIDを復元
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAccountId = localStorage.getItem(SELECTED_ACCOUNT_KEY);
      if (savedAccountId) {
        setSelectedAccountId(savedAccountId);
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  // アカウントIDが変更された時にローカルストレージに保存
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      if (selectedAccountId) {
        localStorage.setItem(SELECTED_ACCOUNT_KEY, selectedAccountId);
      } else {
        localStorage.removeItem(SELECTED_ACCOUNT_KEY);
      }
    }
  }, [selectedAccountId, isInitialized]);

  const selectAccount = useCallback((accountId: string) => {
    setSelectedAccountId(accountId);
  }, []);

  const getSelectedAccount = useCallback((): Account | undefined => {
    return accounts.find((account) => account.id === selectedAccountId);
  }, [accounts, selectedAccountId]);

  return {
    accounts,
    loading,
    error,
    selectedAccountId,
    selectedAccount: getSelectedAccount(),
    selectAccount,
    refetch: loadAccounts,
  };
};
