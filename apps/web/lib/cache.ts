import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  : null;
const memory = new Map<string, { value: unknown; expiresAt: number }>();

export async function cacheGet<T>(key: string): Promise<T | null> {
  const hit = memory.get(key);
  if (hit && hit.expiresAt > Date.now()) return hit.value as T;
  return redis ? await redis.get<T>(key) : null;
}
export async function cacheSet<T>(key: string, value: T, ttlSeconds = 900) {
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  if (redis) await redis.set(key, value, { ex: ttlSeconds });
}
export async function rateLimit(key: string, limit = 60, windowSeconds = 60) {
  const now = Date.now();
  const k = `rl:${key}:${Math.floor(now / (windowSeconds * 1000))}`;
  const count = ((await cacheGet<number>(k)) ?? 0) + 1;
  await cacheSet(k, count, windowSeconds);
  return { ok: count <= limit, count, limit };
}
