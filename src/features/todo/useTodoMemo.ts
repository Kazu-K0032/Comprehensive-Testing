"use client";

import { useState, useEffect, useCallback } from "react";
import { taskClient } from "@/lib/client-task";
import { TodoItem } from "./TodoMemo.types";

interface UseTodoMemoProps {
  accountId?: string;
}

export const useTodoMemo = ({ accountId }: UseTodoMemoProps = {}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  // タスクの読み込み
  const loadTodos = useCallback(async () => {
    if (!accountId) {
      setTodos([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const fetchedTodos = await taskClient.getTasksByAccount(accountId);
      setTodos(fetchedTodos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "タスクの読み込みに失敗しました"
      );
      console.error("タスク読み込みエラー:", err);
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  /**
   * 新しいTODOを追加する
   * @param title TODOのタイトル
   * @param description TODOの詳細
   */
  const addTodo = async (title: string, description: string) => {
    if (!accountId) return;

    try {
      const newTodo = await taskClient.createTask({
        title,
        description,
        accountId,
      });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "タスクの作成に失敗しました"
      );
      console.error("タスク作成エラー:", err);
    }
  };

  /**
   * TODOの完了状態を切り替える
   * @param id TODOのID
   */
  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const newStatus = todo.status === "DONE" ? "TODO" : "DONE";
      const updatedTodo = await taskClient.updateTask(id, {
        status: newStatus,
      });

      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "タスクの更新に失敗しました"
      );
      console.error("タスク更新エラー:", err);
    }
  };

  /**
   * TODOを削除する
   * @param id TODOのID
   */
  const deleteTodo = async (id: string) => {
    try {
      await taskClient.deleteTask(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "タスクの削除に失敗しました"
      );
      console.error("タスク削除エラー:", err);
    }
  };

  /**
   * 完了済みTODOを削除する
   */
  const deleteCompletedTodos = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.status === "DONE");
      await Promise.all(
        completedTodos.map((todo) => taskClient.deleteTask(todo.id))
      );
      setTodos(todos.filter((todo) => todo.status !== "DONE"));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "完了済みタスクの削除に失敗しました"
      );
      console.error("完了済みタスク削除エラー:", err);
    }
  };

  /**
   * TODOの詳細を表示する
   * @param todo TODOアイテム
   */
  const showTodoDetail = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsDetailModalVisible(true);
  };

  /**
   * TODOを編集する
   * @param todo TODOアイテム
   */
  const editTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    setIsEditModalVisible(true);
  };

  /**
   * TODOを更新する
   * @param id TODOのID
   * @param title 新しいタイトル
   * @param description 新しい詳細
   */
  const updateTodo = async (id: string, title: string, description: string) => {
    try {
      const updatedTodo = await taskClient.updateTask(id, {
        title,
        description,
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setIsEditModalVisible(false);
      setEditingTodo(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "タスクの更新に失敗しました"
      );
      console.error("タスク更新エラー:", err);
    }
  };

  /**
   * モーダルを閉じる
   */
  const closeModals = () => {
    setIsDetailModalVisible(false);
    setIsEditModalVisible(false);
    setSelectedTodo(null);
    setEditingTodo(null);
  };

  return {
    todos,
    isLoading,
    error,
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
    refetch: loadTodos,
  };
};
