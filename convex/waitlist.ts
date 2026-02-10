import { mutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

const WAITLIST_SUCCESS_MESSAGE = "You're on the list!";
const RATE_LIMIT_WINDOW_MS = 60_000;
const GLOBAL_RATE_LIMIT = 10;
const DOMAIN_RATE_LIMIT = 3;
const REQUEST_MAX_SKEW_MS = 30_000;
const RATE_LIMIT_ERROR_MESSAGE = "Too many sign-ups right now. Please try again in a minute.";

async function enforceRateLimit(ctx: MutationCtx, key: string, limit: number, now: number) {
  const oneMinuteAgo = now - RATE_LIMIT_WINDOW_MS;

  // SECURITY: Insert first so this request is counted inside the same transaction window.
  await ctx.db.insert("rateLimits", {
    key,
    createdAt: now,
  });

  const recentEntries = await ctx.db
    .query("rateLimits")
    .withIndex("by_key_createdAt", (q) => q.eq("key", key).gte("createdAt", oneMinuteAgo))
    .take(limit + 1);

  if (recentEntries.length > limit) {
    throw new Error(RATE_LIMIT_ERROR_MESSAGE);
  }
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

    // Block disposable/temp email domains
    const blocked = ["mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email", "yopmail.com"];
    const domain = normalizedEmail.split("@")[1];
    if (blocked.includes(domain)) {
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
