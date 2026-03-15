"use client";

import dynamic from "next/dynamic";
import type { ComponentType, CSSProperties } from "react";

const Player = dynamic(
  () => import("@remotion/player").then((m) => m.Player),
  { ssr: false }
);

interface BentoPlayerProps {
  component: ComponentType;
  durationInFrames: number;
  compositionWidth?: number;
  compositionHeight?: number;
  style?: CSSProperties;
}

export default function BentoPlayer({
  component,
  durationInFrames,
  compositionWidth = 400,
  compositionHeight = 310,
  style,
}: BentoPlayerProps) {
  return (
    <div>
      <Player
        component={component}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        durationInFrames={durationInFrames}
        fps={30}
        loop={true}
        autoPlay={true}
        controls={false}
        style={
          style ?? {
            width: "100%",
            aspectRatio: `${compositionWidth}/${compositionHeight}`,
          }
        }
      />
    </div>
  );
}
