"use client";

import { Layout, Typography, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "@/contexts/account-context";
import { AccountManagement } from "@/features/account-management";
import { SITE_TITLE, CONTENT_CONFIG } from "@/constants/globals.constants";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  title?: string;
}

export function Header({ title = SITE_TITLE }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedAccountId, setSelectedAccountId } = useAccount();

  // ナビゲーションアイテムの設定
  const navigationItems = [
    {
      key: CONTENT_CONFIG.TASKS.path,
      label: CONTENT_CONFIG.TASKS.name,
    },
    {
      key: CONTENT_CONFIG.ACCOUNTS.path,
      label: CONTENT_CONFIG.ACCOUNTS.name,
    },
  ];

  /**
   * メニューアイテムのクリックハンドラー
   * @param key クリックされたメニューアイテムのキー
   */
  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  /**
   * アカウント選択ハンドラー
   * @param accountId 選択されたアカウントID
   */
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  return (
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
          {title}
        </Title>

        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={navigationItems}
          onClick={handleMenuClick}
          style={{
            border: "none",
            background: "transparent",
            minWidth: "300px",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <AccountManagement
          selectedAccountId={selectedAccountId}
          onAccountSelect={handleAccountSelect}
        />
      </div>
    </AntHeader>
  );
}
