import { ApolloProvider } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { initClient } from '../services/Ebs'
import { AuthContext } from '../utils/AuthContext'
import Loader from './Loader'

type AuthWrapperProps = {
  children: React.ReactNode
  mode?: string
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState<ReturnType<typeof initClient> | null>(null)
  const [authData, setAuthData] = useState<TwitchAuthData | null>(null)

  useEffect(() => {
    // Listen to the Twitch auth callback to get the token
    window.Twitch.ext.onAuthorized((auth) => {
      setAuthData(auth)
      setClient(initClient(auth.token))
      setLoading(false)
    })

    window.Twitch.ext.actions.onFollow(() => {
      // No-op for now; follow state is not persisted.
    })
  }, [])

  if (loading || !client) {
    return <Loader />
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </ApolloProvider>
  )
}

export default AuthWrapper
