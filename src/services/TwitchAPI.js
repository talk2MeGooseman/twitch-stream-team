import axios from "axios";

const BASE_URL = "https://api.twitch.tv/helix/"
const CLIENT_ID = "d4t75sazjvk9cc84h30mgkyg7evbvz"

export const getLiveChannels = async (channels) => {
  var params = new URLSearchParams();

  channels.forEach(channel => {
    params.append('user_id', channel.id);
  })

  let response = await axios({
    method: 'GET',
    baseURL: BASE_URL,
    url: `/streams?first=100&${params.toString()}`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': CLIENT_ID
    }
  });

  return response.data;
}