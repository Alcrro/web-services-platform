import { unstable_cache } from "next/cache";

export async function getDataCachedFromDB<T, P = void>(
  fn: (params: P) => Promise<T>,
  tagName: string,
  timer: number,
  param?: P
) {
  // include params in the cache key, safely serialized
  const key = [tagName, JSON.stringify(param ?? {})];
  const cachedFn = unstable_cache(fn, key, {
    revalidate: timer,
  });

  return cachedFn(param as P);
}
