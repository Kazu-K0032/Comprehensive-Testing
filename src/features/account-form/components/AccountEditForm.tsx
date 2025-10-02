"use client";

import { Form, Input, Button, Space, Avatar, message } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { AccountFormData } from "../AccountForm.types";

interface AccountEditFormProps {
  formData: AccountFormData;
  loading: boolean;
  onUpdateFormData: (field: keyof AccountFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AccountEditForm({
  formData,
  loading,
  onUpdateFormData,
  onSave,
  onCancel,
}: AccountEditFormProps) {
  const handleSave = () => {
    if (!formData.accountName.trim()) {
      message.warning("アカウント名を入力してください");
      return;
    }
    onSave();
  };

  return (
    <Form
      layout="vertical"
      style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
    >
      <Form.Item label="アカウント名" required>
        <Input
          value={formData.accountName}
          onChange={(e) => onUpdateFormData("accountName", e.target.value)}
          placeholder="アカウント名を入力"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item label="アイコンURL">
        <Input
          value={formData.icon}
          onChange={(e) => onUpdateFormData("icon", e.target.value)}
          placeholder="アイコンURLを入力"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item label="アイコンプレビュー">
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical">
            <Avatar src={formData.icon} size={64} />
            <span>現在のアイコン</span>
          </Space>
        </div>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
          >
            保存
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={onCancel}
            disabled={loading}
          >
            キャンセル
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
