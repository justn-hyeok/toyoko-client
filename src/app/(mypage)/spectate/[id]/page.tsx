"use client"

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import DottedStar from "@/components/ui/DottedStar";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import ReactionPanel from "@/components/spectator/ReactionPanel";
import ChatBubble from "@/components/chat/ChatBubble";
import ResultModal from "@/components/conversation/ResultModal";
import { useAuthStore } from "@/store/auth";
import { getSocket } from "@/lib/socket";
import type { RoomSnapshot } from "@/lib/socket/types";

interface Message {
  id: string;
  content: string;
  isMe: boolean;
}

interface SpectatorResult {
  winner: "PLAYER_A" | "PLAYER_B" | "UNDECIDED" | null;
  aSummary: string;
  bSummary: string;
}

const SpectatePage = () => {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.id as string;
  const accessToken = useAuthStore((s) => s.accessToken);
  const _hasHydrated = useAuthStore((s) => s._hasHydrated);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const [scene, setScene] = useState<"WATCHING" | "JUDGING" | "RESULT">("WATCHING");
  const [snapshot, setSnapshot] = useState<RoomSnapshot | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [spectatorResult, setSpectatorResult] = useState<SpectatorResult | null>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!_hasHydrated) return;
    if (!accessToken) router.push("/login");
  }, [_hasHydrated, accessToken, router]);

  // Join as spectator + socket event listeners (listeners registered before join to prevent event loss)
  useEffect(() => {
    if (!accessToken || !roomId) return;
    const socket = getSocket();

    // 1. Register listeners first
    const handleChatReceived = ({ messageId, sender, text }: {
      roomId: string;
      messageId: string;
      sender: "A" | "B";
      text: string;
      serverSentAt: string;
    }) => {
      // A on left (isMe=false), B on right (isMe=true) for visual separation
      setMessages((prev) => [
        ...prev,
        { id: messageId, content: text, isMe: sender === "B" },
      ]);
    };

    const handleGameEnded = () => {
      setScene("JUDGING");
    };

    const handleAiJudgingCompleted = (payload: {
      roomId: string;
      winner: "PLAYER_A" | "PLAYER_B" | "UNDECIDED" | null;
      aSummary: string;
      bSummary: string;
    }) => {
      setSpectatorResult({
        winner: payload.winner,
        aSummary: payload.aSummary,
        bSummary: payload.bSummary,
      });
      setScene("RESULT");
    };

    socket.on("chat.received", handleChatReceived);
    socket.on("game.ended", handleGameEnded);
    socket.on("ai.judging.completed", handleAiJudgingCompleted);

    // 2. Then join (with error handling)
    socket.emit("room.join.spectator", { roomId }, (snap) => {
      if (!snap || typeof snap !== "object" || !("roomId" in snap)) {
        // Invalid roomId or ended room
        router.push("/");
        return;
      }
      setSnapshot(snap as RoomSnapshot);
    });

    return () => {
      socket.off("chat.received", handleChatReceived);
      socket.off("game.ended", handleGameEnded);
      socket.off("ai.judging.completed", handleAiJudgingCompleted);
      socket.emit("room.leave", { roomId }, () => {});
    };
  }, [roomId, accessToken, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const winnerLabel =
    spectatorResult?.winner === "PLAYER_A" ? "A 플레이어 승리"
    : spectatorResult?.winner === "PLAYER_B" ? "B 플레이어 승리"
    : spectatorResult?.winner === "UNDECIDED" ? "무승부"
    : "경기 종료";

  return (
    <div className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative">
      <Header variant="exit" />

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
            opponentName="실시간 대화"
            opponentScore={snapshot?.likeCount ?? 0}
            topics={[]}
          />

          <div className="flex-1 overflow-y-auto mt-[40px] mb-[20px] scrollbar-hide py-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} content={msg.content} isMe={msg.isMe} />
            ))}
            {scene === "JUDGING" && (
              <div className="flex items-center justify-center py-8">
                <p className="text-[#CCC] text-[16px] animate-pulse">AI 판정 중...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <ReactionPanel
            roomId={roomId}
            initialLikeCount={snapshot?.likeCount ?? 0}
            initialDislikeCount={snapshot?.dislikeCount ?? 0}
          />
        </div>
      </main>

      <ResultModal
        isOpen={scene === "RESULT"}
        isWin={false}
        title={winnerLabel}
        subtitle={spectatorResult?.aSummary ?? "대화가 종료되었습니다."}
        onExit={() => router.push("/")}
      />
    </div>
  );
};

export default SpectatePage;
