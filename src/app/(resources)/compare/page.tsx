import Link from "next/link";

import Breadcrumbs from "@/app/_components/Breadcrumbs";
import CompareTable from "@/app/_components/CompareTable";
import { DEMO_URL } from "@/app/_components/navData";
import { CONTACT_EMAIL } from "@/app/_components/legal";
import {
  COMPARE_CHECKED_LABEL,
  COMPARE_CHECKED_ON,
  COMPETITORS,
  FEATURES,
  FOOTNOTES,
  SIGNPOST_ID,
} from "@/data/compare";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";

const OTHERS = COMPETITORS.filter((competitor) => competitor.id !== SIGNPOST_ID);
const OTHER_NAMES = OTHERS.map((competitor) => competitor.name);
const TITLE = `Signpost vs ${OTHER_NAMES.slice(0, -1).join(", ")}, and ${OTHER_NAMES[OTHER_NAMES.length - 1]}`;
const DESCRIPTION = `ASL apps compared feature by feature: real-time webcam feedback, pricing, browser access, dictionaries, and LMS integration. Checked ${COMPARE_CHECKED_LABEL}.`;

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/compare",
  image: ogImage("Signpost vs other ASL apps", "A feature-by-feature comparison, checked " + COMPARE_CHECKED_LABEL + "."),
});

export default function ComparePage() {
  const url = `${SITE_URL}/compare`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        dateModified: COMPARE_CHECKED_ON,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${SITE_URL}/#app` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare ASL apps", item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <article className="pb-20">
        <div className="mx-auto max-w-[1100px] px-6 pt-10 sm:pt-14 lg:px-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare ASL apps" }]} />

          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Compared</p>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              How Signpost compares to other ASL apps
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
              Most ASL apps teach the same way: watch a video, copy it, hope you got it right. Signpost is
              built around one thing none of them do, which is watching your hands and telling you whether
              the sign is right. This page lays out exactly where that puts us next to{" "}
              {OTHER_NAMES.slice(0, -1).join(", ")}, and {OTHER_NAMES[OTHER_NAMES.length - 1]}, including the
              rows where they match us or beat us.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Checked {COMPARE_CHECKED_LABEL} against each product&apos;s public website, help center, and app
              store listing. Numbered notes explain the edge cases.
            </p>
          </header>

          <div className="mt-12">
            <CompareTable
              features={FEATURES}
              notesHref="#notes"
              caption="Feature comparison of Signpost, Lingvano, ASL Bloom, Start ASL, Lifeprint, and SignSchool"
            />
          </div>

          <section aria-labelledby="notes-heading" id="notes" className="mt-10 max-w-3xl scroll-mt-28">
            <h2 id="notes-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Notes
            </h2>
            <ol className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
              {FOOTNOTES.map((note, index) => (
                <li key={note} id={`note-${index + 1}`} className="flex gap-3 scroll-mt-28">
                  <span className="shrink-0 font-mono text-xs text-slate-400">{index + 1}</span>
                  <span>{note}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-slate-500">
              Spotted something out of date? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:text-slate-900">
                {CONTACT_EMAIL}
              </a>{" "}
              and we will fix it.
            </p>
          </section>

          <section aria-labelledby="short-version-heading" className="mt-20">
            <h2 id="short-version-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              The short version of each
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {COMPETITORS.map((competitor) => {
                const highlight = competitor.id === SIGNPOST_ID;
                return (
                  <li
                    key={competitor.id}
                    className={`rounded-2xl p-6 ${highlight ? "bg-blue-50" : "bg-surface ring-1 ring-slate-200/70"}`}
                  >
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                      {highlight ? (
                        competitor.name
                      ) : (
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent-strong"
                        >
                          {competitor.name}
                        </a>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{competitor.summary}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="different-heading" className="mt-20 max-w-3xl">
            <h2 id="different-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What the table does not show
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600 text-pretty">
              <p>
                Several of these products are excellent at what they do. Lifeprint has taught more people ASL
                for free than anyone, and Lingvano&apos;s lessons with Deaf teachers are genuinely well made.
                If you want a video course, you have good options.
              </p>
              <p>
                The gap we care about is the one every video course shares. A video shows you the sign. It
                cannot see your hands, so it cannot tell you that your T reads as an A or that your HELLO is
                starting at the wrong spot. Signpost runs a computer vision model in your browser that grades
                every sign as you make it, in under 100 milliseconds, and never uploads your video. That is
                the difference between practicing and practicing correctly.
              </p>
              <p>
                We also want to be straightforward about what we are not. Signpost does not have live Deaf
                tutors, and our sign dictionary is smaller than Lifeprint&apos;s or ASL Bloom&apos;s. We add
                signs as the models are trained on them, and{" "}
                <Link href="/signs" className="font-medium text-accent hover:text-accent-strong">
                  the dictionary
                </Link>{" "}
                lists exactly which ones have camera practice today.
              </p>
            </div>
          </section>

          <section className="mt-20 rounded-2xl bg-slate-50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance sm:text-3xl">
              See the difference in about a minute
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600 text-pretty">
              Open the demo, turn on your webcam, and sign your first letters. No account, no download, no
              credit card.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800"
            >
              Try Signpost free
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
