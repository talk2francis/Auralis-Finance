type CacheEntry<T> = { value: T; expiresAt: number };
const memory = new Map<string, CacheEntry<unknown>>();

export async function cached<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = memory.get(key) as CacheEntry<T> | undefined;
  if (hit && hit.expiresAt > now) return hit.value;
  const value = await loader();
  memory.set(key, { value, expiresAt: now + ttlMs });
  await setRedis(key, value, Math.ceil(ttlMs / 1000));
  return value;
}

export function getLastGood<T>(key: string): T | undefined {
  return (memory.get(`last:${key}`) as CacheEntry<T> | undefined)?.value;
}

export function setLastGood<T>(key: string, value: T) {
  memory.set(`last:${key}`, { value, expiresAt: Number.MAX_SAFE_INTEGER });
}

async function setRedis<T>(key: string, value: T, ttlSeconds: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(`${url}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}?EX=${ttlSeconds}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // Redis is optional in local/dev adapters; in-memory cache remains authoritative.
  }
}
