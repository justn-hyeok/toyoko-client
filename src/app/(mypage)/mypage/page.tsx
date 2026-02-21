"use client"

import Image from "next/image";
import Header from "@/components/layout/Header";

const MyPage = () => {
  const chatHistory = [
    { title: "00과 대화", status: "승리", date: "25.12.04" },
    { title: "00과 대화", status: "승리", date: "25.12.04" },
    { title: "00과 대화", status: "승리", date: "25.12.04" },
    { title: "00과 대화", status: "승리", date: "25.12.04" },
    { title: "00과 대화", status: "승리", date: "25.12.04" },
  ];

  const watchHistory = [
    { title: "00과 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
    { title: "00 vs 00 대화", date: "25.12.04" },
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white font-['Pretendard',sans-serif] overflow-hidden overscroll-none relative"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <Header activeTitle="마이페이지" />

      {/* Background Decorative Elements */}
      <div className="fixed top-[-216px] right-[-250px] w-[698px] h-[698px] opacity-80 pointer-events-none rotate-[11.94deg] z-0">
        <Image
          src="/assets/2b5b5f6473f92c8098a6aaa81129027a8e349239.svg"
          alt="Star 2"
          width={698}
          height={698}
        />
      </div>
      <div className="fixed bottom-[-300px] left-[-290px] w-[774px] h-[774px] opacity-80 pointer-events-none rotate-[-148.16deg] z-0">
        <Image
          src="/assets/2efc3c9b1e9e77632dd1f0c300dc3a129155ff5d.svg"
          alt="Star 1"
          width={774}
          height={774}
        />
      </div>

      <main className="relative z-10 px-4 md:px-[185px] pt-[92px] pb-[100px] max-w-[1440px] mx-auto">
        <h2 className="text-[30px] font-bold mb-[45px]">마이페이지</h2>

        <div className="flex flex-col lg:flex-row gap-[10px]">
          {/* 대화 기록 Card */}
          <div className="bg-white rounded-[10px] w-full lg:w-[530px] min-h-[550px] px-[45px] pt-[50px] pb-[60px] text-black">
            <h3 className="text-[25px] font-semibold mb-[45px]">대화 기록</h3>
            <div className="space-y-[20px]">
              {chatHistory.map((item, index) => (
                <div key={index} className="space-y-[7px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[20px] font-semibold text-[#222]">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-[15px] text-[#555]">{item.date}</p>
                  </div>
                  <div className="h-[1px] w-full bg-[#C0C0C0]" />
                </div>
              ))}
            </div>
          </div>

          {/* 시청 기록 Card */}
          <div className="bg-white rounded-[10px] w-full lg:w-[530px] min-h-[550px] px-[45px] pt-[50px] pb-[60px] text-black">
            <h3 className="text-[25px] font-semibold mb-[45px]">시청 기록</h3>
            <div className="space-y-[25px]">
              {watchHistory.map((item, index) => (
                <div key={index} className="space-y-[7px]">
                  <div className="flex justify-between items-center">
                    <p className="text-[20px] font-semibold text-[#222]">
                      {item.title}
                    </p>
                    <p className="text-[15px] text-[#555]">{item.date}</p>
                  </div>
                  <div className="h-[1px] w-full bg-[#C0C0C0]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
