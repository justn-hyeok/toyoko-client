"use client"

import { cn } from "@/lib/utils";

interface ChatSummaryProps {
  themes: string[];
  className?: string;
}

const ChatSummary = ({ themes, className }: ChatSummaryProps) => {
  if (!themes || themes.length === 0) return null;

  return (
    <div className={cn(
      "bg-[#282828] rounded-[10px] px-[20px] py-[30px] w-full flex flex-col gap-[10px]",
      className
    )}>
      {themes.map((theme, index) => (
        <div key={index} className="flex items-start gap-[10px]">
          <div className="size-[6px] rounded-full bg-white mt-[8px] shrink-0" />
          <p className="font-['Pretendard',sans-serif] font-medium text-[15px] text-white tracking-[0.075px] leading-[1.3]">
            {theme}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatSummary;
