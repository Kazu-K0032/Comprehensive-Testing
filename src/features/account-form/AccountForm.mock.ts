import { AccountType } from "@/types/account.types";

export const mockAccountData: AccountType = {
  id: "clx1admin123456789",
  accountName: "管理者アカウント",
  icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
  deletedAt: null,
};

export const mockAccountFormData = {
  accountName: "管理者アカウント",
  icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
};
