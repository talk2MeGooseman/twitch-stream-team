import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ProgressRing from "react-uwp/ProgressRing";
import { LOAD_DONE, LOAD_ERROR, LOAD_PENDING } from "../services/constants";

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

    // if (!this.props.ignoreBroadcasts) {
    //   window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
    //     this.props.tabsStore.updateTabs();
    //   });
    // }
  }

  renderLoading() {
    return(<div>Loading</div>);
  }

  render() {
    const { store } = this.props;
    let component;
    if (store.loadingState === LOAD_PENDING) {
      component = this.renderLoading();
    } else if(store.loadingState === LOAD_DONE) {
      component = this.props.children;
    } else {
      component = <div>WhY u No Work!</div>
    }
    return (component);
  }
}