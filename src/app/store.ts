import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as SettingsThemeReducer } from '../components/UserSettingsThemeToggle/slice';

export const store = configureStore({
  reducer: {
    settings: SettingsThemeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
