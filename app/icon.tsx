import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0B",
          borderRadius: 7,
          border: "1px solid #C9A646",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 17,
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#C9A646",
            letterSpacing: -1,
          }}
        >
          OT
        </div>
      </div>
    ),
    { ...size }
  );
}
