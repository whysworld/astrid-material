import MTable, {
  Column,
  MaterialTableProps,
  MTableBody,
  MTableHeader,
  MTableToolbar,
  Options,
} from '@material-table/core';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  ViewColumn
} from '@mui/icons-material'
import { makeStyles, useTheme, withStyles } from '@mui/styles';
import { isEqual, transform } from 'lodash';
import React, {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { SelectProps } from '../Select/Select';
import { Filter, Filters, SelectedFilters, Without } from './Filters';
import { AstridTheme } from '../../themes';

// Material-table is not using the standard icons available in in material-ui. https://github.com/mbrn/material-table/issues/51
const tableIcons: any = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref: any) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props: any, ref: any) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props: any, ref: any) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props: any, ref: any) => <ViewColumn {...props} ref={ref} />),
};

// TODO: Material table might already have such a function internally that we can use?
function extractValueByField(data: any, field: string): any | undefined {
  const path = field.split('.');
  let value = data[path[0]];

  for (let i = 1; i < path.length; ++i) {
    if (value === undefined) {
      return value;
    }

    const f = path[i];
    value = value[f];
  }

  return value;
}

export type TableHeaderClassKey = 'header';

const StyledMTableHeader = withStyles(
  theme => ({
    header: {
      padding: theme.spacing(1, 2, 1, 2.5),
      borderTop: `1px solid ${theme.palette.grey.A100}`,
      borderBottom: `1px solid ${theme.palette.grey.A100}`,
      // withStyles hasn't a generic overload for theme
      // color: (theme as AstridTheme).palette.textSubtle,
      fontWeight: theme.typography.fontWeightBold,
      position: 'static',
      wordBreak: 'normal',
    },
  }),
  { name: 'AstridTableHeader' },
)(MTableHeader);

export type TableToolbarClassKey = 'root' | 'title' | 'searchField';

const StyledMTableToolbar = withStyles(
  theme => ({
    root: {
      padding: theme.spacing(3, 0, 2.5, 2.5),
    },
    title: {
      '& > h6': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    searchField: {
      paddingRight: theme.spacing(2),
    },
  }),
  { name: 'AstridTableToolbar' },
)(MTableToolbar);

/** @public */
export type FiltersContainerClassKey = 'root' | 'title';

const useFilterStyles = makeStyles<AstridTheme>(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 18,
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'AstridTableFiltersContainer' },
);

export type TableClassKey = 'root';

const useTableStyles = makeStyles<AstridTheme>(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'start',
    },
  }),
  { name: 'AstridTable' },
);

function convertColumns<T extends object>(
  columns: TableColumn<T>[],
  theme: AstridTheme,
): TableColumn<T>[] {
  return columns.map(column => {
    const headerStyle: React.CSSProperties = {};

    let cellStyle = column.cellStyle || {};

    if (column.highlight) {
      // headerStyle.color = theme.palette.textContrast;

      if (typeof cellStyle === 'object') {
        (cellStyle as React.CSSProperties).fontWeight =
          theme.typography.fontWeightBold;
      } else {
        const cellStyleFn = cellStyle as (
          data: any,
          rowData: T,
          column?: Column<T>,
        ) => React.CSSProperties;
        cellStyle = (data, rowData, rowColumn) => {
          const style = cellStyleFn(data, rowData, rowColumn);
          return { ...style, fontWeight: theme.typography.fontWeightBold };
        };
      }
    }

    return {
      ...column,
      headerStyle,
      cellStyle,
    };
  });
}

function removeDefaultValues(state: any, defaultState: any): any {
  return transform(state, (result, value, key) => {
    if (!isEqual(value, defaultState[key])) {
      result[key] = value;
    }
  });
}

const defaultInitialState = {
  search: '',
  filtersOpen: false,
  filters: {},
};

export interface TableColumn<T extends object = {}> extends Column<T> {
  highlight?: boolean;
  width?: string;
}

export type TableFilter = {
  column: string;
  type: 'select' | 'multiple-select';
};

export type TableState = {
  search?: string;
  filtersOpen?: boolean;
  filters?: SelectedFilters;
};

export interface TableProps<T extends object = {}>
  extends MaterialTableProps<T> {
  columns: TableColumn<T>[];
  subtitle?: string;
  filters?: TableFilter[];
  initialState?: TableState;
  emptyContent?: ReactNode;
  onStateChange?: (state: TableState) => any;
}

export function TableToolbar(toolbarProps: {
  toolbarRef: MutableRefObject<any>;
  setSearch: (value: string) => void;
  onSearchChanged: (value: string) => void;
  toggleFilters: () => void;
  hasFilters: boolean;
  selectedFiltersLength: number;
}) {
  const {
    toolbarRef,
    setSearch,
    hasFilters,
    selectedFiltersLength,
    toggleFilters,
  } = toolbarProps;
  const filtersClasses = useFilterStyles();
  const onSearchChanged = useCallback(
    (searchText: string) => {
      toolbarProps.onSearchChanged(searchText);
      setSearch(searchText);
    },
    [toolbarProps, setSearch],
  );

  if (hasFilters) {
    return (
      <Box className={filtersClasses.root}>
        <Box className={filtersClasses.root}>
          <IconButton onClick={toggleFilters} aria-label="filter list">
            <FilterList />
          </IconButton>
          <Typography className={filtersClasses.title}>
            Filters ({selectedFiltersLength})
          </Typography>
        </Box>
        <StyledMTableToolbar
          {...toolbarProps}
          ref={toolbarRef}
          onSearchChanged={onSearchChanged}
        />
      </Box>
    );
  }

  return (
    <StyledMTableToolbar
      {...toolbarProps}
      ref={toolbarRef}
      onSearchChanged={onSearchChanged}
    />
  );
}

/**
 * @public
 */
export function Table<T extends object = {}>(props: TableProps<T>) {
  const {
    data,
    columns,
    options,
    title,
    subtitle,
    filters,
    initialState,
    emptyContent,
    onStateChange,
    components,
    ...restProps
  } = props;
  const tableClasses = useTableStyles();

  const theme = useTheme<AstridTheme>();

  const calculatedInitialState = { ...defaultInitialState, ...initialState };

  const [filtersOpen, setFiltersOpen] = useState(
    calculatedInitialState.filtersOpen,
  );
  const toggleFilters = useCallback(
    () => setFiltersOpen(v => !v),
    [setFiltersOpen],
  );
  const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);
  const [tableData, setTableData] = useState(data as any[]);
  const [selectedFilters, setSelectedFilters] = useState(
    calculatedInitialState.filters,
  );

  const MTColumns = convertColumns(columns, theme);

  const [search, setSearch] = useState(calculatedInitialState.search);

  useEffect(() => {
    if (onStateChange) {
      const state = removeDefaultValues(
        {
          search,
          filtersOpen,
          filters: selectedFilters,
        },
        defaultInitialState,
      );

      onStateChange(state);
    }
  }, [search, filtersOpen, selectedFilters, onStateChange]);

  const defaultOptions: Options<T> = {
    headerStyle: {
      textTransform: 'uppercase',
    },
  };

  const getFieldByTitle = useCallback(
    (titleValue: string | keyof T) =>
      columns.find(el => el.title === titleValue)?.field,
    [columns],
  );

  useEffect(() => {
    if (typeof data === 'function') {
      return;
    }
    if (!selectedFilters) {
      setTableData(data as any[]);
      return;
    }

    const selectedFiltersArray = Object.values(selectedFilters);
    if (data && selectedFiltersArray.flat().length) {
      const newData = (data as any[]).filter(
        el =>
          !!Object.entries(selectedFilters)
            .filter(([, value]) => !!(value as any).length)
            .every(([key, filterValue]) => {
              const fieldValue = extractValueByField(
                el,
                getFieldByTitle(key) as string,
              );

              if (Array.isArray(fieldValue) && Array.isArray(filterValue)) {
                return fieldValue.some(v => filterValue.includes(v));
              } else if (Array.isArray(fieldValue)) {
                return fieldValue.includes(filterValue);
              } else if (Array.isArray(filterValue)) {
                return filterValue.includes(fieldValue);
              }

              return fieldValue === filterValue;
            }),
      );
      setTableData(newData);
    } else {
      setTableData(data as any[]);
    }
    setSelectedFiltersLength(selectedFiltersArray.flat().length);
  }, [data, selectedFilters, getFieldByTitle]);

  const constructFilters = (
    filterConfig: TableFilter[],
    dataValue: any[] | undefined,
  ): Filter[] => {
    const extractDistinctValues = (field: string | keyof T): Set<any> => {
      const distinctValues = new Set<any>();
      const addValue = (value: any) => {
        if (value !== undefined && value !== null) {
          distinctValues.add(value);
        }
      };

      if (dataValue) {
        dataValue.forEach(el => {
          const value = extractValueByField(
            el,
            getFieldByTitle(field) as string,
          );

          if (Array.isArray(value)) {
            (value as []).forEach(addValue);
          } else {
            addValue(value);
          }
        });
      }

      return distinctValues;
    };

    const constructSelect = (
      filter: TableFilter,
    ): Without<SelectProps, 'onChange'> => {
      return {
        placeholder: 'All results',
        label: filter.column,
        multiple: filter.type === 'multiple-select',
        items: [...extractDistinctValues(filter.column)].sort().map(value => ({
          label: value,
          value,
        })),
      };
    };

    return filterConfig.map(filter => ({
      type: filter.type,
      element: constructSelect(filter),
    }));
  };

  const hasFilters = !!filters?.length;
  const Toolbar = useCallback(
    (toolbarProps: any) => {
      return (
        <TableToolbar
          setSearch={setSearch}
          hasFilters={hasFilters}
          selectedFiltersLength={selectedFiltersLength}
          toggleFilters={toggleFilters}
          {...toolbarProps}
        />
      );
    },
    [toggleFilters, hasFilters, selectedFiltersLength, setSearch],
  );

  const hasNoRows = typeof data !== 'function' && data.length === 0;
  const columnCount = columns.length;
  const Body = useCallback(
    (bodyProps: any) => {
      if (emptyContent && hasNoRows) {
        return (
          <tbody>
            <tr>
              <td colSpan={columnCount}>{emptyContent}</td>
            </tr>
          </tbody>
        );
      }

      return <MTableBody {...bodyProps} />;
    },
    [hasNoRows, emptyContent, columnCount],
  );

  return (
    <Box className={tableClasses.root}>
      {filtersOpen && data && typeof data !== 'function' && filters?.length && (
        <Filters
          filters={constructFilters(filters, data as any[])}
          selectedFilters={selectedFilters}
          onChangeFilters={setSelectedFilters}
        />
      )}
      <MTable<T>
        components={{
          Header: StyledMTableHeader,
          Toolbar,
          Body,
          ...components,
        }}
        options={{ ...defaultOptions, ...options }}
        columns={MTColumns}
        icons={tableIcons}
        title={
          <>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            {subtitle && (
              <Typography color="textSecondary" variant="body1">
                {subtitle}
              </Typography>
            )}
          </>
        }
        data={typeof data === 'function' ? data : tableData}
        style={{ width: '100%' }}
        localization={{
          toolbar: { searchPlaceholder: 'Filter', searchTooltip: 'Filter' },
        }}
        {...restProps}
      />
    </Box>
  );
}

Table.icons = Object.freeze(tableIcons);
