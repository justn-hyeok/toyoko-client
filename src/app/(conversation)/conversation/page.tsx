"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DottedStar from "@/components/ui/DottedStar";
import Header from "@/components/layout/Header";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import MessageInput from "@/components/conversation/MessageInput";
import ChatBubble from "@/components/chat/ChatBubble";
import ResultModal from "@/components/conversation/ResultModal";

type Scene = 'MATCHING' | 'MATCHED' | 'CHATTING' | 'RESULT';

const ConversationPage = () => {
  const [scene, setScene] = useState<Scene>('MATCHING');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, content: "토요코님이 어쩌구 저쩌구", isMe: false },
    { id: 2, content: "김아름님이 어쩌구 저쩌구", isMe: true },
  ]);
  const [myScore, setMyScore] = useState(100);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scene === 'MATCHING') {
      const timer = setTimeout(() => setScene('MATCHED'), 2500);
      return () => clearTimeout(timer);
    }
    if (scene === 'MATCHED') {
      const timer = setTimeout(() => setScene('CHATTING'), 1500);
      return () => clearTimeout(timer);
    }
    if (scene === 'CHATTING') {
      // Simulate opponent typing after 2 seconds
      const typingTimer = setTimeout(() => setIsTyping(true), 2000);
      return () => clearTimeout(typingTimer);
    }
  }, [scene]);

  useEffect(() => {
    if (isTyping) {
      const msgTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          content: "토요코님이 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구", 
          isMe: false 
        }]);
      }, 3000);
      return () => clearTimeout(msgTimer);
    }
  }, [isTyping]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    setMessages(prev => [...prev, { id: Date.now(), content, isMe: true }]);
    // Mock win condition: after 5 messages total
    if (messages.length >= 4) {
      setTimeout(() => setScene('RESULT'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative">
      <Header variant={scene === 'CHATTING' ? 'exit' : 'back'} />

      {/* Background stars (Common for all scenes) */}
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
        <AnimatePresence mode="wait">
          {scene === 'MATCHING' && (
            <motion.div 
              key="matching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-[30px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="relative size-[48px]"
              >
                <Image src="/loading_circle.svg" alt="Loading" fill />
              </motion.div>
              <p className="text-[30px] font-bold">매칭 중</p>
            </motion.div>
          )}

          {scene === 'MATCHED' && (
            <motion.div 
              key="matched"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center h-full gap-[20px]"
            >
              <p className="text-[30px] font-bold text-[#FF00B7]">매칭 완료!</p>
              <p className="text-[#CCC]">대화방으로 이동합니다...</p>
            </motion.div>
          )}

          {(scene === 'CHATTING' || scene === 'RESULT') && (
            <motion.div 
              key="chatting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-[1070px] flex flex-col h-full"
            >
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
                    <span className="text-[14px]">토요코님이 입력 중...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <MessageInput 
                currentScore={myScore} 
                onSendMessage={handleSendMessage} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ResultModal 
        isOpen={scene === 'RESULT'} 
        isWin={true} 
        onExit={() => router.push("/")}
      />
    </div>
  );
};

export default ConversationPage;
