"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center bg-black text-slate-950 transition-bg",
        className
      )}
      style={
        {
          // Define explicit values for the variables - MORE BLACK, SPREAD OUT PURPLE
          "--black": "#000000",
          "--black-2": "#0a0a0a",
          "--black-3": "#121212",
          "--transparent": "rgba(0, 0, 0, 0)",
          "--purple-1": "#9333ea",
          "--purple-2": "#7e22ce",
          "--purple-3": "#581c87",
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black-3)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_15%,var(--purple-3)_20%,var(--black-2)_25%,var(--black)_35%,var(--purple-2)_40%,var(--black)_45%,var(--black)_60%,var(--purple-1)_65%,var(--black)_70%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] 
            animate-aurora
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-60 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
