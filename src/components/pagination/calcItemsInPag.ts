export const calcItemsInPag = (
  limit: number,
  total: number,
  currentPage: number,
  items: number,
) => (limit === 99999 ? total : items + (currentPage - 1) * limit);
