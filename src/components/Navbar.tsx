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
        
        {/* Company Profile Dropdown */}
        <div className="relative group">
          <button className="font-bold text-lg hover:underline flex items-center gap-1">
            {locale === "id" ? "Profil Perusahaan" : "Company Profile"}
            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              <Link href={`/${locale}/profil`} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                {t.profile}
              </Link>
              <Link href={`/${locale}/produk`} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                {t.produk}
              </Link>
              <Link href={`/${locale}/kontak`} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                {t.kontak}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="items-center gap-2">
          <Link href={`/id`} className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${locale === "id" ? "font-bold underline" : ""}`}>{t.indonesia}</Link>
          <span>|</span>
          <Link href={`/en`} className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${locale === "en" ? "font-bold underline" : ""}`}>{t.english}</Link>
        </div>
      </div>
    </nav>
  );
}
