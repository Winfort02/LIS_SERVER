export const pagination = (
  page: number,
  size: number,
  count: number,
  meta: Array<any> | Object
) => {
  const totalPages = Math.ceil(count / size);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    currentPage: page,
    nextPage,
    prevPage,
    totalPages,
    meta,
  };
};

export const CountQuery = (keywords: string, property: string) => {
  return {
    where: {
      [property]: {
        contains: keywords,
      },
    },
  };
};

export const PaginationQuery = (
  keywords: string,
  searchProperty: string,
  skip: number,
  take: number,
  orderByProperty: string,
  orderBy: string
) => {
  return {
    where: {
      [searchProperty]: {
        contains: keywords,
      },
    },
    skip,
    take,
    orderBy: {
      [orderByProperty]: orderBy,
    },
  };
};
