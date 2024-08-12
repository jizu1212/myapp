import type { Metadata } from "next";
import "./globals.css"; // Import the global CSS file

export const metadata: Metadata = {
  title: {
    template: "%s | Guide to the Life",
    default: "Guide to the Life",
  },
  description:
    "Guide to the Life offers practical tips and tools to help you manage, organize, and improve your life. Discover strategies for effective planning, discipline, and personal growth, tailored to modern living.",
  metadataBase: new URL("http://localhost:3000"), // Update this to your domain when it's live
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Guide to the Life",
    description:
      "Practical tips and tools for managing your life effectively. Explore our guides to improve your daily living, discipline, planning, and personal growth.",
    url: "http://localhost:3000", // Update this to your domain when it's live
    siteName: "Guide to the Life",
    images: [
      {
        url: "/graphimage.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide to the Life",
    description:
      "Explore our guides and tools to help you manage and improve your life.",
    images: ["/graphimage.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  keywords: [
    "guide",
    "tool",
    "life",
    "manage",
    "discipline",
    "plan",
    "note",
    "personal growth",
    "self-improvement",
    "organization",
    "tips",
  ],
  authors: [
    { name: "Jisoo", url: "http://localhost:3000" }, // Update this to your domain when it's live
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
