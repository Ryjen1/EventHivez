"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useId } from "react";

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-dark-deep select-none overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-dark/20 via-dark-deep to-dark-deep" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full">
        <Navbar />

        <div className="flex-1 flex flex-col items-center pt-[80px] md:pt-[100px] w-full max-w-[1200px] mx-auto px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
          >
            <Image
              src="/icons/stellar-logo.svg"
              alt="Stellar"
              width={16}
              height={16}
            />
            <span className="text-sm font-medium text-white/80">Built on Stellar</span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-[64px] leading-tight md:leading-[72px] font-bold text-center text-white mb-6 md:mb-8"
          >
            <div>Your Events.</div>
            <div className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
              Your Community. Your Rules.
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 text-center max-w-[700px] mb-10 px-4"
          >
            Host events, sell tickets, and get paid instantly in USDC.
            No middlemen. No delays. Just you and your community.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-20 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link href="/create-event" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-[220px] h-[56px] bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200"
                backgroundColor="bg-accent"
                textColor="text-white"
                shadowColor="rgba(124,58,237,0.4)"
              >
                <span>Create Your Event</span>
                <Image
                  src="/icons/arrow-up-right-01.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              </Button>
            </Link>

            <Link href="/discover" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-[180px] h-[56px] bg-white/5 border border-white/20 hover:bg-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-200"
                backgroundColor="bg-transparent"
                textColor="text-white"
                shadowColor="transparent"
              >
                <span>Explore Events</span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
          >
            {[
              { value: "5s", label: "Settlement Time" },
              { value: "0%", label: "Platform Fees" },
              { value: "USDC", label: "Instant Payouts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-[900px] flex justify-center mt-auto opacity-60"
          >
            <Image
              src="/images/World.png"
              alt="Global Events"
              width={900}
              height={450}
              className="object-contain brightness-75 contrast-125"
              priority
            />

            {/* Floating tooltips */}
            <Tooltip
              icon="/icons/Organizers.png"
              label="Organizers"
              className="md:top-[30%] top-[20%] left-[57%] md:left-[58%]"
              delay={0.6}
            />
            <Tooltip
              icon="/icons/MeetUps.png"
              label="Meetups"
              className="md:top-[70%] top-[60%] -right-[4%] md:-right-[2%]"
              delay={0.8}
            />
            <Tooltip
              icon="/icons/Party.png"
              label="Parties"
              className="bottom-[35%] left-[2%] md:left-[11%]"
              delay={1.0}
            />
            <Tooltip
              icon="/icons/Events.png"
              label="Events"
              className="md:top-[5%] -top-[10%] right-[5%] md:right-[15%]"
              delay={1.2}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Tooltip({
  icon,
  className,
  delay,
  label,
}: {
  icon: string;
  className: string;
  delay: number;
  label: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  return (
    <motion.div
      id={id}
      initial={{ scale: 0, opacity: 0, y: 10 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      animate={isFocused ? { scale: 1.1 } : {}}
      whileHover={{ scale: 1.1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`absolute ${className} z-20 w-16 h-16 md:w-24 md:h-24 outline-none focus-visible:ring-4 focus-visible:ring-accent rounded-full cursor-pointer transition-shadow`}
      tabIndex={0}
      role="tooltip"
      aria-label={label}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Image
        src={icon}
        alt=""
        fill
        className="drop-shadow-xl object-contain"
      />
    </motion.div>
  );
}
