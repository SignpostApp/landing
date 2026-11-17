import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/posts";
import generated from "@/data/signs.generated.json";
import { COMPARE_CHECKED_ON } from "@/data/compare";
import { SITE_URL } from "@/lib/seo";
import { categoryPath, getCategoriesWithSigns, getIndexableSigns, signPath } from "@/lib/signs";

const LEGAL_PAGES = ["privacy", "terms", "cookies", "gdpr", "security", "subprocessors"];
const LEGAL_UPDATED = new Date("2026-10-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts.reduce((latest, post) => {
    const date = post.updated ?? post.date;
    return date > latest ? date : latest;
  }, posts[0].date);
  const signsUpdated = new Date(generated.generatedAt);

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/signs`, lastModified: signsUpdated },
    { url: `${SITE_URL}/asl-alphabet`, lastModified: signsUpdated },
    { url: `${SITE_URL}/compare`, lastModified: new Date(COMPARE_CHECKED_ON) },
    ...getCategoriesWithSigns()
      .filter(({ category }) => category.slug !== "alphabet")
      .map(({ category }) => ({
        url: `${SITE_URL}${categoryPath(category)}`,
        lastModified: signsUpdated,
      })),
    ...getIndexableSigns().map((sign) => ({
      url: `${SITE_URL}${signPath(sign)}`,
      lastModified: signsUpdated,
    })),
    { url: `${SITE_URL}/blog`, lastModified: new Date(latestPostDate) },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
    })),
    { url: `${SITE_URL}/trust`, lastModified: LEGAL_UPDATED },
    ...LEGAL_PAGES.map((slug) => ({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: LEGAL_UPDATED,
    })),
  ];
}
