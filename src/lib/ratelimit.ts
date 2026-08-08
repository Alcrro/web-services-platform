import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function makeRatelimit(requests: number, windowSeconds: number): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, `${windowSeconds} s`),
    analytics: false,
  });
}

export const rateLimiters = {
  auth: makeRatelimit(10, 60),       // 10 attempts/min — login, signup, refresh
  publicForm: makeRatelimit(5, 60),  // 5 req/min — public inquiries
  ai: makeRatelimit(10, 60),         // 10 req/min — Anthropic API endpoints
  general: makeRatelimit(60, 60),    // 60 req/min — general routes
};

export type RateLimiterKey = keyof typeof rateLimiters;

export async function checkRateLimit(
  req: NextRequest,
  limiterKey: RateLimiterKey,
  identifier?: string
): Promise<{ allowed: boolean; remaining?: number; reset?: number }> {
  const limiter = rateLimiters[limiterKey];
  if (!limiter) return { allowed: true }; // graceful degradation without Upstash

  const ip = identifier ?? getClientIp(req);
  const { success, remaining, reset } = await limiter.limit(ip);
  return { allowed: success, remaining, reset };
}
