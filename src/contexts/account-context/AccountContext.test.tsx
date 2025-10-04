/**
 * AccountContext 単体テスト
 *
 * テスト対象:
 * - useAccount カスタムフック
 * - AccountContext コンテキスト
 * - AccountProvider プロバイダーコンポーネント
 *
 * 実行方法:
 * pnpm test src/contexts/account-context/AccountContext.test.ts --watch
 * レポート作成
 * pnpm test src/contexts/account-context/AccountContext.test.ts --coverage
 */

import { render, screen, act } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { AccountProvider } from "./AccountProvider";
import { useAccount } from "./useAccount";

// モックの定義
jest.mock("next/navigation");
jest.mock("../../lib/client-cookies");
jest.mock("../../lib/client-account-select");
jest.mock("../../constants/globals.constants");

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// テスト用のコンポーネント
function TestComponent() {
  const {
    selectedAccountId,
    setSelectedAccountId,
    selectedAccount,
    setSelectedAccount,
  } = useAccount();

  return (
    <div>
      <div data-testid="selected-account-id">
        {selectedAccountId || "undefined"}
      </div>
      <div data-testid="selected-account">
        {selectedAccount ? selectedAccount.accountName : "null"}
      </div>
      <button
        data-testid="set-account-id"
        onClick={() => setSelectedAccountId("test-id")}
      >
        Set Account ID
      </button>
      <button
        data-testid="set-account"
        onClick={() =>
          setSelectedAccount({
            id: "1",
            accountName: "Test Account",
            icon: "test.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
        }
      >
        Set Account
      </button>
    </div>
  );
}

describe("AccountContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("/");

    // モックの設定
    const {
      getSelectedAccountIdFromCookie,
      setSelectedAccountIdToCookie,
      clearSelectedAccountIdFromCookie,
    } = require("../../lib/client-cookies");
    const { accountSelectClient } = require("../../lib/client-account-select");
    const { CONTENT_CONFIG } = require("../../constants/globals.constants");

    getSelectedAccountIdFromCookie.mockReturnValue(undefined);
    setSelectedAccountIdToCookie.mockImplementation(() => {});
    clearSelectedAccountIdFromCookie.mockImplementation(() => {});
    accountSelectClient.selectAccount.mockResolvedValue({});
    accountSelectClient.clearSelection.mockResolvedValue({});
    CONTENT_CONFIG.NEW.path = "/accounts/new";
  });

  test("useAccountフックが正しく動作する", () => {
    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // 初期状態の確認
    expect(screen.getByTestId("selected-account-id")).toHaveTextContent(
      "undefined"
    );
    expect(screen.getByTestId("selected-account")).toHaveTextContent("null");
  });

  test("useAccountフックでアカウントIDを設定できる", () => {
    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // アカウントIDを設定
    act(() => {
      screen.getByTestId("set-account-id").click();
    });

    expect(screen.getByTestId("selected-account-id")).toHaveTextContent(
      "test-id"
    );
  });

  test("useAccountフックでアカウントを設定できる", () => {
    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // アカウントを設定
    act(() => {
      screen.getByTestId("set-account").click();
    });

    expect(screen.getByTestId("selected-account")).toHaveTextContent(
      "Test Account"
    );
  });

  test("useAccountフックがAccountProvider外で使用された場合エラーを投げる", () => {
    // エラーをキャッチするためのコンソールエラーをモック
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // AccountProvider外でuseAccountを使用
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAccountはAccountProvider内で使用する必要があります");

    consoleSpy.mockRestore();
  });

  test("AccountProviderが正しくレンダリングされる", () => {
    render(
      <AccountProvider>
        <div data-testid="child">Child Component</div>
      </AccountProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("AccountContextの初期値が正しい", () => {
    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // コンテキストが正しく動作していることを確認
    expect(screen.getByTestId("selected-account-id")).toBeInTheDocument();
    expect(screen.getByTestId("selected-account")).toBeInTheDocument();
  });

  test("新規アカウント作成ページでアカウント選択がクリアされる", () => {
    mockUsePathname.mockReturnValue("/accounts/new");

    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // 新規アカウント作成ページでは選択がクリアされる
    expect(screen.getByTestId("selected-account-id")).toHaveTextContent(
      "undefined"
    );
  });

  test("CookieからアカウントIDが復元される", () => {
    const {
      getSelectedAccountIdFromCookie,
    } = require("../../lib/client-cookies");
    getSelectedAccountIdFromCookie.mockReturnValue("saved-account-id");

    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // Cookieから復元されたアカウントIDが設定される
    expect(screen.getByTestId("selected-account-id")).toHaveTextContent(
      "saved-account-id"
    );
  });

  test("アカウントIDが変更された時にサーバーとCookieに保存される", async () => {
    const {
      setSelectedAccountIdToCookie,
    } = require("../../lib/client-cookies");
    const { accountSelectClient } = require("../../lib/client-account-select");

    render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // アカウントIDを設定
    act(() => {
      screen.getByTestId("set-account-id").click();
    });

    // サーバーとCookieに保存されることを確認
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(accountSelectClient.selectAccount).toHaveBeenCalledWith("test-id");
    expect(setSelectedAccountIdToCookie).toHaveBeenCalledWith("test-id");
  });
});
