"use client";

import { createContext } from "react";
import { AccountContextType } from "./types";

/**
 * アカウントコンテキスト
 */
export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);
