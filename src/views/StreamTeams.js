import React, { Component } from 'react';
import ChannelList from '../components/ChannelList';
import { observer } from 'mobx-react';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import TeamHeader from '../components/TeamHeader';

@observer
export default class StreamTeams extends Component {
  render(){
    const { store } = this.props;
    return(
      <UWPThemeProvider
        style={
          {background: store.background ? null : "#6441A4"}
        }
        theme={getTheme({
          themeName: "dark", // set custom theme
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage: store.background,
          accent: "#0078D7"
        })}
      >
        <TeamHeader store={store} />
        <ChannelList store={store} />
      </UWPThemeProvider>
    );
  }
}
