import { Game } from "./games";
import { PaginationLinks } from "./common";

export interface BaseBattleMetricsResponse {
  links?: PaginationLinks;
  included?: unknown[];
}

export interface BattleMetricsListResponse<T>
  extends BaseBattleMetricsResponse {
  data: T[];
}

export interface BattleMetricsResponse<T> extends BaseBattleMetricsResponse {
  data: T;
}

export type GameResponse = BattleMetricsResponse<Game>;
export type GameListResponse = BattleMetricsListResponse<Game>;
