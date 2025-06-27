import { vi, beforeEach } from "vitest";
import { getClient } from "../../src/client";
import { createMockClient } from "./mockClient";

// Mock the client module globally
vi.mock("../../src/client", () => ({
  getClient: vi.fn(),
}));

const mockGetClient = vi.mocked(getClient);
const mockClient = createMockClient();

// Set up the mock before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockGetClient.mockReturnValue(mockClient);
});
