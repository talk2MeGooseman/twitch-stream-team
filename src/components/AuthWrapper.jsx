import { ApolloProvider } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { initClient } from '../services/Ebs'
import { AuthContext } from '../utils/AuthContext'
import Loader from './Loader'

const AuthWrapper = ({ children, mode }) => {
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState(null)
  const [authData, setAuthData] = useState()

  useEffect(() => {
    // Listen to on Auth callback to get token
    window.Twitch.ext.onAuthorized((auth) => {
      setAuthData(auth)
      setClient(initClient(auth.token))
      setLoading(false)
    })

    window.Twitch.ext.actions.onFollow((didFollow, channelName) => {
      if (didFollow) {
        // store.setChannelFollowed(channelName)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </ApolloProvider>
  )
}

export default AuthWrapper
