import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ApiIcon from '@mui/icons-material/Api';
import HomeIcon from '@mui/icons-material/Home';
import LocationIcon from '@mui/icons-material/LocationCity';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  id: string;
  text: string;
  icon: React.ReactNode;
  to: string;
}

const navigation: NavigationItem[] = [
  {
    id: "home",
    text: "Home",
    icon: <HomeIcon />,
    to: "/"
  },
  // {
  //   id: "apis",
  //   text: "APIs",
  //   icon: <ApiIcon />,
  //   to: "/apis"
  // },
  // {
  //   id: "docs",
  //   text: "Docs",
  //   icon: <DocIcon />,
  //   to: "/docs"
  // },
  {
    id: "location",
    text: "Location",
    icon: <LocationIcon />,
    to: "/location"
  },
  {
    id: "astrid_api",
    text: "Astrid APIs",
    icon: <ApiIcon />,
    to: "/astrid_apis"
  },
  {
    id: "settings",
    text: "Settings",
    icon: <SettingsIcon />,
    to: "/settings"
  }
]
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Navigation = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpenStatus = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open} className='AstridSidebar'>
      <DrawerHeader>
        <IconButton onClick={handleDrawerOpenStatus}>
          {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className='AstridSidebar_list'>
        {navigation.map((item) => (
          <Link key={item.id} to={item.to} className='AstridSidebar_link'>
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={pathname === item.to}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? '10px' : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

        ))}
      </List>
    </Drawer>
  );
}