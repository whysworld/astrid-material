/*
 * Copyright 2023 The Astrid Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Box, MenuItem, Popover, Grid } from '@mui/material';
import ThemeIcon from '@mui/icons-material/FormatColorFill';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectActiveTheme, setActiveTheme } from '../../UserSettingsThemeToggle';
import { ThemeVariant } from '../../UserSettingsThemeToggle/type';

const ThemeOptions = ['Light', 'Dark'];

export const ThemeSelectWidget = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch()
  const themeId = useAppSelector(selectActiveTheme)

  const handleSetTheme = (
    _event: React.MouseEvent<HTMLElement>,
    newThemeId: string | undefined,
  ) => {
    dispatch(setActiveTheme({ theme: newThemeId as ThemeVariant }))
    setAnchorEl(null);
  };


  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        height: '30px',
        borderRadius: '3px',
        alignItems: 'center',
        display: 'flex',
        padding: '0 5px',
        '&:hover': {
          cursor: 'pointer',
        },
      })}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Grid
            onClick={handlePopoverOpen}
            container
            justifyContent="space-between"
            direction="row"
            spacing={1}
          >
            <Grid item xs sx={{ display: 'flex' }}>
              <ThemeIcon />
            </Grid>
          </Grid>
          <Popover
            PaperProps={{
              sx: {
                width: 100,
                maxHeight: 200,
              },
              square: true
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {ThemeOptions.map(val => (
              <MenuItem
                key={val}
                value={val}
                onClick={e => handleSetTheme(e, val)}
                sx={{
                  textTransform: 'capitalize'
                }}
                className={clsx(
                  themeId === val ? 'Mui-selected' : ''
                )}
              >
                {val}
              </MenuItem>
            ))}
          </Popover>
        </Grid>
      </Grid>
    </Box>
  );
};
