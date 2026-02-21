"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface HistoryDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: string;
}

const HistoryDetailModal = ({
  isOpen,
  onOpenChange,
  title,
  summary,
}: HistoryDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[860px] w-full p-0 bg-white border-0 rounded-[10px] overflow-hidden">
        <div className="relative flex flex-col items-center justify-center pt-[30px] pb-[35px] px-[40px] h-[485px]">
          <DialogClose className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors">
            <X className="size-6 text-[#222]" />
            <span className="sr-only">닫기</span>
          </DialogClose>
          <DialogHeader className="w-full mb-[20px] p-0 space-y-0">
            <DialogTitle className="font-['Pretendard',sans-serif] font-bold text-[20px] text-[#222] text-center leading-6 tracking-[0px]">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-[#f3f3f3] w-full flex-grow rounded-[10px] px-[30px] py-[25px] overflow-y-auto">
            <p className="font-['Pretendard',sans-serif] font-normal text-[15px] text-[#333] leading-[21px] tracking-[0.075px] whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDetailModal;
