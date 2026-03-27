import React from "react";
import {
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const MIN_AGE = 18;
const MAX_AGE = 38;
const PX_PER_AGE = 26;

// 4 stops fluctuating between 27 and 24 — shows skin age improving over time
const STOPS = [
  { age: 27.0, img: "/27.png" },
  { age: 25.8, img: "/25.png" },
  { age: 24.3, img: "/24_3.png" },
  { age: 26.1, img: "/26_1.png" },
];

const STOP_HOLD = 95; // ~3.2s hold at each stop
const SLIDE_DUR = 50; // ~1.7s transition between stops
const PERIOD = STOP_HOLD + SLIDE_DUR;

export const RULER_DURATION = STOPS.length * PERIOD; // 580 frames @ 30fps

// Layout constants
const CARET_Y = 118;
const RULER_Y = 130;

function getAnimState(frame: number) {
  const f = frame % RULER_DURATION;
  const segIdx = Math.floor(f / PERIOD);
  const fInSeg = f - segIdx * PERIOD;
  const curr = STOPS[segIdx];
  const next = STOPS[(segIdx + 1) % STOPS.length];

  if (fInSeg < STOP_HOLD) {
    return {
      centerAge: curr.age,
      atStop: true,
      holdProgress: fInSeg / STOP_HOLD,
      segIdx,
    };
  }

  const t = (fInSeg - STOP_HOLD) / SLIDE_DUR;
  const eased = Easing.inOut(Easing.sin)(t);
  return {
    centerAge: curr.age + (next.age - curr.age) * eased,
    atStop: false,
    holdProgress: 0,
    segIdx,
  };
}

export const SkinAgeComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { width: W } = useVideoConfig();

  const { centerAge, atStop, holdProgress, segIdx } = getAnimState(frame);

  // Popup: fade in first 16%, hold, fade out last 16%
  const popupOpacity = atStop
    ? interpolate(holdProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const popupY = atStop
    ? interpolate(holdProgress, [0, 0.16, 0.84, 1], [10, 0, 0, -6], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 10;

  const stripX = W / 2 - (centerAge - MIN_AGE) * PX_PER_AGE;
  const ALL_AGES = Array.from(
    { length: MAX_AGE - MIN_AGE + 1 },
    (_, i) => MIN_AGE + i,
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      {/* ── Popup above indicator ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: W / 2,
          top: 0,
          transform: `translateX(-50%) translateY(${popupY}px)`,
          opacity: popupOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Face image */}
        <Img
          src={STOPS[segIdx].img}
          style={{
            width: 52,
            height: 52,
            borderRadius: "20%",
            objectFit: "cover",
            objectPosition: "right",
            border: "1.5px solid rgba(134,239,172,0.28)",
            marginBottom: 8,
            flexShrink: 0,
          }}
        />

        {/* Skin age number */}
        <div
          style={{
            color: "rgba(255,255,255,0.95)",
            fontSize: 38,
            fontFamily: "Roundo, sans-serif",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {centerAge.toFixed(1)}
        </div>

        {/* Label */}
        <div
          style={{
            color: "rgba(134,239,172,0.7)",
            fontSize: 8,
            fontFamily: '"Geist Mono", "Courier New", monospace',
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            marginTop: 5,
          }}
        >
          SKIN AGE
        </div>

        {/* Connector line to caret */}
        <div
          style={{
            width: 1,
            height: 16,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            marginTop: 6,
          }}
        />
      </div>

      {/* ── Fixed caret at center ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: W / 2,
          top: CARET_Y,
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "9px solid rgba(255,255,255,0.88)",
          zIndex: 2,
        }}
      />

      {/* Fixed indicator tick */}
      <div
        style={{
          position: "absolute",
          left: W / 2 - 0.5,
          top: RULER_Y,
          width: 1,
          height: 28,
          backgroundColor: "rgba(255,255,255,0.72)",
          zIndex: 2,
        }}
      />

      {/* ── Sliding ruler strip ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: (MAX_AGE - MIN_AGE) * PX_PER_AGE,
          height: "100%",
          transform: `translateX(${stripX}px)`,
        }}
      >
        {/* Horizontal baseline */}
        <div
          style={{
            position: "absolute",
            top: RULER_Y,
            left: 0,
            width: "100%",
            height: 1,
            backgroundColor: "rgba(255,255,255,0.22)",
          }}
        />

        {/* Ticks + labels */}
        {ALL_AGES.map((age) => {
          const x = (age - MIN_AGE) * PX_PER_AGE;
          const isMajor = age % 5 === 0;
          const tickH = isMajor ? 16 : 8;
          const dist = Math.abs(age - centerAge);
          const opacity = interpolate(dist, [0, 3, 9], [0.85, 0.42, 0.12], {
            extrapolateRight: "clamp",
          });

          return (
            <React.Fragment key={age}>
              <div
                style={{
                  position: "absolute",
                  left: x - 0.5,
                  top: RULER_Y,
                  width: 1,
                  height: tickH,
                  backgroundColor: "white",
                  opacity,
                }}
              />
              {isMajor && (
                <div
                  style={{
                    position: "absolute",
                    left: x,
                    top: RULER_Y + 22,
                    transform: "translateX(-50%)",
                    fontSize: 13,
                    fontFamily: '"Geist Mono", "Courier New", monospace',
                    color: "white",
                    opacity: opacity * 0.8,
                    letterSpacing: "0.06em",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {age}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
