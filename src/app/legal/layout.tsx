import type { ReactNode } from "react";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 antialiased">
      <SiteHeader />

      {/* Page content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20 pb-24">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
