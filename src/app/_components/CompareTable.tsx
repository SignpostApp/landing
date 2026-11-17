import Link from "next/link";

import { COMPETITORS, SIGNPOST_ID, type CompareFeature } from "@/data/compare";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}

export default function CompareTable({
  features,
  notesHref = "#notes",
  caption,
}: {
  features: CompareFeature[];
  notesHref?: string;
  caption: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200/70">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:px-6">
              Feature
            </th>
            {COMPETITORS.map((competitor) => {
              const highlight = competitor.id === SIGNPOST_ID;
              return (
                <th
                  key={competitor.id}
                  scope="col"
                  className={`px-3 py-4 text-center text-sm font-semibold ${
                    highlight ? "bg-blue-50 text-blue-700" : "text-slate-900"
                  }`}
                >
                  {competitor.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.id} className="border-t border-slate-100">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white px-5 py-4 text-sm font-medium leading-snug text-slate-900 sm:px-6"
              >
                {feature.label}
              </th>
              {COMPETITORS.map((competitor) => {
                const has = feature.values[competitor.id] ?? false;
                const note = feature.notes?.[competitor.id];
                const highlight = competitor.id === SIGNPOST_ID;
                return (
                  <td
                    key={competitor.id}
                    className={`px-3 py-4 text-center align-middle ${highlight ? "bg-blue-50" : ""}`}
                  >
                    <span
                      className={`inline-flex items-center justify-center ${
                        has ? (highlight ? "text-blue-600" : "text-slate-900") : "text-slate-300"
                      }`}
                    >
                      {has ? <CheckIcon /> : <CrossIcon />}
                      <span className="sr-only">{has ? "Yes" : "No"}</span>
                    </span>
                    {note ? (
                      <Link
                        href={`${notesHref}`}
                        className="ml-0.5 align-super text-[0.65rem] font-semibold text-slate-500 hover:text-blue-700"
                        aria-label={`See note ${note}`}
                      >
                        {note}
                      </Link>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
