import { mergeRight } from 'ramda'
import { applyCustomTeamSpec, fetchCustomMembersInfo } from 'utils'

export const buildCustomTeamDetails = (customTeam) => {
  const customTeamSpec = applyCustomTeamSpec(customTeam)
  return fetchCustomMembersInfo(customTeam.teamMembers)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(customTeamSpec))
}
