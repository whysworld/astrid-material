import { useEffect, useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline"
import App from "../../App"
import { useAppSelector } from "../../app/hooks"
import { selectActiveTheme } from "../../components/UserSettingsThemeToggle"
import { ThemeVariant } from "../../components/UserSettingsThemeToggle/type"
import { AstridLightTheme, AstridDarkTheme } from '../../themes';
import { ThemeProvider } from '@mui/material'

export const ApplicationContainer = () => {
  const activeTheme = useAppSelector(selectActiveTheme)
  const [theme, setTheme] = useState<ThemeVariant>(activeTheme as ThemeVariant)

  useEffect(() => {
    setTheme(activeTheme as ThemeVariant)
  }, [activeTheme])
  return (
    <ThemeProvider theme={theme === 'Light' ? AstridLightTheme : AstridDarkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}