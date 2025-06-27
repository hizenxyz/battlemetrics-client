import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the client module globally
vi.mock("../../../src/client", () => ({
  getClient: vi.fn(),
}));

import { getGameList, getGameInfo } from "../../../src/resources/games";
import { getClient } from "../../../src/client";
import { AxiosInstance } from "axios";
import path from "path";
import fs from "fs";

// Helper to load fixtures
function loadFixture(fixturePath: string) {
  const fullPath = path.join(__dirname, "../../fixtures", fixturePath);
  if (fs.existsSync(fullPath)) {
    return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  }
  throw new Error(`Fixture not found: ${fixturePath}`);
}

const mockGetClient = vi.mocked(getClient);

const mockClient = {
  get: vi.fn().mockImplementation((url: string) => {
    // Convert URL to fixture path: /games -> get/games.json
    const fixturePath = `get${url.replace(/\//g, "/")}.json`;
    const fixtureData = loadFixture(fixturePath);
    return Promise.resolve({ data: fixtureData });
  }),
} as unknown as AxiosInstance;

beforeEach(() => {
  vi.clearAllMocks();
  mockGetClient.mockReturnValue(mockClient);
});

describe("Games API", () => {
  describe("getGameList", () => {
    it("should return games data", async () => {
      const result = await getGameList();

      expect(result.data.length).toBe(10);
      expect(result.data[0].id).toBe("7dtd");
      expect(result.data[1].id).toBe("ark");
      expect(result.data[2].id).toBe("arksa");
    });

    it("should have correct game structure", async () => {
      const result = await getGameList();
      const game = result.data[0];

      expect(game.type).toBe("game");
      expect(game.attributes.name).toBe("7 Days to Die");
      expect(game.attributes.players).toBe(2502);
      expect(game.attributes.servers).toBe(13157);
      expect(game.attributes.serversByCountry).toBeDefined();
      expect(game.attributes.playersByCountry).toBeDefined();
      expect(game.attributes.minPlayers24H).toBeDefined();
      expect(game.attributes.maxPlayers24H).toBeDefined();
      expect(game.attributes.minPlayers7D).toBeDefined();
      expect(game.attributes.maxPlayers7D).toBeDefined();
    });
  });

  describe("getGameInfo", () => {
    it("should return specific game data", async () => {
      const result = await getGameInfo("ark");

      expect(result.data.id).toBe("ark");
      expect(result.data.attributes.name).toBe("ARK: Survival Evolved");
      expect(result.data.attributes.players).toBe(10957);
      expect(result.data.attributes.servers).toBe(39522);
      expect(result.data.attributes.serversByCountry).toBeDefined();
      expect(result.data.attributes.playersByCountry).toBeDefined();
      expect(result.data.attributes.minPlayers24H).toBeDefined();
      expect(result.data.attributes.maxPlayers24H).toBeDefined();
      expect(result.data.attributes.minPlayers7D).toBeDefined();
      expect(result.data.attributes.maxPlayers7D).toBeDefined();
      expect(result.data.attributes.minPlayers30D).toBeDefined();
    });
  });
});
