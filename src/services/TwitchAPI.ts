import axios, { AxiosResponse } from 'axios'
import { curry,toLower } from 'ramda'

const BASE_URL = 'https://api.twitch.tv/helix/'
// eslint-disable-next-line no-secrets/no-secrets
const CLIENT_ID = 'd4t75sazjvk9cc84h30mgkyg7evbvz'

const BATCH_SIZE = 100

const helixHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    'Client-ID': CLIENT_ID,
    Authorization: `Extension ${token}`,
  })

// Bits 500 - MajorThorn
// Sub - indifferentghost

function buildChannelParams(channels: string[], key = 'id'): URLSearchParams {
  const params = new URLSearchParams()
  channels.forEach((channel) => {
    params.append(key, channel)
  })
  return params
}

async function getStreams(token: string, channels: string[]): Promise<HelixStream[]> {
  const params = buildChannelParams(channels, 'user_id')

  const response: AxiosResponse<{data: HelixStream[]}> = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/streams?first=100&${params.toString()}`,
    headers: helixHeaders(token),
  })

  return response.data.data
}

async function getUsers(token: string, channels: string[], key: 'id' | 'login' = 'id') : Promise<HelixUser[]> {
  const params = buildChannelParams(channels, key)

  const response: AxiosResponse<{ data: HelixUser[] }> = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/users?${params.toString()}`,
    headers: helixHeaders(token),
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

async function batchRequests<C,T>(channels:C[], request: (channels: C[]) => Promise<T[]>): Promise<T[]> {
  let channelList: T[] = []

  for (let i = 0; i < channels.length; i += BATCH_SIZE) {
    const channelSlice = channels.slice(i, i + BATCH_SIZE)
    // eslint-disable-next-line no-await-in-loop
    const data = await request(channelSlice)
    channelList = [...channelList, ...data]
  }

  return channelList
}

export const requestLiveChannels = curry( async (token: string, channels: string[]): Promise<ReturnType<typeof getStreams>> => batchRequests(channels, async (channelsBatch) => getStreams(token, channelsBatch)))

export const requestChannelsById = curry(async (token: string, channels: string[]): Promise<ReturnType<typeof getUsers>> => batchRequests(channels, async (c) => getUsers(token, c, 'id')))

export const requestChannelsByName = curry(async (token: string, channels: string[]): Promise<ReturnType<typeof getUsers>> => batchRequests(channels, async (c) => getUsers(token, c, 'login')))

export async function requestChannelTeams(token: string, channelId: string): Promise<HelixChannelTeams | undefined> {
  let response: AxiosResponse<HelixChannelTeams> | undefined
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/teams/channel?broadcaster_id=${channelId}`,
      headers: helixHeaders(token),
    })
  } catch (error) {
    // Do nothing
  }
  return response?.data
}

export async function requestTeamInfo(token: string, teamName: string): Promise<{ data: HelixTeam[] }> {
  try {
    const response = await axios<{ data: HelixTeam[] }>({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/teams?name=${teamName}`,
      headers: helixHeaders(token),
    })

    return response.data
  } catch (error) {
    return { data: [] }
  }
}
