import { describe, it, expect } from "vitest";
import {
  buildQueryString,
  buildServerQueryString,
} from "../../../src/utils/buildQueryString";

describe("buildQueryString", () => {
  it("handles simple flat parameters", () => {
    const params = {
      include: "serverGroup",
      sort: "players",
      location: "47.6140999,-122.1966574",
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "include=serverGroup&sort=players&location=47.6140999%2C-122.1966574"
    );
  });

  it("handles nested filter parameters", () => {
    const params = {
      filter: {
        game: "ark",
        status: "online",
        favorites: true,
        rcon: false,
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "filter[game]=ark&filter[status]=online&filter[favorites]=true&filter[rcon]=false"
    );
  });

  it("handles colon syntax in filter keys", () => {
    const params = {
      filter: {
        "players:min": 42,
        "players:max": 100,
        "ids:blacklist": "123,456",
        "ids:whitelist": "789",
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "filter[players][min]=42&filter[players][max]=100&filter[ids][blacklist]=123%2C456&filter[ids][whitelist]=789"
    );
  });

  it("handles deeply nested objects", () => {
    const params = {
      filter: {
        features: {
          "469a1706-c8be-11e7-9d7a-e3ed64915530": true,
          "11bc8572-ca45-11e7-bad6-2f023a014d57": {
            or: [
              "1a7c6614-ca45-11e7-84a2-8b4c8bd3712b",
              "1abb5fb8-ca45-11e7-858b-affed11cb7fd",
            ],
          },
        },
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "filter[features][469a1706-c8be-11e7-9d7a-e3ed64915530]=true&filter[features][11bc8572-ca45-11e7-bad6-2f023a014d57][or][]=1a7c6614-ca45-11e7-84a2-8b4c8bd3712b&filter[features][11bc8572-ca45-11e7-bad6-2f023a014d57][or][]=1abb5fb8-ca45-11e7-858b-affed11cb7fd"
    );
  });

  it("handles arrays", () => {
    const params = {
      filter: {
        countries: ["US", "CA", "MX"],
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "filter[countries][]=US&filter[countries][]=CA&filter[countries][]=MX"
    );
  });

  it("handles page parameters", () => {
    const params = {
      page: {
        size: 50,
        key: "100",
        rel: "next",
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe("page[size]=50&page[key]=100&page[rel]=next");
  });

  it("handles fields parameters", () => {
    const params = {
      fields: {
        server: ["name", "ip", "port"],
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe("fields[server]=name%2Cip%2Cport");
  });

  it("handles fields with single string value", () => {
    const params = {
      fields: {
        server: "name,ip,port",
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe("fields[server]=name%2Cip%2Cport");
  });

  it("handles relations parameters", () => {
    const params = {
      relations: {
        include: "serverGroup",
        server: "s,b",
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "relations[include]=serverGroup&relations[server]=s%2Cb"
    );
  });

  it("ignores null and undefined values", () => {
    const params = {
      filter: {
        game: "ark",
        status: undefined,
        favorites: null,
        rcon: false,
      },
      include: undefined,
      sort: null,
    };

    const result = buildQueryString(params);

    expect(result).toBe("filter[game]=ark&filter[rcon]=false");
  });

  it("handles empty object", () => {
    const result = buildQueryString({});
    expect(result).toBe("");
  });

  it("handles complex real-world example", () => {
    const params = {
      location: "47.6140999,-122.1966574",
      include: "serverGroup",
      filter: {
        search: "PVE",
        game: "ark",
        status: "online",
        countries: ["US", "CA"],
        maxDistance: 5000,
        "players:min": 42,
        "players:max": 42,
        rcon: true,
        favorites: true,
        groups: "example",
        groupLeader: true,
        "ids:whitelist": "123",
        "ids:blacklist": "123",
        organizations: "123",
      },
      page: {
        size: 42,
        key: "100",
        rel: "next",
      },
      sort: "example",
      fields: {
        server: "name,ip,port",
      },
      relations: {
        server: "a,b",
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "location=47.6140999%2C-122.1966574&include=serverGroup&filter[search]=PVE&filter[game]=ark&filter[status]=online&filter[countries][]=US&filter[countries][]=CA&filter[maxDistance]=5000&filter[players][min]=42&filter[players][max]=42&filter[rcon]=true&filter[favorites]=true&filter[groups]=example&filter[groupLeader]=true&filter[ids][whitelist]=123&filter[ids][blacklist]=123&filter[organizations]=123&page[size]=42&page[key]=100&page[rel]=next&sort=example&fields[server]=name%2Cip%2Cport&relations[server]=a%2Cb"
    );
  });

  it("handles mixed data types", () => {
    const params = {
      filter: {
        stringValue: "test",
        numberValue: 42,
        booleanValue: true,
        zeroValue: 0,
        falseValue: false,
      },
    };

    const result = buildQueryString(params);

    expect(result).toBe(
      "filter[stringValue]=test&filter[numberValue]=42&filter[booleanValue]=true&filter[zeroValue]=0&filter[falseValue]=false"
    );
  });
});

describe("buildServerQueryString", () => {
  it("is an alias for buildQueryString", () => {
    const params = {
      filter: {
        game: "ark",
        status: "online",
      },
    };

    const result1 = buildQueryString(params);
    const result2 = buildServerQueryString(params);

    expect(result1).toBe(result2);
    expect(result1).toBe("filter[game]=ark&filter[status]=online");
  });
});
