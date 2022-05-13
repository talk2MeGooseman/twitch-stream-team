import React from 'react'
import { getTheme, Theme as UWPThemeProvider } from 'react-uwp/Theme'

import StreamTeams from './StreamTeams'

const StreamTeamTheme = () => (
  <UWPThemeProvider
    style={{ background: '#6441A4' }}
    theme={getTheme({
      themeName: 'dark', // set custom theme
      accent: '#0078D7',
    })}
  >
    <StreamTeams />
  </UWPThemeProvider>
)

export default StreamTeamTheme
