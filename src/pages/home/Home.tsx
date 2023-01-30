import React from 'react';
import { Box, Link, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';
import { Table, TableColumn } from '../../components/Table';
import { useState } from 'react';

const generateFakeData: (number: number) => Array<{}> = (rows = 10) => {
  const data: Array<{}> = [];
  while (data.length <= rows) {
    data.push({
      name: `name-${Math.floor(Math.random() * 100)}`,
      system: `system-${Math.floor(Math.random() * 100)}`,
      owner: `owner-${Math.floor(Math.random() * 100)}`,
      type: `type-${Math.floor(Math.random() * 100)}`,
      lifecycle: `lifecycle-${Math.floor(Math.random() * 100)}`,
      description: `description-${Math.floor(Math.random() * 100)}`,
      tags: `tags-${Math.floor(Math.random() * 100)}`,
    });
  }

  return data;
};

export const Home = () => {
  const [data, setData] = useState<Array<any>>(generateFakeData(15));

  const [kind, setKind] = React.useState('');

  const columns: TableColumn[] = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'System',
      field: 'system',
    },
    {
      title: 'Owner',
      field: 'owner',
    },
    {
      title: 'Type',
      field: 'type',
    },
    {
      title: 'Lifecycle',
      field: 'lifecycle',
    },
    {
      title: 'Description',
      field: 'description',
    },
    {
      title: 'Tags',
      field: 'tags',
    },
  ];
  const handleChange = (event: SelectChangeEvent) => {
    setKind(event.target.value as string);
    setData(generateFakeData(15))
  };
  return (
    <div className="App">
      <BreadcrumbWidget>
        <Link href="/" underline="none">
          Home
        </Link>
      </BreadcrumbWidget>
      <Grid container sx={{ padding: '50px' }} spacing={4}>
        <Grid item sx={{ minWidth: 200 }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kind</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kind}
                label="Kind"
                onChange={handleChange}
              >
                <MenuItem value={'api'}>API</MenuItem>
                <MenuItem value={'component'}>Component</MenuItem>
                <MenuItem value={'domain'}>Domain</MenuItem>
                <MenuItem value={'group'}>Group</MenuItem>
                <MenuItem value={'location'}>Location</MenuItem>
                <MenuItem value={'Resource'}>resource</MenuItem>
                <MenuItem value={'system'}>System</MenuItem>
                <MenuItem value={'user'}>User</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs>
          <TableContainer component={Paper}>
            <Table
              options={{
                paging: true,
                pageSize: 6,
                searchFieldAlignment: 'right',
                pageSizeOptions: [6, 12, 18, 24],
              }}
              data={data}
              columns={columns}
              title="Astrid Table"
            />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}