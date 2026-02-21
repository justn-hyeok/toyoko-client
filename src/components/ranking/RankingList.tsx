"use client"

import type { RankingEntry } from "@/lib/api/rooms";

interface RankingListItemProps {
  rank: number;
  name: string;
  points: number;
}

const RankingListItem = ({ rank, name, points }: RankingListItemProps) => {
  return (
    <div className="w-full bg-white border-2 border-[#f3f3f3] rounded-[100px] flex items-center justify-between px-[40px] py-[25px]">
      <div className="flex items-center gap-[10px] text-[#222]">
        <span className="font-['Pretendard',sans-serif] font-normal text-[20px] w-[30px]">
          {rank}
        </span>
        <span className="font-['Pretendard',sans-serif] font-semibold text-[25px]">
          {name}
        </span>
      </div>
      <span className="font-['Pretendard',sans-serif] font-normal text-[20px] text-[#777]">
        {points}점
      </span>
    </div>
  );
};

interface RankingListProps {
  rankings: RankingEntry[];
}

const RankingList = ({ rankings }: RankingListProps) => {
  return (
    <div className="flex flex-col gap-[25px] w-full max-w-[1081px]">
      {rankings.map((user) => (
        <RankingListItem
          key={user.userId}
          rank={user.rank}
          name={user.email.split("@")[0]}
          points={user.score}
        />
      ))}
    </div>
  );
};

export default RankingList;
