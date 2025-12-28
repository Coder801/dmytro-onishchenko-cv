import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Resume } from "@/types/resume";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProfile: builder.query<{ lang: string; content: Resume }, string>({
      query: (lang) => `profile?lang=${lang}`,
    }),
  }),
});

export const { useGetProfileQuery } = api;
