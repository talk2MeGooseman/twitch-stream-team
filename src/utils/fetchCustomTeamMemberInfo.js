import { andThen, pipe, pluck, propOr } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

export const fetchCustomTeamMemberInfo = (
  setTeamMembers,
  toggleLoading,
  customTeam
) =>
  pipe(
    propOr([], 'teamMembers'),
    pluck('channelId'),
    requestChannelsById,
    andThen(setTeamMembers),
    andThen(() => toggleLoading(false))
  )(customTeam)
