import { vi } from "vitest";
import { AxiosInstance } from "axios";
import path from "path";
import fs from "fs";

function loadFixture(fixturePath: string) {
  const fullPath = path.join(__dirname, "../fixtures", fixturePath);
  if (fs.existsSync(fullPath)) {
    return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  }
  throw new Error(`Fixture not found: ${fixturePath}`);
}

// Create a mock client that automatically loads fixtures
export function createMockClient() {
  return {
    get: vi.fn().mockImplementation((url: string) => {
      // Convert URL to fixture path
      // /games -> get/games.json
      // /games/ark -> get/games/ark.json
      const fixturePath = `get${url.replace(/\//g, "/")}.json`;

      try {
        const fixtureData = loadFixture(fixturePath);
        return Promise.resolve({ data: fixtureData });
      } catch {
        return Promise.reject(new Error(`No fixture found for ${url}`));
      }
    }),
  } as unknown as AxiosInstance;
}
