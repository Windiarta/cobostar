"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { messages } from "../../../i18n/messages";

type ProductItem = {
  folder?: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Produk() {
  const params = useParams() as { locale?: string };
  const lang = (params?.locale as "id" | "en") || "id";
  const [modal, setModal] = useState<null | number>(null);
  const t = messages[lang];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">{t.produk.title}</h1>
        <div className="h-1 w-14 bg-blue-600 mx-auto mt-3 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {(t.produk.products as ProductItem[]).map((p, idx) => {
          const folder = p.folder || slugify(p.name) || `product${idx + 1}`;
          return (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` as unknown as string }}
              onClick={() => setModal(idx)}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={`/images/products/${folder}/1.jpg`}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 3}
                />
              </div>
              <div className="p-5">
                <div className="font-semibold text-lg mb-1">{p.name}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{p.shortDesc}</div>
              </div>
            </div>
          );
        })}
      </div>
      {modal !== null && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-content relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button aria-label="Close" className="absolute top-4 right-4 text-2xl" onClick={() => setModal(null)}>&times;</button>
            <ProductDetail product={(t.produk.products as ProductItem[])[modal]} idx={modal} />
          </div>
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product, idx }: { product: ProductItem; idx: number }) {
  const [imgIdx, setImgIdx] = useState(0);
  const folder = product.folder || slugify(product.name) || `product${idx + 1}`;
  const candidateImages = Array.from({ length: 5 }, (_, i) => `/images/products/${folder}/${i + 1}.jpg`);
  const [available, setAvailable] = useState<boolean[]>(() => Array(candidateImages.length).fill(false));

  function findNextAvailable(start: number, direction: 1 | -1) {
    for (let step = 1; step <= candidateImages.length; step++) {
      const next = (start + direction * step + candidateImages.length) % candidateImages.length;
      if (available[next]) return next;
    }
    return start;
  }

  useEffect(() => {
    if (!available[imgIdx]) {
      const first = available.findIndex(Boolean);
      if (first !== -1) setImgIdx(first);
    }
  }, [available, imgIdx]);

  return (
    <div className="product-detail">
      <div>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
          <button onClick={() => setImgIdx(i => findNextAvailable(i, -1))} className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow hover:scale-110 transition z-10">&#8592;</button>
          <Image key={candidateImages[imgIdx]} src={candidateImages[imgIdx]} alt={product.name} fill className="object-cover slider-img" sizes="(max-width: 768px) 100vw, 80vw" onError={() => setImgIdx(i => findNextAvailable(i, 1))} />
          <button onClick={() => setImgIdx(i => findNextAvailable(i, 1))} className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow hover:scale-110 transition z-10">&#8594;</button>
        </div>
        <div className="thumb-row">
          {candidateImages.map((src, i) => (
            <div
              key={i}
              className={`thumb-item ${i === imgIdx ? "active" : ""} ${available[i] ? "" : "pointer-events-none opacity-40"}`}
              onClick={() => available[i] && setImgIdx(i)}
              aria-disabled={!available[i]}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="thumb"
                onLoad={() => setAvailable(prev => { const copy = [...prev]; copy[i] = true; return copy; })}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; setAvailable(prev => { const copy = [...prev]; copy[i] = false; return copy; }); }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{product.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{product.fullDesc}</p>
      </div>
    </div>
  );
}
