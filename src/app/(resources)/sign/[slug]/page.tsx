import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/app/_components/Breadcrumbs";
import SignVideo from "@/app/_components/SignVideo";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";
import {
  categoryPath,
  demoSignUrl,
  getAllSigns,
  getRelatedSigns,
  getSignBySlug,
  signDescription,
  signDisplayName,
  signHeading,
  signPath,
  signTitle,
  youTubeEmbedUrl,
  youTubeThumbnail,
  type Sign,
} from "@/lib/signs";

export function generateStaticParams() {
  return getAllSigns().map((sign) => ({ slug: sign.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) return {};

  const metadata = pageMetadata({
    title: signTitle(sign),
    description: signDescription(sign),
    path: signPath(sign),
    image: ogImage(signTitle(sign), sign.summary),
  });
  if (!sign.authored) metadata.robots = { index: false, follow: true };
  return metadata;
}

function PracticeCard({ sign }: { sign: Sign }) {
  const name = signDisplayName(sign);
  if (sign.trained) {
    return (
      <div className="mt-6 rounded-2xl bg-blue-50 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Camera practice</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          Practice {name} with your webcam
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Signpost tracks your hand through your webcam and checks it against a model trained on real
          recordings of {name}. Hold the sign steady and the score fills as it locks on. Everything runs on
          your device, and no video is uploaded.
        </p>
        <a
          href={demoSignUrl(sign)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800"
        >
          Open camera practice
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-2xl bg-[#f3f4f6] p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Video reference</p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
        Camera practice for {name} is on the way
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We have not finished training the model on {name} yet, so use the clip and the steps as your
        reference and check your form in a mirror. Most of the dictionary already works with your webcam.
      </p>
      <Link
        href="/signs"
        className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-700"
      >
        Browse signs with camera practice
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
          &rarr;
        </span>
      </Link>
    </div>
  );
}

export default async function SignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) notFound();

  const url = `${SITE_URL}${signPath(sign)}`;
  const name = signDisplayName(sign);
  const heading = signHeading(sign);
  const related = getRelatedSigns(sign, 8);
  const relatedSameTopic = related.every((item) => item.category.slug === sign.category.slug);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: signTitle(sign),
      description: signDescription(sign),
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@type": "Thing", name: `${name} (American Sign Language)` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(sign.video ? { video: { "@id": `${url}#video` } } : {}),
      ...(sign.image ? { primaryImageOfPage: `${SITE_URL}${sign.image.src}` } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ASL Dictionary", item: `${SITE_URL}/signs` },
        {
          "@type": "ListItem",
          position: 3,
          name: sign.category.name,
          item: `${SITE_URL}${categoryPath(sign.category)}`,
        },
        { "@type": "ListItem", position: 4, name, item: url },
      ],
    },
  ];
  if (sign.video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: heading,
      description: sign.summary,
      thumbnailUrl: [youTubeThumbnail(sign.video)],
      embedUrl: youTubeEmbedUrl(sign.video, false),
      ...(sign.video.uploadDate ? { uploadDate: sign.video.uploadDate } : {}),
      ...(sign.video.author
        ? {
            author: {
              "@type": "Organization",
              name: sign.video.author,
              ...(sign.video.authorUrl ? { url: sign.video.authorUrl } : {}),
            },
          }
        : {}),
    });
  }
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <article className="pb-20">
        <div className="mx-auto max-w-[1100px] px-6 pt-10 sm:pt-14 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "ASL Dictionary", href: "/signs" },
              { label: sign.category.name, href: categoryPath(sign.category) },
              { label: name },
            ]}
          />

          <header className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em]">
              <Link href={categoryPath(sign.category)} className="text-blue-600 hover:text-blue-700">
                {sign.category.name}
              </Link>
              <span aria-hidden className="text-slate-300">
                &middot;
              </span>
              <span className="text-slate-500">
                {sign.trained ? "Camera practice available" : "Video reference"}
              </span>
            </div>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </h1>
            {sign.aka.length > 0 ? (
              <p className="mt-3 text-slate-500">Also used for {sign.aka.join(", ")}.</p>
            ) : null}
            <p className="mt-5 text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
              {sign.summary}
            </p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              {sign.video ? (
                <SignVideo video={sign.video} title={heading} />
              ) : sign.image ? (
                <figure className="rounded-2xl bg-[#f3f4f6] p-8 sm:p-10">
                  <Image
                    src={sign.image.src}
                    alt={sign.image.alt}
                    width={320}
                    height={400}
                    unoptimized
                    priority
                    className="mx-auto h-64 w-auto sm:h-80"
                  />
                  <figcaption className="mt-4 text-center text-xs text-slate-500">
                    The {sign.label} handshape. See{" "}
                    <Link href="/asl-alphabet" className="underline underline-offset-2 hover:text-slate-900">
                      the full ASL alphabet chart
                    </Link>
                    .
                  </figcaption>
                </figure>
              ) : null}
              <PracticeCard sign={sign} />
            </div>

            <div className="space-y-10">
              {sign.steps.length > 0 ? (
                <section aria-labelledby="steps-heading">
                  <h2 id="steps-heading" className="text-xl font-semibold tracking-tight text-slate-900">
                    How to sign {name}
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {sign.steps.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 font-mono text-xs font-medium text-blue-600">
                          {index + 1}
                        </span>
                        <p className="text-[0.95rem] leading-relaxed text-slate-600">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {sign.tips.length > 0 ? (
                <section aria-labelledby="tips-heading">
                  <h2 id="tips-heading" className="text-xl font-semibold tracking-tight text-slate-900">
                    Tips and common mistakes
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {sign.tips.map((tip) => (
                      <li key={tip} className="flex gap-3 text-[0.95rem] leading-relaxed text-slate-600">
                        <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="mx-auto mt-20 max-w-[1100px] px-6 lg:px-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="related-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {relatedSameTopic ? `More ${sign.category.name.toLowerCase()} signs` : "More signs to learn"}
              </h2>
              <Link
                href={relatedSameTopic ? categoryPath(sign.category) : "/signs"}
                className="text-sm text-slate-500 transition-colors hover:text-slate-900"
              >
                {relatedSameTopic ? "View all" : "Browse the dictionary"}
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={signPath(item)}
                    className="inline-flex items-center rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {signDisplayName(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          aria-labelledby="keep-learning-heading"
          className="mx-auto mt-16 max-w-[1100px] px-6 lg:px-10"
        >
          <h2 id="keep-learning-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Keep learning
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Link href="/signs" className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300">
              <p className="font-semibold text-slate-900 group-hover:text-blue-700">ASL Dictionary</p>
              <p className="mt-1 text-sm text-slate-600">Every sign Signpost teaches, by topic.</p>
            </Link>
            <Link href="/asl-alphabet" className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300">
              <p className="font-semibold text-slate-900 group-hover:text-blue-700">The ASL alphabet</p>
              <p className="mt-1 text-sm text-slate-600">All 26 handshapes with a free printable chart.</p>
            </Link>
            <Link href="/blog/best-way-to-learn-sign-language-at-home" className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300">
              <p className="font-semibold text-slate-900 group-hover:text-blue-700">Learning ASL at home</p>
              <p className="mt-1 text-sm text-slate-600">How to build real skill without a classroom.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
