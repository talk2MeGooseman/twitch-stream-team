import { applySpec, prop,propOr } from 'ramda'

export const applyStreamTeamSpec = applySpec({
  twitchTeam: prop('twitchTeam'),
  customActive: prop('customActive'),
  customTeam: propOr({}, 'customTeam'),
})
