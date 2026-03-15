"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { ComponentType, CSSProperties } from "react";
import type { PlayerRef } from "@remotion/player";

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
  playing?: boolean;
  // Frame to display as the default still — shown on load and returned to on hover-off.
  // Frames 10-20 are past the globalIn fade so compositions are fully rendered.
  stillFrame?: number;
}

export default function BentoPlayer({
  component,
  durationInFrames,
  compositionWidth = 400,
  compositionHeight = 310,
  style,
  playing = false,
  stillFrame = 15,
}: BentoPlayerProps) {
  const playerRef = useRef<PlayerRef>(null);
  const isReady = useRef(false);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  // Once Remotion renders its first frame (timeupdate), park at stillFrame.
  // We use a one-shot listener so subsequent updates don't re-trigger this.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    let done = false;
    function onFirstUpdate() {
      if (done) return;
      done = true;
      player!.removeEventListener("timeupdate", onFirstUpdate);
      isReady.current = true;
      player!.pause();
      player!.seekTo(stillFrame);
    }

    player.addEventListener("timeupdate", onFirstUpdate);
    return () => {
      done = true;
      player?.removeEventListener("timeupdate", onFirstUpdate);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When the video reaches its end while hovered, loop back from stillFrame
  // rather than frame 0 — keeps the restart point consistent with the still.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    function onEnded() {
      if (!playingRef.current) return;
      player!.seekTo(stillFrame);
      player!.play();
    }

    player.addEventListener("ended", onEnded);
    return () => player.removeEventListener("ended", onEnded);
  }, [stillFrame]);

  // Hover on → play from stillFrame. Hover off → pause and return to stillFrame.
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !isReady.current) return;

    if (playing) {
      player.seekTo(stillFrame);
      player.play();
    } else {
      player.pause();
      player.seekTo(stillFrame);
    }
  }, [playing, stillFrame]);

  return (
    <div>
      <Player
        ref={playerRef}
        component={component}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        durationInFrames={durationInFrames}
        fps={30}
        loop={false}
        autoPlay={false}
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
