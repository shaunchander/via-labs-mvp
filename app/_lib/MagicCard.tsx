"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MagicCard({
  children,
  className,
  glowColor = "rgba(148,163,184,0.07)",
  onMouseEnter,
  onMouseLeave,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative border border-white/10 rounded-3xl overflow-hidden transition-colors duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovered(true); onMouseEnter?.(); }}
      onMouseLeave={() => { setHovered(false); onMouseLeave?.(); }}
      style={{
        background: hovered
          ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 70%), #0f0f0f`
          : "#0f0f0f",
      }}
    >
      {children}
    </div>
  );
}
