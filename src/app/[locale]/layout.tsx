import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//TODO: change to company name, all links to company name
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cobostar-industrial.com"),
  title: {
    default: "Cobostar Industrial Indonesia",
    template: "%s | Cobostar Industrial Indonesia",
  },
  description: "Produsen pemanas listrik industri: explosion-proof, duct, thermal oil, control systems.",
  alternates: {
    canonical: "/",
    languages: {
      "id": "/id",
      "en": "/en",
    },
  },
  openGraph: {
    title: "Cobostar Industrial Indonesia",
    description: "Produsen pemanas listrik industri: explosion-proof, duct, thermal oil, control systems.",
    url: "/",
    siteName: "Cobostar Industrial Indonesia",
    images: [{ url: "/logo.png", width: 800, height: 418 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cobostar Industrial Indonesia",
    description: "Produsen pemanas listrik industri.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo-small.png",
    shortcut: "/logo-small.png",
    apple: "/logo-small.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cobostar Industrial Indonesia",
            url: "https://www.cobostar-industrial.com",
            logo: "https://www.cobostar-industrial.com/logo.png",
            sameAs: [
            ],
            contactPoint: [{
              "@type": "ContactPoint",
              telephone: "+6281219591996",
              contactType: "customer service",
              areaServed: "ID",
              availableLanguage: ["Indonesian", "English"],
            }],
          })}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
