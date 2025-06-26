import { describe, it, expect } from "vitest";
import {
  version,
  BattleMetricsClient,
  ValidationError,
  AuthenticationError,
} from "../../src/index";

describe("Index exports", () => {
  it("should export version", () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe("string");
    expect(version).toBe("0.1.0");
  });

  it("should export BattleMetricsClient", () => {
    expect(BattleMetricsClient).toBeDefined();
    expect(typeof BattleMetricsClient).toBe("function");
  });

  it("should export error classes", () => {
    expect(ValidationError).toBeDefined();
    expect(AuthenticationError).toBeDefined();
    expect(typeof ValidationError).toBe("function");
    expect(typeof AuthenticationError).toBe("function");
  });

  it("should allow creating BattleMetricsClient from index import", () => {
    const client = new BattleMetricsClient("valid-api-key");
    expect(client).toBeInstanceOf(BattleMetricsClient);
  });
});
