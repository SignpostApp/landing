import type { Metadata } from "next";
import Link from "next/link";
import PostBanner from "./_components/PostBanner";
import {
  AUTHOR,
  formatDate,
  getAllPosts,
  readingMinutes,
} from "./posts";

const SITE_URL = "https://signpost.cv";

export const metadata: Metadata = {
  title: "ASL Learning Blog — Tips for Learning Sign Language",
  description:
    "Practical, honest guides to learning American Sign Language: the ASL alphabet, realistic timelines, common mistakes, and how to actually build skill at home.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "ASL Learning Blog | Signpost",
    description:
      "Practical, honest guides to learning American Sign Language, from the ASL alphabet to building real skill at home.",
    url: `${SITE_URL}/blog`,
    siteName: "Signpost",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASL Learning Blog | Signpost",
    description:
      "Practical, honest guides to learning American Sign Language, from the ASL alphabet to building real skill at home.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Signpost ASL Learning Blog",
        description: metadata.description,
        url: `${SITE_URL}/blog`,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          author: { "@type": "Person", name: AUTHOR.name },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* ═══ HEADER ═══ */}
        <header className="pt-14 sm:pt-20 lg:pt-24 pb-12 lg:pb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold mb-4">
            The Signpost Blog
          </p>
          <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.05] text-slate-900 text-balance">
            Learning ASL, written plainly.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
            Honest, practical guides to learning American Sign Language: what the
            alphabet really takes, how long fluency actually takes, and why
            feedback is the piece most learners are missing.
          </p>
        </header>

        {/* ═══ POST GRID ═══ */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24 lg:pb-32">
          {posts.map((post, i) => (
            <article key={post.slug} className="group flex flex-col">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]"
              >
                <PostBanner
                  post={post}
                  rounded={false}
                  priority={i === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-medium text-blue-600">{post.category}</span>
                    <span aria-hidden>&middot;</span>
                    <span>{readingMinutes(post)} min read</span>
                  </div>

                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 leading-snug text-balance group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-[0.95rem] text-slate-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
