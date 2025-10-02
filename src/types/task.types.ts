import { Task, TaskStatus } from "@prisma/client";

// タスク関連の型定義
export type TaskType = Task;

// タスク作成リクエスト
export interface CreateTaskRequest {
  title: string;
  description: string;
  accountId: string;
}

// タスク更新リクエスト
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

// API通信の型定義
export interface BaseApiResponse {
  success: boolean;
  error?: string;
}

// タスク一覧取得API
export interface GetTasksResponse extends BaseApiResponse {
  tasks: TaskType[];
}

// タスク作成API
export interface CreateTaskResponse extends BaseApiResponse {
  task: TaskType;
}

// タスク更新API
export interface UpdateTaskResponse extends BaseApiResponse {
  task: TaskType;
}

// タスク削除API
export interface DeleteTaskResponse extends BaseApiResponse {
  // 削除成功時は特にデータなし
}
