"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function PricingSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="pricing" className="w-full bg-dark-deep border-t border-white/5 py-24 select-none">
      <div className="w-full max-w-[1240px] mx-auto px-4 flex flex-col items-center">
        {/* Pill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-accent/10 border border-accent/20 text-accent-light px-6 py-2 rounded-full text-sm mb-12 font-medium"
        >
          Pricing Plans
        </motion.div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-center w-full">
          {/* Free Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full max-w-[400px] bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col relative overflow-hidden hover:border-white/20 transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px]" />

            <div className="flex-1 relative z-10">
              <h3 className="font-light text-white/60 mb-6 text-lg">
                EventHivez Basic
              </h3>
              <h2 className="text-4xl font-bold mb-2 text-white">Free</h2>
              <div className="text-4xl font-bold mb-8 text-white">
                $0{" "}
                <span className="text-lg font-normal text-white/40">
                  / forever
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                <ListItem text="Unlimited free events" />
                <ListItem text="Up to 3 paid events/month" />
                <ListItem text="5% platform fee" />
                <ListItem text="Basic analytics" />
                <ListItem text="Standard payouts (24-48hrs)" />
              </ul>
            </div>

            <div className="relative z-10 flex justify-center">
              <Button
                className="w-[215px] h-[50px] bg-white/10 border border-white/20 hover:bg-white/15 text-white rounded-xl transition-all duration-200"
                backgroundColor="bg-transparent"
                textColor="text-white"
                shadowColor="transparent"
              >
                <span className="text-sm font-semibold">Get Started</span>
              </Button>
            </div>
          </motion.div>

          {/* Pro Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full max-w-[400px] bg-gradient-to-b from-accent/20 to-accent/5 rounded-3xl p-8 border border-accent/30 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/20 rounded-full blur-[80px]" />

            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="font-light text-white/80 mb-6 text-lg">
                EventHivez Pro
              </h3>
              <h2 className="text-4xl font-bold mb-2 text-white">Pro</h2>
              <div className="text-4xl font-bold mb-8 text-white">
                $29{" "}
                <span className="text-lg font-normal text-white/50">
                  / month
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                <ListItem text="Unlimited paid events" />
                <ListItem text="0% platform fee" />
                <ListItem text="Advanced analytics" />
                <ListItem text="Custom branding" />
                <ListItem text="Instant payouts (12h)" />
              </ul>
            </div>

            <div className="relative z-10 flex justify-center">
              <Button
                className="w-[215px] h-[50px] bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200"
                backgroundColor="bg-accent"
                textColor="text-white"
                shadowColor="rgba(124,58,237,0.4)"
              >
                <span className="text-sm font-semibold">Get Started — $29</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-white/80">
      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
        <Image
          src="/icons/checkmark-circle-01.svg"
          alt=""
          width={14}
          height={14}
          className="invert"
        />
      </div>
      <span className="text-base">{text}</span>
    </li>
  );
}
