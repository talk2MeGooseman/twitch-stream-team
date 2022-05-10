import { observer } from 'mobx-react'
import React, { Component } from 'react'

import { CONFIG_MODE,LOAD_PENDING } from '../services/constants'
import Loader from './Loader'

@observer
export default class AuthWrapper extends Component {
  componentDidMount() {
    const { store, mode } = this.props
    let shouldFetch = false
    // Listen to on Auth callback to get token
    window.Twitch.ext.onAuthorized((auth) => {
      // If token is null then that means this is the first load
      if (!store.token) {
        shouldFetch = true
      }

      store.token = auth.token

      if (shouldFetch) {
        if (mode === CONFIG_MODE) {
          store.fetchConfig()
        } else {
          store.fetchTeam()
        }
      }
    })

    window.Twitch.ext.actions.onFollow((didFollow, channelName) => {
      if (didFollow) {
        store.setChannelFollowed(channelName)
      }
    })

    window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
      const messageJson = JSON.parse(message)
      store.updateLiveChannels(messageJson.data)
    })
  }

  render() {
    const { store, children } = this.props
    return store.loadingState === LOAD_PENDING ? <Loader /> : children
  }
}
