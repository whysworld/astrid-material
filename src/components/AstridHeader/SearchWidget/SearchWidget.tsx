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
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Popover,
  MenuItem,
  TextField,
} from '@mui/material';
import SeachIcon from '@mui/icons-material/SearchOutlined';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box/Box';

const SearchVariant = ['Global', 'This page'];
const SearchPlaceholder = [
  'Search with natural language here',
  'Search by typing here',
];

export const SearchWidget = () => {
  const [searchVariant, setSearchVariant] = useState<string>(SearchVariant[0]);
  const [placeholder, setPlaceHolder] = useState<string>(SearchPlaceholder[0]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setTooltip(false);
  };

  const onSetSearchVariant = (val: string) => {
    setSearchVariant(val);
    setAnchorEl(null);
    if (val === 'Global') setPlaceHolder(SearchPlaceholder[0]);
    else setPlaceHolder(SearchPlaceholder[1]);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        height: 30,
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'row',
        padding: '0 5px',
        margin: 0,
        alignItems: 'center',
        alignContent: 'center',
        '&:hover': {
          cursor: 'pointer',
        },
      })}
    >
      <Grid
        container
        alignItems="center"
        direction="row"
        spacing={1}
        alignContent="center"
      >
        <Grid item sx={{ display: 'flex' }}>
          <SeachIcon />
        </Grid>
        <Grid item>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
              alignContent="center"
              onMouseOver={() => {
                if (!tooltip && !open) setTooltip(true);
              }}
              onMouseOut={() => {
                if (tooltip) setTooltip(false);
              }}
            >
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  onClick={handlePopoverOpen}
                >
                  <Grid item>
                    <Typography>{searchVariant}</Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }}>
                    <ArrowDownIcon />
                  </Grid>
                </Grid>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  PaperProps={{ square: true }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  {SearchVariant.map(val => (
                    <MenuItem
                      key={val}
                      onClick={() => onSetSearchVariant(val)}
                      className={searchVariant === val ? 'Mui-selected' : ''}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Popover>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <TextField
            InputProps={{ disableUnderline: true }}
            fullWidth
            variant="standard"
            placeholder={placeholder}
            value={searchVal}
            onChange={val => setSearchVal(val.target.value)}
          />
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <ClearIcon onClick={() => setSearchVal('')} />
        </Grid>
      </Grid>
    </Box>
  );
};
