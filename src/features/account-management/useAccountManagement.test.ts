/**
 * アカウント管理コンポーネントのビジネスロジックテスト
 * pnpm test src/features/account-management/useAccountManagement.test.ts
 * ウォッチモード
 * pnpm test src/features/account-management/useAccountManagement.test.ts --watch
 * レポート作成
 * pnpm test src/features/account-management/useAccountManagement.test.ts --coverage
 */

import { renderHook, waitFor, act } from "@testing-library/react";
import { accountClient } from "../../lib/client-account";
import { mockAccounts } from "./AccountManagement.mock";

jest.mock("../../lib/client-account");
const mockAccountClient = accountClient as jest.Mocked<typeof accountClient>;
mockAccountClient.getAccounts.mockResolvedValue(mockAccounts);

import { useAccountManagement } from "./useAccountManagement";

describe("useAccountManagement", () => {
  // テスト前の初期化
  beforeEach(() => {
    // モックのクリア
    jest.clearAllMocks();
    // ローカルストレージのクリア
    localStorage.clear();
    // デフォルトのモックデータを設定
    mockAccountClient.getAccounts.mockResolvedValue(mockAccounts);
  });

  test("アカウント一覧を取得できる", async () => {
    const { result } = renderHook(() => useAccountManagement());

    await waitFor(() => expect(result.current.accounts).toEqual(mockAccounts));
  });

  test("アカウント選択", () => {
    const { result } = renderHook(() => useAccountManagement());

    // フックの中のuseStateなどで状態が変わるのを待つ
    act(() => {
      // id: 1のアカウントを選択する
      result.current.selectAccount("1");
    });

    // 選択されたアカウントIDが1であるかどうかをテスト
    expect(result.current.selectedAccountId).toBe("1");
  });

  test("アカウント一覧取得失敗", async () => {
    const errorMessage = "APIエラー";
    // モックの設定
    mockAccountClient.getAccounts.mockRejectedValue(new Error(errorMessage));

    // フックの実行
    const { result } = renderHook(() => useAccountManagement());

    // ローディングが終了したかどうかをテスト
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // アカウント一覧が空の配列であるかどうかをテスト
    expect(result.current.accounts).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  test("Error以外の例外が発生した場合のエラーハンドリング", async () => {
    // モックの設定（Error以外の例外）
    mockAccountClient.getAccounts.mockRejectedValue("文字列エラー");

    // フックの実行
    const { result } = renderHook(() => useAccountManagement());

    // ローディングが終了したかどうかをテスト
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // デフォルトエラーメッセージが設定されることをテスト
    expect(result.current.error).toBe("アカウントの読み込みに失敗しました");
  });

  test("ローカルストレージに保存されたアカウントIDが復元される", () => {
    // ローカルストレージにアカウントIDを設定
    localStorage.setItem("selectedAccountId", "2");

    const { result } = renderHook(() => useAccountManagement());

    // 保存されたアカウントIDが復元されることをテスト
    expect(result.current.selectedAccountId).toBe("2");
  });

  test("ローカルストレージにアカウントIDが保存されていない場合", () => {
    // ローカルストレージをクリア
    localStorage.clear();

    const { result } = renderHook(() => useAccountManagement());

    // selectedAccountIdがundefinedであることをテスト
    expect(result.current.selectedAccountId).toBeUndefined();
  });

  test("選択されたアカウントが取得できる", async () => {
    const { result } = renderHook(() => useAccountManagement());

    // アカウント一覧の読み込みを待つ
    await waitFor(() => {
      expect(result.current.accounts).toEqual(mockAccounts);
    });

    // Reactの状態更新を完了させてから次の処理に進むための関数
    act(() => {
      // id: 1のアカウントを選択する
      result.current.selectAccount("1");
    });

    // 選択されたアカウントが正しく取得できることをテスト
    expect(result.current.selectedAccount).toEqual(mockAccounts[0]);
  });

  test("存在しないアカウントIDを選択した場合", async () => {
    const { result } = renderHook(() => useAccountManagement());

    // アカウント一覧の読み込みを待つ
    await waitFor(() => {
      expect(result.current.accounts).toEqual(mockAccounts);
    });

    // Reactの状態更新を完了させてから次の処理に進むための関数
    act(() => {
      // id: 999のアカウントを選択する
      result.current.selectAccount("999");
    });

    // 存在しないアカウントIDの場合、selectedAccountがundefinedであることをテスト
    expect(result.current.selectedAccount).toBeUndefined();
  });

  test("アカウント選択をクリアする", () => {
    const { result } = renderHook(() => useAccountManagement());

    // まずアカウントを選択
    act(() => {
      result.current.selectAccount("1");
    });

    // アカウント選択をクリア（undefinedを設定）
    act(() => {
      result.current.selectAccount("");
    });

    // selectedAccountIdがundefinedであることをテスト
    expect(result.current.selectedAccountId).toBe("");
  });

  // 「再取得（refetch）機能が正しく動くか」を確認するテスト
  test("refetch機能が正常に動作する", async () => {
    const { result } = renderHook(() => useAccountManagement());

    // 初期状態を待つ
    await waitFor(() => {
      // 最初のAPI呼び出しでデータが取得できていることをテスト
      expect(result.current.accounts).toEqual(mockAccounts);
    });

    // 新しいモックデータを設定
    const newMockAccounts = [
      ...mockAccounts,
      {
        id: "4",
        accountName: "新しいアカウント",
        icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=new",
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-01"),
        deletedAt: null,
      },
    ];

    // モックを新しいデータに変更
    // mockResolvedValue: モック関数が解決されたときに返す値を設定
    mockAccountClient.getAccounts.mockResolvedValue(newMockAccounts);

    // 状態管理が更新されるのを待つ
    await act(async () => {
      // 再取得を実行
      await result.current.refetch();
    });

    // 状態管理が更新されるのを待つ
    await waitFor(() => {
      // 新しいデータが取得されることをテスト
      expect(result.current.accounts).toEqual(newMockAccounts);
    });
  });

  test("サーバーサイドレンダリング環境での動作", () => {
    // windowオブジェクトを一時的にundefinedに設定
    const originalWindow = global.window;
    // @ts-ignore
    global.window = undefined;

    const { result } = renderHook(() => useAccountManagement());

    // サーバー環境ではselectedAccountIdがundefinedであることをテスト
    expect(result.current.selectedAccountId).toBeUndefined();

    // windowオブジェクトを復元
    global.window = originalWindow;
  });
});
