"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records the visitor's first-touch channel on page load. Mounted in the root
 * layout so it runs no matter where the visitor lands (a UTM-tagged ad can
 * point at /blog just as easily as at /), and renders nothing.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
