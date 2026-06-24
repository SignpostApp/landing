import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 antialiased">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5">
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label="Signpost home"
          >
            <Image
              src="/text-logo.png"
              alt="Signpost"
              width={200}
              height={48}
              priority
              className="h-11 w-auto -my-2 group-hover:opacity-80 transition-opacity"
            />
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20 pb-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link href="/" className="flex items-center" aria-label="Signpost home">
              <Image
                src="/text-logo.png"
                alt="Signpost"
                width={150}
                height={36}
                className="h-8 w-auto"
              />
            </Link>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/legal/privacy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
              <Link href="/legal/terms" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
              <Link href="/legal/cookies" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Cookies</Link>
              <Link href="/legal/gdpr" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">GDPR</Link>
              <Link href="/legal/security" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Security</Link>
            </nav>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Matrix Studios Software
          </p>
        </div>
      </footer>
    </div>
  );
}
