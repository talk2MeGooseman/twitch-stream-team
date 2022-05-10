import React from 'react'
import { getTheme,Theme as UWPThemeProvider } from 'react-uwp/Theme'

import ConfigInfo from '../components/ConfigInfo'
import PanelPreview from '../components/PanelPreview'

const containerStyles = {
  width: '300px',
  height: '500px',
  overflowX: 'hidden',
  overflowY: 'scroll',
  border: 'blue solid 1px',
  position: 'relative',
}

const Config = ({ store, viewAnchor, viewPlatform }) => (
  <UWPThemeProvider
    style={{ height: '100vh', display: 'flex' }}
    theme={getTheme({
      useFluentDesign: true, // sure you want use new fluent design.
      accent: '#0078D7',
    })}
  >
    <div style={{ flex: 1 }}>
      <ConfigInfo store={store} />
    </div>
    <div style={{ flex: 1 }}>
      <h2>Panel Preview</h2>
      <div style={containerStyles}>
        <PanelPreview store={store} viewAnchor={viewAnchor} viewPlatform={viewPlatform} />
      </div>
    </div>
  </UWPThemeProvider>
)

export default Config
