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

export const CountSingleRelationQuery = (
  keywords: string,
  relation: string,
  property: string
) => {
  return {
    where: {
      [relation]: {
        [property]: {
          contains: keywords,
        },
      },
    },
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

export const PaginationWithSingleRelation = (options: {
  keywords: string;
  relation: string;
  searchProperty: string;
  skip: number;
  take: number;
  orderByProperty: string;
  orderBy: string;
}) => {
  return {
    ...CountSingleRelationQuery(
      options.keywords,
      options.relation,
      options.searchProperty
    ),
    skip: options.skip,
    take: options.take,
    orderBy: {
      [options.orderByProperty]: options.orderBy,
    },
    include: {
      [options.relation]: true,
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

export const PaginationQueryById = (
  keywords: string,
  searchProperty: string,
  skip: number,
  take: number,
  orderByProperty: string,
  orderBy: string,
  propertId: string,
  id: number
) => {
  return {
    where: {
      [propertId]: id,
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
