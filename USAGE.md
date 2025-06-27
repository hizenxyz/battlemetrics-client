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
- [Error Handling](#error-handling)
- [Common Patterns](#common-patterns)
  - [Field Filtering](#field-filtering)
  - [Pagination](#pagination)
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

## TypeScript Support

This library provides full TypeScript support with comprehensive type definitions. All functions, parameters, and return types are fully typed:

```typescript
import {
  getGameList,
  GameListParams,
  GameListResponse,
} from "battlemetrics-client";

// TypeScript will provide full IntelliSense and type checking
const params: GameListParams = {
  fields: {
    game: ["name", "players"],
  },
  page: {
    number: 1,
    size: 20,
  },
};

const response: GameListResponse = await getGameList(params);
```

## Testing

You can test the API calls using the provided test fixtures. Check the `tests/fixtures/` directory for example responses and the `tests/integration/` directory for integration tests.
