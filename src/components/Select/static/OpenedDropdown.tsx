
import React from 'react';
import { SvgIcon } from '@mui/material';

export type OpenedDropdownClassKey = 'icon';

const OpenedDropdown = () => {
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
        d="M16.5 16L18 14.5L11.9297 8.42969L5.85938 14.5L7.35938 16L11.9297 11.4297L16.5 16Z"
        fill="#616161"
      />
    </SvgIcon>
  );
};

export default OpenedDropdown;
