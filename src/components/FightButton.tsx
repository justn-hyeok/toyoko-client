"use client"

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FightButtonProps {
  className?: string;
}

const FightButton = ({ className }: FightButtonProps) => {
  const router = useRouter();
  return (
    <div className={cn("z-50", className)} onClick={() => router.push("/conversation")}>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
        className="bg-[#8a01d9] flex items-center justify-center px-[30px] py-[15px] rounded-[10000px] cursor-pointer shadow-lg hover:shadow-[#8a01d9]/50 transition-shadow"
      >
        <span className="font-['Pretendard',sans-serif] font-semibold text-[20px] text-white leading-normal">
          매칭 시작하기
        </span>
      </motion.button>
    </div>
  );
};

export default FightButton;
