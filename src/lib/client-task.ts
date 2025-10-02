import {
  TaskType,
  CreateTaskRequest,
  UpdateTaskRequest,
  GetTasksResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
} from "@/types/task.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class TaskClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getTasksByAccount(accountId: string): Promise<TaskType[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/tasks?accountId=${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetTasksResponse = await response.json();
      return data.tasks;
    } catch (error) {
      console.error("タスク取得エラー:", error);
      throw error;
    }
  }

  async createTask(input: CreateTaskRequest): Promise<TaskType> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CreateTaskResponse = await response.json();
      return data.task;
    } catch (error) {
      console.error("タスク作成エラー:", error);
      throw error;
    }
  }

  async updateTask(id: string, input: UpdateTaskRequest): Promise<TaskType> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UpdateTaskResponse = await response.json();
      return data.task;
    } catch (error) {
      console.error("タスク更新エラー:", error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("タスク削除エラー:", error);
      throw error;
    }
  }
}

export const taskClient = new TaskClient();
