import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Signpost — Learn ASL Fast",
  description:
    "Learn American Sign Language faster than ever with real-time AI feedback. Powered by computer vision.",
  keywords: ["ASL", "American Sign Language", "AI", "learning", "sign language", "education", "Signpost"],
  openGraph: {
    title: "Signpost — Learn ASL Fast",
    description: "Learn ASL faster than ever with real-time AI feedback.",
    url: "https://signpost.cv",
    siteName: "Signpost",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased noise`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
