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

const LocationSelectWidth = 200;

const locations = ['Ten', 'Twenty', 'Thirty'];
interface Props {
  onLocationChange: (location: string) => void;
}
export const LocationSelectWidget: React.FC<Props> = ({ onLocationChange }) => {
  const [location, setLocation] = React.useState(locations[0]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onSelectLocation = (val: string) => {
    setLocation(val);
    setAnchorEl(null);
    onLocationChange(val);
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
        minWidth: LocationSelectWidth,
      })}
    >
      <Grid container alignItems="center" spacing={0}>
        <Grid item style={{ width: LocationSelectWidth }}>
          <Grid
            onClick={handlePopoverOpen}
            container
            justifyContent="space-between"
            direction="row"
            spacing={0}
          >
            <Grid item xs>
              <Typography>{location}</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', paddingRight: '5px' }}>
              <ArrowDownIcon />
            </Grid>
          </Grid>
          <Popover
            PaperProps={{
              sx: {
                width: LocationSelectWidth
              },
              square: true
            }}
            open={open}
            anchorEl={anchorEl}
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
            {locations.map(val => (
              <MenuItem
                key={val}
                value={val}
                onClick={() => onSelectLocation(val)}
                className={location === val ? 'Mui-selected' : ''}
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
