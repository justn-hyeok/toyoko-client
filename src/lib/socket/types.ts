// ─── 공통 타입 ───────────────────────────────────────────────────────────────

export type PlayerRole = "PLAYER_A" | "PLAYER_B";
export type RoomStatus = "LIVE" | "ENDING" | "ENDED";
export type MatchmakingStatus = "IDLE" | "QUEUED" | "MATCHED";
export type ReactionType = "LIKE" | "DISLIKE";
export type ExtensionVote = "YES" | "NO";
export type ArchiveStatus = "SAVED" | "NONE";
export type AiStatus = "PENDING" | "JUDGING" | "DONE";
export type ResultStatus = string;

export interface RoomSummary {
  id: string;
  status: RoomStatus;
  playerAId: string;
  playerBId: string;
  spectatorCount: number;
  likeCount: number;
  dislikeCount: number;
  startedAt: string;
  endAt: string;
  endedAt: string | null;
  aiStatus: AiStatus;
  winner: PlayerRole | null;
  archiveStatus: ArchiveStatus;
  archiveSavedAt: string | null;
}

export interface RoomSnapshot {
  roomId: string;
  status: RoomStatus;
  playerAId: string;
  playerBId: string;
  yourRole: PlayerRole | "SPECTATOR";
  startedAt: string;
  endAt: string;
  voteDeadline: string | null;
  extensionCount: number;
  likeCount: number;
  dislikeCount: number;
  archiveStatus: ArchiveStatus;
}

// ─── Matchmaking 상태 ─────────────────────────────────────────────────────────

export type MatchmakingState =
  | { status: "IDLE" }
  | {
      status: "QUEUED";
      roomId: string;
      queuedAt: string;
      queueElapsedMs: number;
      mmrHintRange: { min: number; max: number };
    }
  | { status: "MATCHED"; snapshot: RoomSnapshot };

// ─── Server → Client 이벤트 ───────────────────────────────────────────────────

export interface ServerToClientEvents {
  "socket.connected": (payload: { userId: string; email: string }) => void;
  "socket.error": (payload: { event?: string; message: string }) => void;

  "room.list.updated": (payload: { rooms: RoomSummary[] }) => void;

  "matchmaking.queued": (payload: Extract<MatchmakingState, { status: "QUEUED" }>) => void;
  "matchmaking.status": (payload: MatchmakingState) => void;
  "matchmaking.matched": (payload: RoomSnapshot) => void;

  "room.reconnected": (payload: RoomSnapshot) => void;
  "spectator.joined": (payload: { roomId: string; spectatorCount: number }) => void;
  "room.leave": (payload: { roomId: string; userId: string; role: PlayerRole; leaveReason: string }) => void;

  "timer.sync": (payload: {
    roomId: string;
    serverNow: string;
    endAt: string;
    voteDeadline: string | null;
    phase: string;
    seq: number;
  }) => void;

  "chat.received": (payload: {
    roomId: string;
    messageId: string;
    sender: "A" | "B";
    text: string;
    serverSentAt: string;
  }) => void;

  "reaction.updated": (payload: {
    roomId: string;
    reactionType: ReactionType;
    likeTotal: number;
    dislikeTotal: number;
  }) => void;

  "extension.vote": (payload: {
    roomId: string;
    voter: PlayerRole;
    vote: ExtensionVote;
  }) => void;
  "extension.opened": (payload: {
    roomId: string;
    openedAt: string;
    voteDeadline: string;
    extensionCount: number;
  }) => void;
  "extension.result": (
    payload:
      | { roomId: string; approved: true; newEndAt: string; extensionCount: number; reason: string }
      | { roomId: string; approved: false; reason: string }
  ) => void;

  "game.ended": (payload: { roomId: string; endedAt: string; endReason: string }) => void;
  "archive.saved": (payload: { roomId: string; archiveStatus: ArchiveStatus; archiveSavedAt: string }) => void;

  "ai.judging.started": (payload: { roomId: string; judgingStartedAt: string }) => void;
  "ai.judging.completed": (
    payload:
      | {
          roomId: string;
          resultStatus: ResultStatus;
          winner: PlayerRole | "UNDECIDED" | null;
          confidence: number;
          shortReason: string;
          aSummary: string;
          bSummary: string;
          isFallback: boolean;
          rating: {
            playerAScoreDelta: number;
            playerBScoreDelta: number;
            playerAMmrDelta: number;
            playerBMmrDelta: number;
            playerAScoreAfter: number;
            playerBScoreAfter: number;
          };
        }
      | {
          roomId: string;
          resultStatus: ResultStatus;
          winner: PlayerRole | "UNDECIDED" | null;
          aSummary: string;
          bSummary: string;
        }
  ) => void;
}

// ─── Client → Server 이벤트 ───────────────────────────────────────────────────

export interface ClientToServerEvents {
  "room.list.subscribe": (callback: (res: { ok: true }) => void) => void;

  "matchmaking.join": (callback: (res: MatchmakingState) => void) => void;
  "matchmaking.cancel": (callback: (res: { canceled: boolean }) => void) => void;
  "matchmaking.status.request": (callback: (res: MatchmakingState) => void) => void;

  "room.join.spectator": (
    payload: { roomId: string },
    callback: (res: RoomSnapshot) => void
  ) => void;
  "room.reconnect": (
    payload: { roomId: string },
    callback: (res: RoomSnapshot) => void
  ) => void;
  "room.leave": (
    payload: { roomId: string },
    callback: (res: { ok: true }) => void
  ) => void;

  "timer.sync.request": (
    payload: { roomId: string },
    callback: (res: { ok: true }) => void
  ) => void;

  "chat.send": (
    payload: { roomId: string; text: string; clientMessageId?: string },
    callback: (res: { ok: true }) => void
  ) => void;

  "reaction.send": (
    payload: { roomId: string; reactionType: ReactionType; clientEventId?: string },
    callback: (res: { ok: true }) => void
  ) => void;

  "extension.vote": (
    payload: { roomId: string; vote: ExtensionVote },
    callback: (res: { ok: true }) => void
  ) => void;
}
