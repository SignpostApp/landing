import type { ReactNode } from "react";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 antialiased">
      <SiteHeader variant="plain" />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
