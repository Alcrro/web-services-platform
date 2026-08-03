export const modifyIdForIcon = (startWith: string, id: string) => {
  if (!id) return "";
  return id.includes(startWith) ? startWith : id;
};
