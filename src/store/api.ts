import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE } from "@/config/api";
import { Resume } from "@/types/resume";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    getProfile: builder.query<{ lang: string; content: Resume }, string>({
      query: (lang) => `profile?lang=${lang}`,
    }),
  }),
});

export const { useGetProfileQuery } = api;
