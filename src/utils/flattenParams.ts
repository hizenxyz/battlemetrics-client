export function flattenParams(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenParams(value as Record<string, unknown>, newKey)
      );
    } else if (value !== undefined) {
      result[newKey] = value as string | number | boolean;
    }
  }

  return result;
}
