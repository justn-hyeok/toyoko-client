"use client"

import { User } from "lucide-react";
import ChatSummary from "@/components/chat/ChatSummary";

interface ConversationHeaderProps {
  opponentName: string;
  opponentScore: number;
  topics: string[];
}

const ConversationHeader = ({ opponentName, opponentScore, topics }: ConversationHeaderProps) => {
  return (
    <div className="w-full max-w-[1070px] flex flex-col gap-[20px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-['Pretendard',sans-serif] font-bold text-[25px] text-white">
          {opponentName}
        </h2>
        <div className="flex items-center gap-[5px] text-white">
          <div className="size-[20px] flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="font-['Pretendard',sans-serif] font-normal text-[16px]">
            {opponentScore}
          </span>
        </div>
      </div>
      
      <ChatSummary themes={topics} />
    </div>
  );
};

export default ConversationHeader;
