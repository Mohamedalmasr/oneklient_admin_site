import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oneklient.com"),
  title: {
    default: "ONEklient Solutions Inc. | Administration Portals",
    template: "%s | ONEklient Solutions Inc.",
  },
  description:
    "ONEklient Solutions Inc. builds online administration portals — unified, secure, streamlined tools designed to transform how businesses work, collaborate, and serve every client.",
  keywords: [
    "ONEklient",
    "administration portal",
    "business portal",
    "enterprise admin software",
    "workflow automation",
    "client management",
    "business process tools",
    "secure admin portal",
    "Legacy Portal",
    "Legacy Finance Portal",
    "Human Resources Portal",
    "HR Portal",
    "Learning Hub",
  ],
  authors: [{ name: "ONEklient Solutions Inc." }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oneklient.com",
    title: "ONEklient Solutions Inc. | Administration Portals",
    description: "Unified, secure workflow tools for modern businesses. Explore ONEklient's administration portals.",
    siteName: "ONEklient Solutions Inc.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONEklient Solutions Inc. | Administration Portals",
    description: "Unified, secure workflow tools for modern businesses. Explore ONEklient's administration portals.",
    site: "@oneklient",
  },
  alternates: { canonical: "https://oneklient.com" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
