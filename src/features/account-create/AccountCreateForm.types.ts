import { AccountType } from "@/types/account.types";

export interface AccountCreateFormProps {
  onAccountCreate?: (account: AccountType) => void;
}

export interface AccountCreateFormData {
  accountName: string;
  icon: string;
}

export interface AccountCreateFormState {
  loading: boolean;
  error: string | null;
  formData: AccountCreateFormData;
}
