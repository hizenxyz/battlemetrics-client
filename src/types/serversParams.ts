// src/types/serversParams.ts
import { PageParams } from "./commonParams";

/**
 * Fields parameter for requesting specific server attributes.
 */
export interface ServerFields {
  /**
   * Request that only some attributes are returned.
   *
   * @example "name,ip,port"
   */
  server?: string;
}

/**
 * Filter parameters for server list requests.
 */
export interface ServerListFilters {
  /**
   * Filter to servers that you have favorited.
   */
  favorites?: boolean;

  /**
   * Filter by game id.
   *
   * @example "ark"
   */
  game?: string;

  /**
   * True to only return group leaders, false to exclude them.
   */
  groupLeader?: boolean;

  /**
   * Return servers that belong to a group.
   *
   * @example "example"
   */
  groups?: string;

  /**
   * Filter by server IDs (blacklist/whitelist).
   */
  ids?: {
    /**
     * Don't include servers with the given id(s). Comma separated.
     *
     * @example "123"
     */
    blacklist?: string;
    /**
     * Only include servers with the given id(s). Comma separated.
     *
     * @example "123"
     */
    whitelist?: string;
  };

  /**
   * Max distance allowed in kilometers.
   *
   * @example 5000
   */
  maxDistance?: number;

  /**
   * Filter servers by organization id(s). Comma separated.
   *
   * @example "123"
   */
  organizations?: string;

  /**
   * Filter by player count range.
   */
  players?: {
    /**
     * Maximum number of players. Default: "Infinity", Range: 0 <= value.
     *
     * @example 42
     */
    max?: number;
    /**
     * Minimum number of players. Default: 0, Range: 0 <= value.
     *
     * @example 42
     */
    min?: number;
  };

  /**
   * Filter servers that you have RCON access to.
   */
  rcon?: boolean;

  /**
   * Search term(s).
   *
   * @example "PvE"
   */
  search?: string;

  /**
   * Filter by server status.
   *
   * @example "online"
   */
  status?: string;
}

/**
 * Relations parameter for requesting specific relationships.
 */
export interface ServerRelations {
  /**
   * Request that only some relationships are returned.
   *
   * @example "a,b"
   */
  server?: string;
}

/**
 * Query parameters for listing servers from BattleMetrics.
 *
 * @example
 * ```typescript
 * const params: ServerListParams = {
 *   fields: { server: "name,ip,port" },
 *   filter: {
 *     game: "ark",
 *     status: "online",
 *     search: "PvE",
 *     players: { min: 10, max: 100 },
 *     ids: { blacklist: "123,456" }
 *   },
 *   include: "serverGroup",
 *   location: "47.6140999,-122.1966754",
 *   page: { size: 50, key: "100", rel: "next" },
 *   relations: { server: "a,b" },
 *   sort: "players"
 * };
 * ```
 */
export interface ServerListParams {
  /**
   * Request that only some attributes are returned.
   */
  fields?: ServerFields;

  /**
   * Filter options for the server list.
   */
  filter?: ServerListFilters;

  /**
   * Relations to include. Comma separated. Valid values: serverGroup.
   *
   * @example "serverGroup"
   */
  include?: string;

  /**
   * Your location. Format: longitude,latitude.
   *
   * @example "47.6140999,-122.1966754"
   */
  location?: string;

  /**
   * Params for paginating the result set.
   */
  page?: PageParams;

  /**
   * Request that only some relationships are returned.
   */
  relations?: ServerRelations;

  /**
   * Sorting options. Default is "rank". Options: rank, name, players, distance.
   *
   * @example "rank"
   * @example "name"
   * @example "players"
   * @example "distance"
   */
  sort?: string;
}
