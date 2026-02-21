"use client"

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BroadcastCard from "./BroadcastCard";
import { roomsApi } from "@/lib/api/rooms";
import { useAuthStore } from "@/store/auth";
import { getSocket } from "@/lib/socket";
import type { RoomSummary } from "@/lib/socket/types";

const BroadcastList = () => {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => roomsApi.listRooms(token!),
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) return;
    const socket = getSocket();
    socket.emit("room.list.subscribe", () => {});

    const handleRoomListUpdated = ({ rooms: updated }: { rooms: RoomSummary[] }) => {
      queryClient.setQueryData(["rooms"], { rooms: updated });
    };
    socket.on("room.list.updated", handleRoomListUpdated);
    return () => {
      socket.off("room.list.updated", handleRoomListUpdated);
    };
  }, [token, queryClient]);

  const rooms = data?.rooms ?? [];
  if (!rooms.length) return null;

  return (
    <section className="flex flex-col items-center gap-[25px] w-full max-w-[1081px] z-9999">
      {rooms.map((room) => (
        <BroadcastCard
          key={room.id}
          id={room.id}
          title={`실시간 대화 중 · 관전자 ${room.spectatorCount}명`}
          viewerCount={room.spectatorCount}
        />
      ))}
    </section>
  );
};

export default BroadcastList;
