import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient glow — top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-10 py-3 sm:py-4 bg-[rgba(5,5,8,0.85)] backdrop-blur-xl border-b border-white/4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group"
            aria-label="Back to Signpost home"
          >
            <Image
              src="/signpost-logo.png"
              alt="Signpost"
              width={24}
              height={24}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-display text-base tracking-tight hidden sm:inline">
              Signpost
            </span>
          </Link>

          <Link
            href="/"
            className="font-mono-upper hover:text-foreground transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-4xl mx-auto px-6 lg:px-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-[rgba(5,5,8,0.3)] py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-subtext text-xs text-muted/60">
              &copy; {new Date().getFullYear()} Signpost App, Inc.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <Link href="/legal/privacy" className="footer-link text-xs">
                Privacy
              </Link>
              <Link href="/legal/terms" className="footer-link text-xs">
                Terms
              </Link>
              <Link href="/legal/cookies" className="footer-link text-xs">
                Cookies
              </Link>
              <Link href="/legal/gdpr" className="footer-link text-xs">
                GDPR
              </Link>
              <Link href="/legal/security" className="footer-link text-xs">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
