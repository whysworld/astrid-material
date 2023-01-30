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

import { Grid, Link } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';
import { SummaryWidget } from '../../components/SummaryWidget';
import { Table, TableColumn } from '../../components/Table';

const generateFakeData: (number: number) => Array<{}> = (rows = 10) => {
  const data: Array<{}> = [];
  while (data.length <= rows) {
    data.push({
      math: Math.floor(Math.random() * 100),
      physics: Math.floor(Math.random() * 100),
      english: Math.floor(Math.random() * 100),
      ai: Math.floor(Math.random() * 100),
      description: `Description ${Math.floor(Math.random() * 100)}`,
    });
  }

  return data;
};

export const AstridAPIsPage = ({ children }: PropsWithChildren<{}>) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Array<any>>(generateFakeData(15));

  const columns: TableColumn[] = [
    {
      title: 'Description',
      field: 'description',
    },
    {
      title: 'Math',
      field: 'math',
    },
    {
      title: 'Physics',
      field: 'physics',
      type: 'numeric',
    },
    {
      title: 'English',
      field: 'english',
      type: 'numeric',
    },
    {
      title: 'AI',
      field: 'ai',
      type: 'numeric',
    },
  ];

  const onFilter = (title: string, idx: 1 | 2) => {
    setActiveItem(`${title}_${idx}`);
    setData(generateFakeData(15));
  };
  return (
    <>
      <BreadcrumbWidget>
        <Link href="/astrid_apis" underline="none">
          API Doc
        </Link>
      </BreadcrumbWidget>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Grid container spacing={3} style={{ padding: 24 }}>
          <Grid item xs>
            <SummaryWidget
              currentItem={activeItem}
              title="Math"
              value1={20}
              value2={30}
              onFilter={onFilter}
            />
          </Grid>
          <Grid item xs>
            <SummaryWidget
              currentItem={activeItem}
              onFilter={onFilter}
              title="Physics"
              value1={45}
              value2={10}
            />
          </Grid>
          <Grid item xs>
            <SummaryWidget
              currentItem={activeItem}
              onFilter={onFilter}
              title="English"
              value1={61}
              value2={26}
            />
          </Grid>
          <Grid item xs>
            <SummaryWidget
              currentItem={activeItem}
              onFilter={onFilter}
              title="AI"
              value1={80}
              value2={70}
            />
          </Grid>
        </Grid>
      </div>
      <Grid container style={{ padding: 30 }} spacing={0}>
        <div style={{ width: '100%' }}>
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
        </div>
      </Grid>
    </>
  );
};
