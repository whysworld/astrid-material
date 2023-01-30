/* eslint-disable react-hooks/exhaustive-deps */
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
import React, { useEffect } from 'react';
import {
  Box,
  MenuItem,
  Popover,
  Grid,
  Typography,
} from '@mui/material';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import moment from 'moment';

let intervalID: any = null;

const TimeOptions = ['Browser Time', 'Location Time'];

export const TimeWidget = () => {
  const [timeVariant, setTimeVariant] = React.useState(TimeOptions[0]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [currentTime, setCurrentTime] = React.useState<string>(
    moment().format('ddd,  hh:mm A'),
  );
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onSelectInterval = (val: string) => {
    setTimeVariant(val);
    setAnchorEl(null);
  };
  const setTime = () => {
    setCurrentTime(moment().format('ddd,  hh:mm A'));
  };
  useEffect(() => {
    intervalID = setInterval(setTime, 500);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const open = Boolean(anchorEl);
  return (

    <Box
      sx={{
        backgroundColor: 'transparent',
        height: '30px',
        borderRadius: '3px',
        alignItems: 'center',
        display: 'flex',
        padding: '0 5px',
        '&:hover': {
          cursor: 'pointer',
        },
      }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Grid
            onClick={handlePopoverOpen}
            container
            justifyContent="space-between"
            direction="row"
            spacing={1}
          >
            <Grid item>
              <Typography>{currentTime}</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex' }}>
              <ArrowDownIcon />
            </Grid>
          </Grid>
          <Popover
            PaperProps={{
              sx: {
                width: 150,
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
            {TimeOptions.map(val => (
              <MenuItem
                key={val}
                value={val}
                onClick={() => onSelectInterval(val)}
                className={timeVariant === val ? 'Mui-selected' : ''}
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
