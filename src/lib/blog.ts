import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostSummary {
  takeaways: string[];
  pros?: string[];
  cons?: string[];
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  lang: "en" | "ro";
  slug: string;
  translationSlug?: string;
  tags: string[];
  published: boolean;
  summary?: PostSummary;
}

export interface Post extends PostFrontmatter {
  readingTime: string;
  content: string;
}

function readPostFile(filePath: string): Post | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    if (!frontmatter.published) return null;

    return {
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const langs = ["en", "ro"] as const;
  const posts: Post[] = [];

  for (const lang of langs) {
    const dir = path.join(BLOG_DIR, lang);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const post = readPostFile(path.join(dir, file));
      if (post) posts.push(post);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const langs = ["en", "ro"] as const;

  for (const lang of langs) {
    const filePath = path.join(BLOG_DIR, lang, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return readPostFile(filePath);
    }
  }

  return null;
}

export function getRelatedPosts(currentSlug: string, lang: "en" | "ro", limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.lang === lang && p.slug !== currentSlug)
    .slice(0, limit);
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const match = h3 ?? h2;
    if (!match) continue;

    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    headings.push({ id, text, level: h3 ? 3 : 2 });
  }

  return headings;
}
