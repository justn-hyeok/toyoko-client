"use client"

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  currentScore: number;
  onSendMessage: (content: string) => void;
  className?: string;
}

const MessageInput = ({ currentScore, onSendMessage, className }: MessageInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSendMessage(value);
      setValue("");
    }
  };

  return (
    <div className={cn("w-full max-w-[1070px] flex flex-col gap-[12px]", className)}>
      <div className="flex items-center gap-[10px] text-white">
        <span className="font-['Pretendard',sans-serif] font-normal text-[15px]">
          현재 점수
        </span>
        <span className="font-['Pretendard',sans-serif] font-bold text-[20px]">
          {currentScore}
        </span>
      </div>

      <div className="relative w-full h-[49px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="내용을 입력해 주세요."
          className="w-full h-full bg-white rounded-[100px] px-[35px] py-[15px] pr-[60px] text-[15px] font-['Pretendard',sans-serif] text-[#222] placeholder:text-[#777] outline-none"
        />
        <button
          onClick={handleSend}
          className="absolute right-[5px] top-[5px] size-[39px] bg-[#ff00b7] rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
