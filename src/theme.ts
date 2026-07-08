import { createTheme } from '@mui/material/styles'

const INK = '#0b0d14' // page background
const SURFACE = '#151a27' // cards / panels

// Sleek, distinctive "midnight" palette: an indigo->violet->teal brand
// gradient with teal, rose and emerald accents on a deep ink background.
export const gradients = {
  brand: 'linear-gradient(135deg, #6d5efc 0%, #a855f7 50%, #2dd4bf 100%)',
  button: 'linear-gradient(135deg, #6d5efc 0%, #8b5cf6 100%)',
  buttonHover: 'linear-gradient(135deg, #5a4bf0 0%, #7c4ff0 100%)',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6d5efc', light: '#9d92ff', contrastText: '#ffffff' }, // indigo / violet
    secondary: { main: '#2dd4bf', light: '#5eead4', contrastText: '#04241f' }, // teal
    error: { main: '#fb7185', light: '#fda4b0' }, // rose = "live"
    success: { main: '#34d399' }, // emerald = "saved"
    warning: { main: '#fbbf24' },
    background: { default: INK, paper: SURFACE },
    divider: 'rgba(255,255,255,0.08)',
    text: {
      primary: '#e9eaf2',
      secondary: '#9aa1b9',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 600 },
    overline: { letterSpacing: '0.12em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none', backgroundColor: SURFACE } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 8 } },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundImage: gradients.button,
            boxShadow: '0 6px 18px -8px rgba(109, 94, 252, 0.8)',
            '&:hover': { backgroundImage: gradients.buttonHover },
            '&.Mui-disabled': { backgroundImage: 'none', boxShadow: 'none' },
          },
        },
      ],
    },
  },
})

export default theme
