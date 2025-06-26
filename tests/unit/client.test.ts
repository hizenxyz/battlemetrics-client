import { describe, it, expect, vi, beforeEach } from "vitest";
import { BattleMetricsClient } from "../../src/client";

describe("BattleMetricsClient", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.log to verify it's called during initialization
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should initialize with valid API key", () => {
    expect(() => {
      new BattleMetricsClient("valid-api-key");
    }).not.toThrow();
  });

  it("should log initialization message when created", () => {
    new BattleMetricsClient("valid-api-key");

    expect(consoleSpy).toHaveBeenCalledWith("BattleMetrics client initialized");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it("should create multiple instances without conflicts", () => {
    const client1 = new BattleMetricsClient("valid-api-key-1");
    const client2 = new BattleMetricsClient("valid-api-key-2");

    expect(client1).toBeInstanceOf(BattleMetricsClient);
    expect(client2).toBeInstanceOf(BattleMetricsClient);
    expect(client1).not.toBe(client2);
  });

  it("should return API key and base URL", () => {
    const apiKey = "test-api-key";
    const baseUrl = "https://custom-api.example.com";
    const client = new BattleMetricsClient(apiKey, baseUrl);

    expect(client.getApiKey()).toBe(apiKey);
    expect(client.getBaseUrl()).toBe(baseUrl);
  });
});
