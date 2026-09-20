import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/posts";
import { SITE_URL } from "@/lib/seo";

const LEGAL_PAGES = ["privacy", "terms", "cookies", "gdpr", "security"];
const LEGAL_UPDATED = new Date("2026-04-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts.reduce((latest, post) => {
    const date = post.updated ?? post.date;
    return date > latest ? date : latest;
  }, posts[0].date);

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/blog`, lastModified: new Date(latestPostDate) },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
    })),
    ...LEGAL_PAGES.map((slug) => ({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: LEGAL_UPDATED,
    })),
  ];
}
