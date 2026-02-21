"use client"

import { cn } from "@/lib/utils";

interface DottedStarProps {
  maskSrc: string;
  color: string;
  className?: string;
  dotSize?: string;
  dotColor?: string;
}

const DottedStar = ({ 
  maskSrc, 
  color, 
  className,
  dotSize = '12px 12px',
  dotColor = 'rgba(255, 255, 255, 0.4)'
}: DottedStarProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn("relative shrink-0", className)}
      style={{
        maskImage: `url(${maskSrc})`,
        WebkitMaskImage: `url(${maskSrc})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        backgroundColor: color,
        backgroundImage: `radial-gradient(${dotColor} 2px, transparent 1px)`,
        backgroundSize: dotSize,
      }}
    />
  );
};

export default DottedStar;
