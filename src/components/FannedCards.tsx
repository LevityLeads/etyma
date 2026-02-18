"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const CARD_WIDTH = 380;
const OVERLAP = 70;
const INACTIVE_SCALE = 0.92;
const INACTIVE_BRIGHTNESS = 0.45;
const SWIPE_THRESHOLD = 40;

export interface FannedCardItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface FannedCardsProps {
  items: FannedCardItem[];
  variant?: "dark" | "light";
  accentColor?: string;
}

function Card({ item, isActive, variant, accentColor }: { item: FannedCardItem; isActive: boolean; variant: "dark" | "light"; accentColor: string }) {
  const isDark = variant === "dark";
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 ${
        isActive
          ? `border-2 shadow-lg`
          : `border ${isDark ? "border-white/5" : "border-black/5"}`
      }`}
      style={{
        backgroundColor: isDark ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.95)",
        borderColor: isActive ? `${accentColor}66` : undefined,
        boxShadow: isActive ? `0 0 40px ${accentColor}15` : undefined,
      }}
    >
      <h3
        className="text-xl md:text-2xl font-bold mb-4"
        style={{ color: isDark ? "#FDF6EC" : "#1A1612" }}
      >
        {item.title}
      </h3>
      <div
        className="leading-relaxed text-sm md:text-base flex-1"
        style={{ color: isDark ? "#C4BAB0" : "#8A8078" }}
      >
        {item.content}
      </div>
    </div>
  );
}

export default function FannedCards({ items, variant = "dark", accentColor = "#D4930D" }: FannedCardsProps) {
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const prev = useCallback(() => setActive((a) => Math.max(a - 1, 0)), []);
  const next = useCallback(() => setActive((a) => Math.min(a + 1, items.length - 1)), [items.length]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next();
      if (dx > 0) prev();
      isDragging.current = false;
    }
  }, [next, prev]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="relative">
      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActive(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === active ? accentColor : variant === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
              transform: i === active ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Cards container */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{ height: 320 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="absolute inset-0 flex items-stretch justify-center">
          {items.map((item, i) => {
            const offset = i - active;
            const isCardActive = i === active;
            const absOffset = Math.abs(offset);
            const xPos = offset * (CARD_WIDTH - OVERLAP);

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer select-none"
                style={{ width: `${CARD_WIDTH}px`, height: "100%", top: 0 }}
                animate={{
                  x: xPos,
                  scale: isCardActive ? 1 : INACTIVE_SCALE,
                  zIndex: 10 - absOffset,
                  opacity: absOffset > 2 ? 0 : 1,
                  filter: isCardActive ? "brightness(1)" : `brightness(${INACTIVE_BRIGHTNESS})`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => setActive(i)}
              >
                <Card item={item} isActive={isCardActive} variant={variant} accentColor={accentColor} />
              </motion.div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        {active > 0 && (
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200"
            style={{
              backgroundColor: variant === "dark" ? "rgba(10,10,10,0.8)" : "rgba(255,255,255,0.9)",
              border: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: variant === "dark" ? "#FDF6EC" : "#1A1612",
            }}
          >
            ‹
          </button>
        )}
        {active < items.length - 1 && (
          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200"
            style={{
              backgroundColor: variant === "dark" ? "rgba(10,10,10,0.8)" : "rgba(255,255,255,0.9)",
              border: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: variant === "dark" ? "#FDF6EC" : "#1A1612",
            }}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
