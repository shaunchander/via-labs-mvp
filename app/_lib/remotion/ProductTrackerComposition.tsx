// No "use client" — Remotion compositions are not React Server Components
// All animations driven by useCurrentFrame() — no CSS transitions allowed

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PRODUCTS = [
  {
    name: "CeraVe Moisturising Cream",
    brand: "CeraVe",
    grade: "A",
    startFrame: 8,
    gradeColor: "rgba(167,243,208,0.85)",
    gradeBg: "rgba(167,243,208,0.1)",
    dot: "rgba(167,243,208,0.75)",
  },
  {
    name: "EltaMD UV Clear SPF 46",
    brand: "EltaMD",
    grade: "A",
    startFrame: 20,
    gradeColor: "rgba(167,243,208,0.85)",
    gradeBg: "rgba(167,243,208,0.1)",
    dot: "rgba(167,243,208,0.75)",
  },
  {
    name: "The Ordinary AHA 30% + BHA",
    brand: "The Ordinary",
    grade: "C",
    startFrame: 32,
    gradeColor: "rgba(253,224,71,0.85)",
    gradeBg: "rgba(253,224,71,0.08)",
    dot: "rgba(253,224,71,0.7)",
  },
];

function ProductRow({
  name,
  brand,
  grade,
  startFrame,
  gradeColor,
  gradeBg,
  dot,
}: (typeof PRODUCTS)[0]) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200 },
  });

  const x = interpolate(prog, [0, 1], [24, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  const pillProg = spring({
    frame: frame - (startFrame + 8),
    fps,
    config: { damping: 14 },
  });
  const pillScale = interpolate(pillProg, [0, 1], [0.6, 1]);
  const pillOpacity = interpolate(pillProg, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: dot,
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: 12,
              fontFamily: "Roundo, sans-serif",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.28)",
              fontSize: 9,
              fontFamily: "'Geist Mono', monospace",
              marginTop: 2,
              letterSpacing: "0.04em",
            }}
          >
            {brand}
          </div>
        </div>
      </div>

      {/* Grade pill */}
      <div
        style={{
          opacity: pillOpacity,
          transform: `scale(${pillScale})`,
          border: `1px solid ${gradeColor}`,
          borderRadius: 999,
          padding: "3px 10px",
          background: gradeBg,
        }}
      >
        <span
          style={{
            color: gradeColor,
            fontSize: 11,
            fontFamily: "'Geist Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          {grade}
        </span>
      </div>
    </div>
  );
}

function GapBanner() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });

  const y = interpolate(prog, [0, 1], [20, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  // Fade out for loop
  const fadeOut = interpolate(frame, [220, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        marginTop: 10,
        opacity: opacity * fadeOut,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(253,224,71,0.2)",
        borderRadius: 10,
        padding: "8px 12px",
        background: "rgba(253,224,71,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12 }}>⚠</span>
        <div>
          <div
            style={{
              color: "rgba(253,224,71,0.8)",
              fontSize: 10,
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            1 gap detected
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 9,
              fontFamily: "'Geist Mono', monospace",
              marginTop: 1,
            }}
          >
            No retinol detected
          </div>
        </div>
      </div>
      <span
        style={{
          color: "rgba(253,224,71,0.55)",
          fontSize: 9,
          fontFamily: "'Geist Mono', monospace",
          letterSpacing: "0.06em",
        }}
      >
        Add to shelf →
      </span>
    </div>
  );
}

export function ProductTrackerComposition() {
  const frame = useCurrentFrame();

  const globalIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out near end for clean loop
  const globalOut = interpolate(frame, [220, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        padding: "22px 22px 18px",
        opacity: globalIn * globalOut,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 85% 85%, rgba(167,243,208,0.07), transparent 40%), " +
            "radial-gradient(circle at 15% 15%, rgba(253,224,71,0.05), transparent 35%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          color: "rgba(255,255,255,0.22)",
          fontSize: 9,
          fontFamily: "'Geist Mono', monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        YOUR SHELF
      </div>

      {/* Product rows */}
      {PRODUCTS.map((p) => (
        <ProductRow key={p.name} {...p} />
      ))}

      {/* Gap banner */}
      <GapBanner />
    </AbsoluteFill>
  );
}
