import React, { useEffect, useState } from 'react'
import { Provider } from 'urql'

import { initClient } from '../services/Ebs'
import Loader from './Loader'

export const AuthContext = React.createContext({})

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
    <Provider value={client}>
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </Provider>
  )
}

export default AuthWrapper
