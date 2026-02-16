import { neon } from "@neondatabase/serverless";

/**
 * Module-level singleton — on Vercel serverless, the module stays alive
 * between warm invocations of the same function instance.  Re-creating
 * neon() on every request wastes time; caching it here is safe because
 * the HTTP driver is stateless (no persistent TCP connection).
 */
let _sql: ReturnType<typeof neon> | null = null;

export function getDb() {
    if (!_sql) {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error("DATABASE_URL environment variable is not set");
        }
        _sql = neon(databaseUrl);
    }
    return _sql;
}
