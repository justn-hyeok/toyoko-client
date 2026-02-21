"use client"

import Image from "next/image";
import { motion } from "motion/react";

interface BroadcastCardProps {
  title: string;
  viewerCount: number;
}

const BroadcastCard = ({ title, viewerCount }: BroadcastCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, borderColor: "#8a01d9" }}
      className="bg-white border-2 border-[#f3f3f3] rounded-[10px] px-8 py-6 md:px-[30px] md:py-[25px] flex items-center justify-between w-full max-w-[1081px] group cursor-pointer transition-colors shadow-sm"
    >
      <p className="text-[#222] font-semibold text-lg md:text-[20px] leading-normal line-clamp-1">
        {title}
      </p>
      
      <div className="flex items-center gap-[10px] shrink-0">
        <div className="relative w-5 h-5">
          <Image src="/user_icon.svg" alt="Viewer count" fill />
        </div>
        <span className="text-[#777] text-lg md:text-[20px] tabular-nums font-medium">
          {viewerCount}
        </span>
      </div>
    </motion.div>
  );
};

export default BroadcastCard;
