// デフォルトアイコンURLのリスト
export const DEFAULT_ICON_URLS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default6",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default7",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default8",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default9",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default10",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default11",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default12",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default13",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default14",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default15",
];

// フォームのスタイル定数
export const FORM_STYLES = {
  container: {
    padding: "24px",
    maxWidth: 800,
    margin: "0 auto",
  },
  form: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },
  iconPreview: {
    textAlign: "center" as const,
  },
  button: {
    textAlign: "center" as const,
  },
} as const;

// アバターサイズ
export const AVATAR_SIZE = 64;

// メッセージ定数
export const MESSAGES = {
  SUCCESS: {
    ACCOUNT_CREATED: "アカウントが作成されました",
    ICON_GENERATED: "アイコンURLを生成しました",
  },
  WARNING: {
    ACCOUNT_NAME_REQUIRED: "アカウント名を入力してください",
  },
  ERROR: {
    ACCOUNT_CREATE_FAILED: "アカウントの作成に失敗しました",
  },
} as const;

// プレースホルダー定数
export const PLACEHOLDERS = {
  ACCOUNT_NAME: "アカウント名を入力",
  ICON_URL: "アイコンURLを入力",
  PREVIEW: "プレビュー",
} as const;

// ラベル定数
export const LABELS = {
  ACCOUNT_NAME: "アカウント名",
  ICON_URL: "アイコンURL",
  ICON_PREVIEW: "アイコンプレビュー",
  CREATE_BUTTON: "アカウントを作成",
  GENERATE_BUTTON: "自動生成",
} as const;
