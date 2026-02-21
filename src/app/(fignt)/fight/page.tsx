'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DottedStar from "@/components/ui/DottedStar";

const MatchingPage = () => {
  const [isMatched, setIsMatched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate a matching delay
    const timer = setTimeout(() => {
      setIsMatched(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Header with Exit action */}
      <header className="fixed top-0 left-0 w-full h-[63px] border-b border-white bg-black z-50 px-4 md:px-[184px] flex items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-[1071px]">
          <button 
            onClick={() => router.back()} 
            className="hover:opacity-70 transition-opacity"
          >
            <Image src="/back_arrow.svg" alt="Back" width={47} height={16} />
          </button>
          <Link href="/mypage" className="text-[20px] font-bold tracking-[0.1px] hover:opacity-70 transition-opacity">
            마이페이지
          </Link>
        </div>
      </header>

      {/* Background Decorative Elements */}
      {/* Star 5 (Pink Big) - top right */}
      <div className="fixed top-[-71px] right-[-100px] w-[500px] h-[500px] opacity-80 pointer-events-none z-0 rotate-[12deg]">
        <DottedStar 
          maskSrc="/star_pink_path.svg" 
          color="#FF00B7" 
          className="size-full" 
          dotSize="20px 20px"
        />
      </div>
      
      {/* Star 6 (Pink Med) - bottom right */}
      <div className="fixed bottom-[150px] right-[100px] w-[150px] h-[150px] opacity-80 pointer-events-none z-0 rotate-[12deg]">
        <DottedStar 
          maskSrc="/star_pink_path.svg" 
          color="#FF00B7" 
          className="size-full"
        />
      </div>

      {/* Star 7 (Pink Small) - far bottom right */}
      <div className="fixed bottom-[100px] right-[50px] w-[50px] h-[50px] opacity-80 pointer-events-none z-0 rotate-[12deg]">
        <DottedStar 
          maskSrc="/star_pink_path.svg" 
          color="#FF00B7" 
          className="size-full"
          dotSize="8px 8px"
        />
      </div>

      {/* Star 3 (Purple Big) - bottom left */}
      <div className="fixed bottom-[-300px] left-[-300px] w-[900px] h-[900px] opacity-80 pointer-events-none z-0 rotate-[12deg]">
        <DottedStar 
          maskSrc="/star_purple_path.svg" 
          color="#8A01D9" 
          className="size-full"
          dotSize="30px 30px"
        />
      </div>

      {/* Matching Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen" >
        {!isMatched ? (
          <div className="flex flex-col items-center gap-[20px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="relative w-12 h-12"
            >
              <Image src="/loading_circle.svg" alt="Loading" fill />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[30px] font-bold"
            >
              매칭 중
            </motion.p>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-[30px] font-bold text-[#FF00B7]">매칭 완료!</p>
            <p className="text-[#CCC]">대화방으로 이동합니다...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default MatchingPage;
