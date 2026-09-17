import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const DEMO_ORIGIN = "https://demo.signpost.cv";

function trackDemoClick(event: MouseEvent) {
  if (event.type === "auxclick" && event.button !== 1) return;
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!(link instanceof HTMLAnchorElement) || link.origin !== DEMO_ORIGIN) return;
  posthog.capture(
    "demo_clicked",
    {
      placement: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page",
      link_text: link.textContent?.trim() ?? "",
    },
    { send_instantly: true },
  );
}

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: POSTHOG_HOST.replace(".i.posthog.com", ".posthog.com"),
    defaults: "2026-08-30",
  });
  document.addEventListener("click", trackDemoClick);
  document.addEventListener("auxclick", trackDemoClick);
}
