import { createTheme } from '@mui/material/styles'

// Dark, Twitch-flavoured theme used across the extension panel and config views.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#9147ff' }, // Twitch purple
    secondary: { main: '#0078d7' }, // accent blue
    background: {
      default: '#18181b',
      paper: '#1f1f23',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
})

export default theme
