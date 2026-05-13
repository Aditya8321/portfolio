type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; remaining: number; resetIn: number } {
  const { key, limit, windowMs } = opts;
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetIn: existing.resetAt - now };
  }

  existing.count += 1;
  store.set(key, existing);
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetIn: existing.resetAt - now
  };
}

/** Best-effort sweep so the in-memory map doesn't grow unbounded. Called probabilistically. */
function maybeSweep() {
  if (Math.random() > 0.02) return;
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (now > v.resetAt) store.delete(k);
  }
}

export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  const vercel = headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]!.trim();
  return "unknown";
}

export { maybeSweep };
