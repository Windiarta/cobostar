import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cobostar-industrial.com";
  const routes = ["/", "/id", "/en", "/id/produk", "/en/produk", "/id/profil", "/en/profil", "/id/kontak", "/en/kontak"];
  const now = new Date().toISOString();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}


