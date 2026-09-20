import type { Metadata } from "next";

export const SITE_URL = "https://signpost.cv";
export const SITE_NAME = "Signpost";
export const SITE_TITLE = "Learn ASL Online for Free with Real-Time Feedback";
export const SITE_DESCRIPTION =
  "Learn American Sign Language at home with free machine learning lessons that watch your hands through your webcam and correct your signs in real time. No sign-up to try.";

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export const DEFAULT_OG_IMAGE: OgImage = {
  url: `${SITE_URL}/og`,
  width: 2400,
  height: 1260,
  alt: "Signpost: learn American Sign Language online for free with real-time feedback",
};

export function ogImage(title: string, subtitle?: string, alt?: string): OgImage {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return {
    url: `${SITE_URL}/og?${params.toString()}`,
    width: 2400,
    height: 1260,
    alt: alt ?? title,
  };
}

type ArticleMeta = {
  publishedTime: string;
  modifiedTime: string;
  authors: string[];
  section?: string;
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
  article?: ArticleMeta;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  article,
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const shared = {
    title: fullTitle,
    description,
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [img],
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: article
      ? { ...shared, type: "article", ...article }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}
