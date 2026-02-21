"use client"

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import DottedStar from "@/components/ui/DottedStar";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import ReactionPanel from "@/components/spectator/ReactionPanel";
import ChatBubble from "@/components/chat/ChatBubble";
import ResultModal from "@/components/conversation/ResultModal";

const SpectatePage = () => {
  const params = useParams();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [scene, setScene] = useState<'WATCHING' | 'RESULT'>('WATCHING');
  const [messages, setMessages] = useState([
    { id: 1, content: "토요코님이 어쩌구 저쩌구", isMe: false },
    { id: 2, content: "김아름님이 어쩌구 저쩌구", isMe: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock real-time chat updates
  useEffect(() => {
    if (scene === 'WATCHING') {
      const interval = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: "어쩌구 저쩌구 대화가 진행 중입니다...",
            isMe: Math.random() > 0.5
          }]);
        }, 3000);
      }, 7000);

      // Auto-end watching after some time
      const endTimer = setTimeout(() => setScene('RESULT'), 25000);

      return () => {
        clearInterval(interval);
        clearTimeout(endTimer);
      };
    }
  }, [scene]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative">
      <Header variant="exit" />

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

      <main className="relative z-10 flex flex-col items-center h-screen pt-[110px] pb-[40px] px-4">
        <div className="w-full max-w-[1070px] flex flex-col h-full">
          <ConversationHeader 
            opponentName="김아름" 
            opponentScore={100}
            topics={["AI 주제 리스트업", "AI 주제 리스트업", "AI 주제 리스트업", "AI 주제 리스트업"]}
          />

          <div className="flex-1 overflow-y-auto mt-[40px] mb-[20px] scrollbar-hide py-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} content={msg.content} isMe={msg.isMe} />
            ))}
            {isTyping && (
              <div className="w-fit bg-white/20 px-4 py-2 rounded-full mb-4 animate-pulse">
                <span className="text-[14px]">입력 중...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <ReactionPanel />
        </div>
      </main>

      <ResultModal 
        isOpen={scene === 'RESULT'} 
        isWin={true} 
        onExit={() => router.push("/")}
      />
    </div>
  );
};

export default SpectatePage;
