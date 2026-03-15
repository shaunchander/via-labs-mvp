"use client";

import BentoPlayer from "./BentoPlayer";
import { RoutineComposition } from "./RoutineComposition";

export default function RoutinePlayer() {
  return (
    <BentoPlayer
      component={RoutineComposition}
      durationInFrames={240}
    />
  );
}
