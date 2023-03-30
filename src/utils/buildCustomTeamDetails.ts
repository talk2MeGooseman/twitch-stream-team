import { mergeRight } from 'ramda'
import { applyCustomTeamSpec, fetchCustomMembersInfo } from 'utils'

export const buildCustomTeamDetails = (token: string, customTeam: CustomTeam) => {
  const team = applyCustomTeamSpec(customTeam)
  return fetchCustomMembersInfo(token, team.channels)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(team))
}
