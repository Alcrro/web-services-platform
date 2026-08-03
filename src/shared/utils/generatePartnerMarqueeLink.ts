export const linkString = (link: string): string => {
  const linkStr = link.replace(/(\.\w{2,}|[^\/\s]+\/+)/g, "");
  return linkStr;
};
