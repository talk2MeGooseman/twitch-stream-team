import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { getTheme,Theme as UWPThemeProvider } from 'react-uwp/Theme'

import CustomTeamFlow from '../CustomTeamFlow'

const streamTeam = {
  name: 'custom_team',
  display_name: 'Custom Team',
  channels: [
    {
      id: '1',
      display_name: 'Talk2MeGooseman',
      status: 'blah blah blah',
      logo: 'https://picture.here',
    },
    {
      id: '2',
      display_name: 'JensDuck',
      status: 'blah blah blah',
      logo: 'https://picture.here',
    },
  ],
}

const withTheme = (component) => (
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
    {component}
  </UWPThemeProvider>
)

describe('CustomTeamFlow', () => {
  beforeEach(() => {})

  it('displays all existing team members', async () => {
    const { queryByText } = render(withTheme(<CustomTeamFlow streamTeam={streamTeam} />))

    expect(queryByText('Talk2MeGooseman')).toBeInTheDocument()
    expect(queryByText('JensDuck')).toBeInTheDocument()
  })

  it('properly deletes team member from the list', async () => {
    const { queryByText, getByText } = render(
      withTheme(<CustomTeamFlow streamTeam={streamTeam} />)
    )

    expect(queryByText('JensDuck')).toBeInTheDocument()
    const userRow = getByText('Talk2MeGooseman')
    const trashContainer = within(userRow).getByTestId('trash-can')

    userEvent.click(trashContainer)

    expect(queryByText('JensDuck')).toBeInTheDocument()
    expect(queryByText('Talk2MeGooseman')).not.toBeInTheDocument()
  })
})
