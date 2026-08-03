export function transformServiceUrlSlug(text: string) {
  return text.replace("-", " ").toLowerCase();
}
