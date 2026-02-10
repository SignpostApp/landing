import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    domain: v.string(),
    joinedAt: v.number(),
  }).index("by_email", ["email"]),
  rateLimits: defineTable({
    key: v.string(),
    createdAt: v.number(),
  }).index("by_key_createdAt", ["key", "createdAt"]),
});
