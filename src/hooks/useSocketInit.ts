"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";

export function useSocketInit() {
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const socket = connectSocket(accessToken);

    socket.on("socket.connected", ({ userId, email }) => {
      console.log("[socket] connected", { userId, email });
    });

    socket.on("socket.error", ({ event, message }) => {
      console.error("[socket] error", { event, message });
      disconnectSocket();
    });

    return () => {
      socket.off("socket.connected");
      socket.off("socket.error");
    };
  }, [accessToken]);

  useEffect(() => {
    return () => {
      const s = getSocket();
      if (s.connected) disconnectSocket();
    };
  }, []);
}
