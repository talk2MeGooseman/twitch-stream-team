import axios from 'axios'

const BASE_URL = 'https://api.twitch.tv/helix/'
// eslint-disable-next-line no-secrets/no-secrets
const CLIENT_ID = 'd4t75sazjvk9cc84h30mgkyg7evbvz'

const BATCH_SIZE = 100

// Bits 500 - MajorThorn
// Sub - indifferentghost

function buildChannelParams(channels, key = 'id') {
  const params = new URLSearchParams()
  channels.forEach((channel) => {
    params.append(key, channel.user_id || channel.id || channel)
  })
  return params
}

async function getStreams(channels) {
  const params = buildChannelParams(channels, 'user_id')

  const response = await axios({
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

async function getUsers(channels, key = 'id') {
  const params = buildChannelParams(channels, key)

  const response = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/users?${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID,
    },
  })

  const result = Array.from({length: channels.length})

  response.data.data.forEach((user) => {
    const index = channels.indexOf(user.id)
    result[index] = user
  })

  return result
}

async function batchRequests(channels, request) {
  let channelList = []

  for (let i = 0; i < channels.length; i += BATCH_SIZE) {
    const channelSlice = channels.slice(i, i + BATCH_SIZE)
    // eslint-disable-next-line no-await-in-loop
    const data = await request(channelSlice)
    channelList = [...channelList, ...data]
  }

  return channelList
}

export const requestLiveChannels = async (channels) => batchRequests(channels, async (channelsBatch) => getStreams(channelsBatch))

export const requestChannelsById = async (channels) => batchRequests(channels, async (c) => getUsers(c, 'id'))

export const requestChannelsByName = async (channels) => batchRequests(channels, async (c) => getUsers(c, 'login'))

export async function requestChannelTeams(channelId) {
  let response
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

  return response.data
}

export async function requestTeamInfo(teamName) {
  let response
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

  return response.data
}
