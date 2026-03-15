// No "use client" — Remotion compositions are not React Server Components
// All animations driven by useCurrentFrame() — no CSS transitions allowed

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const AM_STEPS = [
  { name: "Cleanser", product: "CeraVe Hydrating Cleanser" },
  { name: "Vitamin C Serum", product: "SkinCeuticals C E Ferulic" },
  { name: "Moisturiser + SPF", product: "EltaMD UV Clear SPF 46" },
];

const PM_STEPS = [
  { name: "Oil Cleanser", product: "DHC Deep Cleansing Oil" },
  { name: "Retinol Serum", product: "RoC Retinol Correxion" },
  { name: "Night Cream", product: "CeraVe PM Facial Moisturiser" },
];

// Frame at which AM→PM switch happens
const SWITCH = 112;

function Step({
  name,
  product,
  startFrame,
}: {
  name: string;
  product: string;
  startFrame: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200 },
  });

  const x = interpolate(progress, [0, 1], [18, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 0",
        borderBottom: "1px solid rgba(255,255,255,0.055)",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.22)",
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: 13,
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
            fontSize: 10,
            fontFamily: "'Geist Mono', monospace",
            marginTop: 2,
            letterSpacing: "0.02em",
          }}
        >
          {product}
        </div>
      </div>
    </div>
  );
}

function TabBar({ tabProgress }: { tabProgress: number }) {
  const amBg = interpolate(tabProgress, [0, 1], [0.13, 0]);
  const pmBg = interpolate(tabProgress, [0, 1], [0, 0.13]);
  const amText = interpolate(tabProgress, [0, 1], [0.88, 0.28]);
  const pmText = interpolate(tabProgress, [0, 1], [0.28, 0.88]);

  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 999,
        padding: 3,
        width: "fit-content",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: 18,
      }}
    >
      {/* AM tab */}
      <div
        style={{
          padding: "5px 18px",
          borderRadius: 999,
          background: `rgba(255,255,255,${amBg})`,
        }}
      >
        <span
          style={{
            color: `rgba(255,255,255,${amText})`,
            fontSize: 10,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          AM
        </span>
      </div>
      {/* PM tab */}
      <div
        style={{
          padding: "5px 18px",
          borderRadius: 999,
          background: `rgba(255,255,255,${pmBg})`,
        }}
      >
        <span
          style={{
            color: `rgba(255,255,255,${pmText})`,
            fontSize: 10,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          PM
        </span>
      </div>
    </div>
  );
}

function SectionLabel({ text, opacity }: { text: string; opacity: number }) {
  return (
    <div
      style={{
        color: "rgba(255,255,255,0.28)",
        fontSize: 9,
        fontFamily: "'Geist Mono', monospace",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        marginBottom: 4,
        opacity,
      }}
    >
      {text}
    </div>
  );
}

export function RoutineComposition() {
  const frame = useCurrentFrame();

  // Tab smoothly transitions AM→PM around SWITCH
  const tabProgress = interpolate(frame, [SWITCH - 10, SWITCH + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // AM section fades out before SWITCH
  const amOpacity = interpolate(frame, [SWITCH - 18, SWITCH], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // PM section fades in after SWITCH
  const pmOpacity = interpolate(frame, [SWITCH, SWITCH + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Global fade in at start
  const globalIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        padding: "22px 22px 0",
        opacity: globalIn,
      }}
    >
      <TabBar tabProgress={tabProgress} />

      {/* AM and PM sections overlap — opacity drives visibility */}
      <div style={{ position: "relative", flex: 1 }}>
        {/* AM */}
        <div style={{ position: "absolute", inset: 0, opacity: amOpacity }}>
          <SectionLabel text="Morning Routine" opacity={1} />
          {AM_STEPS.map((step, i) => (
            <Step key={step.name} {...step} startFrame={8 + i * 10} />
          ))}
        </div>

        {/* PM */}
        <div style={{ position: "absolute", inset: 0, opacity: pmOpacity }}>
          <SectionLabel text="Evening Routine" opacity={1} />
          {PM_STEPS.map((step, i) => (
            <Step key={step.name} {...step} startFrame={SWITCH + 5 + i * 10} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}
