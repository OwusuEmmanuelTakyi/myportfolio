export function ShareCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0B0B0B",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "#C9A646",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 12,
            border: "2px solid #C9A646",
            color: "#C9A646",
            fontSize: 28,
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          OT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "monospace",
            color: "#C9A646",
          }}
        >
          {"< Available for opportunities />"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: "#F5F5F5",
          marginTop: 32,
          letterSpacing: -2,
        }}
      >
        Owusu Emmanuel Takyi
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 34,
          color: "#C9A646",
          marginTop: 16,
          fontWeight: 600,
        }}
      >
        Full-Stack Developer · AI Builder · Startup Founder
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 26,
          color: "#888888",
          marginTop: 24,
          maxWidth: 900,
        }}
      >
        I build digital products for Africa and beyond — from AI legal
        assistants to live e-voting platforms.
      </div>
    </div>
  );
}
