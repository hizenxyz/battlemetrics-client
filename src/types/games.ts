import { ResourceType } from "./common";

/**
 * Game
 * Stability: prototype
 *
 * Information about games supported by BattleMetrics
 * @see https://www.battlemetrics.com/developers/documentation#resource-game
 */
export interface Game {
  /**
   * Unique identifier of game (lowercase letters and numbers).
   * Example: "ark"
   */
  id: string;

  /**
   * Resource type. Always "game".
   * Example: "game"
   */
  type: ResourceType.Game;

  /**
   * Game attributes.
   */
  attributes: GameAttributes;
}

/**
 * Attributes for a game.
 */
export interface GameAttributes {
  /**
   * Long name for the game.
   * Example: "ARK: Survival Evolved"
   */
  name: string;

  /**
   * Additional metadata about the game.
   */
  metadata: {
    /**
     * Steam app ID.
     * Example: 42.0
     */
    appid: number;

    /**
     * Steam game directory used in queries.
     * Example: "example"
     */
    gamedir: string;

    /**
     * True if BattleMetrics is unable to provide public player lists for the game.
     * Example: true
     */
    noPlayerList: boolean;
  };

  /**
   * Number of players currently online.
   * Example: 300
   */
  players: number;

  /**
   * Number of servers currently online.
   * Example: 300
   */
  servers: number;

  /**
   * Number of servers per country.
   * Keys are ISO 3166-1 alpha-2 country codes.
   * Example: { "US": 100, "CA": 100, "GB": 100 }
   */
  serversByCountry: Record<string, number>;

  /**
   * Number of players per country.
   * Keys are ISO 3166-1 alpha-2 country codes.
   * Example: { "US": 100, "CA": 100, "GB": 100 }
   */
  playersByCountry: Record<string, number>;

  /**
   * Maximum number of players seen in the past 30 days.
   * Example: 42.0
   */
  maxPlayers30D: number;

  /**
   * Maximum number of players seen in the past 7 days.
   * Example: 42.0
   */
  maxPlayers7D: number;

  /**
   * Maximum number of players seen in the past 24 hours.
   * Example: 42.0
   */
  maxPlayers24H: number;

  /**
   * Minimum number of players seen in the past 30 days.
   * Example: 42.0
   */
  minPlayers30D: number;

  /**
   * Minimum number of players seen in the past 7 days.
   * Example: 42.0
   */
  minPlayers7D: number;

  /**
   * Minimum number of players seen in the past 24 hours.
   * Example: 42.0
   */
  minPlayers24H: number;
}
