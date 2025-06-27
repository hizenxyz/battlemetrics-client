/**
 * The set of possible resource types returned by the BattleMetrics API.
 */
export enum ResourceType {
  Game = "game",
  Server = "server",
}

/**
 * Server status values.
 */
export enum ServerStatus {
  Online = "online",
  Offline = "offline",
  Dead = "dead",
  Removed = "removed",
  Invalid = "invalid",
}

/**
 * Query status values.
 */
export enum QueryStatus {
  Valid = "valid",
  Invalid = "invalid",
  Timeout = "timeout",
}

/**
 * RCON status values.
 */
export enum RconStatus {
  Connected = "connected",
  Disconnected = "disconnected",
  PasswordRejected = "password-rejected",
  Timeout = "timeout",
  Refused = "refused",
  Unknown = "unknown",
}

/**
 * Connection type values.
 */
export enum ConnectionType {
  Source = "source",
  WS = "ws",
}

/**
 * The set of possible pagination directions.
 */
export type PaginationDirection = "next" | "prev";

export interface PaginationLinks
  extends Partial<Record<PaginationDirection, string>> {
  first?: string;
  last?: string;
}
