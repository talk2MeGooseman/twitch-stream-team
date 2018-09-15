import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { LOAD_PENDING, CONFIG_MODE } from "../services/constants";
import Loader from "./Loader";

@observer
export default class AuthWrapper extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    ignoreBroadcasts: PropTypes.bool,
  };

  componentDidMount() {
    let shouldFetch = false;
    // Listen to on Auth callback to get token
    window.Twitch.ext.onAuthorized((auth) => {
      // If token is null then that means this is the first load
      if (!this.props.store.token) {
        shouldFetch = true;
      }

      this.props.store.token = auth.token;

      if (shouldFetch) {
        if (this.props.mode === CONFIG_MODE ) {
          this.props.store.fetchConfig();
        } else {
          this.props.store.fetchTeam();
        }
      }
    });
  
    window.Twitch.ext.actions.onFollow((didFollow, channelName) => {
      if (didFollow)
      {
        this.props.store.setChannelFollowed(channelName);
      }
    });

    window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
      let messageJson = JSON.parse(message);
      this.props.store.updateLiveChannels(messageJson.data);
    });
  }

  renderLoading() {
    return( <Loader /> );
  }

  render() {
    const { store } = this.props;
    let component;
    if (store.loadingState === LOAD_PENDING) {
      component = this.renderLoading();
    } else {
      component = this.props.children;
    }
    return (component);
  }
}