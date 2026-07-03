"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export function FadeImage({
  wrapperClassName = "",
  className = "",
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div className="absolute inset-0 animate-shimmer" />}
      <Image
        {...props}
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
