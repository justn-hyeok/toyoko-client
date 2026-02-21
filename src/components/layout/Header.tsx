"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  className?: string;
  activeTitle?: string;
}

const Header = ({ className }: HeaderProps) => {
  const router = useRouter();
  return (
    <header
      className={cn(
        "bg-black border-white border-b border-solid flex h-[72px] items-center justify-center px-4 md:px-[184px] py-[15px] fixed top-0 z-50 w-full",
        className
      )}
    >
      <div className="flex items-center justify-between w-full max-w-[1071px]">
        <Link href="/" className="flex h-[38px] items-center justify-center transition-opacity hover:opacity-90">
          <Image src="/logo_gnb.svg" alt="Logo" width={105} height={48} className="object-contain" />
        </Link>
        <div className="flex gap-24">    
          <h1 className="font-['Pretendard',sans-serif] font-bold text-[20px] text-white tracking-[0.1px] cursor-pointer" onClick={() => {router.push("/mypage")}}>
            사용자님
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
