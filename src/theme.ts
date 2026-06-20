import { createTheme } from '@mui/material/styles'

// Modern, Twitch-native dark theme: Twitch's own surface/ text colours, the
// purple brand accent, comfortable rounding and a clean type scale.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#9147ff', contrastText: '#ffffff' }, // Twitch purple
    secondary: { main: '#bf94ff' },
    error: { main: '#eb0400' }, // Twitch "live" red
    success: { main: '#00b173' },
    background: {
      default: '#0e0e10', // Twitch page background
      paper: '#18181b', // Twitch surface
    },
    divider: 'rgba(255,255,255,0.1)',
    text: {
      primary: '#efeff1',
      secondary: '#adadb8',
    },
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 4 } },
    },
  },
})

export default theme
