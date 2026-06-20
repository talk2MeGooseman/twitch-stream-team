import { ApolloClient, InMemoryCache } from '@apollo/client'
import { describe, expect, it } from 'vitest'

import { initClient } from '../Ebs'

describe('initClient', () => {
  it('builds an Apollo client with an in-memory cache', () => {
    const client = initClient('jwt-token')

    expect(client).toBeInstanceOf(ApolloClient)
    expect(client.cache).toBeInstanceOf(InMemoryCache)
    expect(client.link).toBeDefined()
  })
})
