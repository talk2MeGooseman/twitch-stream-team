import { andThen, pipe, pluck, propOr } from 'ramda'
import { requestChannelsById } from 'services/TwitchAPI'

export const fetchCustomTeamMemberInfo = (
  setTeamMembers: (teamMembers: HelixUser[]) => void,
  toggleLoading: (isLoading: boolean) => void,
  customTeam: CustomTeam
) =>
  pipe(
    propOr([], 'teamMembers'),
    pluck('channelId'),
    requestChannelsById,
    andThen(setTeamMembers),
    andThen(() => toggleLoading(false))
  )(customTeam)
