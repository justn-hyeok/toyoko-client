"use client"

import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getSocket } from "@/lib/socket";

interface ReactionPanelProps {
  className?: string;
  roomId: string;
  initialLikeCount?: number;
  initialDislikeCount?: number;
}

const ReactionPanel = ({ className, roomId, initialLikeCount = 0, initialDislikeCount = 0 }: ReactionPanelProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  useEffect(() => {
    setDislikeCount(initialDislikeCount);
  }, [initialDislikeCount]);

  useEffect(() => {
    const socket = getSocket();
    const handleReactionUpdated = ({ roomId: eventRoomId, likeTotal, dislikeTotal }: {
      roomId: string;
      reactionType: string;
      likeTotal: number;
      dislikeTotal: number;
    }) => {
      if (eventRoomId === roomId) {
        setLikeCount(likeTotal);
        setDislikeCount(dislikeTotal);
      }
    };
    socket.on("reaction.updated", handleReactionUpdated);
    return () => {
      socket.off("reaction.updated", handleReactionUpdated);
    };
  }, [roomId]);

  const handleReact = (type: "LIKE" | "DISLIKE") => {
    const socket = getSocket();
    socket.emit("reaction.send", { roomId, reactionType: type }, () => {});
  };

  return (
    <div className={cn(
      "bg-[#282828] rounded-[10px] w-full max-w-[1071px] px-[20px] py-[30px] flex flex-col items-center gap-[30px]",
      className
    )}>
      <p className="font-['Pretendard',sans-serif] text-[15px] text-white text-center leading-[1.3]">
        대화에 대한 반응을 선택 해 주세요!
      </p>

      <div className="flex gap-[15px] items-center justify-center w-full">
        <button
          onClick={() => handleReact("LIKE")}
          className="bg-white rounded-[1000px] h-[63px] px-[25px] py-[13px] flex items-center justify-between w-[133px] transition-transform active:scale-95"
        >
          <ThumbsUp size={35} className="text-[#CCC]" />
          <span className="font-['Pretendard',sans-serif] font-bold text-[25px] text-[#ff00b7]">
            {likeCount}
          </span>
        </button>

        <button
          onClick={() => handleReact("DISLIKE")}
          className="bg-white rounded-[1000px] h-[63px] px-[25px] py-[13px] flex items-center justify-between w-[133px] transition-transform active:scale-95"
        >
          <ThumbsUp size={35} className="text-[#CCC]" />
          <span className="font-['Pretendard',sans-serif] font-bold text-[25px] text-[#8a01d9]">
            {dislikeCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReactionPanel;
