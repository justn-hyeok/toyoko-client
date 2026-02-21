"use client"

import { useParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatSummary from "@/components/chat/ChatSummary";
import DottedStar from "@/components/ui/DottedStar";
import { motion } from "motion/react";
import { useAuthStore } from "@/store/auth";
import { roomsApi } from "@/lib/api/rooms";

const ChatHistoryDetailPage = () => {
  const params = useParams();
  const roomId = params?.id as string;
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);

  const [resultQuery, transcriptQuery, timelineQuery] = useQueries({
    queries: [
      {
        queryKey: ["result", roomId],
        queryFn: () => roomsApi.getPrivateResult(roomId, accessToken!),
        enabled: !!accessToken && !!roomId,
      },
      {
        queryKey: ["transcript", roomId],
        queryFn: () => roomsApi.getTranscript(roomId, accessToken!),
        enabled: !!accessToken && !!roomId,
      },
      {
        queryKey: ["timeline", roomId],
        queryFn: () => roomsApi.getTimeline(roomId, accessToken!),
        enabled: !!accessToken && !!roomId,
      },
    ],
  });

  const result = resultQuery.data;
  const transcript = transcriptQuery.data;
  const timeline = timelineQuery.data;

  // Determine my role from timeline MATCH_STARTED event
  const matchStarted = timeline?.timelines.find((e) => e.type === "MATCH_STARTED");
  const playerAId = matchStarted?.payload?.playerAId as string | undefined;
  const myRole: "A" | "B" | null =
    playerAId === undefined ? null :
    user?.id === playerAId ? "A" : "B";

  const isWin =
    result && myRole !== null
      ? (myRole === "A" && result.winner === "A") ||
        (myRole === "B" && result.winner === "B")
      : false;

  const resultLabel = result && myRole !== null
    ? isWin
      ? "승리"
      : "패배"
    : "";

  const endedDate = result?.endedAt
    ? new Date(result.endedAt).toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\. /g, ".").replace(/\.$/, "")
    : "";

  const themes = result
    ? [result.shortReason, result.aSummary, result.bSummary].filter(Boolean)
    : [];

  const isLoading = resultQuery.isLoading || transcriptQuery.isLoading;
  const isError = resultQuery.isError || transcriptQuery.isError;

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center overflow-x-hidden pt-[110px] pb-20">
      <Header variant="back" />

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
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-[#CCC]">불러오는 중...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-[#999]">대화 기록을 불러오지 못했습니다.</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <h2 className="font-['Pretendard',sans-serif] font-bold text-[25px]">
                대화 기록
              </h2>
              <div className="flex flex-col items-end gap-[5px]">
                <span className="font-['Pretendard',sans-serif] font-normal text-[16px]">
                  {endedDate}
                </span>
                {resultLabel && (
                  <span className="font-['Pretendard',sans-serif] font-semibold text-[20px] text-[#ff00b7]">
                    {resultLabel}
                  </span>
                )}
              </div>
            </motion.div>

            {themes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ChatSummary themes={themes} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col w-full mt-4"
            >
              {transcript?.messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  content={msg.text}
                  isMe={myRole !== null && msg.sender === myRole}
                />
              ))}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default ChatHistoryDetailPage;
