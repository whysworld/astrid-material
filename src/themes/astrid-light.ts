import { createTheme } from '@mui/material';
import { AstridTheme } from '.';

const ASTRID_BACKGROUND_DEFAULT_COLOR = '#FFFFFF';
const ASTRID_BACKGROUND_PAPER_COLOR = '#FFFFFF';
const ASTRID_HEADER_BORDER_COLOR = '#d6d6d6';
export const ASTRID_TABLE_HEADER_BK_COLOR = '#fbfdff';
export const ASTRID_TABLE_TR_HOVER_COLOR = '#e5f2ff';
export const ASTRID_LISTITEM_LIST_SELECTED_COLOR = '#17bebb';
export const ASTRID_LISTITEM_LIST_HOVER_COLOR = '#17bebb60';
export const ASTRID_HEADER_TITLE_COLOR = '#00a09e';
export const ASTRID_NAVIGATION_BACKGROUND_COLOR = '#0064c8';

export const ASTRID_HEADER_BACKGROUND_COLOR = '#e5eff8';
//Summary Widget
export const ASTRID_SUMMARY_ITEM1_COLOR = '#3cba0d';
export const ASTRID_SUMMARY_ITEM2_COLOR = '#fc6666';

const baseLightTheme = createTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue", 
      "Helvetica", 
      "Roboto", 
      "Arial", 
      "sans-serif"
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: ASTRID_LISTITEM_LIST_SELECTED_COLOR
    },
    background: {
      default: ASTRID_BACKGROUND_DEFAULT_COLOR,
      paper: ASTRID_BACKGROUND_PAPER_COLOR
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarColor: 'rgba(0, 0, 0, 0.2)',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'white',
            width: 6,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            minHeight: 24,
            border: 'none',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
          {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
          {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
          {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
          border: `1px solid ${ASTRID_HEADER_BORDER_COLOR}`
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          background: 'transparent',
          "&.AstridSidebar": {
            background: 'red',
            "& .MuiSvgIcon-root": {
              color: 'white'
            }
          },
        },
        paper: {
          background: ASTRID_NAVIGATION_BACKGROUND_COLOR,
          border: 'none'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &.Mui-selected:hover': {
            background: ASTRID_LISTITEM_LIST_HOVER_COLOR,
          },
          '&.Mui-selected': {
            backgroundColor: ASTRID_LISTITEM_LIST_SELECTED_COLOR,
            color: 'white',
          },
        },
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          "&.AstridSidebar_list": {
            "& .AstridSidebar_link": {
              textDecoration: 'none',
              color: 'white'
            },
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          background: 'transparent',
          "&.Mui-selected,&:hover, &.Mui-selected:hover": {
            background: ASTRID_LISTITEM_LIST_SELECTED_COLOR
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          textDecoration: 'none'
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '0'
        },
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          textAlign: 'left',
          backgroundColor: ASTRID_TABLE_HEADER_BK_COLOR
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderLeft: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
          borderRight: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
          boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderLeft: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
          borderRight: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
          background: ASTRID_TABLE_HEADER_BK_COLOR,
          padding: '12px 0px 12px 20px',
          '& h2[class*=MuiTypography]': {
            color: ASTRID_HEADER_TITLE_COLOR,
          },
        }
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& tr[class*=MuiTableRow-head]': {
            borderTop: `1px solid ${ASTRID_HEADER_BORDER_COLOR}`,
          },
          '& th[class*=MuiTableCell-head]': {
            background: 'transparent',
            padding: '20px 16px 20px 20px',
            color: `${ASTRID_HEADER_TITLE_COLOR} !important`,
            borderTop: 'none',
            borderBottom: 'none',
            '& .Mui-active': {
              color: 'inherit'
            }
          },
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr[class*=MuiTableRow-root]': {
            borderBottom: 'none',
            '&:nth-of-type(odd)': {
              backgroundColor: 'transparent',
            },
            '&:hover': {
              background: ASTRID_TABLE_TR_HOVER_COLOR,
            },
            '& td[class*=MuiTableCell-root]': {
              padding: '18px 16px 18px 20px',
            },
          },
          '& td[class*=MuiTableCell-root]': {
            borderTop: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
            borderBottom: 'none',
          },
        }
      }
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          '& tr[class*=MuiTableRow-footer]': {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderTop: `solid 1px ${ASTRID_HEADER_BORDER_COLOR}`,
            background: 'transparent',
          },
          '& div[class*=MuiToolbar]': {
            border: 'none'
          },
          '& .MuiTableCell-footer ': {
            borderBottom: 'none',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }
        }
      }
    }
  },
});

export const AstridLightTheme: AstridTheme = {
  ...baseLightTheme,
  header: {
    background: ASTRID_HEADER_BACKGROUND_COLOR,
    borderColor: ASTRID_HEADER_BORDER_COLOR
  },
  summary: {
    indicator: {
      color: ASTRID_LISTITEM_LIST_SELECTED_COLOR,
      width: '5px'
    },
    item1: {
      color: ASTRID_SUMMARY_ITEM1_COLOR
    },
    item2: {
      color: ASTRID_SUMMARY_ITEM2_COLOR
    }
  }
}
