"use client";

import Image from "next/image";
import Link from "next/link";

import { DEMO_URL } from "./navData";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Real-time feedback", href: "/blog/how-real-time-sign-feedback-works" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Try the demo", href: DEMO_URL, external: true },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For self-learners", href: "/blog/learn-asl-on-your-own" },
      { label: "For homeschoolers", href: "/blog/asl-for-homeschoolers" },
      { label: "For schools", href: "/blog/asl-for-schools-and-districts" },
      { label: "For educators", href: "/blog/asl-for-educators" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#team" },
      { label: "Blog", href: "/blog" },
      { label: "GitHub", href: "https://github.com/SignpostApp", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "GDPR", href: "/legal/gdpr" },
      { label: "Security", href: "/legal/security" },
    ],
  },
];

const linkClass =
  "text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit";

export default function SiteFooter() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
          <div className="max-w-sm">
            <Link href="/" aria-label="Signpost home" className="inline-flex">
              <Image
                src="/text-logo.png"
                alt="Signpost"
                width={200}
                height={48}
                className="h-12 w-auto -ml-1 mb-5"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              A machine-learning-powered way to learn American Sign Language at
              home, with real-time feedback on every sign.
            </p>
            <div className="mt-5 flex items-start gap-3">
              <Image
                src="/matrix-studios-logo.png"
                alt="Matrix Studios Software"
                width={512}
                height={512}
                className="h-5 w-5 shrink-0 grayscale opacity-70"
              />
              <div className="text-xs text-slate-400 leading-relaxed">
                <p>Matrix Studios Software</p>
                <p>1968 S. Coast Hwy #3479, Laguna Beach, CA 92651</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 lg:justify-self-end">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-slate-900 mb-1">
                  {column.title}
                </p>
                {column.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Matrix Studios Software. All rights
            reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
