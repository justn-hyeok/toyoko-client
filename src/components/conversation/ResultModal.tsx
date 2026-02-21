"use client"

import { motion, AnimatePresence } from "motion/react";

interface ResultModalProps {
  isOpen: boolean;
  isWin: boolean;
  title?: string;
  subtitle?: string;
  reasoning?: string;
  onExit: () => void;
}

const ResultModal = ({ isOpen, isWin, title, subtitle, reasoning, onExit }: ResultModalProps) => {
  const displayTitle = title ?? (isWin ? "승리" : "패배");
  const displaySubtitle = subtitle ?? (isWin ? "축하해요!" : "아쉽네요, 다음 기회에!");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onExit}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[10px] w-full max-w-[422px] px-[35px] pt-[40px] pb-[30px] flex flex-col items-center gap-[45px]"
          >
            <div className="flex flex-col items-center gap-[10px] text-center">
              <h3 className="font-['Pretendard',sans-serif] font-bold text-[25px] text-[#222]">
                {displayTitle}
              </h3>
              <p className="font-['Pretendard',sans-serif] font-medium text-[20px] text-[#555]">
                {displaySubtitle}
              </p>
              {reasoning && (
                <p className="text-[#999] text-[13px] text-center mt-2 px-4">{reasoning}</p>
              )}
            </div>

            <button
              onClick={onExit}
              className="w-full bg-[#8a01d9] rounded-[5px] py-[20px] font-['Pretendard',sans-serif] font-bold text-[20px] text-white transition-opacity hover:opacity-90"
            >
              나가기
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
