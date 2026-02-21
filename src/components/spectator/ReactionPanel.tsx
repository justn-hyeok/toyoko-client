"use client"

import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReactionPanelProps {
  className?: string;
}

const ReactionPanel = ({ className }: ReactionPanelProps) => {
  const [counts, setCounts] = useState({ pink: 89, purple: 10 });

  const handleReact = (type: 'pink' | 'purple') => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  return (
    <div className={cn(
      "bg-[#282828] rounded-[10px] w-full max-w-[1071px] px-[20px] py-[30px] flex flex-col items-center gap-[30px]",
      className
    )}>
      <p className="font-['Pretendard',sans-serif] text-[15px] text-white text-center leading-[1.3]">
        대화에 대한 반응을 선택 해 주세요!
      </p>
      
      <div className="flex gap-[15px] items-center justify-center w-full">
        {/* Pink Reaction */}
        <button 
          onClick={() => handleReact('pink')}
          className="bg-white rounded-[1000px] h-[63px] px-[25px] py-[13px] flex items-center justify-between w-[133px] transition-transform active:scale-95"
        >
          <ThumbsUp size={35} className="text-[#CCC]" />
          <span className="font-['Pretendard',sans-serif] font-bold text-[25px] text-[#ff00b7]">
            {counts.pink}
          </span>
        </button>

        {/* Purple Reaction */}
        <button 
          onClick={() => handleReact('purple')}
          className="bg-white rounded-[1000px] h-[63px] px-[25px] py-[13px] flex items-center justify-between w-[133px] transition-transform active:scale-95"
        >
          <ThumbsUp size={35} className="text-[#CCC]" />
          <span className="font-['Pretendard',sans-serif] font-bold text-[25px] text-[#8a01d9]">
            {counts.purple}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReactionPanel;
