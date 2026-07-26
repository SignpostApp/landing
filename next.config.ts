import type { NextConfig } from "next";

// Dev-only allowance so impeccable live mode can load. Guarded by NODE_ENV.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";

// Google Analytics 4. gtag.js is served from googletagmanager.com and beacons
// POST to the regional *.google-analytics.com collect endpoints. Without these
// entries the GA tag in layout.tsx is fetched and then blocked by CSP, so the
// property silently records nothing — which is exactly what was happening.
// Both hosts send `cross-origin-resource-policy: cross-origin`, so they also
// satisfy the COEP: require-corp header below.
const ANALYTICS_SCRIPT_SRC = " https://www.googletagmanager.com";
const ANALYTICS_CONNECT_SRC =
  " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com";
// GA falls back to a pixel beacon when sendBeacon/fetch is unavailable.
const ANALYTICS_IMG_SRC =
  " https://*.google-analytics.com https://www.googletagmanager.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  `img-src 'self' data: blob:${ANALYTICS_IMG_SRC}`,
  "object-src 'none'",
  // SECURITY: Next.js injects inline runtime scripts for hydration.
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${ANALYTICS_SCRIPT_SRC}${__impeccableLiveDev}`,
  // SECURITY: Inline styles are required by framework/runtime styling paths.
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self'${ANALYTICS_CONNECT_SRC}${__impeccableLiveDev}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), autoplay=(), fullscreen=(self), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    // SECURITY: Restrict Next.js image optimization to local assets only.
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/_src/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async headers() {
    const headers = [...securityHeaders];

    // HSTS should only be sent over HTTPS in production.
    if (process.env.NODE_ENV === "production") {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      });
    }

    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};

export default nextConfig;
