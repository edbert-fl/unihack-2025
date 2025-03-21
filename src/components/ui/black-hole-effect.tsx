import { useEffect, useRef, useState } from "react";

interface BlackHoleEffectProps {
  className?: string; // Add the className prop here
}

export function BlackHoleEffect({ className }: BlackHoleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Generate circles with dots
  const circles = [
    { id: 0, dots: 8, radius: 404, rotation: 0 },
    { id: 1, dots: 8, radius: 304, rotation: 22.5 },
    { id: 2, dots: 8, radius: 208, rotation: 0 },
  ];

  return (
    <div
      ref={containerRef}
      className={`hero-black-hole relative w-[1440px] h-[810px] left-1/2 transform -translate-x-1/2 overflow-hidden ${className} ${
        isVisible ? "hero-black-hole-visible" : ""
      }`}
      style={{
        WebkitMaskImage:
          "radial-gradient(50% 50% at 50% 50%, #fff 60.94%, transparent 100%)",
        maskImage:
          "radial-gradient(50% 50% at 50% 50%, #fff 60.94%, transparent 100%)",
        WebkitMaskSize: "cover",
        maskSize: "cover",
      }}
    >
      {/* Video background */}
      <div className="lazy-video lazy-video-loaded">
        <video
          ref={videoRef}
          className="w-full h-auto"
          muted
          loop
          playsInline
          preload="auto"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q-c3d7becf-7VEBbAOOwh3pmyi7zGqbC8675IsS4m.webm"
        />
      </div>

      {/* Circles */}
      <div className="hero-black-hole-circles w-[808px] h-[808px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] mt-[-12px]">
        {circles.map((circle, circleIndex) => (
          <div
            key={circleIndex}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{
              height:
                circleIndex === 1
                  ? "608px"
                  : circleIndex === 2
                  ? "416px"
                  : "100%",
              width:
                circleIndex === 1
                  ? "608px"
                  : circleIndex === 2
                  ? "416px"
                  : "100%",
              opacity: circleIndex === 1 ? 0.6 : 1,
              WebkitMaskImage:
                "linear-gradient(180deg, rgba(186, 156, 255, 0.6) 9.41%, rgba(186, 156, 255, 0) 29.79%)",
              maskImage:
                "linear-gradient(180deg, rgba(186, 156, 255, 0.6) 9.41%, rgba(186, 156, 255, 0) 29.79%)",
              zIndex: circleIndex === 2 ? 1 : "auto",
            }}
          >
            <div
              className={`hero-black-hole-circle hero-black-hole-circle-${circle.id} relative w-full h-full rounded-full top-[4px]`}
              style={
                {
                  animation: circleIndex === 2 ? "none !important" : undefined,
                  "--position-1":
                    circleIndex === 0
                      ? "14.2%"
                      : circleIndex === 1
                      ? "14.1%"
                      : "13.8%",
                } as React.CSSProperties
              }
            >
              {Array.from({ length: circle.dots }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="hero-black-hole-circle-dot absolute w-[8px] h-[8px] z-[99]"
                    style={{
                      left:
                        i === 0
                          ? "-4px"
                          : i === 1 || i === 2
                          ? "var(--position-1)"
                          : i === 3 || i === 4
                          ? "50%"
                          : i === 5 || i === 6
                          ? "right: var(--position-1)"
                          : "right: -4px",
                      top:
                        i === 0 || i === 7
                          ? "50%"
                          : i === 1 || i === 5
                          ? "var(--position-1)"
                          : i === 2 || i === 6
                          ? "bottom: var(--position-1)"
                          : i === 3
                          ? "-4px"
                          : "bottom: -4px",
                      transform:
                        i === 0 || i === 7
                          ? "translateY(-50%)"
                          : i === 3 || i === 4
                          ? "translate(-50%)"
                          : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
