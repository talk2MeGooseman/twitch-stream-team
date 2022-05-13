import {
  applySpec, prop,
  propOr
} from 'ramda'

export const applyTwitchTeamSpec = applySpec({
  name: prop('team_display_name'),
  banner: propOr(null, 'banner'),
  logo: propOr(null, 'thumbnail_url'),
  url_name: prop('team_name'),
  channels: prop('users'),
})
