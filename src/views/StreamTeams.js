import React, { Component } from 'react';
import ChannelList from '../components/ChannelList';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import TeamHeader from '../components/TeamHeader';
import { LOAD_ERROR } from '../services/constants';
import SadSpock from '../sad-spock.svg';

export default class StreamTeams extends Component {
  render(){
    const { store } = this.props;

    if (store.loadingState === LOAD_ERROR || !store.channels) {
      return(
        <div style={{ textAlign: 'center' }}>
          <h3>Looks like we couldnt find your Team</h3>
          <img src={SadSpock} alt="Sad Spock" />
          <h3>Spock is now sad</h3>
        </div>
      );
    }

    return(
      <UWPThemeProvider
        style={
          {background: store.background ? null : "#6441A4"}
        }
        theme={getTheme({
          themeName: "dark", // set custom theme
          accent: "#0078D7"
        })}
      >
        <TeamHeader store={store} />
        <ChannelList store={store} />
      </UWPThemeProvider>
    );
  }
}
