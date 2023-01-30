import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { AstridTheme } from '../../themes';

export type SubvalueCellClassKey = 'value' | 'subvalue';

const useSubvalueCellStyles = makeStyles<AstridTheme>(
  theme => ({
    value: {
      marginBottom: theme.spacing(0.75),
    },
    subvalue: {
      // color: theme.palette.textSubtle,
      fontWeight: 'normal',
    },
  }),
  { name: 'AstridSubvalueCell' },
);

type SubvalueCellProps = {
  value: React.ReactNode;
  subvalue: React.ReactNode;
};

export function SubvalueCell(props: SubvalueCellProps) {
  const { value, subvalue } = props;
  const classes = useSubvalueCellStyles();

  return (
    <>
      <Box className={classes.value}>{value}</Box>
      <Box className={classes.subvalue}>{subvalue}</Box>
    </>
  );
}
