export const API_URL = process.env.NEXT_PUBLIC_API as string;
export const SITE_URL = process.env.NEXT_PUBLIC_URL as string;
export const METADATA_BASE = new URL(SITE_URL ?? "http://localhost:3000");
