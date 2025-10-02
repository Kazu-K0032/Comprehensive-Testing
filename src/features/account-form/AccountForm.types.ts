import { AccountType } from "@/types/account.types";

export interface AccountFormProps {
  accountId?: string;
  onAccountUpdate?: (account: AccountType) => void;
  onAccountCreate?: (
    account: Omit<AccountType, "id" | "createdAt" | "updatedAt">
  ) => void;
}

export interface AccountFormData {
  accountName: string;
  icon: string;
}

export interface AccountFormState {
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  formData: AccountFormData;
}
