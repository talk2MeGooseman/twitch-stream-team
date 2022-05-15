import { render } from '@testing-library/react'
import React from 'react'
import { getTheme, Theme as UWPThemeProvider } from 'react-uwp/Theme'

import ChannelListItem from '../ChannelListItem'

describe('ChannelListItem', () => {
  it('Renders successfully', () => {
    const channel = {
      id: '1',
      display_name: 'Talk2MeGooseman',
      status: 'blah blah blah',
      logo: 'https://picture.here',
    }

    const { queryByText } = render(
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
        <ChannelListItem channel={channel} />
      </UWPThemeProvider>
    )

    expect(queryByText('Talk2MeGooseman')).toBeInTheDocument();
  })
})
