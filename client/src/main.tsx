import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import theme from './theme'
import App from './App/App'
import { debugStyles } from './debug' // Import debug styles

// Define global styles
const globalStyles = {
  ':root': {
    // Base font styles
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
    fontWeight: 400,
    
    // Text rendering optimizations
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    
    // Light theme colors (from your media query)
    color: '#213547',
    backgroundColor: '#ffffff',
  },
  
  // Debug styles imported from debug.js
  // To enable/disable, just change DEBUG_MODE in debug.js
  ...debugStyles,
  // Link styles
  'a': {
    fontWeight: 500,
    color: '#646cff',
    textDecoration: 'inherit',
  },
  'a:hover': {
    color: '#747bff',
  },
  // Body styles
  'body': {
    margin: 0,
    padding: 0,
    minWidth: '320px',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    // Not including display: flex and place-items: center as they would break your layout
  },
  // Heading styles
  'h1': {
    fontSize: '3.2em',
    lineHeight: 1.1,
  },
  // Button styles
  'button': {
    borderRadius: '8px',
    border: '1px solid transparent',
    padding: '0.6em 1.2em',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#f9f9f9', // Light theme button color
    cursor: 'pointer',
    transition: 'border-color 0.25s',
  },
  'button:hover': {
    borderColor: '#646cff',
  },
  'button:focus, button:focus-visible': {
    outline: '4px auto -webkit-focus-ring-color',
  },
  // Box sizing for all elements
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
