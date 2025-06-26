import { describe, it, expect, vi, beforeEach } from "vitest";

describe("getClient", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.BATTLEMETRICS_TOKEN = "test-token";
    process.env.BATTLEMETRICS_URL = "https://custom-api.example.com";
  });

  it("should create an Axios instance with the correct baseURL and headers", async () => {
    const { getClient } = await import("../../src/client");
    const client = getClient();

    expect(client.defaults.baseURL).toBe("https://custom-api.example.com");
    expect(client.defaults.headers["Authorization"]).toBe("Bearer test-token");
  });

  it("should default to https://api.battlemetrics.com if no BATTLEMETRICS_URL is set", async () => {
    delete process.env.BATTLEMETRICS_URL;
    const { getClient } = await import("../../src/client");
    const client = getClient();

    expect(client.defaults.baseURL).toBe("https://api.battlemetrics.com");
  });

  it("should throw an error if BATTLEMETRICS_TOKEN is not set", async () => {
    delete process.env.BATTLEMETRICS_TOKEN;
    const { getClient } = await import("../../src/client");

    expect(() => getClient()).toThrow(
      "BATTLEMETRICS_TOKEN is not set in environment variables"
    );
  });

  it("should create independent Axios instances", async () => {
    const { getClient } = await import("../../src/client");
    const client1 = getClient();
    const client2 = getClient();

    expect(client1).not.toBe(client2);
    expect(typeof client1.get).toBe("function");
    expect(typeof client2.get).toBe("function");
  });
});
