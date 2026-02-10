import type { NextConfig } from "next";

const convexHttpsOrigin = "https://opulent-zebra-261.convex.cloud";
const convexWssOrigin = "wss://opulent-zebra-261.convex.cloud";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  // SECURITY: Next.js injects inline runtime scripts for hydration.
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  // SECURITY: Inline styles are required by framework/runtime styling paths.
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${convexHttpsOrigin} ${convexWssOrigin}`,
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
  async redirects() {
    return [
      {
        source: "/_src",
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
