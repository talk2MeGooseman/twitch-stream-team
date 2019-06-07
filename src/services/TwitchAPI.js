import axios from 'axios';

const BASE_URL = 'https://api.twitch.tv/helix/';
const CLIENT_ID = 'd4t75sazjvk9cc84h30mgkyg7evbvz';

const BATCH_SIZE = 100;

// Bits 500 - MajorThorn
// Sub - indifferentghost

async function getStreams(channels) {
  const params = buildChannelParams(channels);

  let response = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/streams?first=100&${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID,
    },
  });

  return response.data.data;
}

async function getUsers(channels, key = 'id') {
  const params = buildChannelParams(channels, key);

  let response = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/users?${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID,
    },
  });

  return response.data.data;
}

function buildChannelParams(channels, key) {
  var params = new URLSearchParams();
  channels.forEach(channel => {
    // have to do check for _id in case were dealing with
    params.append(key, channel._id || channel.id || channel);
  });

  return params;
}

async function batchRequests(channels, request) {
  let channelList = [];
  for (var i = 0; i < channels.length; i += BATCH_SIZE) {
    const channelSlice = channels.slice(i, i + BATCH_SIZE);
    let data = await request(channelSlice);
    channelList = channelList.concat(data);
  }

  return channelList;
}

export const requestLiveChannels = async channels => {
  return await batchRequests(channels, async (c) => {
    return await getStreams(c)
  });
};

export const requestChannelsById = async channels => {
  return await batchRequests(channels, async c => {
    return await getUsers(c, 'id');
  });
};

export const requestChannelsByName = async channels => {
  return await batchRequests(channels, async c => {
    return await getUsers(c, 'login');
  });
};

export async function requestTeamInfo(team_name) {
  debugger;
  let response;
  try {
    response = await axios({
      method: 'GET',
      url: `https://api.twitch.tv/kraken/teams/${team_name}`,
      headers: {
        'Client-id': CLIENT_ID,
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    });
  } catch (error) {}

  return response.data;
}
