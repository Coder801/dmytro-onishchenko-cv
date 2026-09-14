export type SitemapItem = { company: string; role: string; position: string };
export type SitemapRoleItem = { role: string; position: string };
export type SitemapResponse = {
  lang: string;
  items: SitemapItem[];
  roles: SitemapRoleItem[];
};
