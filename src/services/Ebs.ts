import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://guzman.codes/api',
})

export const initClient = (token: string) => {
  const authLink = setContext((_, { headers }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
