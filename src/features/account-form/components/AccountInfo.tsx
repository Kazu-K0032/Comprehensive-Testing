"use client";

import { Avatar, Typography, Card, Space } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { AccountType } from "@/types/account.types";
import { formatDate } from "@/utils/date.utils";

const { Title, Text } = Typography;

interface AccountInfoProps {
  account: AccountType;
}

export function AccountInfo({ account }: AccountInfoProps) {
  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar src={account.icon} size={40} />
          <Title level={4} style={{ margin: 0 }}>
            {account.accountName}
          </Title>
        </div>
      }
      style={{ marginBottom: 16, textAlign: "center", minHeight: "200px" }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Text strong>アカウントID:</Text>
          <br />
          <Text code>{account.id}</Text>
        </div>

        <div>
          <Text strong>作成日時:</Text>
          <br />
          <Space>
            <CalendarOutlined />
            <Text>{formatDate(account.createdAt, { format: "datetime" })}</Text>
          </Space>
        </div>

        <div>
          <Text strong>最終更新:</Text>
          <br />
          <Space>
            <CalendarOutlined />
            <Text>{formatDate(account.updatedAt, { format: "datetime" })}</Text>
          </Space>
        </div>
      </Space>
    </Card>
  );
}
