import {
  applySpec, map,
  pipe,
  prop,
  propOr
} from 'ramda'

export const applyCustomTeamSpec = applySpec<TeamSpecType>({
  name: prop('name'),
  channels: pipe<[CustomTeam], CustomTeamMember[], TeamMemberSpecType[]>(
    propOr([], 'teamMembers'),
    map(applySpec<TeamMemberSpecType>({
      id: prop('channelId')
    }))
  )
})
