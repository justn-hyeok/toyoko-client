"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { disconnectSocket } from "@/lib/socket";

interface HeaderProps {
  className?: string;
  variant?: 'default' | 'back' | 'exit';
  onExitClick?: () => void;
}

const Header = ({ className, variant = 'default', onExitClick }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const displayName = user?.email?.split("@")[0] ?? "사용자";

  const handleLogout = () => {
    clearAuth();
    disconnectSocket();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "bg-black border-white border-b border-solid flex h-[63px] items-center justify-center px-4 md:px-[184px] py-[15px] fixed top-0 z-50 w-full",
        className
      )}
    >
      <div className="flex items-center justify-between w-full max-w-[1071px]">
        {variant === 'back' ? (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center transition-opacity hover:opacity-70 text-white"
          >
            <ArrowLeft size={32} />
          </button>
        ) : variant === 'exit' ? (
          <button
            onClick={() => {
              if (onExitClick) {
                onExitClick();
              } else {
                router.push("/");
              }
            }}
            className="flex h-[38px] items-center justify-center transition-opacity hover:opacity-70 text-white font-['Pretendard',sans-serif] font-bold text-[20px]"
          >
            나가기
          </button>
        ) : (
          <Link href="/" className="flex h-[38px] items-center justify-center transition-opacity hover:opacity-90">
            <Image src="/logo_gnb.svg" alt="Logo" width={105} height={48} className="object-contain" />
          </Link>
        )}

        {variant !== 'exit' && (
          <div className="flex gap-24">
            <Link
              href="/ranking"
              className={cn(
                "font-['Pretendard',sans-serif] font-bold text-[20px] tracking-[0.1px] transition-colors",
                pathname === "/ranking" ? "text-[#ff00b7]" : "text-white hover:opacity-70"
              )}
            >
              랭킹
            </Link>

            <Link
              href="/mypage"
              className={cn(
                "font-['Pretendard',sans-serif] font-bold text-[20px] tracking-[0.1px] transition-colors",
                pathname === "/mypage" ? "text-[#ff00b7]" : "text-white hover:opacity-70"
              )}
            >
              {displayName}님
            </Link>

            <button
              onClick={handleLogout}
              className="font-['Pretendard',sans-serif] font-bold text-[20px] tracking-[0.1px] text-[#666] hover:text-white transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
