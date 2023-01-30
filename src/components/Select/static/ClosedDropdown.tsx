
import React from 'react';
import { SvgIcon } from '@mui/material';

/** @public */
export type ClosedDropdownClassKey = 'icon';

const ClosedDropdown = () => {
  return (
    <SvgIcon
      sx={(theme) => ({
        position: 'absolute',
        right: theme.spacing(0.5),
        pointerEvents: 'none',
      })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 8L6 9.5L12.0703 15.5703L18.1406 9.5L16.6406 8L12.0703 12.5703L7.5 8Z"
        fill="#616161"
      />
    </SvgIcon>
  );
};

export default ClosedDropdown;
