import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit, EB_Garamond } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-subtext",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const garamond = EB_Garamond({
  variable: "--font-subtitle",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signpost.cv"),
  title: "Learn ASL Online — Free AI Sign Language Feedback | Signpost",
  description:
    "Learn American Sign Language online with real-time AI feedback. Signpost uses computer vision to track your hand signs, correct your form instantly, and teach ASL fingerspelling through a structured curriculum. Free demo — no sign-up required.",
  keywords: [
    "learn ASL",
    "learn ASL online",
    "learn sign language",
    "ASL app",
    "American Sign Language",
    "ASL course online",
    "ASL fingerspelling",
    "sign language learning app",
    "learn sign language online free",
    "ASL for beginners",
    "ASL practice",
    "sign language class",
    "AI sign language",
    "ASL tutor",
    "sign language feedback",
    "learn ASL free",
    "ASL alphabet",
    "best way to learn ASL",
    "online ASL classes",
    "sign language lessons",
    "ASL education",
    "Signpost",
  ],
  alternates: {
    canonical: "https://signpost.cv",
  },
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/signpost-logo.png",
  },
  openGraph: {
    title: "Learn ASL Online — Free AI Sign Language Feedback | Signpost",
    description:
      "Learn American Sign Language with real-time AI feedback powered by computer vision. Free demo available — no sign-up required.",
    url: "https://signpost.cv",
    siteName: "Signpost",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://signpost.cv/og-image.png",
        width: 1200,
        height: 630,
        alt: "Signpost — Learn ASL with AI feedback",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn ASL Online — Free AI Sign Language Feedback | Signpost",
    description:
      "Master American Sign Language with real-time AI feedback. Computer vision tracks your signs and corrects your form instantly.",
    images: ["https://signpost.cv/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Signpost",
      url: "https://signpost.cv",
      description:
        "AI-powered American Sign Language learning platform using computer vision for real-time feedback.",
      founders: [
        { "@type": "Person", name: "Jerry Xiao", jobTitle: "CEO" },
        { "@type": "Person", name: "Max Castagnoli", jobTitle: "CTO" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Signpost",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: "https://signpost.cv",
      description:
        "Learn ASL online with real-time AI feedback. Computer vision tracks your hand signs and provides instant corrections.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free demo available",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "200",
        bestRating: "5",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I learn ASL online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Signpost lets you learn ASL online using just a webcam. Our AI-powered computer vision watches your hand signs in real-time and gives instant feedback on your form. Start with fingerspelling basics and progress through a structured curriculum to full conversational ASL.",
          },
        },
        {
          "@type": "Question",
          name: "Is Signpost free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Signpost offers a free demo that requires no sign-up. Just open the app, turn on your webcam, and start signing. Our AI gives you real-time feedback immediately.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to start learning ASL with Signpost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All you need is a computer or device with a webcam and a modern web browser. No downloads, installations, or special equipment required.",
          },
        },
        {
          "@type": "Question",
          name: "How is Signpost different from other ASL apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike video-based ASL courses, Signpost uses computer vision AI to watch your actual hand signs and correct your form in real-time — like having a personal ASL tutor available 24/7 with sub-50ms feedback latency.",
          },
        },
        {
          "@type": "Question",
          name: "Can complete beginners use Signpost to learn sign language?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Signpost is designed for beginners with zero ASL experience. Our structured curriculum starts with the ASL alphabet and fingerspelling, then progresses to common signs and conversational ASL at your own pace.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} ${garamond.variable} antialiased noise`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}

