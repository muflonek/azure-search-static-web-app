import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#646cff', // From your link color
      dark: '#535bf2', // From your link hover color
      light: '#747bff', // From your light theme link hover
    },
    secondary: {
      main: '#0078d4', // Azure blue
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#213547', // From your light theme color
      secondary: '#6e6e6e',
    },
    action: {
      hover: 'rgba(100, 108, 255, 0.08)', // Light blue hover effect
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        body: {
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          lineHeight: 1.5,
          margin: 0,
          padding: 0,
          minWidth: '320px',
        },
        h1: {
          fontSize: '3.2em',
          lineHeight: 1.1,
        },
        a: {
          fontWeight: 500,
          color: '#646cff',
          textDecoration: 'inherit',
          '&:hover': {
            color: '#747bff',
          },
        },
        button: {
          borderRadius: '8px',
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1em',
          fontWeight: 500,
          fontFamily: 'inherit',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          transition: 'border-color 0.25s',
          '&:hover': {
            borderColor: '#646cff',
          },
          '&:focus, &:focus-visible': {
            outline: '4px auto -webkit-focus-ring-color',
          },
        },
      },
    },
  },
});

export default theme;
