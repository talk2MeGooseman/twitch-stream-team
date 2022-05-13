import {
  applySpec, prop,
  propOr
} from 'ramda'

export const applyCustomTeamSpec = applySpec({
  name: prop('name'),
  banner: propOr(null, 'banner'),
  logo: propOr(null, 'logo'),
  url_name: propOr(null, 'url_name'),
  channels: prop('channels'),
})
