import React from 'react';
import { fireEvent, render} from '@testing-library/react';
import ChannelListItem from './ChannelListItem';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import ChannelModel from '../mobx/model/ChannelModel';

describe('ChannelListItem', () => {
  it('Renders successfully', () => {
    const channel = new ChannelModel(this, {
      id: '1',
      display_name: 'Talk2MeGooseman',
      status: 'blah blah blah',
      logo: 'https://picture.here',
    });

    const { queryByText, debug } = render(
      <UWPThemeProvider
        theme={getTheme({
          themeName: "dark", // set custom theme
          accent: "#0078D7", // set accent color
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage: "https://static-cdn.jtvnw.net/jtv_user_pictures/team-brainbytes-background_image-4baba38e0e3991c5.png" // set global desktop background image
        })}
      >
        <ChannelListItem channel={channel} />
      </UWPThemeProvider>
    );

    expect(queryByText("Talk2MeGooseman")).toBeTruthy()
  });
})
