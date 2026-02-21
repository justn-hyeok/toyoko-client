import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "./types";

export type { ServerToClientEvents, ClientToServerEvents };
export type { RoomSnapshot, RoomSummary, MatchmakingState, ReactionType, ExtensionVote } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: AppSocket | null = null;

export function getSocket(): AppSocket {
  if (!socket) {
    socket = io(`${BASE_URL}/game`, {
      autoConnect: false,
      withCredentials: true,
    });
  }
  return socket;
}

export function connectSocket(token: string): AppSocket {
  const s = getSocket();
  s.auth = { token };
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  socket?.disconnect();
}
