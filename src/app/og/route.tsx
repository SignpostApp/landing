import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph / social card — a branded 1200×630 image so links to the
 * site show the value prop instead of a bare logo photo. Read by social
 * scrapers, so it lives at /og (crawlable; not under /api, which robots
 * disallows). Pass ?title= and ?subtitle= to customize per page.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 120) ||
    "Learn ASL with real-time feedback on every sign.";
  const subtitle =
    searchParams.get("subtitle")?.slice(0, 200) ||
    "Free, AI-powered American Sign Language lessons that watch your hands through your webcam and correct your signs in real time.";

  // Load the Signpost logo (public/favicon.png) as a data URL so Satori can
  // embed it. Falls back to a solid mark if the asset can't be read.
  let logoSrc: string | null = null;
  try {
    const res = await fetch(new URL("/favicon.png", request.url));
    if (res.ok) {
      const buf = await res.arrayBuffer();
      logoSrc = `data:image/png;base64,${Buffer.from(buf).toString("base64")}`;
    }
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#fcfcfd",
          backgroundImage:
            "radial-gradient(900px 520px at 12% 0%, rgba(59,130,246,0.16), transparent 55%), radial-gradient(760px 520px at 100% 100%, rgba(37,99,235,0.12), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: wordmark + the brand's core latency claim */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {logoSrc ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 14,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8ebf0",
                  marginRight: 14,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} width={50} height={50} alt="" />
              </div>
            ) : (
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  backgroundColor: "#2563eb",
                  marginRight: 14,
                }}
              />
            )}
            <span style={{ fontSize: 30, fontWeight: 700, color: "#0f172a" }}>
              Signpost
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#2563eb",
                marginRight: 10,
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 600, color: "#0f172a" }}>
              Under 100ms feedback
            </span>
          </div>
        </div>

        {/* Headline + supporting line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 950,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#475569",
              lineHeight: 1.34,
              marginTop: 28,
              maxWidth: 880,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 600, color: "#2563eb" }}>
            signpost.cv
          </span>
          <span style={{ fontSize: 24, color: "#94a3b8" }}>
            Free demo · No sign-up
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
