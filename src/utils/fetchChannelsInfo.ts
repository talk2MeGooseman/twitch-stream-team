import { andThen, map, pipe, pluck } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

import { applyMemberSpec } from './applyMemberSpec'

export const fetchCustomMembersInfo = async (token: string, data: TeamMemberSpecType[]) => pipe<
  [TeamMemberSpecType[]],
  string[],
  Promise<TwitchChannel[]>,
  Promise<TeamMemberSpecType[]>
>(
  pluck('id'),
  requestChannelsById(token),
  andThen(map(applyMemberSpec))
)(data)

export const fetchTwitchTeamMemberInfo = async (token: string, channels: TeamMemberSpecType[] ) => pipe<
[TeamMemberSpecType[]],
string[],
Promise<TwitchChannel[]>,
Promise<TeamMemberSpecType[]>
>(
  pluck('id'),
  requestChannelsById(token),
  andThen(map(applyMemberSpec)),
)(channels)

