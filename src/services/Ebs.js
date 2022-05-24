import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { ChannelTeamQuery } from './graphql'

const httpLink = createHttpLink({
  uri: 'https://guzman.codes/api',
})

export const initClient = (token) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'x-extension-jwt': token,
    },
  }))

  return new ApolloClient({
    // eslint-disable-next-line unicorn/prefer-spread
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export const queryPanelInformation = async (client) => {
  const response = await client
    .query(ChannelTeamQuery, { id: 'test' })
    .toPromise()

  return response.data
}
