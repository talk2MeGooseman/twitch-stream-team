import React, { Component } from 'react';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import StreamTeams from './StreamTeams';

export default class StreamTeamTheme extends Component {
  render() {
    const { store } = this.props;

        return (
      <UWPThemeProvider
        style={{ background: '#6441A4' }}
        theme={getTheme({
          themeName: "dark", // set custom theme
          accent: "#0078D7",
        })}
      >
        <StreamTeams store={store.selectedTeam()} />
      </UWPThemeProvider>
    );
  }
}
