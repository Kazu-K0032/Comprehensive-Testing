import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/globals.css";
import { Metadata } from "next";
import { GlobalLayout } from "@/contexts/account-context/GlobalLayout";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  INTER_FONT,
} from "@/constants/globals.constants";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${INTER_FONT.variable} antialiased`}>
        <AntdRegistry>
          <GlobalLayout>{children}</GlobalLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
