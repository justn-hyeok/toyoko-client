"use client"

import ChatSummary from "@/components/chat/ChatSummary";

interface ConversationHeaderProps {
  opponentName: string;
  topics: string[];
}

const ConversationHeader = ({ opponentName, topics }: ConversationHeaderProps) => {
  return (
    <div className="w-full max-w-[1070px] flex flex-col gap-[20px]">
      <div className="flex items-center w-full">
        <h2 className="font-['Pretendard',sans-serif] font-bold text-[25px] text-white">
          {opponentName}
        </h2>
      </div>
      
      <ChatSummary themes={topics} />
    </div>
  );
};

export default ConversationHeader;
