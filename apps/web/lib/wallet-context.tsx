"use client";

import React, { createContext, useContext } from "react";
import { useFreighterWallet, type FreighterWallet } from "@/hooks/useFreighterWallet";

const WalletCtx = createContext<FreighterWallet | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useFreighterWallet();
  return <WalletCtx.Provider value={wallet}>{children}</WalletCtx.Provider>;
};

export function useWallet(): FreighterWallet {
  const ctx = useContext(WalletCtx);
  if (!ctx) {
    throw new Error("useWallet must be used inside <WalletProvider>");
  }
  return ctx;
}
