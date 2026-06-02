"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-dark-deep border-t border-white/5 pt-16 pb-10 relative overflow-hidden text-white select-none">
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] pointer-events-none opacity-10">
        <Image
          src="/images/World1.png"
          alt=""
          fill
          className="object-contain object-bottom"
        />
      </div>

      <div className="w-full max-w-[1240px] mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Branding */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo/eventhivez logo footer.svg"
              alt="EventHivez Logo"
              width={180}
              height={54}
              className="w-auto h-10"
            />
            <p className="text-white/40 text-sm max-w-[280px]">
              Decentralized event ticketing on Stellar. Instant payouts, zero middlemen.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-3">
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Platform</h4>
              <Link href="/discover" className="text-white/40 hover:text-white transition-colors text-sm">
                Discover Events
              </Link>
              <Link href="/create-event" className="text-white/40 hover:text-white transition-colors text-sm">
                Create Event
              </Link>
              <Link href="/pricing" className="text-white/40 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link href="/help" className="text-white/40 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Connect</h4>
              <a href="https://x.com/eventhivez" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">
                X (Twitter)
              </a>
              <a href="https://instagram.com/eventhivez" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="mailto:hello@eventhivez.com" className="text-white/40 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">
                Stellar Network
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2026 EventHivez. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/help" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</Link>
            <Link href="/help" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
