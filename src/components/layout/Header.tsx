"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  activeTitle?: string;
}

const Header = ({ className, activeTitle }: HeaderProps) => {
  return (
    <header
      className={cn(
        "bg-black border-white border-b border-solid flex h-[63px] items-center justify-center px-4 md:px-[184px] py-[15px] fixed top-0 z-50 w-full",
        className
      )}
    >
      <div className="flex items-center justify-between w-full max-w-[1071px]">
        <Link href="/" className="bg-white flex h-[38px] items-center justify-center px-4 py-2 rounded-sm transition-opacity hover:opacity-90">
          <span className="font-['Pretendard',sans-serif] font-bold text-[20px] text-black">
            로고
          </span>
        </Link>
        <div className="flex gap-24"> 
          <h1 className="font-['Pretendard',sans-serif] font-bold text-[20px] text-white tracking-[0.1px]">
            대전
          </h1>

          <h1 className="font-['Pretendard',sans-serif] font-bold text-[20px] text-white tracking-[0.1px]">
            마이페이지
          </h1>

          <h1 className="font-['Pretendard',sans-serif] font-bold text-[20px] text-white tracking-[0.1px]">
            사용자님
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
