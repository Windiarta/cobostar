"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messages } from "../i18n/messages";

export default function Navbar() {
  const params = useParams() as { locale?: string };
  const locale = (params?.locale as "id" | "en") || "id";
  const t = messages[locale].nav;
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-8">
        <Link href={`/${locale}`} className="font-bold text-lg hover:underline">{t.company}</Link>
      </div>
      
      
      
      <div className="flex items-center gap-8">
        <Link href={`/${locale}`} className="font-bold text-lg hover:underline">{t.home}</Link>
        <Link href={`/${locale}/produk`} className="font-bold text-lg hover:underline">{t.produk}</Link>
        <div className="items-center gap-2">
          <Link href={`/id`} className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${locale === "id" ? "font-bold underline" : ""}`}>{t.indonesia}</Link>
          <span>|</span>
          <Link href={`/en`} className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${locale === "en" ? "font-bold underline" : ""}`}>{t.english}</Link>
        </div>
      </div>
    </nav>
  );
}
