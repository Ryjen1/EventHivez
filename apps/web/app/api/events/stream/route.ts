import { NextRequest } from "next/server";

const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";
const EVENT_REGISTRY_ID = "CAINMUMZ4EQFTDB2BSUKB7R5NEE5ICOJTYQBDNCHXUTQLSX6LUR2OOO4";
const TICKET_PAYMENT_ID = "CCHSOPWFFUTDAAHUGLDPSSA4WFMRSD4A32R73PQHMLAZMXKABY7ENA4J";

interface SorobanEvent {
  type: string;
  contractId: string;
  topics: string[];
  data: unknown;
  ledger: number;
  timestamp: number;
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: SorobanEvent) => {
        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      let lastLedger = 0;

      const pollEvents = async () => {
        try {
          const response = await fetch(SOROBAN_RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getLatestLedger",
            }),
          });

          const result = await response.json();
          const currentLedger = result.result?.sequence || 0;

          if (currentLedger > lastLedger && lastLedger > 0) {
            const eventsResponse = await fetch(SOROBAN_RPC_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: 2,
                method: "getEvents",
                params: {
                  startLedger: lastLedger + 1,
                  endLedger: currentLedger,
                  filters: [
                    {
                      type: "contract",
                      contractIds: [EVENT_REGISTRY_ID, TICKET_PAYMENT_ID],
                    },
                  ],
                },
              }),
            });

            const eventsResult = await eventsResponse.json();
            const events = eventsResult.result?.events || [];

            for (const event of events) {
              sendEvent({
                type: event.type || "unknown",
                contractId: event.contractId || "",
                topics: event.topic?.map((t: { toString: () => string }) => t.toString()) || [],
                data: event.value || null,
                ledger: event.ledger || currentLedger,
                timestamp: Date.now(),
              });
            }
          }

          lastLedger = currentLedger;
        } catch {
          // Silently handle polling errors
        }
      };

      // Initial ledger fetch
      await pollEvents();

      // Poll every 5 seconds (Stellar ledger time ~5s)
      const interval = setInterval(pollEvents, 5000);

      // Send heartbeat every 15s to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
