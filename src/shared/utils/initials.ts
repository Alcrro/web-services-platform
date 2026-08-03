export function initials(text: string) {
  return text
    .split(" ")
    .map((w) => w[0])
    .join(" ")
    .toUpperCase();
}
