import { createTheme } from '@mui/material/styles'

// Dark, Fluent/Metro-flavoured theme that approximates the look of the original
// react-uwp UI: the Windows accent blue for actions, Twitch purple branding,
// the Segoe UI typeface, light heading weights, and flat, square buttons
// (Material's defaults are rounded, uppercase and elevated, which reads very
// differently from Fluent).
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0078d7' }, // Windows/Fluent accent blue (the original accent)
    secondary: { main: '#6441a4' }, // Twitch purple
    background: {
      default: '#000000',
      paper: '#1f1f1f',
    },
    divider: 'rgba(100, 65, 164, 0.6)', // Twitch purple list separators
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily:
      '"Segoe UI", "Segoe UI Web (West European)", -apple-system, Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 300 },
    h2: { fontWeight: 300 },
    h3: { fontWeight: 300 },
    h4: { fontWeight: 300 },
    h5: { fontWeight: 300 },
    h6: { fontWeight: 400 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
  },
})

export default theme
