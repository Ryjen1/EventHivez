"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/discover", label: "Explore" },
    { href: "/create-event", label: "Create Event" },
    { href: "/pricing", label: "Pricing" },
    { href: "/help", label: "Help" },
  ];

  return (
    <nav className="w-full border-b border-white/5 bg-dark-deep/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1240px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <Image
            src="/logo/eventhivez logo.svg"
            alt="EventHivez"
            width={160}
            height={36}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-white bg-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-dark-deep/98 backdrop-blur-xl z-40 px-4 pt-6">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-accent/20 border border-accent/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-4" />
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-center text-white/60 hover:text-white text-base font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-center bg-accent hover:bg-accent-hover text-white text-base font-semibold rounded-xl transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
