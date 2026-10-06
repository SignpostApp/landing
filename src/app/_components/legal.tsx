import Link from "next/link";
import type { ReactNode } from "react";

export const CONTACT_EMAIL = "signpostcv@gmail.com";
export const COMPANY_NAME = "Matrix Studios Software";
export const COMPANY_ADDRESS = "1968 S. Coast Hwy #3479, Laguna Beach, CA 92651";
export const LEGAL_UPDATED = "October 5, 2026";

const POLICIES = [
  { href: "/trust", label: "Trust Center" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/gdpr", label: "GDPR Notice" },
  { href: "/legal/security", label: "Security" },
  { href: "/legal/subprocessors", label: "Subprocessors" },
];

export function Email() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export function LegalHeader({
  eyebrow = "Legal",
  title,
  updated = LEGAL_UPDATED,
  children,
}: {
  eyebrow?: string;
  title: string;
  updated?: string | null;
  children?: ReactNode;
}) {
  return (
    <header className="mb-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 mb-4">
        {eyebrow}
      </p>
      <h1 className="text-[2.25rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-slate-900 text-balance">
        {title}
      </h1>
      {updated ? (
        <p className="mt-5 text-sm text-slate-500">Last updated {updated}</p>
      ) : null}
      {children ? (
        <div className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 text-pretty">
          {children}
        </div>
      ) : null}
    </header>
  );
}

export function ContactCard({ note }: { note?: ReactNode }) {
  return (
    <div className="mt-6 border border-slate-200 bg-white p-6 sm:p-8">
      <p className="font-medium text-slate-900">{COMPANY_NAME}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {COMPANY_ADDRESS}
        <br />
        Email: <Email />
      </p>
      {note ? <p className="mt-3 text-sm leading-relaxed text-slate-600">{note}</p> : null}
    </div>
  );
}

export function LegalTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-8 overflow-x-auto border border-slate-200 bg-white">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-600">
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3.5 leading-relaxed ${j === 0 ? "font-medium text-slate-900" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PolicyLinks({ current }: { current: string }) {
  return (
    <ul className="mt-6 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2">
      {POLICIES.filter((policy) => policy.href !== current).map((policy) => (
        <li key={policy.href} className="bg-white">
          <Link href={policy.href} className="legal-link-row">
            {policy.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
