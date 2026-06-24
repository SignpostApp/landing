import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 antialiased">
      {/* ═══ NAV ═══ */}
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

          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/"
              className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <a
              href="https://demo.signpost.cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 text-sm font-semibold transition-colors"
            >
              Try the demo
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      {/* ═══ FOOTER ═══ */}
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
              <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Blog</Link>
              <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
              <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Demo</a>
              <Link href="/legal/privacy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
              <Link href="/legal/terms" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            </nav>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Matrix Studios Software. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
