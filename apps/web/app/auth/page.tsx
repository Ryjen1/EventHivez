"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authSchema } from "@/lib/validation";
export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = authSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/home');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-dark-deep relative flex items-center justify-center">
      {/* Back Button */}
      <Button
        type="button"
        variant="secondary"
        onClick={handleGoBack}
        className="absolute top-10 left-16 text-sm py-2"
      >
        <Image src="/icons/arrow-left.svg" alt="Back" width={16} height={16} />
        Back
      </Button>

      {/* Auth Card */}
      <div className="w-[360px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_0_rgba(124,58,237,0.2)] p-8 flex flex-col items-center">
        {/* Logo Container */}
        <div className="mb-6">
          <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 shadow-[2px_2px_0_rgba(124,58,237,0.3)]">
            <Image
              src="/logo/eventhivez logo.svg"
              alt="EventHivez"
              width={70}
              height={24}
            />
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-1 text-white">
          Welcome to EventHivez
        </h1>
        <p className="text-xs text-white/50 mb-6 text-center">
          Please sign in or sign up below.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <label className="text-sm font-medium block mb-2 text-white/70">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
className="w-full bg-white/5 border border-white/20 rounded-full px-4 py-2 mb-4 outline-none text-white placeholder:text-white/30 focus:border-accent transition-colors"
          />

          {error && <p className="text-xs text-red-500 mb-3 mt-1">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="
              w-full
              bg-accent
              hover:bg-accent-hover
              rounded-full
              py-2
              font-medium
              flex items-center justify-center gap-2
              mb-4
              mt-3
              border border-accent/50
              shadow-[0_4px_0_rgba(124,58,237,0.4)]
              active:translate-y-[2px]
              active:shadow-[0_2px_0_rgba(124,58,237,0.4)]
              transition
              text-white
            "
          >
            Continue with Email
            <Image src="/icons/arrow-right.svg" alt="Arrow" width={16} height={16} />
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/api/auth/google")}
            className="
              w-full
              bg-white/10
              text-white
              rounded-full
              py-2
              flex items-center justify-center gap-2
              mb-3
              border border-white/20
              shadow-[0_4px_0_rgba(255,255,255,0.1)]
              active:translate-y-[2px]
              active:shadow-[0_2px_0_rgba(255,255,255,0.1)]
              hover:bg-white/15
              transition
            "
          >
            <Image src="/icons/google.svg" alt="Google" width={16} height={16} />
            Sign in with Google
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/api/auth/apple")}
            className="
              w-full
              bg-white/10
              text-white
              rounded-full
              py-2
              flex items-center justify-center gap-2
              border border-white/20
              shadow-[0_4px_0_rgba(255,255,255,0.1)]
              active:translate-y-[2px]
              active:shadow-[0_2px_0_rgba(255,255,255,0.1)]
              hover:bg-white/15
              transition
            "
          >
            <Image src="/icons/apple.svg" alt="Apple" width={16} height={16} />
            Sign in with Apple
          </Button>
        </form>
      </div>
    </main>
  );
}
