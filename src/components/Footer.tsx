"use client";
import { useParams } from "next/navigation";
import { messages } from "../i18n/messages";

export default function Footer() {
  const params = useParams() as { locale?: string };
  const locale = (params?.locale as "id" | "en") || "id";
  const t = messages[locale].footer;

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">{t.contact}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} {messages[locale].hero.company}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{t.addressLabel}</h4>
          <p className="text-gray-700 dark:text-gray-300">{t.address}</p>
        </div>
        <div className="space-y-1">
          <div>
            <span className="font-semibold">{t.emailLabel}: </span>
            <a href={`mailto:${t.email}`} className="text-blue-600 hover:underline">{t.email}</a>
          </div>
          <div>
            <span className="font-semibold">{t.phoneLabel}: </span>
            <a href={`tel:${t.phone}`} className="text-blue-600 hover:underline">{t.phone}</a>
          </div>
          <br />
          <div>
            <span className="font-semibold">{t.emailLabel}: </span>
            <a href={`mailto:${t.email}`} className="text-blue-600 hover:underline">{t.alt_email}</a>
          </div>
          <div>
            <span className="font-semibold">{t.phoneLabel}: </span>
            <a href={`tel:${t.phone}`} className="text-blue-600 hover:underline">{t.alt_phone}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
