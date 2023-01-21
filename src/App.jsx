import * as React from 'react'
import ListView from 'react-uwp/ListView'
import { getTheme,Theme as UWPThemeProvider } from 'react-uwp/Theme'

const baseStyle = {
  margin: '10px 10px 10px 0',
}

export const App = () => (
  <UWPThemeProvider
    theme={getTheme({
      themeName: 'dark', // set custom theme
      accent: '#0078D7', // set accent color
      useFluentDesign: true, // sure you want use new fluent design.
      desktopBackgroundImage:
        // eslint-disable-next-line no-secrets/no-secrets
        'https://static-cdn.jtvnw.net/jtv_user_pictures/team-brainbytes-background_image-4baba38e0e3991c5.png', // set global desktop background image
    })}
  >
    <ListView
      style={baseStyle}
      listSource={Array.from({length: 15})
        .fill(0)
        .map((numb, index) => index)}
    />
  </UWPThemeProvider>
)

export default App
