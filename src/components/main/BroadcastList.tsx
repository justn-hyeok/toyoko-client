"use client"

import BroadcastCard from "./BroadcastCard";

const BroadcastList = () => {
  // Mock data based on Figma
  const broadcasts = [
    { id: 1, title: "은지님과 토요코님의 대화", viewerCount: 100 },
    { id: 2, title: "은지님과 토요코님의 대화", viewerCount: 100 },
    { id: 3, title: "은지님과 토요코님의 대화", viewerCount: 100 },
    { id: 4, title: "은지님과 토요코님의 대화", viewerCount: 100 },
    { id: 5, title: "은지님과 토요코님의 대화", viewerCount: 100 },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1090px] rounded-[10px] max-h-[300px] items-center pb-32 overflow-scroll z-9999 scroll-smooth scroll-snap-y mandatory">
      {broadcasts.map((broadcast) => (
        <BroadcastCard 
          key={broadcast.id}
          title={broadcast.title}
          viewerCount={broadcast.viewerCount}
        />
      ))}
    </div>
  );
};

export default BroadcastList;
