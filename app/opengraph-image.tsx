import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/og/ShareCard";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<ShareCard />, { ...size });
}
