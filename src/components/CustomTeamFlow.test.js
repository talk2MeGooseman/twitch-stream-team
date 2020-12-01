import React from 'react';
import { fireEvent, render, within} from '@testing-library/react';
import CustomTeamFlow from './CustomTeamFlow';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import CustomTeamModel from '../mobx/model/CustomTeamModel';
import { CUSTOM_TEAM_TYPE } from '../services/constants';
import userEvent from '@testing-library/user-event';

const team = {
  name: 'custom_team',
  display_name: 'Custom Team',
  users: [
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
};

async function createCustomTeam() {
  const customTeam = new CustomTeamModel(null, team);
  await customTeam.initTeamInfo();
  customTeam.buildChannels(team.users);
  return customTeam;
};

const withTheme = (component) => (
  <UWPThemeProvider
    theme={getTheme({
      themeName: 'dark', // set custom theme
      accent: '#0078D7', // set accent color
      useFluentDesign: true, // sure you want use new fluent design.
      desktopBackgroundImage:
        'https://static-cdn.jtvnw.net/jtv_user_pictures/team-brainbytes-background_image-4baba38e0e3991c5.png', // set global desktop background image
    })}>
    {component}
  </UWPThemeProvider>
);

describe('CustomTeamFlow', () => {
  beforeEach(() => {
  });

  it('displays all existing team members', async () => {
    const customTeam = await createCustomTeam();
    const store = {
      customTeam,
      teamType: CUSTOM_TEAM_TYPE,
    };

    const { queryByText } = render(withTheme(<CustomTeamFlow store={store} />));

    expect(queryByText("Talk2MeGooseman")).toBeTruthy()
    expect(queryByText("JensDuck")).toBeTruthy()
  });

  it('properly deletes team member from the list', async () => {
    const customTeam = await createCustomTeam();
    const store = {
      customTeam,
      teamType: CUSTOM_TEAM_TYPE,
    };

    const { queryByText, debug, getByText } = render(withTheme(<CustomTeamFlow store={store} />));

    expect(queryByText("JensDuck")).toBeTruthy()
    const userRow = getByText("Talk2MeGooseman")
    const trashContainer = within(userRow).getByTestId('trash-can')

    userEvent.click(trashContainer);

    expect(queryByText("JensDuck")).toBeTruthy()
    expect(queryByText("Talk2MeGooseman")).not.toBeTruthy()
  });
})

