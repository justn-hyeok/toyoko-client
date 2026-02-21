import { api } from "@/lib/api";
import type { RoomSummary, RoomSnapshot, MatchmakingState } from "@/lib/socket/types";

export interface RankingEntry {
  rank: number;
  userId: string;
  email: string;
  score: number;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface PrivateResult {
  roomId: string;
  status: string;
  aiStatus: string;
  archiveStatus: string;
  winner: "A" | "B" | null;
  confidence: number;
  shortReason: string;
  aSummary: string;
  bSummary: string;
  isFallback: boolean;
  ratingApplied: boolean;
  playerAScoreDelta: number;
  playerBScoreDelta: number;
  playerAMmrDelta: number;
  playerBMmrDelta: number;
  playerAScoreAfter: number;
  playerBScoreAfter: number;
  endedAt: string;
}

export interface PublicResult {
  roomId: string;
  status: string;
  aiStatus: string;
  archiveStatus: string;
  winner: "A" | "B" | null;
  aSummary: string;
  bSummary: string;
  resultReadyAt: string;
}

export interface TranscriptMessage {
  id: string;
  sender: "A" | "B";
  text: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export const roomsApi = {
  listRooms: (token: string) =>
    api.get<{ rooms: RoomSummary[] }>("/rooms", token),

  joinMatchmaking: (token: string) =>
    api.post<MatchmakingState>("/rooms/matchmaking/join", {}, token),

  cancelMatchmaking: (token: string) =>
    api.post<{ canceled: boolean }>("/rooms/matchmaking/cancel", {}, token),

  getMatchmakingStatus: (token: string) =>
    api.get<MatchmakingState>("/rooms/matchmaking/status", token),

  joinSpectator: (roomId: string, token: string) =>
    api.post<RoomSnapshot>(`/rooms/${roomId}/join-spectator`, {}, token),

  getRanking: (limit = 50) =>
    api.get<{ ranking: RankingEntry[] }>(`/rooms/ranking?limit=${limit}`),

  getMyRanking: (token: string) =>
    api.get<RankingEntry>("/rooms/ranking/me", token),

  getPrivateResult: (roomId: string, token: string) =>
    api.get<PrivateResult>(`/rooms/${roomId}/result/private`, token),

  getPublicResult: (roomId: string) =>
    api.get<PublicResult>(`/rooms/${roomId}/result/public`),

  getTranscript: (roomId: string, token: string) =>
    api.get<{ roomId: string; messages: TranscriptMessage[] }>(
      `/rooms/${roomId}/transcript`,
      token
    ),

  getTimeline: (roomId: string, token: string) =>
    api.get<{ roomId: string; timelines: TimelineEvent[] }>(
      `/rooms/${roomId}/timeline`,
      token
    ),
};
