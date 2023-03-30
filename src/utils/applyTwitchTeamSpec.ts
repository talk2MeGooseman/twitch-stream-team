import { applySpec, F, map,pipe,prop, propOr } from 'ramda'

const convertHelixToTeamMemberSpec = applySpec<TeamMemberSpecType>({
  id: prop('user_id'),
  name: prop('user_name'),
  profileImage: prop('profile_image_url'),
  description: prop('description'),
  isLive: F,
})

export const convertHelixToTeamSpec = applySpec<TeamSpecType>({
  name: prop('team_display_name'),
  banner: propOr(null, 'banner'),
  logo: propOr(null, 'thumbnail_url'),
  url_name: prop('team_name'),
  channels: pipe(propOr([], 'users'), map(convertHelixToTeamMemberSpec)),
})

