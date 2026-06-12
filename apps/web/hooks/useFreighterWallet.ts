"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isConnected as freighterIsConnected,
  isAllowed as freighterIsAllowed,
  setAllowed as freighterSetAllowed,
  requestAccess as freighterRequestAccess,
  getAddress as freighterGetAddress,
  signTransaction as freighterSignTransaction,
  getNetwork as freighterGetNetwork,
  getNetworkPassphrase as freighterGetNetworkPassphrase,
} from "@stellar/freighter-api";

interface WalletState {
  publicKey: string | null;
  isConnecting: boolean;
  isFreighterAvailable: boolean;
  network: string | null;
  error: string | null;
}

export interface FreighterWallet extends WalletState {
  connect: () => Promise<string | null>;
  disconnect: () => void;
  signAndSubmit: (unsignedXdr: string) => Promise<string>;
}

const DISCONNECTED_KEY = "eventhivez:wallet:disconnected";
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

export function useFreighterWallet(): FreighterWallet {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnecting: false,
    isFreighterAvailable: false,
    network: null,
    error: null,
  });

  // Detect Freighter + auto-restore session
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const conn = await freighterIsConnected();
        if (cancelled) return;
        const available = !conn.error && conn.isConnected;
        setState((s) => ({ ...s, isFreighterAvailable: !!available }));

        // Auto-reconnect if user previously authorized and hasn't explicitly disconnected
        if (available && !localStorage.getItem(DISCONNECTED_KEY)) {
          const allowed = await freighterIsAllowed();
          if (!allowed.error && allowed.isAllowed) {
            const addr = await freighterGetAddress();
            if (!addr.error && addr.address) {
              const net = await freighterGetNetwork();
              setState((s) => ({
                ...s,
                publicKey: addr.address,
                network: net.error ? null : net.network,
              }));
            }
          }
        }
      } catch (err) {
        console.warn("[useFreighterWallet] init error:", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const connect = useCallback(async (): Promise<string | null> => {
    setState((s) => ({ ...s, isConnecting: true, error: null }));
    try {
      const conn = await freighterIsConnected();
      if (conn.error || !conn.isConnected) {
        const msg = "Freighter wallet not detected. Install it from freighter.app";
        setState((s) => ({ ...s, error: msg, isConnecting: false }));
        return null;
      }

      // Request access if not already granted
      const allowed = await freighterIsAllowed();
      if (allowed.error || !allowed.isAllowed) {
        const set = await freighterSetAllowed();
        if (set.error) {
          setState((s) => ({ ...s, error: set.error, isConnecting: false }));
          return null;
        }
      }

      const addr = await freighterRequestAccess();
      if (addr.error || !addr.address) {
        setState((s) => ({
          ...s,
          error: addr.error || "Failed to read address from Freighter",
          isConnecting: false,
        }));
        return null;
      }

      const net = await freighterGetNetwork();

      localStorage.removeItem(DISCONNECTED_KEY);
      setState((s) => ({
        ...s,
        publicKey: addr.address,
        network: net.error ? null : net.network,
        isConnecting: false,
        error: null,
      }));
      return addr.address;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Wallet connection failed";
      setState((s) => ({ ...s, error: msg, isConnecting: false }));
      return null;
    }
  }, []);

  const disconnect = useCallback(() => {
    localStorage.setItem(DISCONNECTED_KEY, "1");
    setState((s) => ({ ...s, publicKey: null, network: null, error: null }));
  }, []);

  const signAndSubmit = useCallback(
    async (unsignedXdr: string): Promise<string> => {
      if (!state.publicKey) throw new Error("Wallet not connected");

      const passphrase = await freighterGetNetworkPassphrase();
      const networkPassphrase = passphrase.error ? NETWORK_PASSPHRASE : passphrase.networkPassphrase;

      const signed = await freighterSignTransaction(unsignedXdr, {
        networkPassphrase,
        address: state.publicKey,
      });

      if (signed.error) throw new Error(signed.error);
      if (!signed.signedTxXdr) throw new Error("Freighter returned no signed transaction");

      // Submit to Horizon
      const horizon = new (await import("@stellar/stellar-sdk")).Horizon.Server(HORIZON_URL);
      const tx = (await import("@stellar/stellar-sdk")).TransactionBuilder.fromXDR(
        signed.signedTxXdr,
        networkPassphrase
      );
      const res = await horizon.submitTransaction(tx as never);
      return res.hash;
    },
    [state.publicKey]
  );

  return { ...state, connect, disconnect, signAndSubmit };
}
