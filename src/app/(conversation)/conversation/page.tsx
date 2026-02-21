"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import DottedStar from "@/components/ui/DottedStar";
import Header from "@/components/layout/Header";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import MessageInput from "@/components/conversation/MessageInput";
import ChatBubble from "@/components/chat/ChatBubble";
import ResultModal from "@/components/conversation/ResultModal";
import { useAuthStore } from "@/store/auth";
import { getSocket } from "@/lib/socket";
import type { RoomSnapshot } from "@/lib/socket/types";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api/rooms";

type Scene = "MATCHING" | "MATCHED" | "CHATTING" | "JUDGING" | "RESULT";

interface Message {
  id: string;
  content: string;
  isMe: boolean;
}

interface GameResult {
  winner: "PLAYER_A" | "PLAYER_B" | "UNDECIDED" | null;
  scoreDelta: number;
  shortReason?: string;
  aSummary?: string;
  bSummary?: string;
}

const ConversationPage = () => {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const _hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [scene, setScene] = useState<Scene>("MATCHING");
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const { data: myRanking } = useQuery({
    queryKey: ["myRanking"],
    queryFn: () => roomsApi.getMyRanking(accessToken!),
    enabled: !!accessToken,
  });

  const snapshotRef = useRef<RoomSnapshot | null>(null);
  const myRoleRef = useRef<"PLAYER_A" | "PLAYER_B" | null>(null);
  const sceneRef = useRef<Scene>("MATCHING");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const matchedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateScene = (s: Scene) => {
    sceneRef.current = s;
    setScene(s);
  };

  const handleSnapshot = (snap: RoomSnapshot) => {
    snapshotRef.current = snap;
    if (snap.yourRole === "PLAYER_A" || snap.yourRole === "PLAYER_B") {
      myRoleRef.current = snap.yourRole;
    }
    updateScene("MATCHED");
    if (matchedTimerRef.current) clearTimeout(matchedTimerRef.current);
    matchedTimerRef.current = setTimeout(() => updateScene("CHATTING"), 1500);
  };

  // Socket listeners — registered once on mount
  useEffect(() => {
    const socket = getSocket();

    const handleMatched = (snap: RoomSnapshot) => {
      handleSnapshot(snap);
    };

    const handleChatReceived = ({ messageId, sender, text }: {
      roomId: string;
      messageId: string;
      sender: "A" | "B";
      text: string;
      serverSentAt: string;
    }) => {
      // Server broadcasts to ROOM_ALL including sender — use server echo as source of truth
      const myLetter = myRoleRef.current === "PLAYER_A" ? "A" : "B";
      setMessages((prev) => [
        ...prev,
        { id: messageId, content: text, isMe: sender === myLetter },
      ]);
    };

    const handleGameEnded = () => {
      // Game is over but AI hasn't judged yet — show judging state
      updateScene("JUDGING");
    };

    const handleAiJudgingCompleted = (payload: {
      roomId: string;
      winner: "PLAYER_A" | "PLAYER_B" | "UNDECIDED" | null;
      shortReason?: string;
      aSummary?: string;
      bSummary?: string;
      rating?: {
        playerAScoreDelta: number;
        playerBScoreDelta: number;
        playerAMmrDelta: number;
        playerBMmrDelta: number;
        playerAScoreAfter: number;
        playerBScoreAfter: number;
      };
    }) => {
      const scoreDelta = payload.rating
        ? myRoleRef.current === "PLAYER_A"
          ? payload.rating.playerAScoreDelta
          : payload.rating.playerBScoreDelta
        : 0;

      setResult({
        winner: payload.winner,
        scoreDelta,
        shortReason: 'shortReason' in payload ? payload.shortReason : undefined,
        aSummary: payload.aSummary,
        bSummary: payload.bSummary,
      });
      updateScene("RESULT");
    };

    const handleRoomLeave = ({ leaveReason }: { roomId: string; userId: string; role: string; leaveReason: string }) => {
      if (sceneRef.current === "CHATTING") {
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            content: `상대방이 대화를 종료했습니다. (${leaveReason})`,
            isMe: false,
          },
        ]);
      }
    };

    socket.on("matchmaking.matched", handleMatched);
    socket.on("chat.received", handleChatReceived);
    socket.on("game.ended", handleGameEnded);
    socket.on("ai.judging.completed", handleAiJudgingCompleted);
    socket.on("room.leave", handleRoomLeave);

    return () => {
      socket.off("matchmaking.matched", handleMatched);
      socket.off("chat.received", handleChatReceived);
      socket.off("game.ended", handleGameEnded);
      socket.off("ai.judging.completed", handleAiJudgingCompleted);
      socket.off("room.leave", handleRoomLeave);
      if (matchedTimerRef.current) clearTimeout(matchedTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Join matchmaking via socket on mount — wait for hydration before checking auth
  useEffect(() => {
    if (!_hasHydrated) return;
    if (!accessToken) {
      router.push("/login");
      return;
    }

    const socket = getSocket();

    socket.emit("matchmaking.join", (state) => {
      if (state.status === "MATCHED") {
        handleSnapshot(state.snapshot);
      }
      // QUEUED: matchmaking.matched event will fire when matched
    });

    return () => {
      if (sceneRef.current === "MATCHING" || sceneRef.current === "MATCHED") {
        socket.emit("matchmaking.cancel", () => {});
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!snapshotRef.current) return;
    const socket = getSocket();
    const clientMessageId = `${Date.now()}`;
    // No optimistic update — server broadcasts chat.received to ROOM_ALL (including sender)
    socket.emit(
      "chat.send",
      { roomId: snapshotRef.current.roomId, text: content, clientMessageId },
      () => {}
    );
  };

  const isWin =
    result !== null &&
    ((myRoleRef.current === "PLAYER_A" && result.winner === "PLAYER_A") ||
      (myRoleRef.current === "PLAYER_B" && result.winner === "PLAYER_B"));

  return (
    <div className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative">
      <Header
        variant={scene === "CHATTING" ? "exit" : "back"}
        onExitClick={scene === "CHATTING" ? () => setShowExitConfirm(true) : undefined}
      />

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
          {scene === "MATCHING" && (
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
              <button
                onClick={() => {
                  const socket = getSocket();
                  socket.emit("matchmaking.cancel", () => {});
                  router.push("/");
                }}
                className="text-[#999] text-[16px] underline mt-2"
              >
                취소
              </button>
            </motion.div>
          )}

          {scene === "MATCHED" && (
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

          {(scene === "CHATTING" || scene === "JUDGING" || scene === "RESULT") && (
            <motion.div
              key="chatting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-[1070px] flex flex-col h-full"
            >
              <ConversationHeader
                opponentName="상대방"
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

              {scene === "CHATTING" && (
                <MessageInput currentScore={myRanking?.score ?? 0} onSendMessage={handleSendMessage} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ResultModal
        isOpen={scene === "RESULT"}
        isWin={isWin}
        subtitle={
          result
            ? result.winner === "UNDECIDED"
              ? "무승부"
              : `${isWin ? "+" : ""}${result.scoreDelta}점`
            : undefined
        }
        reasoning={result?.shortReason ?? result?.aSummary}
        onExit={() => router.push("/")}
      />

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6">
          <div className="bg-[#111] border border-[#333] rounded-[16px] p-6 flex flex-col gap-4 w-full max-w-[320px]">
            <p className="text-white text-[18px] font-bold text-center">대화를 종료할까요?</p>
            <p className="text-[#999] text-[14px] text-center">나가면 게임이 종료됩니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 rounded-[8px] border border-[#333] text-white text-[14px]"
              >
                취소
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex-1 py-3 rounded-[8px] bg-[#ff00b7] text-white text-[14px] font-bold"
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationPage;
