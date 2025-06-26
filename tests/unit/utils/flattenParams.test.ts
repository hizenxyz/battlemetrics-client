import { describe, it, expect } from "vitest";
import { flattenParams } from "../../../src/utils/flattenParams";

describe("flattenParams", () => {
  it("flattens a simple nested object", () => {
    const input = {
      fields: { game: "rust" },
      page: { size: 50, rel: "next" },
    };

    const output = flattenParams(input);

    expect(output).toEqual({
      "fields[game]": "rust",
      "page[size]": 50,
      "page[rel]": "next",
    });
  });

  it("handles empty object", () => {
    expect(flattenParams({})).toEqual({});
  });

  it("handles deeper nesting", () => {
    const input = {
      a: { b: { c: "d" } },
    };

    const output = flattenParams(input);

    expect(output).toEqual({
      "a[b][c]": "d",
    });
  });

  it("handles multiple levels and values", () => {
    const input = {
      alpha: {
        beta: {
          gamma: 42,
        },
      },
      page: {
        size: 10,
      },
    };

    const output = flattenParams(input);

    expect(output).toEqual({
      "alpha[beta][gamma]": 42,
      "page[size]": 10,
    });
  });

  it("ignores undefined values", () => {
    const input = {
      page: {
        size: undefined,
        key: "100",
      },
    };

    const output = flattenParams(input);

    expect(output).toEqual({
      "page[key]": "100",
    });
  });
});
