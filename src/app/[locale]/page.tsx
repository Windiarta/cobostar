"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messages } from "../../i18n/messages";

const HERO_IMAGES = [
  "/images/company/1.jpg",
  "/images/company/2.jpg",
  "/images/company/3.jpg",
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

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const t = messages[locale];
  const aboutParas = String(t.about.desc).split(/\n{2,}/);
  const aboutImages = ["/images/company/36.jpg", "/images/company/37.jpg"];
  const perSection = Math.ceil(aboutParas.length / aboutImages.length) || 1;
  const aboutSections = aboutImages.map((img, idx) => ({
    img,
    paras: aboutParas.slice(idx * perSection, (idx + 1) * perSection),
  }));

  return (
    <div className="flex flex-col gap-20 md:gap-24">
      {/* Hero Section */}
      <section className="relative w-full h-[82vh] md:h-[86vh] flex items-center justify-center overflow-hidden">
        <button onClick={prevHero} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/70 rounded-full p-3 shadow hover:scale-110 transition z-10">&#8592;</button>

        {/* Sliding Track */}
        <div className="absolute inset-0">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${heroIdx * 100}%)` }}
          >
            {HERO_IMAGES.map((src, idx) => (
              <div key={idx} className="relative w-full h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Hero ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextHero} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/70 rounded-full p-3 shadow hover:scale-110 transition z-10">&#8594;</button>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 drop-shadow-lg uppercase">{t.hero.company}</h1>
          <p className="text-xl md:text-2xl font-medium drop-shadow max-w-3xl">{t.hero.shortDesc}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-10 px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">{t.about.title}</h2>
          <div className="h-1 w-14 bg-blue-600 mx-auto mt-3 rounded"></div>
        </div>
        {aboutSections.map((sec, idx) => (
          <div key={idx} className={`mt-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-start`}>
            {/* Text */}
            <div className={`md:col-span-3 ${idx % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
              {sec.paras.length === 0 ? (
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">&nbsp;</p>
              ) : (
                sec.paras.map((para, pidx) => (
                  <p key={pidx} className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))
              )}
            </div>
            {/* Image */}
            <div className={`md:col-span-2 ${idx % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
              <div className="relative w-full md:w-4/5 lg:w-3/4 aspect-[3/4] overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-800 mx-auto">
                <Image
                  src={sec.img}
                  alt={`Company ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  priority={idx === 0}
                />
              </div>
            </div>
          </div>
        ))}
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
