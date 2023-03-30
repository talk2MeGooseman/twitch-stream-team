import { curry } from 'ramda'

export const isLiveChannel = curry((channel: TeamMemberSpecType, liveChannel: HelixStream) => channel.id === liveChannel.user_id)
