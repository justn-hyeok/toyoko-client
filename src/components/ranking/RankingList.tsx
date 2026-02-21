"use client"

import { cn } from "@/lib/utils";

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

const RankingList = () => {
  // Mock data for ranks 4 and below
  const rankings = [
    { rank: 4, name: "은지", points: 700 },
    { rank: 5, name: "은지", points: 650 },
    { rank: 6, name: "은지", points: 600 },
    { rank: 7, name: "은지", points: 550 },
    { rank: 8, name: "은지", points: 500 },
    { rank: 9, name: "은지", points: 450 },
    { rank: 10, name: "은지", points: 400 },
  ];

  return (
    <div className="flex flex-col gap-[25px] w-full max-w-[1081px]">
      {rankings.map((user, index) => (
        <RankingListItem key={index} {...user} />
      ))}
    </div>
  );
};

export default RankingList;
