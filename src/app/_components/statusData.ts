export const STATUS_URL = "https://status.signpost.cv";

export type StatusKey =
  | "operational"
  | "degraded"
  | "downtime"
  | "maintenance"
  | "unknown";

export const STATUS_LABELS: Record<StatusKey, string> = {
  operational: "All systems operational",
  degraded: "Degraded performance",
  downtime: "Service disruption",
  maintenance: "Under maintenance",
  unknown: "Service status",
};

export function normalizeStatus(state: unknown): StatusKey {
  if (typeof state !== "string") return "unknown";

  const value = state.toLowerCase();

  if (value === "operational") return "operational";
  if (value === "degraded") return "degraded";
  if (value === "downtime" || value === "down") return "downtime";
  if (value.includes("maintenance")) return "maintenance";

  return "unknown";
}
