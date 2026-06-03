"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for getting started with your first events.",
    features: [
      "Unlimited free events",
      "Up to 3 paid events/month",
      "5% platform fee on paid tickets",
      "Basic event analytics",
      "Standard payouts (24-48h)",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For organizers who want zero fees and instant payouts.",
    features: [
      "Unlimited paid events",
      "0% platform fee",
      "Advanced analytics dashboard",
      "Custom event branding",
      "Instant USDC payouts",
      "Priority support",
      "Series passes & season tickets",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-dark-deep border-t border-white/5 py-24">
      <div className="max-w-[1240px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-semibold tracking-wider uppercase">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Simple, transparent pricing
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            Start free. Upgrade when you need zero fees and instant payouts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col relative overflow-hidden ${
                plan.highlighted
                  ? "bg-gradient-to-b from-accent/20 to-accent/5 border-2 border-accent/40"
                  : "bg-white/[0.03] border border-white/[0.06]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-white/60 text-sm font-medium mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/30 text-sm mb-8">{plan.description}</p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/auth"
                className={`mt-8 block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-accent hover:bg-accent-hover text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
