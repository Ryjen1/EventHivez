"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface ContractEvent {
  type: string;
  contractId: string;
  topics: string[];
  data: unknown;
  ledger: number;
  timestamp: number;
}

interface UseContractEventsOptions {
  enabled?: boolean;
  onEvent?: (event: ContractEvent) => void;
}

export function useContractEvents(options: UseContractEventsOptions = {}) {
  const { enabled = true, onEvent } = options;
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const addEvent = useCallback(
    (event: ContractEvent) => {
      setEvents((prev) => [event, ...prev].slice(0, 100)); // Keep last 100
      onEvent?.(event);
    },
    [onEvent]
  );

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource("/api/events/stream");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ContractEvent;
        addEvent(data);
      } catch {
        // Ignore malformed events
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
      // Reconnect after 3 seconds
      setTimeout(() => {
        if (eventSourceRef.current === eventSource) {
          eventSourceRef.current = null;
        }
      }, 3000);
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [enabled, addEvent]);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    events,
    isConnected,
    clearEvents,
  };
}
