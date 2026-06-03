"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Create Events",
    description: "Launch your event page in minutes. Set ticket tiers, pricing, and capacity — all from one dashboard.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    title: "Sell Tickets",
    description: "Accept payments in USDC on Stellar. Buyers pay from any Stellar wallet — Freighter, Albedo, or Lobstr.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    title: "Get Paid Instantly",
    description: "No 30-day holds. Revenue settles in USDC on Stellar in under 5 seconds — straight to your wallet.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "On-Chain Escrow",
    description: "Funds are held in Soroban smart contracts until the event completes. Automatic refunds if cancelled.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Link your Stellar wallet (Freighter, Albedo, or Lobstr) to get started.",
  },
  {
    step: "02",
    title: "Create Event",
    description: "Set up your event page with ticket tiers, pricing, and capacity limits.",
  },
  {
    step: "03",
    title: "Share & Sell",
    description: "Share your event link. Attendees buy tickets with USDC — payments go directly to your wallet.",
  },
];

export function InfoSection() {
  return (
    <section className="w-full bg-dark-deep border-t border-white/5">
      {/* Features */}
      <div className="max-w-[1240px] mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-semibold tracking-wider uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Everything you need to host events
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            From creation to payout — EventHivez handles the entire ticketing lifecycle on-chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-accent/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light mb-4 group-hover:bg-accent/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-[1240px] mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-semibold tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Three steps to your first event
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-white/[0.03] mb-4">{step.step}</div>
              <h3 className="text-white font-semibold text-xl mb-2 -mt-8">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-8 border-t border-dashed border-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/create-event"
            className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            Start Hosting Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
