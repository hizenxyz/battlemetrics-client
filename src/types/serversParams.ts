// src/types/serversParams.ts
import { PageParams } from "./commonParams";
import { ServerAttributes } from "./servers";

/**
 * Parameters for requesting specific server attributes.
 */
export interface FieldsParams {
  /**
   * Request only specific attributes of the server be returned.
   * Can be a single attribute, array of attributes, or comma-separated string.
   *
   * @example "name"
   * @example ["name", "ip", "port"]
   * @example "name,ip,port"
   */
  server?: keyof ServerAttributes | (keyof ServerAttributes)[] | string;
}

/**
 * Filter parameters for narrowing down server results.
 */
export interface FilterParams {
  /**
   * Filter to servers that you have favorited.
   */
  favorites?: boolean;

  /**
   * Filter by game identifier.
   *
   * @example "ark"
   * @example "rust"
   * @example "dayz"
   */
  game?: string;

  /**
   * True to only return group leaders, false to exclude them.
   */
  groupLeader?: boolean;

  /**
   * Return servers that belong to a specific group.
   *
   * @example "example"
   */
  groups?: string;

  /**
   * Maximum distance allowed in kilometers.
   * Only useful when sorting by distance.
   *
   * @example 5000
   */
  maxDistance?: number;

  /**
   * Filter servers by organization ID(s). Comma-separated.
   *
   * @example "123"
   * @example "123,456,789"
   */
  organizations?: string;

  /**
   * Filter servers that you have RCON access to.
   */
  rcon?: boolean;

  /**
   * Search term(s) to filter servers by name or description.
   *
   * @example "PVE"
   * @example "vanilla"
   * @example "modded"
   */
  search?: string;

  /**
   * Filter by server status.
   *
   * @example "online"
   * @example "offline"
   */
  status?: string;

  /**
   * Filter by country codes.
   *
   * @example ["US", "CA"]
   * @example ["DE", "FR", "GB"]
   */
  countries?: string[];

  /**
   * Filter by server features.
   * Can be a simple boolean or complex OR conditions.
   *
   * @example { "469a1706-c8be-11e7-9d7a-e3ed64915530": true }
   * @example { "11bc8572-ca45-11e7-bad6-2f023a014d57": { or: ["1a7c6614-ca45-11e7-84a2-8b4c8bd3712b", "1abb5fb8-ca45-11e7-858b-affed11cb7fd"] } }
   */
  features?: Record<string, boolean | { or: string[] }>;
}

/**
 * Parameters for filtering servers by ID lists.
 */
export interface IdsParams {
  /**
   * Don't include servers with the given ID(s). Comma-separated.
   *
   * @example "123"
   * @example "123,456,789"
   */
  blacklist?: string;

  /**
   * Only include servers with the given ID(s). Comma-separated.
   *
   * @example "123"
   * @example "123,456,789"
   */
  whitelist?: string;
}

/**
 * Parameters for filtering servers by player count range.
 */
export interface PlayersParams {
  /**
   * Minimum number of players.
   * Default: 0
   * Range: 0 <= value
   *
   * @example 42
   */
  min?: number;

  /**
   * Maximum number of players.
   * Default: "infinity"
   * Range: 0 <= value
   *
   * @example 100
   */
  max?: number;
}

/**
 * Parameters for requesting specific relationships in the response.
 */
export interface RelationsParams {
  /**
   * Request that only some relationships are returned.
   *
   * @example "a,b"
   * @example "s,b"
   */
  server?: string;
}

/**
 * Query parameters for listing servers from BattleMetrics.
 *
 * This interface organizes server listing parameters into logical groups:
 * - `fields`: Control which server attributes are returned
 * - `filter`: Apply various filters to narrow down results
 * - `ids`: Filter by server ID lists (whitelist/blacklist)
 * - `players`: Filter by player count range
 * - `relations`: Include related data in the response
 * - `page`: Control pagination of results
 * - `location`: Specify location for distance-based sorting
 * - `sort`: Control how results are ordered
 *
 * @example
 * ```typescript
 * const params: ServerListParams = {
 *   fields: { server: "name,ip,port" },
 *   filter: {
 *     game: "ark",
 *     status: "online",
 *     search: "PVE"
 *   },
 *   players: { min: 10, max: 100 },
 *   page: { size: 50, key: "100", rel: "next" },
 *   sort: "players"
 * };
 * ```
 */
export interface ServerListParams {
  /**
   * Fields parameter for requesting specific attributes.
   */
  fields?: FieldsParams;

  /**
   * Filter options for the server list.
   */
  filter?: FilterParams;

  /**
   * Filter by server ID lists (whitelist/blacklist).
   */
  ids?: IdsParams;

  /**
   * Filter by player count range (min/max).
   */
  players?: PlayersParams;

  /**
   * Relations parameter for requesting specific relationships.
   */
  relations?: RelationsParams;

  /**
   * Params for paginating the result set.
   */
  page?: PageParams;

  /**
   * Your location. Only useful when sorting by distance.
   * Format is: longitude,latitude
   * Default: "location based on IP"
   *
   * @example "47.6140999,-122.1966574"
   */
  location?: string;

  /**
   * Sorting options. Default will sort by relevance when searching.
   * Valid options: rank, name, players, distance
   * Default: "rank"
   *
   * @example "rank"
   * @example "name"
   * @example "players"
   * @example "distance"
   */
  sort?: string;
}
