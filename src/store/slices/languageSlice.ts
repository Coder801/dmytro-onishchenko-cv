import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages } from "@/types/languages";
import { RootState } from "../index";

interface LanguageState {
  current: Languages;
}

const initialState: LanguageState = {
  current: "en",
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
