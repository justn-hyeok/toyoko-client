"use client"

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  isMe?: boolean;
}

const ChatBubble = ({ content, isMe = false }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "w-fit max-w-[80%] px-[20px] py-[15px] rounded-[100px] flex items-center mb-4 transition-all",
      isMe 
        ? "bg-[#ff00b7] text-white self-end ml-auto rounded-tr-none" 
        : "bg-white text-[#222] self-start mr-auto rounded-tl-none"
    )}>
      <p className="font-['Pretendard',sans-serif] text-[15px] leading-[1.3]">
        {content}
      </p>
    </div>
  );
};

export default ChatBubble;
