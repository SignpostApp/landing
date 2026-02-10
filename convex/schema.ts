import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    // SECURITY: Keep optional to avoid schema lockout from legacy rows created before domain normalization.
    domain: v.optional(v.string()),
    joinedAt: v.number(),
  }).index("by_email", ["email"]),
  rateLimits: defineTable({
    key: v.string(),
    // SECURITY: Kept optional for compatibility with previously inserted rows.
    createdAt: v.optional(v.number()),
    // SECURITY: Sliding window timestamps used for race-safe mutation throttling.
    timestamps: v.optional(v.array(v.number())),
    updatedAt: v.optional(v.number()),
  }).index("by_key", ["key"]),
});
