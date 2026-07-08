import { requestChannelsById } from 'services/TwitchAPI'

export const fetchCustomTeamMemberInfo = ({
  token,
  customTeam,
}: {
  token: string
  customTeam: CustomTeam
}): Promise<HelixUser[]> => {
  const channelIds = (customTeam.teamMembers ?? []).map((member) => member.channelId)
  return requestChannelsById(token)(channelIds)
}
