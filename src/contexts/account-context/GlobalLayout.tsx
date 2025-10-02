"use client";

import { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Header } from "@/app/Header";
import { AccountProvider } from "./AccountProvider";

const { Content } = Layout;

interface GlobalLayoutProps {
  children: React.ReactNode;
}

/**
 * グローバルレイアウト
 * @param children 子要素
 * @returns
 */
function GlobalLayoutContent({ children }: GlobalLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <AccountProvider>
      <Suspense
        fallback={
          <Layout style={{ minHeight: "100vh" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Spin size="large" />
                <div style={{ marginTop: "16px", fontSize: "16px" }}>
                  読み込み中...
                </div>
              </div>
            </div>
          </Layout>
        }
      >
        <GlobalLayoutContent>{children}</GlobalLayoutContent>
      </Suspense>
    </AccountProvider>
  );
}
