"use client"

import { cn } from "@/lib/utils";

interface PodiumItemProps {
  rank: number;
  name: string;
  points: number;
  height: string;
  color: string;
  textColor?: string;
}

const PodiumItem = ({ rank, name, points, height, color, textColor = "text-white" }: PodiumItemProps) => {
  return (
    <div 
      className={cn("relative rounded-[15px] flex flex-col items-center pt-[50px] w-full max-w-[199px]", textColor)}
      style={{ backgroundColor: color, height: height }}
    >
      <div className="flex flex-col items-center gap-[20px] text-center">
        <span className="font-['Pretendard',sans-serif] font-medium text-[25px] tracking-[0.125px]">
          {rank}
        </span>
        <div className="flex flex-col gap-[5px]">
          <span className="font-['Pretendard',sans-serif] font-bold text-[25px] tracking-[0.125px]">
            {name}
          </span>
          <span className={cn("font-['Pretendard',sans-serif] font-normal text-[15px] tracking-[0.075px]", rank === 3 ? "text-[#777]" : "text-white")}>
            {points}점
          </span>
        </div>
      </div>
    </div>
  );
};

const RankingPodium = () => {
  // Mock data based on Figma
  const topRankers = [
    { rank: 2, name: "토요코", points: 900, height: "320px", color: "#ff79d9" },
    { rank: 1, name: "토요코", points: 1000, height: "423px", color: "#ff00b7" },
    { rank: 3, name: "토요코", points: 800, height: "270px", color: "white", textColor: "text-[#222]" }
  ];

  return (
    <div className="flex items-end justify-center gap-5 w-full max-w-[628px]">
      <PodiumItem {...topRankers[0]} />
      <PodiumItem {...topRankers[1]} />
      <PodiumItem {...topRankers[2]} />
    </div>
  );
};

export default RankingPodium;
