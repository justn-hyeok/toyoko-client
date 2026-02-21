"use client"

import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import RankingPodium from "@/components/ranking/RankingPodium";
import RankingList from "@/components/ranking/RankingList";
import DottedStar from "@/components/ui/DottedStar";
import { motion } from "motion/react";
import { roomsApi } from "@/lib/api/rooms";

export default function RankingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["ranking"],
    queryFn: () => roomsApi.getRanking(50),
  });

  const topRankers = data?.ranking.slice(0, 3) ?? [];
  const restRankers = data?.ranking.slice(3) ?? [];

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center overflow-x-hidden pt-[155px] pb-20">
      <Header />

      <DottedStar
        maskSrc="/star_purple_path.svg"
        color="#8A01D9"
        className="fixed top-[-267px] right-[-214px] w-[805px] h-[805px] opacity-60 rotate-[12deg] pointer-events-none"
        dotSize="20px 20px"
      />
      <DottedStar
        maskSrc="/star_pink_path.svg"
        color="#FF00B7"
        className="fixed bottom-[-200px] right-[-200px] w-[733px] h-[733px] opacity-60 rotate-[5deg] pointer-events-none"
        dotSize="15px 15px"
      />
      <DottedStar
        maskSrc="/star_purple_path.svg"
        color="#8A01D9"
        className="fixed top-[652px] right-[-100px] w-[158px] h-[158px] opacity-60 rotate-[12deg] pointer-events-none"
      />
      <DottedStar
        maskSrc="/star_purple_path.svg"
        color="#8A01D9"
        className="fixed top-[440px] left-[-111px] w-[351px] h-[351px] opacity-60 rotate-[15deg] pointer-events-none"
        dotSize="10px 10px"
      />

      <main className="relative z-10 w-full flex flex-col items-center gap-[55px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-[50px] w-full"
        >
          <h2 className="font-['Pretendard',sans-serif] font-bold text-[30px] text-center">
            랭킹
          </h2>
          {!isLoading && topRankers.length > 0 && (
            <RankingPodium topRankers={topRankers} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <RankingList rankings={restRankers} />
        </motion.div>
      </main>
    </div>
  );
}
