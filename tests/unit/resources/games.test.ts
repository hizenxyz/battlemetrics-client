import { describe, it, expect } from "vitest";
import "../../setup";

import { getGameList, getGameInfo } from "../../../src/resources/games";

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
