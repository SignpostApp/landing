import { NextResponse } from "next/server";

import {
    STATUS_LABELS,
    STATUS_URL,
    normalizeStatus,
} from "@/app/_components/statusData";

export const revalidate = 60;

export async function GET() {
    try {
        const response = await fetch(`${STATUS_URL}/index.json`, {
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
            throw new Error(`Status page responded ${response.status}`);
        }

        const payload = (await response.json()) as {
            data?: { attributes?: { aggregate_state?: string } };
        };

        const status = normalizeStatus(payload.data?.attributes?.aggregate_state);

        return NextResponse.json({ status, label: STATUS_LABELS[status] });
    } catch (error) {
        console.error("[/api/status] Error:", error);
        return NextResponse.json({
            status: "unknown",
            label: STATUS_LABELS.unknown,
        });
    }
}
