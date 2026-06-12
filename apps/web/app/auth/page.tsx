"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFreighterWallet } from "@/hooks/useFreighterWallet";

export default function AuthPage() {
  const router = useRouter();
  const { isConnected, publicKey, isLoading, error, connect } = useFreighterWallet();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleConnect = async () => {
    await connect();
  };

  const handleContinue = () => {
    setIsRedirecting(true);
    router.push("/home");
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <main className="min-h-screen bg-dark-deep relative flex items-center justify-center px-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleGoBack}
        className="absolute top-10 left-6 md:left-16 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>

      {/* Auth Card */}
      <div className="w-full max-w-[400px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 md:p-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo/eventhivez logo.svg"
            alt="EventHivez"
            width={160}
            height={36}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-white text-center">
          Connect Your Wallet
        </h1>
        <p className="text-sm text-white/40 mb-8 text-center max-w-[280px]">
          Sign in with your Stellar wallet to create events, buy tickets, and manage your profile.
        </p>

        {/* Wallet Status */}
        {isConnected && publicKey ? (
          /* Connected state */
          <div className="w-full space-y-4">
            <div className="w-full bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium text-sm">Connected</p>
                <p className="text-white/40 text-xs font-mono truncate">{truncateAddress(publicKey)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isRedirecting}
              className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] disabled:opacity-50"
            >
              {isRedirecting ? "Redirecting..." : "Continue to EventHivez"}
            </button>
          </div>
        ) : (
          /* Not connected state */
          <div className="w-full space-y-3">
            {/* Freighter */}
            <button
              type="button"
              onClick={handleConnect}
              disabled={isLoading}
              className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] disabled:opacity-50 border border-accent/50"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
              )}
              {isLoading ? "Connecting..." : "Connect Freighter Wallet"}
            </button>

            {/* Albedo */}
            <button
              type="button"
              onClick={handleConnect}
              disabled={isLoading}
              className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-3 border border-white/10 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Connect Albedo Wallet
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="w-full mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-xs text-center">{error}</p>
          </div>
        )}

        {/* Install hint */}
        {!isConnected && (
          <p className="text-white/20 text-xs text-center mt-6">
            Don&apos;t have a wallet?{" "}
            <a
              href="https://freighter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:underline"
            >
              Install Freighter
            </a>{" "}
            — it takes 30 seconds.
          </p>
        )}

        {/* Stellar badge */}
        <div className="flex items-center gap-2 mt-6 text-white/20 text-xs">
          <Image src="/icons/stellar-logo.svg" alt="Stellar" width={14} height={14} className="opacity-40" />
          <span>Powered by Stellar Network</span>
        </div>
      </div>
    </main>
  );
}
