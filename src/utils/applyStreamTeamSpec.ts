import { applySpec, prop,propOr } from 'ramda'

export const applyStreamTeamSpec = applySpec<StreamTeam>({
  twitchTeam: prop('twitchTeam'),
  customActive: prop('customActive'),
  customTeam: propOr({}, 'customTeam'),
})
