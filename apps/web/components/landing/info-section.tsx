import Image from "next/image";
import { Button } from "@/components/ui/button";

export function InfoSection() {
  return (
    <section className="w-full bg-dark-deep pt-[60px] md:pt-[102px] pb-24 text-white select-none overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 flex flex-col items-center">
        {/* How EventHivez Works */}
        <div className="bg-accent/10 border border-accent/20 text-accent-light px-6 py-2 rounded-full text-sm mb-12 font-medium">
          How EventHivez Works
        </div>

        <div className="flex flex-wrap justify-center items-start gap-6 mb-16">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-accent/20 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={`/images/How-it-works-${n}.png`}
                alt={`Step ${n}`}
                width={371}
                height={420}
                className="relative object-cover rounded-xl w-full max-w-[371px] h-auto"
              />
            </div>
          ))}
        </div>

        <div className="mb-24 md:mb-48 -mt-10 relative z-10">
          <Button
            style={{ width: "215px", height: "56px" }}
            backgroundColor="bg-accent"
            textColor="text-white"
            shadowColor="rgba(124,58,237,0.3)"
          >
            <span className="font-semibold">Discover Events</span>
            <Image src="/icons/earth.svg" alt="Earth" width={20} height={20} className="invert" />
          </Button>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center w-full">
          <div className="bg-accent/10 border border-accent/20 text-accent-light px-6 py-2 rounded-full text-sm mb-12 font-medium">
            What is EventHivez?
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <div className="relative w-[300px] h-[296px] md:w-[352px] md:h-[348px]">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-[60px]" />
                <Image
                  src="/images/AboutUs.png"
                  alt="About EventHivez"
                  fill
                  className="relative object-contain"
                />
              </div>
            </div>

            <div className="flex-1 text-left px-4 md:px-0">
              <h2 className="font-bold text-[28px] md:text-[32px] leading-[32px] mt-8 mb-6 text-center lg:text-left">
                About EventHivez
              </h2>

              <div className="text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] font-normal text-white/70 space-y-6 text-center lg:text-left">
                <p>
                  EventHivez is a decentralized event ticketing platform built on the
                  Stellar network. We enable organizers, creators, and communities to
                  host events, sell tickets, and receive instant USDC payouts — with
                  zero platform fees on the Pro plan.
                </p>
                <p>
                  Our Soroban smart contracts handle ticket sales, escrow, refunds,
                  and settlement on-chain — giving organizers full control and
                  attendees full transparency.
                </p>
                <p>
                  No middlemen. No waiting for payouts. Just you and your community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
