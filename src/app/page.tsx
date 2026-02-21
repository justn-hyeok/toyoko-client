import Header from "@/components/layout/Header";
import FightButton from "@/components/FightButton";
import MainHero from "@/components/main/MainHero";

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <Header/>
      
      <main className="w-full flex flex-col items-center gap-12 px-4 md:px-0">
        <MainHero />
      </main>

      <div className="fixed w-full h-[100vh] z-9999 top-200 left-350">
      <FightButton />
      </div>
    </div>
  );
}
