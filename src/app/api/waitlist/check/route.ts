import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const normalizedEmail =
            typeof email === "string" ? email.toLowerCase().trim() : "";

        if (!normalizedEmail || normalizedEmail.length > 254) {
            return NextResponse.json({ found: false });
        }

        if (/[\x00-\x1f\x7f]/.test(normalizedEmail)) {
            return NextResponse.json({ found: false });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return NextResponse.json({ found: false });
        }

        const sql = getDb();

        // Get the entry
        const entries = (await sql`
            SELECT id, email, created_at
            FROM waitlist
            WHERE email = ${normalizedEmail}
            LIMIT 1
        `) as { id: number; email: string; created_at: string }[];

        if (entries.length === 0) {
            return NextResponse.json({ found: false });
        }

        const entry = entries[0];

        // Get position (how many people joined before or at the same time)
        const posResult = (await sql`
            SELECT COUNT(*) as position
            FROM waitlist
            WHERE created_at <= ${entry.created_at}
        `) as { position: string }[];

        const totalResult = (await sql`
            SELECT COUNT(*) as total FROM waitlist
        `) as { total: string }[];

        return NextResponse.json({
            found: true,
            position: parseInt(posResult[0].position, 10),
            total: parseInt(totalResult[0].total, 10),
            joinedAt: new Date(entry.created_at).getTime(),
        });
    } catch (error) {
        console.error("[/api/waitlist/check] Error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
