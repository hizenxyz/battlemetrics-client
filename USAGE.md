# Usage Guide

This document provides comprehensive usage examples for all implemented BattleMetrics API resources.

## Table of Contents

- [Setup](#setup)
- [Resources](#resources)
  - [Games Resource](#games-resource)
    - [Get List of Games](#get-list-of-games)
    - [Get Specific Game Information](#get-specific-game-information)
    - [Game Object Structure](#game-object-structure)
    - [Complete Example](#complete-example)
  - [Servers Resource](#servers-resource)
    - [Get List of Servers](#get-list-of-servers)
    - [Get Specific Server Information](#get-specific-server-information)
    - [Server Object Structure](#server-object-structure)
    - [Complete Example](#complete-example-1)
- [Error Handling](#error-handling)
- [Common Patterns](#common-patterns)
  - [Field Filtering](#field-filtering)
  - [Pagination](#pagination)
  - [Filtering and Searching](#filtering-and-searching)
- [TypeScript Support](#typescript-support)
- [Testing](#testing)

## Setup

Set your BattleMetrics API token as an environment variable:

```bash
export BATTLEMETRICS_TOKEN="your-api-token-here"
```

## Resources

### Games Resource

The games resource provides access to information about games supported by BattleMetrics.

#### Get List of Games

```typescript
import { getGameList } from "battlemetrics-client";

// Get all games
const games = await getGameList();

// Get games with specific fields
const gamesWithFields = await getGameList({
  fields: {
    game: ["name", "players", "servers"],
  },
});

// Get games with pagination
const paginatedGames = await getGameList({
  fields: {
    game: "name",
  },
  page: {
    number: 1,
    size: 10,
  },
});

console.log(games.data); // Array of game objects
console.log(games.links); // Pagination links
```

#### Get Specific Game Information

```typescript
import { getGameInfo } from "battlemetrics-client";

// Get detailed information about a specific game
const gameInfo = await getGameInfo("ark"); // Game ID for ARK: Survival Evolved

console.log(gameInfo.data.attributes.name); // "ARK: Survival Evolved"
console.log(gameInfo.data.attributes.players); // Current player count
console.log(gameInfo.data.attributes.servers); // Current server count
console.log(gameInfo.data.attributes.metadata.appid); // Steam app ID
```

#### Game Object Structure

Each game object contains:

```typescript
interface Game {
  id: string; // Unique identifier (e.g., "ark", "rust")
  type: "game"; // Resource type
  attributes: {
    name: string; // Full game name (e.g., "ARK: Survival Evolved")
    players: number; // Current online players
    servers: number; // Current online servers
    serversByCountry: Record<string, number>; // Servers per country
    playersByCountry: Record<string, number>; // Players per country
    maxPlayers30D: number; // Max players in last 30 days
    maxPlayers7D: number; // Max players in last 7 days
    maxPlayers24H: number; // Max players in last 24 hours
    minPlayers30D: number; // Min players in last 30 days
    minPlayers7D: number; // Min players in last 7 days
    minPlayers24H: number; // Min players in last 24 hours
    metadata: {
      appid: number; // Steam app ID
      gamedir: string; // Game directory
      noPlayerList: boolean; // Whether public player lists are available
    };
  };
}
```

#### Complete Example

```typescript
import { getGameList, getGameInfo } from "battlemetrics-client";

async function example() {
  try {
    // Get all games with basic info
    const allGames = await getGameList({
      fields: {
        game: ["name", "players", "servers"],
      },
    });

    console.log("Available games:");
    allGames.data.forEach((game) => {
      console.log(
        `${game.attributes.name}: ${game.attributes.players} players, ${game.attributes.servers} servers`
      );
    });

    // Get detailed info for a specific game
    const arkInfo = await getGameInfo("ark");
    const ark = arkInfo.data;

    console.log(`\n${ark.attributes.name} Details:`);
    console.log(`- Current Players: ${ark.attributes.players}`);
    console.log(`- Current Servers: ${ark.attributes.servers}`);
    console.log(`- Steam App ID: ${ark.attributes.metadata.appid}`);
    console.log(`- Max Players (24h): ${ark.attributes.maxPlayers24H}`);
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

example();
```

## Servers Resource

The servers resource provides access to information about game servers tracked by BattleMetrics.

#### Get List of Servers

```typescript
import { getServerList } from "battlemetrics-client";

// Get all servers
const servers = await getServerList();

// Get servers for a specific game
const rustServers = await getServerList({
  filter: {
    game: "rust",
  },
});

// Search for servers by name
const searchResults = await getServerList({
  filter: {
    game: "rust",
    search: "rusty moose",
  },
});

// Get servers with specific fields
const serversWithFields = await getServerList({
  fields: {
    server: "name,players,maxPlayers,rank",
  },
  filter: {
    game: "ark",
  },
});

// Get servers with pagination
const paginatedServers = await getServerList({
  filter: {
    game: "rust",
  },
  page: {
    number: 1,
    size: 20,
  },
});

// Advanced filtering with multiple criteria
const filteredServers = await getServerList({
  filter: {
    game: "rust",
    players: {
      min: 10,
      max: 100,
    },
    status: "online",
    ids: {
      blacklist: "123,456",
    },
    organizations: "789,1011",
  },
  sort: "players",
  include: "serverGroup",
});

console.log(servers.data); // Array of server objects
console.log(servers.links); // Pagination links
console.log(servers.meta); // Response metadata
```

#### Get Specific Server Information

```typescript
import { getServerInfo } from "battlemetrics-client";

// Get detailed information about a specific server
const serverInfo = await getServerInfo("4729828"); // Server ID

console.log(serverInfo.data.attributes.name); // Server name
console.log(serverInfo.data.attributes.players); // Current player count
console.log(serverInfo.data.attributes.maxPlayers); // Maximum player capacity
console.log(serverInfo.data.attributes.rank); // Server rank
console.log(serverInfo.data.attributes.status); // Server status (online/offline)
```

#### Server Object Structure

Each server object contains:

```typescript
interface Server {
  id: string; // Unique server identifier
  type: "server"; // Resource type
  attributes: {
    name: string; // Server name
    players: number; // Current player count
    maxPlayers: number; // Maximum player capacity
    rank: number; // Server rank
    status: "online" | "offline"; // Server status
    ip: string; // Server IP address
    port: number; // Server port
    queryPort: number; // Query port
    game: string; // Game identifier (e.g., "rust", "ark")
    gameId: string; // Game ID
    country: string; // Country code
    countryCode: string; // Country code (alternative)
    timezone: string; // Server timezone
    private: boolean; // Whether server is private
    verified: boolean; // Whether server is verified
    createdAt: string; // ISO timestamp of creation
    updatedAt: string; // ISO timestamp of last update
    lastWipe: string; // ISO timestamp of last wipe
    nextWipe: string; // ISO timestamp of next wipe
    wipeCycle: number; // Wipe cycle in hours
    rust: {
      // Rust-specific data (if applicable)
      map: string; // Map name
      mapSize: number; // Map size
      seed: number; // Map seed
      wipeTime: string; // Wipe time
      lastWipe: string; // Last wipe time
    };
    metadata: {
      // Additional metadata
      rust: {
        // Rust-specific metadata
        map: string;
        mapSize: number;
        seed: number;
        wipeTime: string;
        lastWipe: string;
      };
    };
  };
  relationships?: {
    // Related resources
    game?: {
      data: {
        id: string;
        type: "game";
      };
    };
    serverGroup?: {
      data: {
        id: string;
        type: "serverGroup";
      };
    };
  };
}
```

#### Filtering and Searching

For resources that support filtering and searching, use the `filter` parameter:

```typescript
// Search for servers by name
const searchResults = await getServerList({
  filter: {
    game: "rust",
    search: "rusty moose",
  },
});

// Filter by player count ranges
const popularServers = await getServerList({
  filter: {
    game: "rust",
    players: {
      min: 50,
      max: 200,
    },
  },
});

// Filter by server status
const onlineServers = await getServerList({
  filter: {
    game: "ark",
    status: "online",
  },
});

// Filter by organization
const orgServers = await getServerList({
  filter: {
    game: "rust",
    organizations: "123,456",
  },
});

// Filter by server IDs (blacklist/whitelist)
const idFilteredServers = await getServerList({
  filter: {
    game: "rust",
    ids: {
      blacklist: "123,456",
      whitelist: "789,1011",
    },
  },
});

// Combine multiple filters
const filteredServers = await getServerList({
  filter: {
    game: "rust",
    search: "community",
    players: {
      min: 10,
      max: 100,
    },
    status: "online",
    ids: {
      blacklist: "123,456",
    },
    organizations: "789,1011",
  },
  sort: "players", // Sort by player count
  include: "serverGroup", // Include related server group data
});
```

#### Available Filter Options

For servers, you can filter by:

- **`game`**: Game identifier (e.g., "rust", "ark", "dayz")
- **`search`**: Search server names
- **`status`**: Server status ("online" or "offline")
- **`players.min`**: Minimum player count
- **`players.max`**: Maximum player count
- **`ids.blacklist`**: Exclude servers with these IDs (comma-separated string)
- **`ids.whitelist`**: Only include servers with these IDs (comma-separated string)
- **`organizations`**: Organization IDs (comma-separated string)
- **`favorites`**: Boolean for favorited servers
- **`groupLeader`**: Boolean for group leaders
- **`groups`**: Group name
- **`maxDistance`**: Maximum distance in kilometers
- **`rcon`**: Boolean for RCON access

#### Sorting Options

You can sort results using the `sort` parameter:

```typescript
// Sort by player count (descending)
const sortedByPlayers = await getServerList({
  filter: { game: "rust" },
  sort: "players",
});

// Sort by rank
const sortedByRank = await getServerList({
  filter: { game: "rust" },
  sort: "rank",
});

// Sort by name
const sortedByName = await getServerList({
  filter: { game: "rust" },
  sort: "name",
});
```

#### Complete Example

```typescript
import { getServerList, getServerInfo } from "battlemetrics-client";

async function example() {
  try {
    // Get top Rust servers by player count
    const topRustServers = await getServerList({
      filter: {
        game: "rust",
        players: {
          min: 50,
        },
        status: "online",
      },
      sort: "players",
      page: {
        number: 1,
        size: 10,
      },
    });

    console.log("Top Rust Servers:");
    topRustServers.data.forEach((server, index) => {
      console.log(
        `${index + 1}. ${server.attributes.name} - ${server.attributes.players}/${server.attributes.maxPlayers} players`
      );
    });

    // Get detailed info for a specific server
    const serverInfo = await getServerInfo("4729828");
    const server = serverInfo.data;

    console.log(`\n${server.attributes.name} Details:`);
    console.log(
      `- Players: ${server.attributes.players}/${server.attributes.maxPlayers}`
    );
    console.log(`- Status: ${server.attributes.status}`);
    console.log(`- Rank: ${server.attributes.rank}`);
    console.log(`- Location: ${server.attributes.country}`);
    console.log(`- IP: ${server.attributes.ip}:${server.attributes.port}`);

    // If it's a Rust server, show additional info
    if (server.attributes.game === "rust" && server.attributes.rust) {
      console.log(`- Map: ${server.attributes.rust.map}`);
      console.log(`- Map Size: ${server.attributes.rust.mapSize}`);
      console.log(`- Last Wipe: ${server.attributes.rust.lastWipe}`);
    }
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
}

example();
```

## Error Handling

All API calls may throw errors. It's recommended to wrap your calls in try-catch blocks:

```typescript
import { getGameList } from "battlemetrics-client";

try {
  const games = await getGameList();
  console.log("Success:", games.data);
} catch (error) {
  if (error.response) {
    // API responded with error status
    console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.message);
  } else {
    // Something else happened
    console.error("Error:", error.message);
  }
}
```

## Common Patterns

### Field Filtering

Most resources support field filtering to reduce response size and improve performance:

```typescript
// Request only specific fields
const games = await getGameList({
  fields: {
    game: ["name", "players"], // Only get name and player count
  },
});
```

### Pagination

For resources that return lists, use pagination to handle large datasets:

```typescript
// Get first page with 10 items
const firstPage = await getGameList({
  page: {
    number: 1,
    size: 10,
  },
});

// Check if there are more pages
if (firstPage.links?.next) {
  // Get next page
  const nextPage = await getGameList({
    page: {
      number: 2,
      size: 10,
    },
  });
}
```

### Filtering and Searching

For resources that support filtering and searching, use the `filter` parameter:

```typescript
// Search for servers by name
const searchResults = await getServerList({
  filter: {
    game: "rust",
    search: "rusty moose",
  },
});

// Filter by player count ranges
const popularServers = await getServerList({
  filter: {
    game: "rust",
    players: {
      min: 50,
      max: 200,
    },
  },
});

// Filter by server status
const onlineServers = await getServerList({
  filter: {
    game: "ark",
    status: "online",
  },
});

// Filter by country
const usServers = await getServerList({
  filter: {
    game: "rust",
    countries: ["US"],
  },
});

// Multiple country filter
const naServers = await getServerList({
  filter: {
    game: "rust",
    countries: ["US", "CA"],
  },
});

// Combine multiple filters
const filteredServers = await getServerList({
  filter: {
    game: "rust",
    search: "community",
    "players:min": 10,
    status: "online",
    countries: ["US", "CA", "UK"],
  },
  sort: "players", // Sort by player count
  include: "serverGroup", // Include related server group data
});
```

## TypeScript Support

This library provides full TypeScript support with comprehensive type definitions. All functions, parameters, and return types are fully typed:

```typescript
import {
  getGameList,
  getServerList,
  getServerInfo,
  GameListParams,
  GameListResponse,
  ServerListParams,
  ServerListResponse,
  ServerResponse,
} from "battlemetrics-client";

// Game list with full type safety
const gameParams: GameListParams = {
  fields: {
    game: ["name", "players"],
  },
  page: {
    number: 1,
    size: 20,
  },
};

const gameResponse: GameListResponse = await getGameList(gameParams);

// Server list with full type safety
const serverParams: ServerListParams = {
  filter: {
    game: "rust",
    "players:min": 10,
    status: "online",
  },
  sort: "players",
  page: {
    number: 1,
    size: 20,
  },
};

const serverResponse: ServerListResponse = await getServerList(serverParams);

// Individual server with full type safety
const serverInfo: ServerResponse = await getServerInfo("4729828");
```

## Testing

You can test the API calls using the provided test fixtures. Check the `tests/fixtures/` directory for example responses and the `tests/integration/` directory for integration tests.
