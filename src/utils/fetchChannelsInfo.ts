import { requestChannelsById } from 'services/TwitchAPI'

import { applyMemberSpec } from './applyMemberSpec'

const fetchMembers = async (
  token: string,
  channels: TeamMemberSpecType[]
): Promise<TeamMemberSpecType[]> => {
  const ids = channels.map((channel) => channel.id)
  const users = await requestChannelsById(token)(ids)
  return users.map(applyMemberSpec)
}

export const fetchCustomMembersInfo = fetchMembers

export const fetchTwitchTeamMemberInfo = fetchMembers
