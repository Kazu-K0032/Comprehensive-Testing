"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AccountType } from "@/types/account.types";
import { AccountProviderProps } from "./types";
import { AccountContext } from "./context";
import {
  getSelectedAccountIdFromCookie,
  setSelectedAccountIdToCookie,
  clearSelectedAccountIdFromCookie,
} from "@/lib/client-cookies";
import { accountSelectClient } from "@/lib/client-account-select";
import { CONTENT_CONFIG } from "@/constants/globals.constants";

/**
 * アカウントプロバイダ
 * @param children 子要素
 * @returns
 */
export function AccountProvider({ children }: AccountProviderProps) {
  const pathname = usePathname();
  // 選択されたアカウントID
  const [selectedAccountId, setSelectedAccountId] = useState<
    string | undefined
  >(undefined);
  // 選択されたアカウント
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(
    null
  );
  // 初期化フラグ
  const [isInitialized, setIsInitialized] = useState(false);

  // CookieからアカウントIDを復元
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("全Cookie:", document.cookie);
      const savedAccountId = getSelectedAccountIdFromCookie();
      console.log("復元されたアカウントID:", savedAccountId);

      // 新規アカウント作成ページでは選択をクリア
      if (pathname === CONTENT_CONFIG.NEW.path) {
        setSelectedAccountId(undefined);
        clearSelectedAccountIdFromCookie();
      } else if (savedAccountId) {
        setSelectedAccountId(savedAccountId);
      }
      setIsInitialized(true);
    }
  }, [pathname]);

  // アカウントIDが変更された時にサーバーとCookieに保存
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      console.log("アカウントID変更:", selectedAccountId);
      if (selectedAccountId) {
        // サーバーサイドに保存
        accountSelectClient
          .selectAccount(selectedAccountId)
          .catch(console.error);
        // クライアントサイドCookieにも保存
        setSelectedAccountIdToCookie(selectedAccountId);
        console.log("アカウントID保存完了:", selectedAccountId);
      } else {
        // サーバーサイドから削除
        accountSelectClient.clearSelection().catch(console.error);
        // クライアントサイドCookieからも削除
        clearSelectedAccountIdFromCookie();
        console.log("アカウントID削除完了");
      }
    }
  }, [selectedAccountId, isInitialized]);

  return (
    <AccountContext.Provider
      value={{
        selectedAccountId,
        setSelectedAccountId,
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
