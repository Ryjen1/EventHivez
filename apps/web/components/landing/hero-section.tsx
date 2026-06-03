"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-dark-deep overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-dark/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-light/5 rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center max-w-[1200px] mx-auto px-4 py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent-light">Powered by Stellar Blockchain</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6"
          >
            <span className="text-white">Host Events.</span>
            <br />
            <span className="bg-gradient-to-r from-accent-light via-accent to-accent-dark bg-clip-text text-transparent">
              Sell Tickets. Get Paid.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 text-center max-w-[600px] mb-10"
          >
            The decentralized event platform where you keep 100% of your revenue.
            Instant USDC payouts on Stellar — no middlemen, no waiting.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Link
              href="/create-event"
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-2xl text-center transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
            >
              Create Your Event — Free
            </Link>
            <Link
              href="/discover"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium rounded-2xl text-center transition-colors hover:bg-white/10"
            >
              Explore Events
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: "< 5s", label: "Settlement" },
              { value: "0%", label: "Platform Fee" },
              { value: "USDC", label: "Instant Payouts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-deep to-transparent" />
      </div>
    </div>
  );
}
