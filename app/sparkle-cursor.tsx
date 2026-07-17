"use client";

import { useEffect, useRef } from "react";

export function SparkleCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const canAnimate = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !trail || !canAnimate) return;

    document.body.classList.add("sparkle-cursor-on");
    let lastSparkle = 0;
    let hueIndex = 0;

    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.visible = "true";

      if (reduceMotion || event.timeStamp - lastSparkle < 36) return;
      lastSparkle = event.timeStamp;

      const sparkle = document.createElement("span");
      const size = 8 + Math.random() * 11;
      sparkle.className = "cursor-sparkle";
      sparkle.textContent = hueIndex % 3 === 0 ? "+" : "✦";
      sparkle.style.left = `${event.clientX + (Math.random() - 0.5) * 18}px`;
      sparkle.style.top = `${event.clientY + (Math.random() - 0.5) * 18}px`;
      sparkle.style.fontSize = `${size}px`;
      sparkle.style.color = `hsl(${(hueIndex * 49) % 360} 88% 55%)`;
      trail.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 680);
      hueIndex += 1;
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      document.body.classList.remove("sparkle-cursor-on");
      window.removeEventListener("pointermove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      trail.replaceChildren();
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="custom-cursor" ref={cursorRef} data-visible="false">
        <span>✦</span>
      </div>
      <div className="sparkle-trail" ref={trailRef} />
    </div>
  );
}
