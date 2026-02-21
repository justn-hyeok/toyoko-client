"use client"

import { cn } from "@/lib/utils";
import type { RankingEntry } from "@/lib/api/rooms";

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
      style={{ backgroundColor: color, height }}
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

const PODIUM_CONFIG = [
  { height: "320px", color: "#ff79d9" },
  { height: "423px", color: "#ff00b7" },
  { height: "270px", color: "white", textColor: "text-[#222]" },
];

interface RankingPodiumProps {
  topRankers: RankingEntry[];
}

const RankingPodium = ({ topRankers }: RankingPodiumProps) => {
  if (topRankers.length < 3) return null;

  // Visual order: 2nd place, 1st place, 3rd place
  const ordered = [topRankers[1], topRankers[0], topRankers[2]];

  return (
    <div className="flex items-end justify-center gap-5 w-full max-w-[628px]">
      {ordered.map((ranker, i) => {
        if (!ranker) return null;
        const config = PODIUM_CONFIG[i];
        return (
          <PodiumItem
            key={ranker.userId}
            rank={ranker.rank}
            name={ranker.email.split("@")[0]}
            points={ranker.score}
            height={config.height}
            color={config.color}
            textColor={config.textColor}
          />
        );
      })}
    </div>
  );
};

export default RankingPodium;
