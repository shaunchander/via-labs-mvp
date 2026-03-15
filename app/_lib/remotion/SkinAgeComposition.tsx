// No "use client" — Remotion compositions are not React Server Components
// All animations driven by useCurrentFrame() — no CSS transitions allowed

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const WEEKS = [
  { label: "Week 1", age: "25.4", bars: [68, 60, 55], delta: null },
  { label: "Week 2", age: "25.1", bars: [74, 68, 62], delta: "↓ 0.3" },
  { label: "Week 3", age: "24.8", bars: [82, 76, 70], delta: "↓ 0.3" },
  { label: "Week 4", age: "24.3", bars: [92, 84, 78], delta: "↓ 0.5" },
];

const METRICS = ["Barrier", "Tone", "Breakouts"];

// 420 frames total @ 30fps = 14s per loop
const WEEK_TIMES = [
  { in: 0,   out: 90  },
  { in: 90,  out: 195 },
  { in: 195, out: 310 },
  { in: 310, out: 420 },
];
const CROSS = 20; // crossfade duration in frames

function MetricBar({
  label,
  targetPct,
  startFrame,
}: {
  label: string;
  targetPct: number;
  startFrame: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pct = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200 },
  });

  const fillWidth = interpolate(pct, [0, 1], [0, targetPct]);

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.38)",
            fontSize: 9,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 9,
            fontFamily: "'Geist Mono', monospace",
          }}
        >
          {Math.round(fillWidth)}%
        </span>
      </div>
      <div
        style={{
          height: 5,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${fillWidth}%`,
            height: "100%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, rgba(167,243,208,0.65), rgba(254,240,138,0.65))",
          }}
        />
      </div>
    </div>
  );
}

function WeekSlide({
  week,
  weekIndex,
  opacity,
}: {
  week: (typeof WEEKS)[0];
  weekIndex: number;
  opacity: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = WEEK_TIMES[weekIndex].in + 8;

  const numProg = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200 },
  });

  // Badge pulses in on week 4 only
  const badgeIn =
    weekIndex === 3
      ? spring({ frame: frame - 334, fps, config: { damping: 14 } })
      : 0;

  const numY = interpolate(numProg, [0, 1], [10, 0]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {/* Big number */}
      <div
        style={{
          opacity: numProg,
          transform: `translateY(${numY}px)`,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.22)",
            fontSize: 9,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          SKIN AGE — {week.label}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <span
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: 56,
              fontFamily: "Roundo, sans-serif",
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            {week.age}
          </span>
          {week.delta && (
            <span
              style={{
                color: "rgba(167,243,208,0.75)",
                fontSize: 11,
                fontFamily: "'Geist Mono', monospace",
                paddingBottom: 8,
              }}
            >
              {week.delta}
            </span>
          )}
        </div>
      </div>

      {/* Metric bars */}
      <div style={{ marginTop: 14 }}>
        {METRICS.map((m, i) => (
          <MetricBar
            key={m}
            label={m}
            targetPct={week.bars[i]}
            startFrame={startFrame + i * 8}
          />
        ))}
      </div>

      {/* Improving badge — week 4 only */}
      {weekIndex === 3 && (
        <div
          style={{
            marginTop: 10,
            opacity: badgeIn,
            transform: `scale(${interpolate(badgeIn, [0, 1], [0.82, 1])})`,
            transformOrigin: "left center",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            border: "1px solid rgba(167,243,208,0.25)",
            borderRadius: 999,
            padding: "4px 10px",
            background: "rgba(167,243,208,0.07)",
          }}
        >
          <span
            style={{
              color: "rgba(167,243,208,0.8)",
              fontSize: 10,
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "0.12em",
            }}
          >
            ↓ Improving
          </span>
        </div>
      )}
    </div>
  );
}

export function SkinAgeComposition() {
  const frame = useCurrentFrame();

  // Compute opacity for each week slide
  const weekOpacities = WEEK_TIMES.map(({ in: wIn, out: wOut }, i) => {
    const isLast = i === WEEK_TIMES.length - 1;
    if (isLast) {
      // Last week stays fully visible once in
      return interpolate(frame, [wIn, wIn + CROSS], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    // Fade in at start, fade out at end
    return interpolate(
      frame,
      [wIn, wIn + CROSS, wOut - CROSS, wOut],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        padding: "22px 22px 18px",
      }}
    >
      {/* Glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 90% 10%, rgba(167,243,208,0.1), transparent 40%), " +
            "radial-gradient(circle at 10% 90%, rgba(253,224,71,0.07), transparent 38%)",
        }}
      />

      {/* Week slides stacked */}
      <div style={{ position: "relative", flex: 1 }}>
        {WEEKS.map((week, i) => (
          <WeekSlide
            key={week.label}
            week={week}
            weekIndex={i}
            opacity={weekOpacities[i]}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}
