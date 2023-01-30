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

import React, { Children } from 'react';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const BreadcrumbWidget: React.FC<Props> = ({ children }) => {

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        // background: theme.getPageTheme({ themeId: 'documentation' }).backgroundImage,
        backgroundSize: 'cover',
        width: '100%',
        height: 40,
        boxShadow: `0 4px 10px 0 rgb(0 0 0 / 10%)`,
        alignItems: 'center',
        display: 'flex',
        padding: `0 24px`,
      })}
    >
      <Grid container spacing={0} direction="row" alignItems="center">
        <Grid item xs>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Link
                sx={{
                  display: 'flex',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
                href="/"
              >
                <HomeIcon
                  sx={(theme) => ({
                    color: theme.palette.text.primary,
                  })}
                />
              </Link>
            </Grid>
            {Children.toArray(children).map((child, index) => (
              <Grid item key={index}>
                <Grid container direction="row" alignItems="center" spacing={0}>
                  <Grid item>
                    <ArrowForwardIosIcon
                      sx={{
                        fontSize: 10,
                        margin: '0 5px',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={(theme) => ({
                      display: 'flex',
                      alignItems: 'center',
                      '& .MuiLink-root': {
                        color: theme.palette.text.primary,
                      },
                    })}>
                    {child}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              '& .MuiLink-root': {
                color: theme.palette.text.primary,
              },
            })}
          >
            <MoreVertIcon
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
