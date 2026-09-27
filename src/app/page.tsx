import LandingPage from "./LandingPage";
import { formatDate, getAllPosts } from "./blog/posts";
import { SITE_DESCRIPTION, SITE_TITLE, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Page() {
  const latestPosts = getAllPosts()
    .slice(0, 3)
    .map(({ slug, title, category, date }) => ({
      slug,
      title,
      category,
      date,
      dateLabel: formatDate(date),
    }));

  return <LandingPage latestPosts={latestPosts} />;
}
