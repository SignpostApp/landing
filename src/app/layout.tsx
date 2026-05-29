import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import { Geist, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://signpost.cv";
const SITE_NAME = "Signpost";
const SITE_TITLE = "Learn ASL Online for Free with AI Feedback | Signpost";
const SITE_DESCRIPTION =
  "Learn American Sign Language at home with free, AI-powered lessons. Signpost watches your hands through your webcam and tells you instantly if your signs are right. Start with the ASL alphabet and build up to full conversations. No sign-up needed for the demo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Signpost",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Signpost App, Inc.", url: SITE_URL }],
  creator: "Signpost App, Inc.",
  publisher: "Signpost App, Inc.",
  category: "education",
  keywords: [
    "learn ASL",
    "learn ASL online",
    "learn ASL for free",
    "learn sign language",
    "learn sign language online",
    "learn sign language for free",
    "learn sign language at home",
    "how to learn ASL",
    "how to learn sign language",
    "free ASL app",
    "free sign language app",
    "free ASL lessons",
    "free ASL course online",
    "ASL app",
    "ASL classes online",
    "ASL course online",
    "American Sign Language",
    "American Sign Language app",
    "American Sign Language classes",
    "ASL fingerspelling",
    "ASL fingerspelling practice",
    "ASL alphabet",
    "learn the ASL alphabet",
    "sign language learning app",
    "sign language lessons online",
    "ASL for beginners",
    "sign language for beginners",
    "ASL practice",
    "ASL practice app",
    "ASL tutor",
    "AI ASL tutor",
    "AI sign language",
    "AI sign language tutor",
    "AI sign language teacher",
    "sign language feedback",
    "real-time ASL feedback",
    "best way to learn ASL",
    "best app to learn sign language",
    "sign language classes online",
    "sign language education",
    "deaf community",
    "webcam sign language",
    "computer vision ASL",
    "Signpost",
    "Signpost ASL",
    "Signpost app",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Learn ASL Online for Free with AI Feedback | Signpost",
    description:
      "Learn American Sign Language at home with free, AI-powered lessons that watch your hands and correct you in real time. No sign-up needed for the demo.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Signpost: learn American Sign Language online for free with AI feedback",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn ASL Online for Free with AI Feedback | Signpost",
    description:
      "Free American Sign Language lessons that watch your hands through your webcam and correct your signs in real time. Built for beginners. No sign-up needed for the demo.",
    images: [`${SITE_URL}/og-image.png`],
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
  verification: {
    // Add Google Search Console verification token here if needed.
    // google: "your-verification-code",
  },
};

/* JSON-LD structured data: helps Google understand the site, the product, the FAQ, the course, and the steps to get started. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Signpost App, Inc.",
      url: SITE_URL,
      logo: `${SITE_URL}/signpost-logo.png`,
      description:
        "Signpost is an AI-powered American Sign Language learning platform. It uses computer vision to watch your hand signs through a webcam and give real-time feedback so you can learn ASL on your own at home.",
      foundingDate: "2024",
      founders: [
        { "@type": "Person", name: "Jerry Xiao", jobTitle: "Co-Founder and CEO" },
        { "@type": "Person", name: "Max Castagnoli", jobTitle: "Co-Founder and CTO" },
      ],
      sameAs: [
        "https://github.com/SignpostApp",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "Learn American Sign Language online with real-time AI feedback. Signpost uses computer vision to watch your hand signs through a webcam and gives instant corrections, so you know exactly what you are signing right and what to fix.",
      browserRequirements: "Requires a modern web browser with webcam access.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free demo available with no sign-up required.",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "200",
        bestRating: "5",
      },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course`,
      name: "Learn American Sign Language with Signpost",
      description:
        "A structured online American Sign Language course that takes you from the ASL alphabet and fingerspelling all the way to full conversational signing. Every lesson uses AI computer vision to watch your hands and give instant feedback on your form.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
      inLanguage: "en-US",
      educationalLevel: "Beginner to Advanced",
      teaches: [
        "ASL alphabet",
        "ASL fingerspelling",
        "Common ASL vocabulary",
        "Conversational American Sign Language",
      ],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT15M",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        category: "Free",
      },
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#how-to-learn-asl`,
      name: "How to learn American Sign Language at home with Signpost",
      description:
        "Step-by-step guide to teaching yourself ASL using a webcam and real-time AI feedback.",
      totalTime: "PT15M",
      tool: [
        { "@type": "HowToTool", name: "Computer or phone with a webcam" },
        { "@type": "HowToTool", name: "Modern web browser" },
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Open the Signpost demo in your browser",
          text: "Visit the Signpost demo at demo.signpost.cv. No sign-up or download is required for the demo.",
          url: "https://demo.signpost.cv",
        },
        {
          "@type": "HowToStep",
          name: "Allow webcam access",
          text: "Give your browser permission to use your webcam. All hand tracking runs on your device, so your video never leaves your computer.",
        },
        {
          "@type": "HowToStep",
          name: "Start with the ASL alphabet",
          text: "Practice fingerspelling the ASL alphabet. The AI watches your hand and tells you instantly whether you are forming each letter correctly.",
        },
        {
          "@type": "HowToStep",
          name: "Work through the lessons",
          text: "Move through the curriculum at your own pace, from basic signs to full conversational ASL. Your progress is tracked automatically.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I learn ASL online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can learn American Sign Language online with Signpost using just a webcam. Our AI watches your hand signs in real time and gives instant feedback on your form. Start with the ASL alphabet and fingerspelling, then work through a structured curriculum to full conversational ASL at your own pace.",
          },
        },
        {
          "@type": "Question",
          name: "Is Signpost free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Signpost offers a free demo that requires no sign-up. Just open the app, turn on your webcam, and start signing. The AI gives you real-time feedback immediately.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to start learning ASL with Signpost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All you need is a computer or phone with a webcam and a modern web browser. No downloads, no installations, and no special equipment.",
          },
        },
        {
          "@type": "Question",
          name: "How is Signpost different from other ASL apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most ASL apps only show you videos to copy. Signpost uses computer vision to watch your actual hand signs and correct your form in real time, so it works like a personal ASL tutor that is available 24/7 with under 100 milliseconds of feedback delay.",
          },
        },
        {
          "@type": "Question",
          name: "Can complete beginners use Signpost to learn sign language?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Signpost is built for beginners with zero ASL experience. The curriculum starts with the ASL alphabet and fingerspelling, then moves to common signs and conversational ASL at your own pace.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to learn ASL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most learners can pick up the ASL alphabet and basic fingerspelling in a few hours. Becoming conversational in American Sign Language usually takes 6 to 12 months of regular practice. Because Signpost gives feedback on every sign, learners typically progress faster than they would using video-only courses.",
          },
        },
        {
          "@type": "Question",
          name: "Is sign language hard to learn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ASL is not harder to learn than a spoken second language, but it uses your hands, face, and body instead of your voice, so it feels new at first. The biggest obstacle for most beginners is not knowing whether they are signing correctly. Signpost solves that by giving instant feedback on every gesture.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best free app to learn ASL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Signpost is one of the only free ASL apps that uses AI to watch your hands and tell you if your signs are right. The free demo runs in your browser with no sign-up, so you can try it out and decide for yourself.",
          },
        },
        {
          "@type": "Question",
          name: "Can I learn ASL by myself at home?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Signpost is designed for self-teaching at home. The AI plays the role of a tutor by watching your signs through your webcam and correcting your form so you do not build bad habits.",
          },
        },
        {
          "@type": "Question",
          name: "Does Signpost teach the ASL alphabet and fingerspelling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The first lessons in Signpost cover the full ASL alphabet and fingerspelling drills. You can practice each letter and the AI will tell you in real time whether your hand shape matches.",
          },
        },
        {
          "@type": "Question",
          name: "Is my webcam data private and secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your privacy is our top priority. All hand tracking runs entirely in your browser. Your webcam feed is never sent to our servers, recorded, or stored. The only data we save server-side is numerical hand landmark coordinates (joint positions, not images or video) used to improve our recognition models. No webcam footage ever leaves your device.",
          },
        },
      ],
    },
  ],
};
// SECURITY: Escape "<" to prevent accidental script-breaking injection if this JSON-LD is ever made dynamic.
const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body className={`${geist.variable} ${jetbrainsMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7DW69BDLXM"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7DW69BDLXM');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
