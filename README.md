# battlemetrics-client

[![CI](https://github.com/hizenxyz/battlemetrics-client/workflows/CI/badge.svg)](https://github.com/hizenxyz/battlemetrics-client/actions)
[![npm version](https://badge.fury.io/js/battlemetrics-client.svg)](https://badge.fury.io/js/battlemetrics-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

TypeScript client library for the [BattleMetrics API](https://www.battlemetrics.com/developers).

BattleMetrics provides game server monitoring, player tracking, and admin tools for popular games like Rust, Ark, CS2, and more.

⚠️ **Note**: This project is still in active development and is not ready for production use yet.

## Installation

```bash
npm install battlemetrics-client
```

## Quick Start

Set your BattleMetrics API token as an environment variable:

```bash
export BATTLEMETRICS_TOKEN="your-api-token-here"
```

Basic usage:

```typescript
import { getGameList, getGameInfo } from "battlemetrics-client";

// Get all games
const games = await getGameList();

// Get specific game info
const arkInfo = await getGameInfo("ark");
```

## Documentation

📖 **[Full Usage Guide](USAGE.md)** - Comprehensive examples and API reference for all implemented resources.

## API Reference

For full API documentation, see the [BattleMetrics API docs](https://www.battlemetrics.com/developers/documentation).

### Authentication

Get your API token from [BattleMetrics](https://www.battlemetrics.com/developers).

## Features

- Full TypeScript support
- BattleMetrics API coverage
- Modern ES modules
- Comprehensive error handling

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build project
npm run build
```

## Support

If you find this project helpful, consider supporting me on [Ko-fi](https://ko-fi.com/hizenxyz) ☕

## License

MIT License. See [LICENSE](LICENSE) for details.

Created by [hizenxyz](https://github.com/hizenxyz).
