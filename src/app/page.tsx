"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CONTENT_CONFIG } from "@/constants/globals.constants";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(CONTENT_CONFIG.TASKS.path);
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666",
      }}
    >
      リダイレクト中...
    </div>
  );
}
