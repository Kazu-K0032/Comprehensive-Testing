"use client";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
}

export function LoadingSpinner({
  size = "large",
  tip = "読み込み中...",
  spinning = true,
  children,
}: LoadingSpinnerProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (children) {
    return (
      <Spin spinning={spinning} tip={tip} indicator={antIcon}>
        {children}
      </Spin>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Spin size={size} indicator={antIcon} />
      <span style={{ color: "#666", fontSize: "14px" }}>{tip}</span>
    </div>
  );
}

// 全画面ローディング用のコンポーネント
export function FullPageLoading({ tip = "アプリを読み込み中..." }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Spin
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
      <span style={{ color: "#666", fontSize: "16px" }}>{tip}</span>
    </div>
  );
}
