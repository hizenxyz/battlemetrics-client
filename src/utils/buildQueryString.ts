import { ServerListParams } from "../types/serversParams";

/**
 * Generic function to transform any parameter object into a query string format.
 * Handles nested objects, arrays, and special cases like colon-separated keys.
 *
 * @param params - Any parameter object to transform
 * @returns A query string (without the leading '?')
 *
 * @example
 * ```typescript
 * const params = {
 *   filter: {
 *     game: "ark",
 *     status: "online",
 *     "players:min": 42,
 *     "players:max": 100
 *   },
 *   include: "serverGroup",
 *   sort: "players"
 * };
 *
 * const query = buildQueryString(params);
 * // Returns: "filter[game]=ark&filter[status]=online&filter[players][min]=42&filter[players][max]=100&include=serverGroup&sort=players"
 * ```
 */
export function buildQueryString(params: unknown): string {
  // Early return for null/undefined
  if (params === null || params === undefined) {
    return "";
  }

  // Cast to Record<string, unknown> for processing
  const paramsObj = params as Record<string, unknown>;
  const queryParts: string[] = [];

  function flattenObject(obj: Record<string, unknown>, prefix = ""): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (typeof obj === "object" && !Array.isArray(obj)) {
      for (const [key, value] of Object.entries(obj)) {
        let newKey: string;

        // Always convert colon syntax to bracket notation, even with prefix
        if (key.includes(":")) {
          const [baseKey, subKey] = key.split(":", 2);
          newKey = prefix
            ? `${prefix}[${baseKey}][${subKey}]`
            : `${baseKey}[${subKey}]`;
        } else {
          newKey = prefix ? `${prefix}[${key}]` : key;
        }

        if (value !== null && value !== undefined) {
          if (typeof value === "object" && !Array.isArray(value)) {
            // Recursively handle nested objects
            flattenObject(value as Record<string, unknown>, newKey);
          } else if (Array.isArray(value)) {
            // Special handling for fields arrays - join with comma
            if (prefix === "fields" && key === "server") {
              queryParts.push(
                `${newKey}=${encodeURIComponent(value.join(","))}`
              );
            } else {
              // Handle arrays (e.g., filter[countries][]=US&filter[countries][]=CA)
              value.forEach((item) => {
                if (item !== null && item !== undefined) {
                  queryParts.push(
                    `${newKey}[]=${encodeURIComponent(String(item))}`
                  );
                }
              });
            }
          } else {
            // Handle primitive values
            queryParts.push(`${newKey}=${encodeURIComponent(String(value))}`);
          }
        }
      }
    }
  }

  flattenObject(paramsObj);
  return queryParts.join("&");
}

/**
 * Convenience function specifically for ServerListParams.
 *
 * @param params - The server list parameters to transform
 * @returns A query string (without the leading '?')
 */
export function buildServerQueryString(params: ServerListParams): string {
  return buildQueryString(params);
}
