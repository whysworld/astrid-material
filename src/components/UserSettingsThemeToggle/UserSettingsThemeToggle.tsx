import { useState, useEffect } from 'react';
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { ThemeVariant } from './type';
import { selectActiveTheme } from './selector';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveTheme } from './slice';

export const UserSettingsThemeToggle = () => {
  const activeTheme = useAppSelector(selectActiveTheme)
  const [theme, setTheme] = useState<string | null>(activeTheme)
  const dispatch = useAppDispatch();

  const onThemeChange = (theme: string) => {
    setTheme(theme)
    dispatch(setActiveTheme({ theme: theme as ThemeVariant }))
  }

  useEffect(() => {
    setTheme(activeTheme)
  }, [activeTheme])

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item>
        Theme:
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          color="primary"
          value={'light'}
          exclusive
          onChange={(e: any) => {
            const param = e.target.value === 'Light' ? ThemeVariant.Light : ThemeVariant.Dark
            onThemeChange(param)
          }}
          aria-label="Platform"
        >
          <ToggleButton selected={theme === 'Light'} value={ThemeVariant.Light}>{ThemeVariant.Light}</ToggleButton>
          <ToggleButton selected={theme === 'Dark'} value={ThemeVariant.Dark}>{ThemeVariant.Dark}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )
}