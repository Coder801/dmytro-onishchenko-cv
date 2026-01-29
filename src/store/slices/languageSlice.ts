import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";
import { RootState } from "../index";

interface LanguageState {
  current: Languages;
}

const getInitialLanguage = (): Languages => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("i18nextLng");
    if (stored && SUPPORTED_LANGUAGES.includes(stored as Languages)) {
      return stored as Languages;
    }
  }
  return "en";
};

const initialState: LanguageState = {
  current: getInitialLanguage(),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Languages>) => {
      state.current = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectCurrentLanguage = (state: RootState) =>
  state.language.current;

export default languageSlice.reducer;
