"use client";

import { useEffect, useState } from "react";
import { Guestbook } from "./guestbook";

const baseVisitorCount = 438;
const counterEndpoint =
  "https://api.counterapi.dev/v1/amalia-madden-physics-site/visitors";

function counterValue(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as {
    count?: unknown;
    value?: unknown;
    data?: { count?: unknown; up_count?: unknown };
  };
  const value =
    response.count ??
    response.value ??
    response.data?.count ??
    response.data?.up_count;

  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function storageScope() {
  const firstPathSegment = window.location.pathname.split("/").filter(Boolean)[0];
  return `${window.location.hostname}:${firstPathSegment ?? "root"}`;
}

export function VisitorTracker() {
  const [visitorCount, setVisitorCount] = useState(baseVisitorCount);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const scope = storageScope();
    const countedKey = `amalia-visitor-counted-v1:${scope}`;
    const localCountKey = `amalia-visitor-fallback-v1:${scope}`;
    const hasCounted = window.localStorage.getItem(countedKey) === "yes";
    const isLocal = ["localhost", "127.0.0.1", "::1"].includes(
      window.location.hostname,
    );

    const applyFallbackCounter = () => {
      if (!active) return;
      const savedCount = Number(window.localStorage.getItem(localCountKey) ?? 0);
      const nextCount = savedCount + (hasCounted ? 0 : 1);
      window.localStorage.setItem(localCountKey, String(nextCount));
      window.localStorage.setItem(countedKey, "yes");
      setVisitorCount(baseVisitorCount + Math.max(nextCount, 1));
      setReady(true);
    };

    if (isLocal) {
      applyFallbackCounter();
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4500);
    const endpoint = hasCounted ? counterEndpoint : `${counterEndpoint}/up`;

    fetch(endpoint, { cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Counter service unavailable");
        return response.json() as Promise<unknown>;
      })
      .then((payload) => {
        if (!active) return;
        const count = counterValue(payload);
        if (count === null) throw new Error("Counter response was invalid");
        window.localStorage.setItem(countedKey, "yes");
        setVisitorCount(baseVisitorCount + count);
        setReady(true);
      })
      .catch(applyFallbackCounter)
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const digits = String(visitorCount).padStart(7, "0").split("");

  return (
    <section className="visitor-zone" id="visitors" aria-labelledby="visitor-title">
      <p id="visitor-title">you are visitor number:</p>
      <div
        className="hit-counter"
        aria-live="polite"
        aria-label={`Visitor number ${visitorCount}`}
        data-ready={ready}
      >
        {digits.map((digit, index) => (
          <span key={`${index}-${digit}`}>{digit}</span>
        ))}
      </div>
      <Guestbook />
      <div className="guestbook-row">
        <span aria-hidden="true">☼</span>
        thanks for stopping by!
        <span aria-hidden="true">☼</span>
      </div>
    </section>
  );
}
