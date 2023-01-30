/*
 * CampaignsManager Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ASTRID_THEME, ThemeVariant, UserSettingsThemeToggleState } from './type';
// The initial state of the ReposManager container
export const initialState: UserSettingsThemeToggleState = {
  activeTheme: window.localStorage.getItem(ASTRID_THEME) as ThemeVariant,
  loading: false,
  error: false
};

const userSettingsThemeToggleSlice = createSlice({
  name: 'settings/theme',
  initialState,
  reducers: {
    setActiveTheme(state: UserSettingsThemeToggleState, action: PayloadAction<{ theme: ThemeVariant }>) {
      window.localStorage.setItem(ASTRID_THEME, action.payload.theme)
      state.activeTheme = action.payload.theme
    },
  },
});

export const {
  setActiveTheme
} = userSettingsThemeToggleSlice.actions;

export const { reducer } = userSettingsThemeToggleSlice;
