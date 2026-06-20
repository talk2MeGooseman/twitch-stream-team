import './index.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { createRoot } from 'react-dom/client'

import AuthWrapper from './components/AuthWrapper'
import { CONFIG_MODE, DASHBOARD_MODE, VIEWER_MODE } from './services/constants'
import theme from './theme'
import Config from './views/Config'
import StreamTeamTheme from './views/StreamTeamTheme'

// Get the params from the url
const params = new URLSearchParams(window.location.search)

// Mode tells us which view to render: config, viewer or dashboard
const mode = params.get('mode')

let viewComponent: React.ReactNode

switch (mode) {
  case CONFIG_MODE:
    viewComponent = (
      <AuthWrapper mode={mode}>
        <Config />
      </AuthWrapper>
    )
    break

  case VIEWER_MODE:
  case DASHBOARD_MODE:
    viewComponent = (
      <AuthWrapper mode={mode}>
        <StreamTeamTheme />
      </AuthWrapper>
    )
    break

  default:
    viewComponent = <div>Nothing Loaded</div>
    break
}

const container = document.querySelector('#root')

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {viewComponent}
      </ThemeProvider>
    </React.StrictMode>
  )
}
