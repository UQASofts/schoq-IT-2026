export function pick<T extends Record<string, unknown>>(
  obj: T,
  keys: string[],
): Partial<T> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key as keyof T] = obj[key as keyof T];
    return acc;
  }, {} as Partial<T>);
}
