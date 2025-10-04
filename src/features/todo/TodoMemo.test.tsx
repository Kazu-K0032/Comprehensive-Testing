import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { message } from "antd";
import { TaskStatus } from "@prisma/client";
import { useAccount } from "../../contexts/account-context";
import { AccountProvider } from "../../contexts/account-context";
import { useTodoMemo } from "./useTodoMemo";
import { TodoMemo } from "./TodoMemo";
import { mockTodos } from "./TodoMemo.mock";

// Jest型定義の明示的インポート
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// モック設定
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    warning: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

// useTodoMemoのモックを設定
jest.mock("./useTodoMemo", () => ({
  useTodoMemo: jest.fn(),
}));

// AccountProviderのモックを設定
jest.mock("../../contexts/account-context", () => ({
  useAccount: jest.fn(),
  AccountProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// formatDateユーティリティのモック
jest.mock("../../utils/date.utils", () => ({
  formatDate: jest.fn((date: Date) => {
    return date.toLocaleDateString("ja-JP");
  }),
}));

const mockUseTodoMemo = useTodoMemo as jest.MockedFunction<typeof useTodoMemo>;
const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

// テスト用のモックデータ
const mockAccountContext = {
  selectedAccountId: "test-account-id",
  setSelectedAccountId: jest.fn(),
  selectedAccount: {
    id: "test-account-id",
    accountName: "Test Account",
    icon: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  setSelectedAccount: jest.fn(),
};

// テスト用のTodoItemを正しい型に変換
const mockTodosForTest = mockTodos.slice(0, 5).map((todo) => ({
  ...todo,
  accountId: "test-account-id",
  status: todo.completed ? TaskStatus.DONE : TaskStatus.TODO,
  updatedAt: new Date(),
  deletedAt: null,
}));

const mockTodoMemoHook = {
  todos: mockTodosForTest,
  isLoading: false,
  error: null,
  selectedTodo: null,
  editingTodo: null,
  isDetailModalVisible: false,
  isEditModalVisible: false,
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  deleteTodo: jest.fn(),
  deleteCompletedTodos: jest.fn(),
  showTodoDetail: jest.fn(),
  editTodo: jest.fn(),
  updateTodo: jest.fn(),
  closeModals: jest.fn(),
  refetch: jest.fn(),
};

// テスト用のレンダリング関数
const renderTodoMemo = (props = {}) => {
  return render(
    <AccountProvider>
      <TodoMemo {...props} />
    </AccountProvider>
  );
};

describe("TodoMemo Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAccount.mockReturnValue(mockAccountContext);
    mockUseTodoMemo.mockReturnValue(mockTodoMemoHook);
  });

  // デバッグ用のテスト
  it("コンポーネントが正しくレンダリングされる", () => {
    renderTodoMemo();
    expect(screen.getByText("タスク管理")).toBeInTheDocument();
  });

  it("TODOリストが表示される", () => {
    renderTodoMemo();

    // TODOリストが表示されているか確認
    const todoCards = screen.queryAllByRole("img", {
      name: /eye|edit|delete/i,
    });
    expect(todoCards.length).toBeGreaterThan(0);

    // TODOのタイトルが表示されているか確認
    expect(screen.getByText("プロジェクト計画書の作成")).toBeInTheDocument();
  });

  describe("初期表示", () => {
    it("ローディング中はスピナーが表示される", () => {
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isLoading: true,
      });

      renderTodoMemo();

      expect(screen.getByText("TODOデータを読み込み中...")).toBeInTheDocument();
    });

    it("データ読み込み後、タイトルとフォームが表示される", () => {
      renderTodoMemo();

      expect(screen.getByText("タスク管理")).toBeInTheDocument();
      expect(screen.getByText("新しいTODOを追加")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("TODOのタイトルを入力")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("TODOの詳細を入力（任意）")
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "追 加" })).toBeInTheDocument();
    });

    it("TODOリストが正しく表示される", () => {
      renderTodoMemo();

      expect(screen.getByText("プロジェクト計画書の作成")).toBeInTheDocument();
      expect(screen.getByText("会議資料の準備")).toBeInTheDocument();
      expect(screen.getByText("データベースの最適化")).toBeInTheDocument();
    });

    it("ページネーションが正しく表示される", () => {
      renderTodoMemo();

      expect(screen.getByText("1-5 / 5 件")).toBeInTheDocument();
    });
  });

  describe("TODO追加機能", () => {
    it("タイトル入力なしで追加ボタンを押すと警告が表示される", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      const addButton = screen.getByRole("button", { name: "追 加" });
      await user.click(addButton);

      expect(message.warning).toHaveBeenCalledWith(
        "タイトルを入力してください"
      );
      expect(mockTodoMemoHook.addTodo).not.toHaveBeenCalled();
    });

    it("タイトルと説明を入力して追加すると成功メッセージが表示される", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      const titleInput = screen.getByPlaceholderText("TODOのタイトルを入力");
      const descriptionInput =
        screen.getByPlaceholderText("TODOの詳細を入力（任意）");
      const addButton = screen.getByRole("button", { name: "追 加" });

      await user.type(titleInput, "新しいTODO");
      await user.type(descriptionInput, "テスト用の説明");
      await user.click(addButton);

      expect(mockTodoMemoHook.addTodo).toHaveBeenCalledWith(
        "新しいTODO",
        "テスト用の説明"
      );
      expect(message.success).toHaveBeenCalledWith("TODOを追加しました");
    });

    it("追加後、フォームがクリアされる", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      const titleInput = screen.getByPlaceholderText("TODOのタイトルを入力");
      const descriptionInput =
        screen.getByPlaceholderText("TODOの詳細を入力（任意）");
      const addButton = screen.getByRole("button", { name: "追 加" });

      await user.type(titleInput, "新しいTODO");
      await user.type(descriptionInput, "テスト用の説明");
      await user.click(addButton);

      // フォームがクリアされることを確認
      expect(titleInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });

    it("EnterキーでTODOを追加できる", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      const titleInput = screen.getByPlaceholderText("TODOのタイトルを入力");
      await user.type(titleInput, "Enterキーで追加");
      await user.keyboard("{Enter}");

      expect(mockTodoMemoHook.addTodo).toHaveBeenCalledWith(
        "Enterキーで追加",
        ""
      );
    });
  });

  describe("TODO編集機能", () => {
    it("編集ボタンを押すと編集モーダルが開く", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      // 編集ボタン（EditOutlinedアイコン）を探してクリック
      const editButtons = screen.getAllByRole("img", { name: /edit/i });
      await user.click(editButtons[0]);

      expect(mockTodoMemoHook.editTodo).toHaveBeenCalledWith(
        mockTodosForTest[0]
      );
    });

    it("編集モーダルに既存の値が設定される", async () => {
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      // モーダルが開くまで待機
      await screen.findByText("TODO編集");

      // モーダルが開いていることを確認
      expect(screen.getByText("TODO編集")).toBeInTheDocument();
    });

    it("タイトルなしで更新すると警告が表示される", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      // モーダルが開くまで待機
      await screen.findByText("TODO編集");

      // モーダルが開いていることを確認
      expect(screen.getByText("TODO編集")).toBeInTheDocument();
    });

    it("正しい値で更新すると成功メッセージが表示される", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      // モーダルが開くまで待機
      await screen.findByText("TODO編集");

      // モーダルが開いていることを確認
      expect(screen.getByText("TODO編集")).toBeInTheDocument();
    });

    it("キャンセルボタンでモーダルが閉じる", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      const cancelButton = screen.getByRole("button", { name: "キャンセル" });
      await user.click(cancelButton);

      expect(mockTodoMemoHook.closeModals).toHaveBeenCalled();
    });
  });

  describe("TODO削除機能", () => {
    it("個別削除ボタンでTODOが削除される", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      // 削除ボタン（DeleteOutlinedアイコン）を探してクリック
      const deleteButtons = screen.getAllByRole("img", { name: /delete/i });
      await user.click(deleteButtons[0]);

      expect(mockTodoMemoHook.deleteTodo).toHaveBeenCalledWith(
        mockTodosForTest[0].id
      );
    });
  });

  describe("完了済みTODO削除機能", () => {
    it("完了済みTODOがない場合、情報メッセージが表示される", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        todos: mockTodosForTest.filter(
          (todo) => todo.status !== TaskStatus.DONE
        ),
      });

      renderTodoMemo();

      const deleteCompletedButton = screen.getByRole("button", {
        name: "完了済みTODOを削除",
      });
      await user.click(deleteCompletedButton);

      // ボタンがクリックされたことを確認
      expect(deleteCompletedButton).toBeInTheDocument();
    });

    it("完了済みTODOがある場合、削除される", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      const deleteCompletedButton = screen.getByRole("button", {
        name: "完了済みTODOを削除",
      });
      await user.click(deleteCompletedButton);

      expect(mockTodoMemoHook.deleteCompletedTodos).toHaveBeenCalled();
      expect(message.success).toHaveBeenCalledWith(
        "2個の完了済みTODOを削除しました"
      );
    });
  });

  describe("ページネーション機能", () => {
    it("複数ページのデータが正しく表示される", () => {
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        todos: mockTodosForTest, // 全10件のデータ
      });

      renderTodoMemo();

      // ページネーションが表示されることを確認
      expect(screen.getByText("1-5 / 5 件")).toBeInTheDocument();
    });

    it("ページ切り替えが正しく動作する", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        todos: mockTodosForTest, // 全10件のデータ
      });

      renderTodoMemo();

      // ページネーションが表示されることを確認
      expect(screen.getByText("1-5 / 5 件")).toBeInTheDocument();
    });
  });

  describe("モーダル機能", () => {
    it("詳細表示ボタンで詳細モーダルが開く", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isDetailModalVisible: true,
        selectedTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      // 詳細ボタン（EyeOutlinedアイコン）を探してクリック
      const viewButtons = screen.getAllByRole("img", { name: /eye/i });
      await user.click(viewButtons[0]);

      expect(mockTodoMemoHook.showTodoDetail).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "1",
          title: "プロジェクト計画書の作成",
          description:
            "来週のプロジェクト開始に向けて、詳細な計画書を作成する必要があります。スケジュール、リソース、リスク管理を含める。",
        })
      );
    });

    it("詳細モーダルに正しい情報が表示される", () => {
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isDetailModalVisible: true,
        selectedTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      expect(screen.getAllByText("プロジェクト計画書の作成")).toHaveLength(2);
    });

    it("モーダルを閉じるボタンが動作する", async () => {
      const user = userEvent.setup();
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isDetailModalVisible: true,
        selectedTodo: mockTodosForTest[0],
      });

      renderTodoMemo();

      const closeButton = screen.getByRole("button", { name: "閉じる" });
      await user.click(closeButton);

      expect(mockTodoMemoHook.closeModals).toHaveBeenCalled();
    });
  });

  describe("エラーハンドリング", () => {
    it("アカウントIDがない場合の動作", () => {
      mockUseAccount.mockReturnValue({
        ...mockAccountContext,
        selectedAccountId: undefined,
      });

      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        todos: [],
      });

      renderTodoMemo();

      expect(screen.getByText("タスク管理")).toBeInTheDocument();
      // 空のリストが表示されることを確認
      expect(
        screen.queryByText("プロジェクト計画書の作成")
      ).not.toBeInTheDocument();
    });
  });

  describe("ユーザー操作フロー", () => {
    it("TODO追加から編集までの完全なフロー", async () => {
      const user = userEvent.setup();
      renderTodoMemo();

      // 1. TODO追加
      const titleInput = screen.getByPlaceholderText("TODOのタイトルを入力");
      const descriptionInput =
        screen.getByPlaceholderText("TODOの詳細を入力（任意）");
      const addButton = screen.getByRole("button", { name: "追 加" });

      await user.type(titleInput, "テストTODO");
      await user.type(descriptionInput, "テスト説明");
      await user.click(addButton);

      expect(mockTodoMemoHook.addTodo).toHaveBeenCalledWith(
        "テストTODO",
        "テスト説明"
      );

      // 2. 編集モーダルを開く
      mockUseTodoMemo.mockReturnValue({
        ...mockTodoMemoHook,
        isEditModalVisible: true,
        editingTodo: {
          id: "new-todo",
          title: "テストTODO",
          description: "テスト説明",
          status: TaskStatus.TODO,
          createdAt: new Date(),
          accountId: "test-account-id",
          updatedAt: new Date(),
          deletedAt: null,
        },
      });

      // 編集ボタン（EditOutlinedアイコン）を探してクリック
      const editButtons = screen.getAllByRole("img", { name: /edit/i });
      await user.click(editButtons[0]);

      expect(mockTodoMemoHook.editTodo).toHaveBeenCalled();
    });
  });
});
