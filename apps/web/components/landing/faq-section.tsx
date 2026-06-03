"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I create an event?",
    a: 'Click "Create Event", fill in your details, set ticket prices (or make it free), and publish. Your event page goes live instantly with a shareable link.',
  },
  {
    q: "What are the fees?",
    a: "Free events are always 100% free. Paid events have a 5% platform fee on the Starter plan, and 0% on the Pro plan ($29/mo). Stellar network fees are less than $0.01.",
  },
  {
    q: "How do payouts work?",
    a: "Payouts are sent in USDC on the Stellar network directly to your wallet. Starter plan payouts settle in 24-48 hours. Pro plan payouts are instant.",
  },
  {
    q: "What wallets are supported?",
    a: "We support Freighter, Albedo, and Lobstr — any Stellar-compatible wallet. Buyers can pay with XLM or USDC.",
  },
  {
    q: "What happens if an event is cancelled?",
    a: "Funds are held in an on-chain escrow smart contract. If an organiser cancels, refunds are processed automatically to all ticket holders.",
  },
  {
    q: "Is there support for organisers?",
    a: "Yes. All organisers get community support. Pro plan members get priority email support and a dedicated account manager.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full bg-dark-deep border-t border-white/5 py-24">
      <div className="max-w-[800px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent-light text-sm font-semibold tracking-wider uppercase">FAQs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-accent/10 transition-colors">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-white font-medium text-base pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-white/40 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
