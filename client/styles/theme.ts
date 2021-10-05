import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material/styles';

// create a theme instance
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#395971',
      contrastText: '#e4e3dd',
    },
    secondary: {
      main: '#EC8F00',
      contrastText: '#0E1E29',
    },
    background: {
      default: '#112531',
      paper: '#16313f',
    },
    text: {
      primary: '#e4e3dd',
    },
    divider: '#395971',
    info: {
      main: '#2fb373',
    },
    success: {
      main: '#00d589',
    },
    error: {
      main: '#c54419',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          // color: '#e4e3dd'
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#e4e3dd'
          },
          '&.MuiBottomNavigationAction-iconOnly': {
            color: '#395971'
          },
          '&.MuiBottomNavigationAction-label': {
            opacity: '0 !important'
          },
        },
      },
    },
  },
});

// theme = createTheme(theme, {
//   components: {
//     MuiBottomNavigation: {
//       styleOverrides: {
//         root: {
//           backgroundColor: theme.palette.secondary,
//           color: theme.palette.text
//         },
//       },
//     },
//   },
// })

export default theme;
