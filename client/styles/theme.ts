import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material/styles';

// create a theme instance
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#607a8d',
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
    fontFamily: [
      '"Nunito"',
      'Roboto',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
      fontStyle: 'italic',
      fontSize: '3.75rem',
      lineHeight: 1.12,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
      fontStyle: 'italic',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.35,
      letterSpacing: '0.03em',
    },
    subtitle2: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 200,
      fontSize: '0.875rem',
      fontStyle: 'italic',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontWeight: 600,
      fontSize: '1.1rem',
      letterSpacing: '0.01em',
    },
    body2: {
      fontWeight: 300,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 700,
      fontSize: "1rem",
      letterSpacing: '0.03em',
    },
  },
});

export default theme;
