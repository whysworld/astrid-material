/*
 * Copyright 2023 The Backstage Authors
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
import React, { useState, PropsWithChildren } from 'react';
import {
  Grid,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Link,
  Card
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TenantWidget } from '../../components/TenantWidget';
import { LocationWidget } from '../../components/LocationWidget';
import { SummaryWidget } from '../../components/SummaryWidget';
import { TenantAddDialog } from '../../components/TenantAddDialog';
import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';

interface Props {
  children: React.ReactNode;
  index: any;
  value: any;
}
const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
};

export const LocationPage = ({ children }: PropsWithChildren<{}>) => {
  const [value, setValue] = React.useState(0);
  const [isAddTenant, setAddTenant] = useState<boolean>(true);
  const [openTenantAddDlg, setOpenTenantAddDlg] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) setAddTenant(true);
    else setAddTenant(false);
  };

  const onTenantAddDlgClose = () => {
    setOpenTenantAddDlg(false);
  };

  const onTenantAddDlgSave = () => {
    setOpenTenantAddDlg(false);
  };

  const onFilter = (title: string, idx: 1 | 2) => {
    setActiveItem(`${title}_${idx}`);
  };

  return (
    <Box>
      <BreadcrumbWidget>
        <Link href="/astrid-location" underline="none">
          Location
        </Link>
      </BreadcrumbWidget>
      <Box sx={{ flexGrow: 1, padding: '25px' }}>
        <Grid container spacing={0} direction="row">
          <Grid
            item
            sx={{
              width: '400px',
              height: 'calc(100vh - 135px)',
              paddingRight: '30px',
            }}
          >
            <Card sx={{ minHeight: 'calc(100vh - 135px)' }}>
              <Grid container justifyContent="space-between" direction="row">
                <Grid item>
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    <Tab label="Tenant" {...a11yProps(0)} />
                    <Tab label="Location" {...a11yProps(1)} />
                  </Tabs>
                </Grid>
                <Grid item>
                  {isAddTenant && (
                    <Button onClick={() => setOpenTenantAddDlg(true)}>
                      <AddIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
              <TabPanel value={value} index={0}>
                <TenantWidget />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <LocationWidget />
              </TabPanel>
            </Card>
          </Grid>
          <Grid item xs>
            <Grid
              container
              justifyContent="space-between"
              direction="column"
              spacing={0}
              style={{ height: '100%' }}
            >
              <Grid container direction="row" spacing={3}>
                <Grid item xs={3}>
                  <SummaryWidget
                    currentItem={activeItem}
                    onFilter={onFilter}
                    title="Tunnel"
                    value1={10}
                    value2={20}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SummaryWidget
                    currentItem={activeItem}
                    onFilter={onFilter}
                    title="Device1"
                    value1={10}
                    value2={20}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SummaryWidget
                    currentItem={activeItem}
                    onFilter={onFilter}
                    title="Device2"
                    value1={10}
                    value2={20}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SummaryWidget
                    currentItem={activeItem}
                    onFilter={onFilter}
                    title="Device3"
                    value1={10}
                    value2={20}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Card sx={{ height: 'calc(100vh - 320px)', textAlign: 'left', padding: '20px' }}>
                  <Box>
                    <Grid
                      container
                      direction="column"
                      style={{ padding: '30px 0' }}
                      spacing={3}
                    >
                      <Grid item>
                        <Typography>Location name:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Address:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Time Zone:</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <TenantAddDialog
        open={openTenantAddDlg}
        onClose={onTenantAddDlgClose}
        onSave={onTenantAddDlgSave}
      />
    </Box>
  );
};
