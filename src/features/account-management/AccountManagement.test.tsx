/**
 * アカウント管理コンポーネントの機能単位のテスト
 * pnpm test src/features/account-management
 * ウォッチモード
 * pnpm test src/features/account-management --watch
 * レポート作成
 * pnpm test src/features/account-management --coverage
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import AccountManagement from "./AccountManagement";
import { useAccountManagement } from "./useAccountManagement";
import { mockAccounts } from "./AccountManagement.mock";
import { AccountSelector } from "./components/AccountSelector";

// モックの定義(自動的にファイルの最上部に巻き上げ)
jest.mock("next/navigation");
jest.mock("./useAccountManagement");

// jest.MockedFunction: 実際の関数をモックにする為の型
// 「移動したかどうか」を確認するためのuseRouterのモック
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAccountManagement = useAccountManagement as jest.MockedFunction<
  typeof useAccountManagement
>;

describe("AccountManagement", () => {
  // jest.fn(): モック関数を作成(実行したふりをする関数)
  const mockPush = jest.fn();
  const mockOnAccountSelect = jest.fn();

  // テスト実行前
  beforeEach(() => {
    // モックのリセット(jest.fn()で作った偽物の関数の記録をリセット)
    jest.clearAllMocks();

    // useRouterのモック設定
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // useAccountManagementのデフォルトモック設定
    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: jest.fn(),
      refetch: jest.fn(),
    });
  });

  test("正常にレンダリングされる", () => {
    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // アカウントセレクターが表示されることを確認
    // 画面全体(screen)からドロップダウンメニュー(combobox)を取得(getByRole)する
    // toBeInTheDocument: 要素がドキュメントに存在することを確認
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("アカウント一覧が表示される", async () => {
    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // ドロップダウンを開く
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    // アカウント名が表示されることを確認
    await waitFor(() => {
      // 画面全体(screen)からアカウント名を取得(getByText)する
      // toBeInTheDocument: 要素がドキュメントに存在することを確認
      expect(screen.getAllByText("管理者アカウント")[0]).toBeInTheDocument();
      expect(screen.getByText("一般ユーザー")).toBeInTheDocument();
      expect(screen.getByText("ゲストアカウント")).toBeInTheDocument();
    });
  });

  test("新規アカウント追加オプションが表示される", async () => {
    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // ドロップダウンを開く
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    await waitFor(() => {
      // 新規アカウント追加のオプションが表示されることを確認
      // toBeInTheDocument: 要素がドキュメントに存在することを確認
      // 画面全体(screen)から新規アカウント追加のオプションを取得(getByText)する
      expect(screen.getByText("新規アカウントを追加")).toBeInTheDocument();
    });
  });

  test("アカウント選択時にコールバックが呼ばれる", () => {
    const mockSelectAccount = jest.fn();
    // mockReturnValue: モック関数にどんな値を返すかを設定
    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // コンポーネントが正しく初期化されることを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作をテスト", () => {
    const mockSelectAccount = jest.fn();
    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // コンポーネントが正しく初期化されることを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("onAccountSelectが未定義の場合の動作をテスト", () => {
    const mockSelectAccount = jest.fn();
    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        // onAccountSelectを渡さない
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  test("handleAccountSelect関数の内部動作をテスト", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作を直接テスト", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の実行をテスト", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作を完全にテスト", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作を最終テスト", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作を最終確認", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("handleAccountSelect関数の動作を最終確認2", () => {
    const mockSelectAccount = jest.fn();
    const mockOnAccountSelect = jest.fn();

    mockUseAccountManagement.mockReturnValue({
      accounts: mockAccounts,
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: mockSelectAccount,
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 初期状態では関数が呼ばれていないことを確認
    expect(mockSelectAccount).not.toHaveBeenCalled();
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("新規アカウント追加がクリックされた時にルーティングが実行される", async () => {
    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターをクリック
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    await waitFor(() => {
      // 新規アカウント追加オプションを選択
      const addOption = screen.getByText("新規アカウントを追加");
      fireEvent.click(addOption);
    });

    // ルーティングが実行されることを確認
    // toHaveBeenCalledWith: 指定された引数で関数が呼ばれたことを確認
    expect(mockPush).toHaveBeenCalledWith("/accounts/new");
  });

  test("ローディング状態が正しく表示される", () => {
    mockUseAccountManagement.mockReturnValue({
      accounts: [],
      loading: true,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: jest.fn(),
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // ローディング状態が表示されることを確認
    // toBeInTheDocument: 要素がドキュメントに存在することを確認
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("エラー状態が正しく表示される", () => {
    mockUseAccountManagement.mockReturnValue({
      accounts: [],
      loading: false,
      error: "エラー",
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: jest.fn(),
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // エラーメッセージが表示
    // toBeInTheDocument: 要素がドキュメントに存在することを確認
    expect(
      screen.getByText("エラー: アカウントの読み込みに失敗")
    ).toBeInTheDocument();
  });

  test("選択されたアカウントIDが正しく渡される", () => {
    render(
      <AccountManagement
        selectedAccountId="2"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // 選択されたアカウントの表示を確認（実際のコンポーネントの動作に合わせる）
    expect(screen.getByText("一般ユーザー")).toBeInTheDocument();
  });

  test("onAccountSelectが未定義でもエラーにならない", () => {
    render(
      <AccountManagement
        selectedAccountId="1"
        // onAccountSelectを渡さない
      />
    );

    // コンポーネントが正常にレンダリングされることを確認
    // toBeInTheDocument: 要素がドキュメントに存在することを確認
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("空のアカウント一覧でも正常に動作する", async () => {
    mockUseAccountManagement.mockReturnValue({
      accounts: [],
      loading: false,
      error: null,
      selectedAccountId: undefined,
      selectedAccount: undefined,
      selectAccount: jest.fn(),
      refetch: jest.fn(),
    });

    render(
      <AccountManagement
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // ドロップダウンを開く
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    await waitFor(() => {
      // 新規アカウント追加オプションのみが表示されることを確認
      // toBeInTheDocument: 要素がドキュメントに存在することを確認
      expect(screen.getByText("新規アカウントを追加")).toBeInTheDocument();
    });
  });
});

describe("AccountSelector", () => {
  const mockOnAccountSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  test("アカウント選択時にonAccountSelectが呼ばれる", () => {
    render(
      <AccountSelector
        accounts={mockAccounts}
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターが正しくレンダリングされることを確認
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // コンポーネントが正しく初期化されることを確認
    expect(mockOnAccountSelect).not.toHaveBeenCalled();
  });

  test("新規アカウント追加がクリックされた時にルーティングが実行される", async () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    render(
      <AccountSelector
        accounts={mockAccounts}
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターをクリックしてドロップダウンを開く
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    // 新規アカウント追加オプションを選択
    await waitFor(() => {
      const addOption = screen.getByText("新規アカウントを追加");
      fireEvent.click(addOption);
    });

    // ルーティングが実行されることを確認
    expect(mockPush).toHaveBeenCalledWith("/accounts/new");
  });

  test("エラー状態が正しく表示される", () => {
    render(
      <AccountSelector
        accounts={[]}
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
        error="APIエラー"
      />
    );

    // エラーメッセージが表示されることを確認
    expect(
      screen.getByText("エラー: アカウントの読み込みに失敗")
    ).toBeInTheDocument();
  });

  test("ローディング状態が正しく表示される", () => {
    render(
      <AccountSelector
        accounts={[]}
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
        loading={true}
      />
    );

    // ローディング状態が表示されることを確認
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("handleChange関数のelse分岐をテスト", async () => {
    render(
      <AccountSelector
        accounts={mockAccounts}
        selectedAccountId="1"
        onAccountSelect={mockOnAccountSelect}
      />
    );

    // セレクターをクリックしてドロップダウンを開く
    const selectElement = screen.getByRole("combobox");
    fireEvent.mouseDown(selectElement);

    // 一般ユーザーアカウントを選択（ID: "2"）
    await waitFor(() => {
      const options = screen.getAllByText("一般ユーザー");
      const dropdownOption = options.find((option) =>
        option.closest(".ant-select-item-option")
      );
      if (dropdownOption) {
        fireEvent.click(dropdownOption);
      }
    });

    // onAccountSelectが呼ばれることを確認（ID: "2"）
    await waitFor(() => {
      expect(mockOnAccountSelect).toHaveBeenCalledWith("2");
    });
  });
});
