import { head, mergeRight, prop } from 'ramda'
import { requestTeamInfo } from 'services/TwitchAPI'
import { convertHelixToTeamSpec, fetchTwitchTeamMemberInfo } from 'utils'


export const buildTwitchTeamDetails = async (token: string, twitchTeam: string) => {
  const teamSpec = await requestTeamInfo(token, twitchTeam)
    .then(prop('data'))
    .then(head)
    .then(convertHelixToTeamSpec)


  return fetchTwitchTeamMemberInfo(token, teamSpec.channels)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(teamSpec))
    .catch(() => teamSpec)
}
