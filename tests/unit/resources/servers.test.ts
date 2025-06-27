import { describe, it, expect } from "vitest";
import "../../setup";

import { getServerList, getServerInfo } from "../../../src/resources/servers";

describe("Servers API", () => {
  it("should return servers data (basic sanity)", async () => {
    const result = await getServerList();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0]).toHaveProperty("type", "server");
    expect(result.data[0]).toHaveProperty("id");
    expect(result.data[0]).toHaveProperty("attributes");
  });

  it("should flatten params and map results correctly (variant 2)", async () => {
    const result = await getServerList({
      filter: {
        game: "rust",
        search: "rusty moose",
      },
    });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].attributes.name).toContain("Rusty Moose");
    expect(result.data[0].relationships.game.data.id).toBe("rust");
  });

  describe("getServerList", () => {
    it("should return servers data", async () => {
      const result = await getServerList();

      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0].type).toBe("server");
      expect(result.data[0].id).toBeDefined();
      expect(result.data[0].attributes).toBeDefined();
      expect(result.data[0].relationships).toBeDefined();
    });

    it("should have correct server structure", async () => {
      const result = await getServerList();
      const server = result.data[0];

      expect(server.type).toBe("server");
      expect(server.attributes.id).toBeDefined();
      expect(server.attributes.name).toBeDefined();
      expect(server.attributes.address).toBeDefined();
      expect(server.attributes.ip).toBeDefined();
      expect(server.attributes.port).toBeDefined();
      expect(server.attributes.portQuery).toBeDefined();
      expect(server.attributes.players).toBeGreaterThanOrEqual(0);
      expect(server.attributes.maxPlayers).toBeGreaterThan(0);
      expect(server.attributes.location).toBeInstanceOf(Array);
      expect(server.attributes.location.length).toBe(2);
      expect(server.attributes.status).toBeDefined();
      expect(server.attributes.details).toBeDefined();
      expect(server.attributes.private).toBeDefined();
      expect(server.attributes.createdAt).toBeDefined();
      expect(server.attributes.updatedAt).toBeDefined();
      expect(server.attributes.country).toBeDefined();
    });

    it("should handle search parameters", async () => {
      const result = await getServerList({
        filter: {
          game: "rust",
          search: "rusty moose",
        },
      });

      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0].attributes.name).toContain("Rusty Moose");
      expect(result.data[0].relationships.game.data.id).toBe("rust");
    });

    it("should handle pagination links", async () => {
      const result = await getServerList({
        filter: {
          game: "rust",
          search: "rusty moose",
        },
      });

      expect(result.links).toBeUndefined();
      expect(result.links?.next).toBeUndefined();
    });

    it("should handle server details structure", async () => {
      const result = await getServerList({
        filter: {
          game: "rust",
          search: "rusty moose",
        },
      });
      const server = result.data[0];

      expect(server.attributes.details.tags).toBeInstanceOf(Array);
      expect(server.attributes.details.official).toBeDefined();
      expect(server.attributes.details.rust_type).toBeDefined();
      expect(server.attributes.details.rust_gamemode).toBeDefined();
      expect(server.attributes.details.rust_world_size).toBeDefined();
      expect(server.attributes.details.rust_maps).toBeDefined();
    });

    it("should handle relationships structure", async () => {
      const result = await getServerList({
        filter: {
          game: "rust",
          search: "rusty moose",
        },
      });
      const server = result.data[0];

      expect(server.relationships.game).toBeDefined();
      expect(server.relationships.game.data.type).toBe("game");
      expect(server.relationships.game.data.id).toBeDefined();
    });
  });

  describe("getServerInfo", () => {
    it("should return specific server data", async () => {
      const result = await getServerInfo("4729828");

      expect(result.data.id).toBe("4729828");
      expect(result.data.type).toBe("server");
      expect(result.data.attributes.name).toBe("Rusty Moose |EU Main|");
      expect(result.data.attributes.address).toBe("main.eu.moose.gg");
      expect(result.data.attributes.ip).toBe("205.178.168.176");
      expect(result.data.attributes.port).toBe(28010);
      expect(result.data.attributes.players).toBe(244);
      expect(result.data.attributes.maxPlayers).toBe(275);
      expect(result.data.attributes.rank).toBe(85);
      expect(result.data.attributes.status).toBe("online");
      expect(result.data.attributes.country).toBe("GB");
    });

    it("should have correct server attributes", async () => {
      const result = await getServerInfo("4729828");
      const server = result.data;

      expect(server.attributes.location).toEqual([-0.1278, 51.5081]);
      expect(server.attributes.private).toBe(false);
      expect(server.attributes.queryStatus).toBe("timeout");
      expect(server.attributes.createdAt).toBe("2019-11-07T19:39:44.018Z");
      expect(server.attributes.updatedAt).toBe("2025-06-27T02:10:20.824Z");
    });

    it("should have correct server details", async () => {
      const result = await getServerInfo("4729828");
      const details = result.data.attributes.details;

      expect(details.tags).toContain("mp300");
      expect(details.tags).toContain("EU");
      expect(details.official).toBe(true);
      expect(details.rust_type).toBe("official");
      expect(details.rust_gamemode).toBe("rust");
      expect(details.rust_world_size).toBe(4500);
      expect(details.rust_world_seed).toBe(1337);
      expect(details.rust_build).toBe("123128");
      expect(details.rust_uptime).toBe(41734);
      expect(details.rust_fps).toBe(30);
      expect(details.rust_fps_avg).toBe(29.65);
    });

    it("should have correct rust maps data", async () => {
      const result = await getServerInfo("4729828");
      const rustMaps = result.data.attributes.details.rust_maps as any;

      expect(rustMaps.seed).toBe(1337);
      expect(rustMaps.size).toBe(4500);
      expect(rustMaps.url).toBe(
        "https://rustmaps.com/map/55e8f8ebe3c94b0aadb8db46a3e9025d"
      );
      expect(rustMaps.thumbnailUrl).toBe(
        "https://content.rustmaps.com/maps/268/55e8f8ebe3c94b0aadb8db46a3e9025d/thumbnail.webp"
      );
      expect(rustMaps.monumentCount).toBe(231);
      expect(rustMaps.barren).toBe(false);
      expect(rustMaps.islands).toBe(7);
      expect(rustMaps.mountains).toBe(0);
      expect(rustMaps.iceLakes).toBe(3);
      expect(rustMaps.rivers).toBe(5);
      expect(rustMaps.biomePercentages).toBeDefined();
      expect(rustMaps.monuments).toBeInstanceOf(Array);
      expect(rustMaps.monumentCounts).toBeDefined();
    });

    it("should have correct relationships", async () => {
      const result = await getServerInfo("4729828");
      const relationships = result.data.relationships;

      expect(relationships.game).toBeDefined();
      expect(relationships.game.data.type).toBe("game");
      expect(relationships.game.data.id).toBe("rust");
    });

    it("should handle server settings", async () => {
      const result = await getServerInfo("4729828");
      const settings = result.data.attributes.details.rust_settings as any;

      expect(settings.upkeep).toBe(1);
      expect(settings.version).toBe(4);
      expect(settings.teamUILimit).toBe(12);
      expect(settings.groupLimit).toBe(999999);
      expect(settings.timeZone).toBe("Europe/London");
      expect(settings.rates).toBeDefined();
      expect(settings.blueprints).toBe(true);
      expect(settings.kits).toBe(false);
      expect(settings.decay).toBe(1);
      expect(settings.forceWipeType).toBe("full");
      expect(settings.wipes).toBeInstanceOf(Array);
    });
  });
});
