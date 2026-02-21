"use client"

import Image from "next/image";
import { motion } from "motion/react";
import BroadcastList from "@/components/main/BroadcastList";
import DottedStar from "@/components/ui/DottedStar";

const MainHero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Decorative Stars */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
        }}
        className="absolute right-[-100px] top-[-50px] w-[600px] h-[600px] opacity-100 pointer-events-none hidden lg:block"
      >
        <DottedStar 
          maskSrc="/star_purple_path.svg" 
          color="#8A01D9" 
          className="size-full" 
          dotSize="24px 24px"
        />
      </motion.div>

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
        }}
        className="absolute left-[-200px] bottom-[-100px] w-[500px] h-[500px] opacity-100 pointer-events-none hidden lg:block"
      >
        <DottedStar 
          maskSrc="/star_pink_path.svg" 
          color="#FF00B7" 
          className="size-full" 
          dotSize="20px 20px"
        />
      </motion.div>


      {/* Main Logo and Title */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <div className="relative w-[400px] md:w-[731px] aspect-[731/362]">
          <Image src="/logo.svg" alt="TOYOKO Logo" fill className="object-contain" priority />

        </div>
        <p className="text-white text-xl md:text-[20px] font-bold tracking-tight text-center mb-10 ">
          대화를 지금 시청해 보세요!
        </p>  
    
      </motion.div>

      <BroadcastList/>  
    </div>
  );
};

export default MainHero;
