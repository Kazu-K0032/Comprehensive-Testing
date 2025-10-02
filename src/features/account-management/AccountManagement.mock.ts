import { Account } from "@prisma/client";

export const mockAccounts: Account[] = [
  {
    id: "1",
    accountName: "管理者アカウント",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: "2",
    accountName: "一般ユーザー",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    createdAt: new Date("2024-01-15T00:00:00Z"),
    updatedAt: new Date("2024-01-15T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: "3",
    accountName: "ゲストアカウント",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
    createdAt: new Date("2024-02-01T00:00:00Z"),
    updatedAt: new Date("2024-02-01T00:00:00Z"),
    deletedAt: null,
  },
];
