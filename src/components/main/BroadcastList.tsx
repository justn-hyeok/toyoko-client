"use client"

import BroadcastCard from "./BroadcastCard";

const BroadcastList = () => {
  // Mock data based on Figma
  const broadcasts = [
    { id: 1, title: "00과 00 대화가 아주 재미있네요!", viewerCount: 100 },
    { id: 2, title: "00과 11 대화가 아주 재미있네요!", viewerCount: 50 },
    { id: 3, title: "11과 22 대화가 아주 재미있네요!", viewerCount: 20 },
    { id: 4, title: "22과 33 대화가 아주 재미있네요!", viewerCount: 10 },
  ];

  return (
    <section className="flex flex-col items-center gap-[25px] w-full max-w-[1081px] z-9999">
      {broadcasts.map((broadcast, index) => (
        <BroadcastCard 
          key={index} 
          id={broadcast.id}
          title={broadcast.title} 
          viewerCount={broadcast.viewerCount} 
        />
      ))}
    </section>
  );
};

export default BroadcastList;
