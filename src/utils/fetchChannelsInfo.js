import { andThen, map, pipe, pluck, tap } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

import { applyMemberSpec } from './applyMemberSpec'

export const fetchCustomMembersInfo = pipe(
  pluck('channelId'),
  requestChannelsById,
  andThen(map(applyMemberSpec))
)

export const fetchTwitchTeamMemberInfo = pipe(
  pluck('user_id'),
  requestChannelsById,
  andThen(map(applyMemberSpec)),
)

