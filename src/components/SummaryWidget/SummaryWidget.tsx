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
import { Grid, Typography } from '@mui/material';
import { AstridTheme } from '../../themes';
import Card from '@mui/material/Card';

interface Props {
  title: string;
  value1: number;
  value2: number;
  currentItem?: string;
  onFilter?: (val: string, idx: 1 | 2) => void;
}
export const SummaryWidget: React.FC<Props> = ({
  onFilter,
  title,
  value1,
  value2,
  currentItem = undefined,
}) => {

  const onSelect = (value: string, idx: 1 | 2) => {
    if (onFilter) onFilter(value, idx);
  };
  return (
    <Card
      className={
        currentItem && currentItem.split('_')[0] === title ? 'active' : ''
      }
      sx={(theme: AstridTheme) => ({
        padding: '0px 20px 10px',
        '& hr': {
          background: 'transparent',
          height: 9,
          border: 'none',
          margin: 0
        },
        '&.active': {
          borderTopColor: theme.summary?.indicator?.color,
          borderTopWidth: 10,
          '& hr': {
            height: 0,
          },
        },
        '& .MuiCardContent-root': {
          padding: '2px 20px 8px',
        },
      })}
    >
      <hr />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        spacing={0}
        sx={{
          height: 80,
          '& .MuiGrid-container': {},
        }}
      >
        <Grid item>
          <Typography
            sx={{
              color: '#00a09e',
              fontSize: 19,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>{title}</Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={0}
          >
            <Grid item>
              <Typography
                className={
                  (currentItem === `${title}_1`) ? 'active' : ''
                }
                sx={(theme: AstridTheme) => (
                  {
                    fontSize: 32,
                    lineHeight: '28px',
                    fontWeight: 'bold',
                    borderBottom: '5px solid transparent',
                    color: theme.summary?.item1?.color,
                    '&:hover': {
                      cursor: 'pointer',
                    },
                    '&.active': {
                      borderBottomColor: theme.summary?.indicator?.color,
                      borderBottomW: `${theme.summary?.indicator?.color} solid`,
                    },
                  })
                }
                onClick={() => onSelect(title, 1)}
              >
                {value1}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={
                  currentItem === `${title}_2` ? 'active' : ''
                }
                sx={(theme: AstridTheme) => (
                  {
                    fontSize: 32,
                    lineHeight: '28px',
                    fontWeight: 'bold',
                    borderBottom: '5px solid transparent',
                    color: theme.summary?.item2?.color,
                    '&:hover': {
                      cursor: 'pointer',
                    },
                    '&.active': {
                      borderBottomColor: theme.summary?.indicator?.color,
                      borderBottomW: `${theme.summary?.indicator?.color} solid`,
                    },
                  })
                }
                onClick={() => onSelect(title, 2)}
              >
                {value2}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card >
  );
};
