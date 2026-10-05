import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { localePath, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/siteUrl";

// Chaque page existe en français (racine) et en anglais (/en), avec liens hreflang croisés.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];

  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: siteUrl + localePath(lang, page.path).replace(/^\/$/, ""),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: lang === "fr" ? page.priority : page.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, siteUrl + localePath(l, page.path).replace(/^\/$/, "")])
        ),
      },
    }))
  );
}
