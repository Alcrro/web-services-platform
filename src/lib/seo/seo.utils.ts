import { METADATA_BASE } from "@/shared/config/env";
import { Metadata } from "next";
import { DEFAULT_SEO } from "./seo.config";

interface SEOOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildSEO(options: SEOOptions): Metadata {
  const {
    title = DEFAULT_SEO.title,
    description = DEFAULT_SEO.description,
    url,
    image,
    keywords = DEFAULT_SEO.keywords,
    noIndex = false,
  } = options;

  const canonical = url
    ? new URL(url, METADATA_BASE).toString()
    : METADATA_BASE.toString();

  return {
    metadataBase: METADATA_BASE,
    title,
    description,

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical,
    },
    keywords,

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: DEFAULT_SEO.siteName,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
