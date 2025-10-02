"use client";

import { Select, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Account } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccountId?: string;
  onAccountSelect: (accountId: string) => void;
  loading?: boolean;
  error?: string | null;
}

export function AccountSelector({
  accounts,
  selectedAccountId,
  onAccountSelect,
  loading = false,
  error = null,
}: AccountSelectorProps) {
  const router = useRouter();

  const options = [
    ...accounts.map((account) => ({
      value: account.id,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar size="small" src={account.icon} />
          <span>{account.accountName}</span>
        </div>
      ),
    })),
    {
      value: "add-new",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#1890ff",
          }}
        >
          <PlusOutlined />
          <span>新規アカウントを追加</span>
        </div>
      ),
    },
  ];

  const handleChange = (value: string) => {
    if (value === "add-new") {
      router.push("/accounts/new");
    } else {
      onAccountSelect(value);
    }
  };

  if (error) {
    return (
      <Select
        disabled
        placeholder="エラー: アカウントの読み込みに失敗"
        style={{ minWidth: 200 }}
      />
    );
  }

  // ローディング中の表示を改善
  if (loading && accounts.length === 0) {
    return (
      <Select
        disabled
        placeholder="読み込み中..."
        style={{ minWidth: 200 }}
        loading={true}
      />
    );
  }

  return (
    <Select
      value={selectedAccountId}
      onChange={handleChange}
      placeholder={loading ? "読み込み中..." : "アカウントを選択"}
      loading={loading}
      disabled={loading}
      style={{ minWidth: 200 }}
      options={options}
      showSearch={false}
      allowClear={false}
    />
  );
}
