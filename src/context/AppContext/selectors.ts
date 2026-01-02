import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { api } from "@/store/api";
import { selectCurrentLanguage } from "@/store/slices/languageSlice";

const selectProfileQuery = () => (state: RootState) =>
  api.endpoints.getProfile.select(selectCurrentLanguage(state))(state);

export const getAllSkills = createSelector(
  [selectProfileQuery()],
  (result) => result.data?.content.profile.allSkills ?? []
);
