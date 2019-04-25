import axios from "axios";

const BASE_URL = "https://api.twitch.tv/helix/"
const CLIENT_ID = "d4t75sazjvk9cc84h30mgkyg7evbvz"

const BATCH_SIZE = 100;

async function getStreams(channels) {
  const params = buildChannelParams(channels);

  let response = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/streams?first=100&${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID
    }
  });

  return response.data.data;
}

function buildChannelParams(channels) {
  var params = new URLSearchParams();
  channels.forEach(channel => {
    params.append('user_id', channel.id);
  })

  return params;
}

async function batchRequests(channels) {
  let liveChannels = [];
  for(var i = 0; i < channels.length; i += BATCH_SIZE) {
    const channelSlice = channels.slice(i, i + BATCH_SIZE);
    let data = await getStreams(channelSlice)
    liveChannels = liveChannels.concat(data);
  }

  return liveChannels;
}

export const getLiveChannels = async (channels) => {
  let liveChannels;

  if (channels.length > BATCH_SIZE) {
    liveChannels = await batchRequests(channels);
  } else {
    liveChannels = await getStreams(channels);
  }

  return liveChannels;
}
