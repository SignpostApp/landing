import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "../_components/PostBody";
import {
  AUTHOR,
  bannerAlt,
  formatDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  readingMinutes,
  wordCount,
  type Post,
} from "../posts";
import { SITE_URL, ogImage, pageMetadata, type OgImage } from "@/lib/seo";

function postOgImage(post: Post): OgImage {
  if (post.image) {
    return {
      url: `${SITE_URL}${post.image}`,
      width: 2400,
      height: 1000,
      alt: bannerAlt(post),
    };
  }
  return ogImage(post.title, post.description);
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: postOgImage(post),
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [AUTHOR.name],
      section: post.category,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const minutes = readingMinutes(post);
  const others = getRelatedPosts(post.slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "en-US",
        image: postOgImage(post).url,
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#max-castagnoli`,
          name: AUTHOR.name,
          url: AUTHOR.url,
          sameAs: [AUTHOR.url],
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        articleSection: post.category,
        wordCount: wordCount(post),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
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

      <article className="pb-12">
        {/* ═══ HEADER ═══ */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-10 sm:pt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
          >
            <span aria-hidden>←</span> All posts
          </Link>

          <p className="text-xs uppercase tracking-[0.16em] text-blue-600 font-semibold mb-4">
            {post.category}
          </p>

          <h1 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.08] text-slate-900 text-balance">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span className="font-medium text-slate-700">{AUTHOR.name}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>&middot;</span>
            <span>{minutes} min read</span>
          </div>
        </div>

        {/* ═══ BODY ═══ */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 mt-12 sm:mt-14">
          <PostBody blocks={post.body} />

          {/* ═══ CTA ═══ */}
          <div className="mt-14 border border-slate-200 p-7 sm:p-9 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 text-balance">
              Stop practicing in the dark.
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed text-[0.95rem] max-w-md mx-auto">
              Signpost watches your hands through your webcam and tells you, in
              real time, whether your sign is right. Try the free demo, no sign-up
              needed.
            </p>
            <a
              href="https://demo.signpost.cv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 shadow-[0_1px_2px_rgba(37,99,235,0.15),0_10px_28px_-10px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
            >
              Try the free demo
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* ═══ CONTINUE READING ═══ */}
        {others.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 lg:px-10 mt-20">
            <h2 className="text-sm uppercase tracking-[0.14em] text-slate-500 font-semibold mb-6">
              Keep reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group flex flex-col border border-slate-200 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-18px_rgba(15,23,42,0.18)]"
                >
                  <div className="p-6">
                    <span className="text-xs font-medium text-blue-600">
                      {other.category}
                    </span>
                    <h3 className="mt-2 text-base font-semibold tracking-tight text-slate-900 leading-snug text-balance group-hover:text-blue-700 transition-colors">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
