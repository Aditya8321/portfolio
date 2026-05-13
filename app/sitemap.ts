import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${site.url}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/#experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/#research`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/#projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/#skills`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/#education`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }
  ];
}
