"use client";

import { useState, useEffect, useCallback } from "react";

interface FreighterWallet {
  isConnected: boolean;
  publicKey: string | null;
  network: string | null;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

declare global {
  interface Window {
    freighter?: {
      isConnected(): Promise<boolean>;
      getPublicKey(): Promise<string>;
      getNetwork(): Promise<string>;
      getNetworkPassphrase(): Promise<string>;
      signTransaction(xdr: string, opts?: { networkPassphrase?: string }): Promise<string>;
    };
  }
}

export function useFreighterWallet(): FreighterWallet {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFreighterInstalled = typeof window !== "undefined" && !!window.freighter;

  // Check if already connected on mount
  useEffect(() => {
    if (!isFreighterInstalled) return;

    const checkConnection = async () => {
      try {
        const connected = await window.freighter!.isConnected();
        if (connected) {
          const key = await window.freighter!.getPublicKey();
          const net = await window.freighter!.getNetwork();
          setPublicKey(key);
          setNetwork(net);
        }
      } catch {
        // Freighter not connected yet
      }
    };

    checkConnection();
  }, [isFreighterInstalled]);

  const connect = useCallback(async () => {
    if (!isFreighterInstalled) {
      setError("Freighter wallet is not installed. Install it from freighter.app");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const key = await window.freighter!.getPublicKey();
      const net = await window.freighter!.getNetwork();
      setPublicKey(key);
      setNetwork(net);

      // Store connection in localStorage
      localStorage.setItem("eventhivez_wallet", key);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [isFreighterInstalled]);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setNetwork(null);
    localStorage.removeItem("eventhivez_wallet");
  }, []);

  return {
    isConnected: !!publicKey,
    publicKey,
    network,
    isLoading,
    error,
    connect,
    disconnect,
  };
}
