"use client";

import { useState, useCallback, useMemo } from "react";
import { Typography, message } from "antd";
import { useAccount } from "@/contexts/account-context";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CONTENT_CONFIG } from "@/constants/globals.constants";
import { useTodoMemo } from "./useTodoMemo";
import { TodoItem } from "./TodoMemo.types";
import {
  AddForm,
  TodoList,
  ActionButtons,
  TodoPagination,
  TodoDetailModal,
  TodoEditModal,
} from "./components";

const { Title } = Typography;

export function TodoMemo() {
  const { selectedAccountId } = useAccount();
  const {
    todos,
    isLoading,
    selectedTodo,
    editingTodo,
    isDetailModalVisible,
    isEditModalVisible,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
    showTodoDetail,
    editTodo,
    updateTodo,
    closeModals,
  } = useTodoMemo({ accountId: selectedAccountId });

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleAddTodo = useCallback(() => {
    if (!newTitle.trim()) {
      message.warning("タイトルを入力してください");
      return;
    }
    addTodo(newTitle, newDescription);
    setNewTitle("");
    setNewDescription("");
    message.success("TODOを追加しました");
  }, [newTitle, newDescription, addTodo, setNewTitle, setNewDescription]);

  const handleEditTodo = useCallback(
    (todo: TodoItem) => {
      setEditTitle(todo.title);
      setEditDescription(todo.description);
      editTodo(todo);
    },
    [setEditTitle, setEditDescription, editTodo]
  );

  const handleUpdateTodo = useCallback(() => {
    if (!editTitle.trim()) {
      message.warning("タイトルを入力してください");
      return;
    }
    if (editingTodo) {
      updateTodo(editingTodo.id, editTitle, editDescription);
      message.success("TODOを更新しました");
    }
  }, [editTitle, editDescription, editingTodo, updateTodo]);

  const handleDeleteCompleted = useCallback(() => {
    const completedCount = todos.filter(
      (todo) => todo.status === "DONE"
    ).length;
    if (completedCount === 0) {
      message.info("完了済みのTODOがありません");
      return;
    }
    deleteCompletedTodos();
    message.success(`${completedCount}個の完了済みTODOを削除しました`);
  }, [todos, deleteCompletedTodos]);

  // ページネーション用のデータ計算
  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
      startIndex,
      endIndex,
      currentTodos: todos.slice(startIndex, endIndex),
      totalPages: Math.ceil(todos.length / pageSize),
    };
  }, [currentPage, pageSize, todos]);

  const { currentTodos } = paginationData;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 完了済みTODO数の計算
  const completedCount = todos.filter((todo) => todo.status === "DONE").length;

  // ローディング中の表示
  if (isLoading) {
    return (
      <div
        style={{
          padding: "24px",
          width: "100%",
          margin: "0 auto",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Title level={2}>{CONTENT_CONFIG.TASKS.name}</Title>
        <LoadingSpinner tip="TODOデータを読み込み中..." />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        width: "100%",
        margin: "0 auto",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Title level={2}>{CONTENT_CONFIG.TASKS.name}</Title>

      <AddForm
        newTitle={newTitle}
        newDescription={newDescription}
        setNewTitle={setNewTitle}
        setNewDescription={setNewDescription}
        handleAddTodo={handleAddTodo}
      />

      <ActionButtons
        completedCount={completedCount}
        onDeleteCompleted={handleDeleteCompleted}
      />

      <TodoPagination
        current={currentPage}
        total={todos.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <TodoList
        todos={currentTodos}
        onToggle={toggleTodo}
        onView={showTodoDetail}
        onEdit={handleEditTodo}
        onDelete={deleteTodo}
      />

      <TodoDetailModal
        visible={isDetailModalVisible}
        todo={selectedTodo}
        onClose={closeModals}
      />

      <TodoEditModal
        visible={isEditModalVisible}
        editTitle={editTitle}
        editDescription={editDescription}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        onClose={closeModals}
        onUpdate={handleUpdateTodo}
      />
    </div>
  );
}
