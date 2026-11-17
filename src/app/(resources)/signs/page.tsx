import Link from "next/link";

import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { DEMO_URL } from "@/app/_components/navData";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";
import {
  categoryPath,
  getAllSigns,
  getCategoriesWithSigns,
  signDisplayName,
  signPath,
} from "@/lib/signs";

const TITLE = "ASL Dictionary: How to Sign 200+ Words, Letters, and Numbers";
const DESCRIPTION =
  "Look up how to sign common words in American Sign Language. Every entry has a video, step-by-step instructions, common mistakes, and free webcam practice.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/signs",
  image: ogImage("ASL Dictionary", "How to sign 200+ words, letters, and numbers, with free webcam practice."),
});

export default function DictionaryIndexPage() {
  const groups = getCategoriesWithSigns();
  const all = getAllSigns();
  const trainedCount = all.filter((sign) => sign.trained).length;
  const url = `${SITE_URL}/signs`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: "Signpost ASL Dictionary",
        description: DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#topics` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#topics`,
        name: "ASL dictionary topics",
        numberOfItems: groups.length,
        itemListElement: groups.map(({ category }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.name,
          url: `${SITE_URL}${categoryPath(category)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ASL Dictionary", item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-10 sm:pt-14 lg:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "ASL Dictionary" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Reference</p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            ASL Dictionary
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
            Every sign Signpost teaches, organized by topic. Each entry shows a native signer making the
            sign, breaks down the handshape and movement step by step, and lists the mistakes beginners
            make. Most signs can be practiced with your webcam, which checks your form as you sign.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>{all.length} signs</span>
            <span>{trainedCount} with webcam practice</span>
            <span>{groups.length} topics</span>
          </div>
        </header>

        <section aria-labelledby="topics-heading" className="mt-14">
          <h2 id="topics-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Browse by topic
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ category, signs }) => (
              <li key={category.slug}>
                <Link
                  href={categoryPath(category)}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-700">
                      {category.name}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-slate-500">{signs.length}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{category.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {groups.map(({ category, signs }) => (
          <section key={category.slug} aria-labelledby={`cat-${category.slug}`} className="mt-16">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`cat-${category.slug}`} className="text-xl font-semibold tracking-tight text-slate-900">
                <Link href={categoryPath(category)} className="hover:text-blue-700">
                  {category.name}
                </Link>
              </h2>
              <Link
                href={categoryPath(category)}
                className="text-sm text-slate-500 transition-colors hover:text-slate-900"
              >
                {category.slug === "alphabet" ? "Alphabet guide and chart" : "View topic"}
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {signs.map((sign) => (
                <li key={sign.slug}>
                  <Link
                    href={signPath(sign)}
                    className="inline-flex items-center rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {signDisplayName(sign)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-20 rounded-2xl bg-[#f8fafc] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance sm:text-3xl">
            Looking up a sign is the easy part. Signing it right is the hard part.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 text-pretty">
            Open Signpost in your browser, turn on your webcam, and it will tell you whether your handshape,
            position, and movement match. Free, no account, nothing uploaded.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800"
          >
            Try it with your webcam
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </section>
      </div>
    </>
  );
}
