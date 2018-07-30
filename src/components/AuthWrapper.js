import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { LOAD_PENDING } from "../services/constants";
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
        this.props.store.fetchTeam();
      }
    });
  
    window.Twitch.ext.actions.onFollow((didFollow, channelName) => {
      if (didFollow)
      {
        this.props.store.setChannelFollowed(channelName);
      }
    });

    // if (!this.props.ignoreBroadcasts) {
    //   window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
    //     this.props.tabsStore.updateTabs();
    //   });
    // }
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