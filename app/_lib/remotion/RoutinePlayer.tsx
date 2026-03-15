"use client";

import dynamic from "next/dynamic";
import { RoutineComposition } from "./RoutineComposition";

// Avoid SSR — Remotion Player uses browser APIs
const Player = dynamic(
  () => import("@remotion/player").then((m) => m.Player),
  { ssr: false }
);

// Composition dimensions — wider than tall to fit the card preview
const COMP_WIDTH = 400;
const COMP_HEIGHT = 310;
const FPS = 30;
// 8s total: AM holds ~3.7s, switch, PM holds ~3.7s
const DURATION_IN_FRAMES = 240;

export default function RoutinePlayer() {
  return (
    // Absolutely fills the card — sits behind content, no height contribution
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        // Fade into card edges on all sides
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%), " +
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%), " +
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskComposite: "source-in",
      }}
    >
      <Player
        component={RoutineComposition}
        compositionWidth={COMP_WIDTH}
        compositionHeight={COMP_HEIGHT}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        loop
        autoPlay
        controls={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
