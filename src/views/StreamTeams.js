import React, { Component } from 'react';
import ChannelList from '../components/ChannelList';
import { observer } from 'mobx-react';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";

@observer
export default class StreamTeams extends Component {
  render(){
    const { store } = this.props;
    return(
      <UWPThemeProvider
        theme={getTheme({
          themeName: "dark", // set custom theme
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage: "https://static-cdn.jtvnw.net/jtv_user_pictures/team-brainbytes-background_image-4baba38e0e3991c5.png"
        })}
      >
        <ChannelList store={store} />
      </UWPThemeProvider>
    );
  }
}
