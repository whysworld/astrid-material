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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import { LocationSelectWidget } from './LocationSelectWidget';
import { SearchWidget } from './SearchWidget';
import { RefreshWidget } from './RefreshWidget';
import { HistoryWidget } from './HistoryWidget';
import { NotificationWidget } from './NotificationWidget';
// import { UserWidget } from '../UserWidget/UserWidget';
// import { ThemeSelectWidget } from '../ThemeSelectWidget/ThemeSelectWidget';
import { TimeWidget } from './TimeWidget';
import { AstridTheme } from '../../themes';

export const AstridHeader = () => {
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [refresh, setRefresh] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<string | undefined>(undefined);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newSearchParams = {};
    if (location)
      newSearchParams = {
        loc: location,
      };
    if (refresh)
      newSearchParams = {
        ...newSearchParams,
        refresh: refresh,
      };
    if (history)
      newSearchParams = {
        ...newSearchParams,
        history: history,
      };
    setSearchParams(newSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, refresh, history]);

  return (
    <Box
      className={'AstridHeader'}
      sx={(theme: AstridTheme) => ({
        height: '40px',
        width: '100%',
        background: theme.header?.background,
        backgroundSize: 'cover',
        alignItems: 'center',
        display: 'flex',
        padding: '0px 10px',
        borderBottom: `1px solid ${theme.header?.borderColor}`
      })}
    >
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item>
          <Button
            sx={(theme) => ({
              transition: 'none',
              minWidth: 40,
              minHeight: 30,
              padding: 0,
              bgcolor: theme.palette.background.default,
              '&:hover': {
                bgcolor: theme.palette.background.default
              }
            })}
          >
            <img
              src="https://www.google.com/s2/favicons?sz=24&domain_url=https://www.google.com"
              alt="favicon"
            />
          </Button>
        </Grid>
        <Grid item>
          <LocationSelectWidget
            onLocationChange={(loc: string) => setLocation(loc)}
          />
        </Grid>
        <Grid item xs>
          <SearchWidget />
        </Grid>
        <Grid item>
          <RefreshWidget
            onRefreshChange={(interval: string) => setRefresh(interval)}
          />
        </Grid>
        <Grid item>
          <HistoryWidget
            onHistoryChange={(interval: string) => setHistory(interval)}
          />
        </Grid>
        <Grid item>
          <NotificationWidget />
        </Grid>
        {/* <Grid item>
          <UserWidget />
        </Grid>
        <Grid item>
          <ThemeSelectWidget />
        </Grid> */}
        <Grid item>
          <TimeWidget />
        </Grid>
      </Grid>
    </Box>
  );
};
