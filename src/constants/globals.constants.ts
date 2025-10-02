import { Inter } from "next/font/google";

export const SITE_TITLE = "Task App";
export const SITE_DESCRIPTION = "Webアプリ勉強用";

export const INTER_FONT = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// コンテンツ設定
export type ContentKey =
  (typeof CONTENT_CONFIG)[keyof typeof CONTENT_CONFIG]["key"];
export type ContentPath =
  (typeof CONTENT_CONFIG)[keyof typeof CONTENT_CONFIG]["path"];
export const CONTENT_CONFIG = {
  HOME: {
    key: "home",
    name: "ホーム",
    path: "/",
  },
  ACCOUNTS: {
    key: "accounts",
    name: "アカウント管理",
    path: "/accounts",
  },
  NEW: {
    key: "new",
    name: "新規アカウント作成",
    path: "/accounts/new",
  },
  TASKS: {
    key: "tasks",
    name: "タスク管理",
    path: "/tasks",
  },
} as const;
