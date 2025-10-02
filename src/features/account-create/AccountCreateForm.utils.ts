import { DEFAULT_ICON_URLS } from "./AccountCreateForm.constants";
import { AccountCreateFormData } from "./AccountCreateForm.types";

/**
 * ランダムなアイコンURLを取得
 * @returns ランダムに選択されたアイコンURL
 */
export function getRandomIconUrl(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_ICON_URLS.length);
  return DEFAULT_ICON_URLS[randomIndex];
}

/**
 * アカウント名のバリデーション
 * @param accountName アカウント名
 * @returns バリデーション結果
 */
export function validateAccountName(accountName: string): {
  isValid: boolean;
  error?: string;
} {
  if (!accountName || !accountName.trim()) {
    return {
      isValid: false,
      error: "アカウント名は必須です",
    };
  }

  if (accountName.trim().length < 2) {
    return {
      isValid: false,
      error: "アカウント名は2文字以上で入力してください",
    };
  }

  if (accountName.trim().length > 50) {
    return {
      isValid: false,
      error: "アカウント名は50文字以内で入力してください",
    };
  }

  return { isValid: true };
}

/**
 * アイコンURLのバリデーション
 * @param iconUrl アイコンURL
 * @returns バリデーション結果
 */
export function validateIconUrl(iconUrl: string): {
  isValid: boolean;
  error?: string;
} {
  if (!iconUrl || !iconUrl.trim()) {
    return {
      isValid: false,
      error: "アイコンURLは必須です",
    };
  }

  // URL形式の基本的なチェック
  try {
    new URL(iconUrl);
  } catch {
    return {
      isValid: false,
      error: "有効なURLを入力してください",
    };
  }

  return { isValid: true };
}

/**
 * フォームデータのバリデーション
 * @param formData フォームデータ
 * @returns バリデーション結果
 */
export function validateFormData(formData: AccountCreateFormData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const accountNameValidation = validateAccountName(formData.accountName);
  if (!accountNameValidation.isValid) {
    errors.push(accountNameValidation.error!);
  }

  const iconUrlValidation = validateIconUrl(formData.icon);
  if (!iconUrlValidation.isValid) {
    errors.push(iconUrlValidation.error!);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * フォームデータをリセット用の初期値に変換
 * @returns リセット用のフォームデータ
 */
export function getResetFormData(): AccountCreateFormData {
  return {
    accountName: "",
    icon: getRandomIconUrl(),
  };
}

/**
 * アイコンURLが有効かどうかをチェック
 * @param url チェックするURL
 * @returns 有効なURLかどうか
 */
export function isValidIconUrl(url: string): boolean {
  if (!url || !url.trim()) return false;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * アイコンURLを正規化（前後の空白を削除）
 * @param url 正規化するURL
 * @returns 正規化されたURL
 */
export function normalizeIconUrl(url: string): string {
  return url.trim();
}
