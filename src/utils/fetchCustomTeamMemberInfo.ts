import { pipe, pluck, propOr } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

export const fetchCustomTeamMemberInfo = ({
  token,
  customTeam
}: {
  token: string,
  customTeam: CustomTeam
}) =>
  pipe<[CustomTeam], CustomTeamMember[], string[], Promise<HelixUser[]>>(
    propOr([], 'teamMembers'),
    pluck('channelId'),
    requestChannelsById(token),
  )(customTeam)
