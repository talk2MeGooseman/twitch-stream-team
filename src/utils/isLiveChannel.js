import { curry } from 'ramda'

export const isLiveChannel = curry((channel, liveChannel) => channel.id === liveChannel.user_id)
