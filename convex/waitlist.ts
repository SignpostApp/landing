import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: {
    email: v.string(),
    // Honeypot — should always be empty. Bots auto-fill it.
    website: v.optional(v.string()),
  },
  handler: async (ctx, { email, website }) => {
    // Honeypot check — if filled, silently succeed (don't reveal to bot)
    if (website) {
      return { success: true, message: "You're on the list!" };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Block disposable/temp email domains
    const blocked = ["mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email", "yopmail.com"];
    const domain = normalizedEmail.split("@")[1];
    if (blocked.includes(domain)) {
      throw new Error("Please use a non-disposable email address");
    }

    // Duplicate check
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { success: true, message: "You're already on the list!" };
    }

    // Rate limit — max 10 signups in the last 60 seconds (global)
    const oneMinuteAgo = Date.now() - 60_000;
    const recentEntries = await ctx.db
      .query("waitlist")
      .order("desc")
      .filter((q) => q.gte(q.field("joinedAt"), oneMinuteAgo))
      .collect();

    if (recentEntries.length >= 10) {
      throw new Error("Too many sign-ups right now. Please try again in a minute.");
    }

    await ctx.db.insert("waitlist", {
      email: normalizedEmail,
      joinedAt: Date.now(),
    });

    return { success: true, message: "You're on the list!" };
  },
});

