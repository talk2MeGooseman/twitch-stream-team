import axios, { AxiosResponse } from 'axios'
import { toLower } from 'ramda'

const BASE_URL = 'https://api.twitch.tv/helix/'
// eslint-disable-next-line no-secrets/no-secrets
const CLIENT_ID = 'd4t75sazjvk9cc84h30mgkyg7evbvz'

const BATCH_SIZE = 100

// Bits 500 - MajorThorn
// Sub - indifferentghost

function buildChannelParams(channels: HelixTeamUser[], key = 'id'): URLSearchParams {
  const params = new URLSearchParams()
  channels.forEach((channel) => {
    params.append(key, channel.user_id || channel.id || channel)
  })
  return params
}

async function getStreams(channels: unknown[]): Promise<HelixStream[]> {
  const params = buildChannelParams(channels, 'user_id')

  const response: AxiosResponse<{data: HelixStream[]}> = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/streams?first=100&${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID,
    },
  })

  return response.data.data
}

async function getUsers(channels: unknown[], key: 'id' | 'login' = 'id') : Promise<HelixUser[]> {
  const params = buildChannelParams(channels, key)

  const response: AxiosResponse<{ data: HelixUser[] }> = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/users?${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID,
    },
  })

  // Ensuring we keep order of channels the same the order the user inputted
  const result = Array.from<HelixUser>({length: channels.length})

  response.data.data.forEach((user) => {
    const lowerCase = toLower(user[key as keyof HelixUser])
    const index = channels.indexOf(lowerCase)
    result[index] = user
  })

  return result
}

async function batchRequests(channels: unknown[], request: (channels: unknown[]) => Promise<unknown[]>): Promise<unknown[]> {
  let channelList: unknown[] = []

  for (let i = 0; i < channels.length; i += BATCH_SIZE) {
    const channelSlice = channels.slice(i, i + BATCH_SIZE)
    // eslint-disable-next-line no-await-in-loop
    const data = await request(channelSlice)
    channelList = [...channelList, ...data]
  }

  return channelList
}

export const requestLiveChannels = async (channels: unknown[]): Promise<unknown[]> => batchRequests(channels, async (channelsBatch) => getStreams(channelsBatch))

export const requestChannelsById = async (channels: unknown[]): Promise<unknown[]> => batchRequests(channels, async (c) => getUsers(c, 'id'))

export const requestChannelsByName = async (channels: unknown[]): Promise<unknown[]> => batchRequests(channels, async (c) => getUsers(c, 'login'))

export async function requestChannelTeams(channelId: string): Promise<HelixChannelTeams | undefined> {
  let response: AxiosResponse<HelixChannelTeams> | undefined
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/teams/channel?broadcaster_id=${channelId}`,
      headers: {
        'Client-id': CLIENT_ID,
      },
    })
  } catch (error) {
    // Do nothing
  }
  return response?.data
}

export async function requestTeamInfo(teamName: string): Promise<{ data: HelixTeam[] } | undefined> {
  let response: AxiosResponse<{ data: HelixTeam[] }> | undefined
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/teams?name=${teamName}`,
      headers: {
        'Client-id': CLIENT_ID,
      },
    })
  } catch (error) {
    // Do nothing
  }

  return response?.data
}
