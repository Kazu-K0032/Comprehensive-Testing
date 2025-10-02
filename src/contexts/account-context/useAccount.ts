"use client";

import { useContext } from "react";
import { AccountContext } from "./context";

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccountはAccountProvider内で使用する必要があります");
  }
  return context;
}
