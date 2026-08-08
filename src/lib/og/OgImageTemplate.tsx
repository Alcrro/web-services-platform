export function OgImageTemplate({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a1040 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Top: brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span
          style={{
            color: "#818cf8",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ALCRRO
        </span>
        {tag && (
          <span
            style={{
              color: "#475569",
              fontSize: 14,
              background: "#1e293b",
              padding: "4px 12px",
              borderRadius: 6,
            }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Center: title + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            color: "#ffffff",
            fontSize: title.length > 40 ? 48 : 60,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "960px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              color: "#94a3b8",
              fontSize: 26,
              maxWidth: "840px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Bottom: accent + url */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            height: 4,
            width: 100,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: 2,
          }}
        />
        <span style={{ color: "#475569", fontSize: 16 }}>alcrro.ro</span>
      </div>
    </div>
  );
}
