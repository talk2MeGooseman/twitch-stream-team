import { applySpec, F, prop } from 'ramda'

export const applyMemberSpec = applySpec<TeamMemberSpecType>({
  id: prop('id'),
  name: prop('display_name'),
  profileImage: prop('profile_image_url'),
  description: prop('description'),
  isLive: F,
})
