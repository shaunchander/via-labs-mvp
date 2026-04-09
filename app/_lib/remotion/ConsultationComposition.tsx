// No "use client" — Remotion compositions are not React Server Components
// All animations driven by useCurrentFrame() — no CSS transitions allowed

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const MESSAGES = [
  {
    text: "Your barrier score improved 14% this week. Keep it up.",
    startFrame: 10,
  },
  {
    text: "Time to reduce retinol to twice a week — your skin is ready.",
    startFrame: 40,
  },
  {
    text: "Your next scan is due Sunday.",
    startFrame: 70,
  },
];

function Bubble({
  text,
  startFrame,
}: {
  text: string;
  startFrame: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14 },
  });

  const y = interpolate(prog, [0, 1], [18, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 10,
        maxWidth: "90%",
      }}
    >
      <div
        style={{
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.07)",
          padding: "10px 14px",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            fontFamily: "Roundo, sans-serif",
            fontWeight: 300,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export function ConsultationComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProg = spring({ frame, fps, config: { damping: 200 } });
  const headerOpacity = interpolate(headerProg, [0, 1], [0, 1]);

  // Online dot pulse — gentle opacity oscillation after frame 8
  const dotPulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 2),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        padding: "22px 22px 18px",
      }}
    >
      {/* Warm glow bottom-right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 90% 90%, rgba(253,224,71,0.07), transparent 40%), " +
            "radial-gradient(circle at 10% 10%, rgba(167,243,208,0.05), transparent 35%)",
        }}
      />

      {/* Header — Via Clinician */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 18,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(167,243,208,1)",
            opacity: dotPulse,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.32)",
            fontSize: 9,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Via Clinician
        </span>
      </div>

      {/* Chat bubbles */}
      {MESSAGES.map((msg) => (
        <Bubble key={msg.text} {...msg} />
      ))}
    </AbsoluteFill>
  );
}
