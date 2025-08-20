"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messages } from "../../i18n/messages";

const HERO_IMAGES = [
  "/images/company/36.jpg",
  "/images/company/37.jpg",
  "/images/company/38.jpg",
];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Home() {
  const params = useParams() as { locale?: string };
  const locale = (params?.locale as "id" | "en") || "id";
  const [heroIdx, setHeroIdx] = React.useState(0);

  const nextHero = () => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
  const prevHero = () => setHeroIdx((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  const t = messages[locale];
  const heroSrc = HERO_IMAGES[heroIdx] || null;

  return (
    <div className="flex flex-col gap-20 md:gap-24">
      {/* Hero Section */}
      <section className="relative w-full h-[82vh] md:h-[86vh] flex items-center justify-center overflow-hidden">
        <button onClick={prevHero} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/70 rounded-full p-3 shadow hover:scale-110 transition z-10">&#8592;</button>
        {heroSrc && (
          <Image
            key={heroIdx}
            src={heroSrc}
            alt="Hero"
            fill
            className="object-cover object-center hero-img"
            priority
          />
        )}
        <button onClick={nextHero} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/70 rounded-full p-3 shadow hover:scale-110 transition z-10">&#8594;</button>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 drop-shadow-lg uppercase">{t.hero.company}</h1>
          <p className="text-xl md:text-2xl font-medium drop-shadow max-w-3xl">{t.hero.shortDesc}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-10 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">{t.about.title}</h2>
        <div className="h-1 w-14 bg-blue-600 mx-auto mt-3 rounded"></div>
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          {t.about.desc}
        </p>
      </section>

      {/* Product Highlights styled like reference */}
      <section className="mx-10 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-center uppercase">{t.highlight.title}</h2>
        <div className="h-1 w-14 bg-blue-600 mx-auto mt-3 mb-8 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {t.produk.products.slice(0, 3).map((p, idx) => {
            const folder = p.folder || slugify(p.name);
            return (
              <div key={idx} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-up" style={{ animationDelay: `${idx * 80}ms` as unknown as string }}>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={`/images/products/${folder}/1.jpg`}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-6">
                  <div className="text-blue-900 dark:text-blue-300 font-extrabold uppercase tracking-wide text-lg mb-3">{p.name}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <Link href={`/${locale}/produk`} className="px-7 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
            {t.highlight.seeAll}
          </Link>
        </div>
      </section>
    </div>
  );
}
