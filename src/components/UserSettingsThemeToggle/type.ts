export interface UserSettingsThemeToggleState {
  activeTheme: string,
  loading?: boolean,
  error?: boolean
}

export enum ThemeVariant {
  Light = "Light",
  Dark = "Dark"
}

export const ASTRID_THEME = 'ASTRID_THEME'