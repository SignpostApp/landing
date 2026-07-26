/**
 * First-touch attribution for waitlist signups.
 *
 * The visitor's channel is resolved once, on whatever page they land on, and
 * held in sessionStorage so it survives navigation (landing → /blog → back)
 * before they open the waitlist modal. First touch wins: if someone arrives
 * from a Google ad and later returns via a direct visit in the same session,
 * the ad keeps the credit.
 *
 * The result is a compact single-column string so it drops straight into the
 * existing `waitlist.source` column with no migration:
 *
 *   "google/cpc/asl-launch"   — utm_source/utm_medium/utm_campaign
 *   "ref:reddit.com"          — no UTMs, external referrer
 *   "direct"                  — no UTMs, no referrer
 *
 * Everything here is best-effort: storage can be unavailable (private mode,
 * blocked cookies) and a missing attribution must never break a signup.
 */

const STORAGE_KEY = "sp_attr";
const MAX_LENGTH = 100;
/** Per-segment cap, so one long campaign name can't crowd out the others. */
const MAX_SEGMENT = 40;

/** Reduce a UTM value to lowercase [a-z0-9._-] so it stays column-safe. */
function clean(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SEGMENT);
}

/** Read the current URL and referrer and derive the channel string. */
function resolve(): string {
  const params = new URLSearchParams(window.location.search);
  const source = clean(params.get("utm_source") ?? "");

  if (source) {
    const medium = clean(params.get("utm_medium") ?? "") || "none";
    const campaign = clean(params.get("utm_campaign") ?? "") || "none";
    return `${source}/${medium}/${campaign}`.slice(0, MAX_LENGTH);
  }

  // No UTMs — fall back to the referring host so organic channels still split
  // apart (reddit vs. tiktok vs. google) instead of collapsing into "direct".
  const referrer = document.referrer;
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname) {
        return `ref:${host}`.slice(0, MAX_LENGTH);
      }
    } catch {
      // Malformed referrer — fall through to "direct".
    }
  }

  return "direct";
}

/** Capture the channel once per session. Safe to call on every page. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, resolve());
  } catch {
    // Storage unavailable — getAttribution() falls back to live resolution.
  }
}

/** The captured channel, or a live read if nothing was stored. */
export function getAttribution(): string {
  if (typeof window === "undefined") return "direct";
  try {
    return sessionStorage.getItem(STORAGE_KEY) || resolve();
  } catch {
    return resolve();
  }
}
