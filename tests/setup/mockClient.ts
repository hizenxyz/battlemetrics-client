import { vi } from "vitest";
import { AxiosInstance } from "axios";
import path from "path";
import fs from "fs";

function loadFixture(fixturePath: string) {
  const fullPath = path.join(__dirname, "../fixtures", fixturePath);

  if (fs.existsSync(fullPath)) {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const parsed = JSON.parse(fileContent);
    return parsed;
  }
  throw new Error(`Fixture not found: ${fixturePath}`);
}

function urlToFixturePath(url: string): string {
  // Split path and query params
  const [pathPart, queryPart] = url.split("?");

  const pathSegments = pathPart.split("/").filter(Boolean);
  const fileName = pathSegments[pathSegments.length - 1];

  let finalFileName = fileName;

  // If we have query params, append them to filename
  if (queryPart) {
    let cleanQuery = queryPart;
    cleanQuery = cleanQuery.replace(/&/g, "_"); // Replace & with _
    cleanQuery = cleanQuery.replace(/\[/g, "_"); // Replace [ with _
    cleanQuery = cleanQuery.replace(/\]/g, "_"); // Replace ] with _
    cleanQuery = cleanQuery.replace(/=/g, "_"); // Replace = with _
    cleanQuery = cleanQuery.replace(/[^A-Za-z0-9_-]/g, ""); // Remove other invalid chars
    finalFileName = `${fileName}_${cleanQuery}`;
  }

  // Build directory path
  if (pathSegments.length > 1) {
    const dirPath = pathSegments.slice(0, -1).join("/");
    return `get/${dirPath}/${finalFileName}.json`;
  } else {
    return `get/${finalFileName}.json`;
  }
}

export function createMockClient() {
  return {
    get: vi.fn().mockImplementation((url: string) => {
      const fixturePath = urlToFixturePath(url);

      // Debug logging
      console.log(`Mock client: URL=${url}, Fixture path=${fixturePath}`);

      try {
        const fixtureData = loadFixture(fixturePath);
        return Promise.resolve({ data: fixtureData });
      } catch {
        return Promise.reject(new Error(`No fixture found for ${url}`));
      }
    }),
  } as unknown as AxiosInstance;
}
