import { describe, it, expect } from "vitest";
import { version, ValidationError, AuthenticationError } from "../../src/index";
import pkg from "../../package.json";

describe("Index exports", () => {
  it("should export version matching package.json", () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe("string");
    expect(version).toBe(pkg.version);
  });
});
