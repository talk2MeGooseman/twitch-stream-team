import { createClient } from 'urql'

import {ChannelTeamQuery} from './graphql'

export const initClient = (token) => createClient({
  url: 'https://guzman.codes/api',
  fetchOptions: () => ({
    headers: { 'x-extension-jwt': token },
  }),
})

export const queryPanelInformation = async (client) => {
  const response = await client
  .query(ChannelTeamQuery, { id: 'test' })
  .toPromise()


  return response.data
}
