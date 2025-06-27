export function flattenParams(
  obj: unknown,
  prefix = ""
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      let newKey: string;

      // Handle colon syntax (e.g., "filter:game" -> "filter[game]")
      if (key.includes(":") && !prefix) {
        const [baseKey, subKey] = key.split(":", 2);
        newKey = `${baseKey}[${subKey}]`;
      } else {
        newKey = prefix ? `${prefix}[${key}]` : key;
      }

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flattenParams(value, newKey));
      } else if (value !== undefined) {
        result[newKey] = value as string | number | boolean;
      }
    }
  }

  return result;
}
