import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE } from "@/config/api";
import { Resume } from "@/types/resume";
import { SitemapResponse } from "@/types/sitemap";

export type ProfileQueryArg = {
  lang: string;
  profile?: string;
  company?: string;
  role?: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    getProfile: builder.query<{ lang: string; content: Resume }, ProfileQueryArg>({
      query: ({ lang, profile, company, role }) => {
        const params = new URLSearchParams({ lang });
        if (profile) params.set("profile", profile);
        if (company) params.set("company", company);
        if (role) params.set("role", role);

        return `profile?${params.toString()}`;
      },
    }),
    getSitemap: builder.query<SitemapResponse, { lang: string }>({
      query: ({ lang }) => {
        const params = new URLSearchParams({ lang });

        return `sitemap?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetSitemapQuery } = api;
