// KV key builders. ADR-002 convention: {resource}:{site_id}:{slug}:{locale}.

export const kvKeys = {
  page: (siteId: number, slug: string, locale = "en") =>
    `page:${siteId}:${slug}:${locale}`,
  record: (siteId: number, collection: string, slug: string, locale = "en") =>
    `record:${siteId}:${collection}:${slug}:${locale}`,
  list: (siteId: number, collection: string, queryHash: string) =>
    `list:${siteId}:${collection}:${queryHash}`,
};
