import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { CATEGORIES } from "@/data/sign-content";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";
import {
  categoryPath,
  getCategoriesWithSigns,
  getCategoryBySlug,
  signDisplayName,
  signPath,
  type Sign,
} from "@/lib/signs";

function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function coverage(signs: Sign[]) {
  const withVideo = signs.filter((sign) => sign.video).length;
  const withImage = signs.filter((sign) => sign.image).length;
  const trained = signs.filter((sign) => sign.trained).length;
  const parts = ["step-by-step instructions"];
  if (withVideo === signs.length) parts.push("a video of each sign");
  else if (withVideo > 0) parts.push("videos for most signs");
  if (withImage === signs.length) parts.push("an illustration of each handshape");
  if (trained === signs.length) parts.push("free webcam practice on Signpost");
  else if (trained > 0) parts.push(`free webcam practice for ${trained} of them`);
  const hint =
    withVideo === signs.length
      ? "Click any sign for the video, the steps, and the mistakes to avoid."
      : withVideo > 0
        ? "Click any sign for the steps, the mistakes to avoid, and the video where there is one."
        : "Click any sign for the steps and the mistakes to avoid.";
  return { parts, hint, trained };
}

export function generateStaticParams() {
  return getCategoriesWithSigns()
    .filter(({ category }) => category.slug !== "alphabet")
    .map(({ category }) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const group = getCategoryBySlug(slug);
  if (!group || group.category.slug === "alphabet") return {};

  const { category, signs } = group;
  const examples = signs.slice(0, 3).map(signDisplayName);
  const title = `${category.name} in ASL: How to Sign ${formatList(signs.length > 3 ? [...examples, "More"] : examples)}`;
  const description = `${signs.length} ${category.name.toLowerCase()} signs in American Sign Language, with ${formatList(coverage(signs).parts)}.`;

  return pageMetadata({
    title,
    description,
    path: categoryPath(category),
    image: ogImage(`${category.name} in ASL`, category.blurb),
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  if (slug === "alphabet") permanentRedirect("/asl-alphabet");
  const group = getCategoryBySlug(slug);
  if (!group) notFound();

  const { category, signs } = group;
  const url = `${SITE_URL}${categoryPath(category)}`;
  const { trained: trainedCount, hint } = coverage(signs);
  const otherCategories = CATEGORIES.filter(
    (other) => other.slug !== category.slug && getCategoryBySlug(other.slug),
  );

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: `${category.name} in ASL`,
        description: category.blurb,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: `${category.name} signs`,
        numberOfItems: signs.length,
        itemListElement: signs.map((sign, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: signDisplayName(sign),
          url: `${SITE_URL}${signPath(sign)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ASL Dictionary", item: `${SITE_URL}/signs` },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-10 sm:pt-14 lg:px-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "ASL Dictionary", href: "/signs" },
            { label: category.name },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">ASL Dictionary</p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            {category.name} in ASL
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">{category.blurb}</p>
          <p className="mt-3 text-sm text-slate-500">
            {signs.length} signs
            {trainedCount > 0 ? `, ${trainedCount} with webcam practice` : ""}. {hint}
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {signs.map((sign) => (
            <li key={sign.slug}>
              <Link
                href={signPath(sign)}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-700">
                    {signDisplayName(sign)}
                  </h2>
                  <span className="shrink-0 text-xs font-medium text-slate-500">
                    {sign.trained ? "Camera practice" : "Video"}
                  </span>
                </div>
                {sign.aka.length > 0 ? (
                  <p className="mt-1 text-xs text-slate-500">Also {sign.aka.join(", ")}</p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{sign.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="other-topics" className="mt-16">
          <h2 id="other-topics" className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Other topics
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {otherCategories.map((other) => (
              <li key={other.slug}>
                <Link
                  href={categoryPath(other)}
                  className="inline-flex items-center rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
