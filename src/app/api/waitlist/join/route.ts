import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";

const BLOCKED_DOMAINS = new Set([
    "mailinator.com",
    "guerrillamail.com",
    "tempmail.com",
    "throwaway.email",
    "yopmail.com",
]);

const REQUEST_MAX_SKEW_MS = 30_000;

// The site this signup came from. Kept as the leading segment of `source` so
// existing rows (written as a bare "signpost.cv") stay comparable: the landing
// page's signups are still `source LIKE 'signpost.cv%'`.
const SOURCE_SITE = "signpost.cv";
// Mirrors the shape produced by lib/attribution.ts — "google/cpc/asl-launch",
// "ref:reddit.com", or "direct".
const ATTRIBUTION_PATTERN = /^[a-z0-9._:/-]{1,100}$/;

/**
 * Folds the client-supplied channel into the stored `source` value. Anything
 * unrecognised degrades to the bare site name rather than being trusted — this
 * value is attacker-controlled and lands in a DB column.
 */
function resolveSource(raw: unknown): string {
    if (typeof raw !== "string") return SOURCE_SITE;

    const value = raw.toLowerCase().trim();
    if (!value || value === "direct" || !ATTRIBUTION_PATTERN.test(value)) {
        return SOURCE_SITE;
    }

    return `${SOURCE_SITE}/${value}`;
}

// In-memory rate limiting (resets on cold start, fine for Vercel)
const rateBuckets = new Map<string, number[]>();

function enforceRateLimit(key: string, limit: number, now: number) {
    const windowMs = 60_000;
    const timestamps = (rateBuckets.get(key) ?? []).filter(
        (t) => t >= now - windowMs
    );
    if (timestamps.length >= limit) {
        throw new Error("Too many sign-ups right now");
    }
    timestamps.push(now);
    rateBuckets.set(key, timestamps);
}

export async function POST(request: NextRequest) {
    try {
        const { email, website, timestamp, attribution } = await request.json();

        // Honeypot — if filled, silently succeed
        if (website) {
            return NextResponse.json({
                success: true,
                message: "You're on the list!",
            });
        }

        const now = Date.now();

        // Reject stale/replayed submissions
        if (
            typeof timestamp !== "number" ||
            Math.abs(now - timestamp) > REQUEST_MAX_SKEW_MS
        ) {
            return NextResponse.json(
                { error: "Request expired. Please try again." },
                { status: 400 }
            );
        }

        const normalizedEmail =
            typeof email === "string" ? email.toLowerCase().trim() : "";

        // RFC 5321 length cap
        if (!normalizedEmail || normalizedEmail.length > 254) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Reject control characters
        if (/[\x00-\x1f\x7f]/.test(normalizedEmail)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        const domain = normalizedEmail.split("@")[1]?.replace(/\.+$/, "");
        if (!domain || domain.length > 253) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Block disposable email domains
        if (BLOCKED_DOMAINS.has(domain)) {
            return NextResponse.json(
                { error: "Please use a non-disposable email address" },
                { status: 400 }
            );
        }

        // Rate limiting
        try {
            enforceRateLimit("global", 10, now);
            enforceRateLimit(`domain:${domain}`, 3, now);
        } catch {
            return NextResponse.json(
                { error: "Too many sign-ups right now" },
                { status: 429 }
            );
        }

        const sql = getDb();
        const source = resolveSource(attribution);

        let result: Record<string, unknown>[];
        try {
            result = (await sql`
                INSERT INTO waitlist (email, source)
                VALUES (${normalizedEmail}, ${source})
                ON CONFLICT (email) DO NOTHING
                RETURNING id
            `) as Record<string, unknown>[];
        } catch (sourceError) {
            // The `source` column may be narrower than the attribution string
            // on the deployed schema. Never lose a signup over analytics
            // metadata — retry with the bare site name.
            console.error(
                "[/api/waitlist/join] Insert with attribution failed, retrying without:",
                sourceError
            );
            result = (await sql`
                INSERT INTO waitlist (email, source)
                VALUES (${normalizedEmail}, ${SOURCE_SITE})
                ON CONFLICT (email) DO NOTHING
                RETURNING id
            `) as Record<string, unknown>[];
        }

        if (result.length === 0) {
            // Already on the list — return success silently (don't reveal to user)
            return NextResponse.json({
                success: true,
                message: "You're on the list!",
            });
        }

        return NextResponse.json({
            success: true,
            message: "You're on the list!",
        });
    } catch (error) {
        console.error("[/api/waitlist/join] Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Try again." },
            { status: 500 }
        );
    }
}
