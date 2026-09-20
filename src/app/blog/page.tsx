import Link from "next/link";
import {
  AUTHOR,
  formatDate,
  getAllPosts,
  readingMinutes,
} from "./posts";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";

const BLOG_TITLE = "ASL Learning Blog: Practical Sign Language Guides";
const BLOG_DESCRIPTION =
  "Practical, honest guides to learning American Sign Language: the ASL alphabet, realistic timelines, common mistakes, and how to actually build skill at home.";

export const metadata = pageMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog",
  image: ogImage(
    "The Signpost ASL Learning Blog",
    "Honest, practical guides to learning American Sign Language, from the alphabet to building real skill at home.",
  ),
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Signpost ASL Learning Blog",
        description: BLOG_DESCRIPTION,
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
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col h-full border border-slate-200 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-18px_rgba(15,23,42,0.18)]"
              >
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
