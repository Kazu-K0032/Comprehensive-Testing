"use client";

import { Suspense } from "react";
import { Layout, Typography, Button, Space, Alert, Spin } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useAccount } from "@/contexts/account-context";
import { CONTENT_CONFIG } from "@/constants/globals.constants";
import { useAccountForm } from "./useAccountForm";
import { AccountInfo, AccountEditForm } from "./components";
import { AccountFormProps } from "./AccountForm.types";

const { Content } = Layout;
const { Title } = Typography;

export function AccountForm({ onAccountUpdate }: AccountFormProps) {
  const { selectedAccountId } = useAccount();

  const {
    account,
    state,
    toggleEdit,
    updateFormData,
    saveAccount,
    cancelEdit,
  } = useAccountForm(selectedAccountId);

  if (!selectedAccountId) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>アカウント情報を読み込み中...</div>
      </div>
    );
  }

  /**
   * 保存処理
   */
  const handleSave = async () => {
    await saveAccount();
    if (account && onAccountUpdate) {
      onAccountUpdate(account);
    }
  };

  if (state.loading && !account) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>アカウント情報を読み込み中...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <Alert
        message="エラー"
        description={state.error}
        type="error"
        showIcon
        style={{ margin: 16 }}
      />
    );
  }

  return (
    <Content style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>
            <UserOutlined /> {CONTENT_CONFIG.ACCOUNTS.name}
          </Title>
        </div>

        {account && !state.isEditing && (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AccountInfo account={account} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={toggleEdit}
              >
                編集
              </Button>
            </div>
          </>
        )}

        {state.isEditing && (
          <div style={{ textAlign: "center" }}>
            <AccountEditForm
              formData={state.formData}
              loading={state.loading}
              onUpdateFormData={updateFormData}
              onSave={handleSave}
              onCancel={cancelEdit}
            />
          </div>
        )}
      </Space>
    </Content>
  );
}
