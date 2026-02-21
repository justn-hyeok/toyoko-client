"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { connectSocket, disconnectSocket } from "@/lib/socket";

export function useSocketInit() {
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const socket = connectSocket(accessToken);

    const onConnected = ({ userId, email }: { userId: string; email: string }) => {
      console.log("[socket] connected", { userId, email });
    };

    const onError = ({ event, message }: { event?: string; message: string }) => {
      console.error("[socket] error", { event, message });
    };

    socket.on("socket.connected", onConnected);
    socket.on("socket.error", onError);

    return () => {
      socket.off("socket.connected", onConnected);
      socket.off("socket.error", onError);
      disconnectSocket();
    };
  }, [accessToken]);
}
