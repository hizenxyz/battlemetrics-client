import {
  ResourceType,
  ServerStatus,
  QueryStatus,
  RconStatus,
  ConnectionType,
} from "./common";

/**
 * Server
 * Stability: prototype
 *
 * Information about game servers tracked by BattleMetrics
 * @see https://www.battlemetrics.com/developers/documentation#resource-server
 */
export interface Server {
  /**
   * Unique identifier of server.
   * Pattern: \d+
   */
  id: string;

  /**
   * Resource type. Always "server".
   * Example: "server"
   * @oneOf "server"
   */
  type: ResourceType.Server;

  /**
   * Server attributes.
   */
  attributes: ServerAttributes;

  /**
   * Server relationships.
   */
  relationships: ServerRelationships;
}

/**
 * Attributes for a server.
 */
export interface ServerAttributes {
  /**
   * Unique identifier of server.
   * Pattern: \d+
   */
  id: string;

  /**
   * Server name.
   */
  name: string;

  /**
   * Server address (hostname).
   */
  address: string;

  /**
   * Server IP address.
   * @format ip
   */
  ip: string;

  /**
   * Server port.
   * @range 0 <= value <= 65535
   */
  port: number;

  /**
   * Server query port.
   * @range 0 <= value <= 65535
   */
  portQuery: number;

  /**
   * Number of players currently online.
   */
  players: number;

  /**
   * Maximum number of players the server can hold.
   */
  maxPlayers: number;

  /**
   * Server rank. Null if de-ranked.
   */
  rank?: number | null;

  /**
   * Server location coordinates [longitude, latitude].
   */
  location: [number, number];

  /**
   * Server status.
   * @see ServerStatus
   */
  status: ServerStatus;

  /**
   * Server details containing game-specific information.
   */
  details: ServerDetails;

  /**
   * Whether the server is private.
   */
  private: boolean;

  /**
   * When the server was created.
   */
  createdAt: string;

  /**
   * When the server was last updated.
   * @format date-time
   */
  updatedAt: string;

  /**
   * Country code where the server is located.
   * @length 2
   */
  country: string;

  /**
   * Status of the last query attempt.
   * @see QueryStatus
   */
  queryStatus?: QueryStatus | null;

  /**
   * RCON enabled and authenticated.
   */
  rconActive?: boolean | null;

  /**
   * Last time disconnected (RCON + auth required).
   * @format date-time
   */
  rconDisconnected?: string | null;

  /**
   * Last successful RCON connection (RCON + auth required).
   * @format date-time
   */
  rconLastConnected?: string | null;

  /**
   * Current RCON status.
   * @see RconStatus
   */
  rconStatus?: RconStatus | null;

  /**
   * Server metadata.
   */
  metadata?: {
    /**
     * Connection type for the server.
     * @see ConnectionType
     */
    connectionType?: ConnectionType;

    /**
     * HLL player list interval in seconds.
     * @range 60 <= value <= 300
     */
    hllPlayerListInterval?: number;

    /**
     * Number of reserved slots for this server.
     * @range 0 <= value
     */
    reservedSlots?: number;

    /**
     * If the last player to join should be kicked when a player on the reserved slot list joins.
     */
    reservedSlotsKickLastToJoin?: boolean;

    /**
     * How often to request server status via RCON (Rust).
     * @range 15 <= value <= 300
     */
    statusInterval?: number;

    /**
     * Use a connection pool to increase command responsiveness (HLL).
     */
    useConnectionPool?: boolean;

    /**
     * Use getchat/getgamlog command (Ark & DNL).
     */
    useGetChat?: boolean;

    /**
     * RCON username (RS2: Vietnam).
     */
    username?: string;
  };
}

/**
 * Server details containing game-specific information.
 */
export interface ServerDetails {
  /**
   * Server tags.
   */
  tags: string[];

  /**
   * Whether this is an official server.
   */
  official: boolean;

  /**
   * Game-specific details (varies by game).
   */
  [key: string]: unknown;
}

/**
 * Server relationships.
 *
 * Includes defaultBanList, game, organization, and serverGroup relationships.
 */
export interface ServerRelationships {
  /**
   * Default ban list relationship.
   */
  defaultBanList?: {
    data: {
      id: string; // uuid
      type: "banList";
    };
  };

  /**
   * Game relationship.
   */
  game: {
    data: {
      id: string; // pattern: [a-z0-9]+
      type: "game";
    };
  };

  /**
   * Organization relationship.
   */
  organization?: {
    data: {
      id: string; // pattern: \d+
      type: "organization";
    };
  };

  /**
   * Server group relationship.
   */
  serverGroup?: {
    data: {
      id: string; // uuid
      type: "serverGroup";
    };
    meta?: {
      leader: boolean;
    };
  };
}
