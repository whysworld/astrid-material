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
  Box,
  MenuItem,
  Grid,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Tenants = ['Tenant1', 'Tenant2'];

export const TenantWidget = () => {
  const [tenant, setTenant] = useState<string>(Tenants[0]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onTenantChange = (val: string) => {
    setTenant(val);
  };

  const onDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        minHeight: 'calc(100% - 80px)',
      })}
    >
      {Tenants.map(val => (
        <MenuItem
          key={val}
          value={val}
          className={tenant === val ? 'Mui-selected' : ''}
          onClick={() => onTenantChange(val)}
          disableRipple
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={1}
            alignItems="center"
          >
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item style={{ display: 'flex' }}>
                  <img
                    src="https://www.google.com/s2/favicons?sz=24&domain_url=https://www.google.com"
                    alt=""
                  />
                </Grid>
                <Grid item>{val}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={handlePopoverOpen}>
                <MoreVertIcon sx={{ color: 'black' }} />
              </Button>
              <Popover
                PaperProps={{
                  sx: {
                    width: '200px',
                    maxHeight: '200px',
                  }
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <MenuItem
                  key={val}
                  value={val}
                  onClick={onDelete}
                  sx={{
                    '& .MuiInput-underline:after': {
                      transition: 'none',
                    },
                  }}
                  disableRipple
                >
                  <Typography>Delete</Typography>
                </MenuItem>
              </Popover>
            </Grid>
          </Grid>
        </MenuItem>
      ))}
    </Box>
  );
};
