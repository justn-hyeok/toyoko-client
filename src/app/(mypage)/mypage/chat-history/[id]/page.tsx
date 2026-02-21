"use client"

import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatSummary from "@/components/chat/ChatSummary";
import DottedStar from "@/components/ui/DottedStar";
import { motion } from "motion/react";

const ChatHistoryDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  // Mock data for the specific chat session
  const chatData = {
    opponent: "김아름님",
    date: "25.12.04",
    result: "승리",
    summary: [
      "AI 주제 리스트업",
      "AI 주제 리스트업",
      "AI 주제 리스트업",
      "AI 주제 리스트업"
    ],
    messages: [
      { id: 1, content: "토요코님이 어쩌구 저쩌구", isMe: false },
      { id: 2, content: "김아름님이 어쩌구 저쩌구", isMe: true },
      { id: 3, content: "토요코님이 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구", isMe: false },
      { id: 4, content: "김아름님이 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구", isMe: true },
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center overflow-x-hidden pt-[110px] pb-20">
      <Header variant="back" />

      {/* Background stars */}
      <DottedStar 
        maskSrc="/star_purple_path.svg" 
        color="#8A01D9" 
        className="fixed top-[-166px] right-[-100px] w-[399px] h-[399px] opacity-40 rotate-[12deg] pointer-events-none"
      />
      <DottedStar 
        maskSrc="/star_purple_path.svg" 
        color="#8A01D9" 
        className="fixed bottom-[100px] left-[-180px] w-[399px] h-[399px] opacity-40 rotate-[12deg] pointer-events-none"
      />

      <main className="relative z-10 w-full max-w-[1070px] flex flex-col gap-[40px] px-4">
        {/* Page Title and Match Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h2 className="font-['Pretendard',sans-serif] font-bold text-[25px]">
            {chatData.opponent}과의 대화기록
          </h2>
          <div className="flex flex-col items-end gap-[5px]">
            <span className="font-['Pretendard',sans-serif] font-normal text-[16px]">
              {chatData.date}
            </span>
            <span className="font-['Pretendard',sans-serif] font-semibold text-[20px] text-[#ff00b7]">
              {chatData.result}
            </span>
          </div>
        </motion.div>

        {/* AI Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <ChatSummary themes={chatData.summary} />
        </motion.div>

        {/* Chat Logs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col w-full mt-4"
        >
          {chatData.messages.map((msg) => (
            <ChatBubble key={msg.id} content={msg.content} isMe={msg.isMe} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ChatHistoryDetailPage;
