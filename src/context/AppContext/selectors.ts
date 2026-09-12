import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { api } from "@/store/api";

/**
 * Only one `getProfile` query is ever mounted at a time (one resume per
 * page), so we look up whatever arg is currently cached instead of
 * reconstructing the exact { lang, profile, company, role } key here.
 */
const selectProfileQuery = () => (state: RootState) => {
  const [cachedArg] = api.util.selectCachedArgsForQuery(state, "getProfile");

  return cachedArg
    ? api.endpoints.getProfile.select(cachedArg)(state)
    : undefined;
};

export const getAllSkills = createSelector(
  [selectProfileQuery()],
  (result) => result?.data?.content.profile.allSkills ?? []
);
