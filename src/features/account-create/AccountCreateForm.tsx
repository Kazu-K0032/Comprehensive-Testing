"use client";

import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Space,
  Alert,
  Avatar,
  message,
} from "antd";
import { SaveOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { useAccount } from "@/contexts/account-context";
import { useAccountCreateForm } from "./useAccountCreateForm";
import { AccountCreateFormProps } from "./AccountCreateForm.types";
import {
  FORM_STYLES,
  AVATAR_SIZE,
  MESSAGES,
  PLACEHOLDERS,
  LABELS,
} from "./AccountCreateForm.constants";
import { getRandomIconUrl, validateFormData } from "./AccountCreateForm.utils";

const { Content } = Layout;
const { Title } = Typography;

export function AccountCreateForm({ onAccountCreate }: AccountCreateFormProps) {
  const { setSelectedAccountId } = useAccount();
  const { state, updateFormData, createAccount } = useAccountCreateForm();

  // アイコンURLを自動生成
  const handleGenerateIcon = () => {
    const randomIcon = getRandomIconUrl();
    updateFormData("icon", randomIcon);
    message.success(MESSAGES.SUCCESS.ICON_GENERATED);
  };

  const handleCreate = async () => {
    const validation = validateFormData(state.formData);
    if (!validation.isValid) {
      message.warning(validation.errors[0]);
      return;
    }

    try {
      const account = await createAccount();
      message.success(MESSAGES.SUCCESS.ACCOUNT_CREATED);
      setSelectedAccountId(account.id);
      if (onAccountCreate) {
        onAccountCreate(account);
      }
    } catch (error) {
      console.error("アカウント作成エラー:", error);
    }
  };

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
    <Content style={FORM_STYLES.container}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>
            <div style={FORM_STYLES.title}>
              <UserOutlined />
              <span>新規アカウント作成</span>
            </div>
          </Title>
        </div>

        <Form layout="vertical" style={FORM_STYLES.form}>
          <Form.Item label={LABELS.ACCOUNT_NAME} required>
            <Input
              value={state.formData.accountName}
              onChange={(e) => updateFormData("accountName", e.target.value)}
              placeholder={PLACEHOLDERS.ACCOUNT_NAME}
              disabled={state.loading}
            />
          </Form.Item>

          <Form.Item label={LABELS.ICON_URL}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={state.formData.icon}
                onChange={(e) => updateFormData("icon", e.target.value)}
                placeholder={PLACEHOLDERS.ICON_URL}
                disabled={state.loading}
                style={{ flex: 1 }}
              />
              <Button
                icon={<LinkOutlined />}
                onClick={handleGenerateIcon}
                disabled={state.loading}
                type="default"
              >
                {LABELS.GENERATE_BUTTON}
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item label={LABELS.ICON_PREVIEW}>
            <div style={FORM_STYLES.iconPreview}>
              <Space direction="vertical">
                <Avatar src={state.formData.icon} size={AVATAR_SIZE} />
                <span>{PLACEHOLDERS.PREVIEW}</span>
              </Space>
            </div>
          </Form.Item>

          <Form.Item style={FORM_STYLES.button}>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleCreate}
              loading={state.loading}
              size="large"
            >
              {LABELS.CREATE_BUTTON}
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Content>
  );
}
