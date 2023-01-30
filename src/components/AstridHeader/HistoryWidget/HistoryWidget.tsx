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
import {
  Box,
  MenuItem,
  Popover,
  Grid,
  Typography,
} from '@mui/material';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import HistoryIcon from '@mui/icons-material/History';

const HistoryOptions = [
  'Today',
  'Last 5 minutes',
  'Last 10 minutes',
  'Last 30 minutes',
  'Last 1 hour',
  'Last 2 hours',
  'Last 3 hours',
  'Last 5 hours',
  'Last 10 hours',
  'Last 12 hours',
  'Last 24 hours',
  'Last 2 days',
  'Last month',
];
interface Props {
  onHistoryChange: (history: string) => void;
}
export const HistoryWidget: React.FC<Props> = ({ onHistoryChange }) => {
  const [interval, setInterval] = React.useState(HistoryOptions[0]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onSelectInterval = (val: string) => {
    setInterval(val);
    setAnchorEl(null);
    onHistoryChange(val);
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
              {interval === 'Today' ? (
                <HistoryIcon />
              ) : (
                <Typography>{interval}</Typography>
              )}
            </Grid>
            {interval !== 'Today' && (
              <Grid item sx={{ display: 'flex' }}>
                <ArrowDownIcon />
              </Grid>
            )}
          </Grid>
          <Popover
            PaperProps={{
              sx: {
                width: 200,
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
            {HistoryOptions.map(val => (
              <MenuItem
                key={val}
                value={val}
                onClick={() => onSelectInterval(val)}
                className={interval === val ? 'Mui-selected' : ''}
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
