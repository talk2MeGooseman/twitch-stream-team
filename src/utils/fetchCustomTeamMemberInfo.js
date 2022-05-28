import { andThen, pipe, pluck, propOr, reverse } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

export const fetchCustomTeamMemberInfo = (
  setTeamMembers,
  toggleLoading,
  customTeam
) =>
  pipe(
    propOr([], 'teamMembers'),
    reverse,
    pluck('channelId'),
    requestChannelsById,
    andThen(setTeamMembers),
    andThen(() => toggleLoading(false))
  )(customTeam)
