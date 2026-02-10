import { mutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

const WAITLIST_SUCCESS_MESSAGE = "You're on the list!";
const RATE_LIMIT_WINDOW_MS = 60_000;
const GLOBAL_RATE_LIMIT = 10;
const DOMAIN_RATE_LIMIT = 3;
const REQUEST_MAX_SKEW_MS = 30_000;
const RATE_LIMIT_ERROR_MESSAGE = "Too many sign-ups right now";
const BLOCKED_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
]);
const RATE_LIMIT_BUCKET_PREFIX = "bucket";

async function enforceRateLimit(ctx: MutationCtx, key: string, limit: number, now: number) {
  const oneMinuteAgo = now - RATE_LIMIT_WINDOW_MS;

  // SECURITY: Use one row per key and patch it transactionally to avoid TOCTOU races.
  const bucketKey = `${RATE_LIMIT_BUCKET_PREFIX}:${key}`;
  const bucket = await ctx.db
    .query("rateLimits")
    .withIndex("by_key", (q) => q.eq("key", bucketKey))
    .first();

  const recentTimestamps = (bucket?.timestamps ?? []).filter((timestamp) => timestamp >= oneMinuteAgo);

  if (recentTimestamps.length >= limit) {
    throw new Error(RATE_LIMIT_ERROR_MESSAGE);
  }

  recentTimestamps.push(now);

  if (bucket) {
    await ctx.db.patch(bucket._id, {
      timestamps: recentTimestamps,
      updatedAt: now,
    });
    return;
  }

  await ctx.db.insert("rateLimits", {
    key: bucketKey,
    timestamps: recentTimestamps,
    createdAt: now,
    updatedAt: now,
  });
}

export const join = mutation({
  args: {
    email: v.string(),
    // Honeypot — should always be empty. Bots auto-fill it.
    website: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, { email, website, timestamp }) => {
    // Honeypot check — if filled, silently succeed (don't reveal to bot)
    if (website) {
      return { success: true, message: WAITLIST_SUCCESS_MESSAGE };
    }

    const now = Date.now();

    // SECURITY: Reject stale or replayed client submissions older than 30 seconds.
    if (Math.abs(now - timestamp) > REQUEST_MAX_SKEW_MS) {
      throw new Error("Request expired. Please try again.");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // SECURITY: RFC 5321 mailbox length cap.
    if (!normalizedEmail || normalizedEmail.length > 254) {
      throw new Error("Invalid email address");
    }

    // SECURITY: Reject control characters, including null bytes.
    if (/[\x00-\x1f\x7f]/.test(normalizedEmail)) {
      throw new Error("Invalid email address");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email address");
    }

    // SECURITY: Normalize and validate the domain fragment before rate limiting/storage.
    const domain = normalizedEmail.split("@")[1]?.replace(/\.+$/, "");
    if (!domain || domain.length > 253) {
      throw new Error("Invalid email address");
    }

    // Block disposable/temp email domains
    if (BLOCKED_DOMAINS.has(domain)) {
      throw new Error("Please use a non-disposable email address");
    }

    await enforceRateLimit(ctx, "global", GLOBAL_RATE_LIMIT, now);
    await enforceRateLimit(ctx, `domain:${domain}`, DOMAIN_RATE_LIMIT, now);

    // Duplicate check
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { success: true, message: WAITLIST_SUCCESS_MESSAGE };
    }

    await ctx.db.insert("waitlist", {
      email: normalizedEmail,
      domain,
      joinedAt: now,
    });

    return { success: true, message: WAITLIST_SUCCESS_MESSAGE };
  },
});
