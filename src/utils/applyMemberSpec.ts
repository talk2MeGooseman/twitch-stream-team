import { applySpec, F, prop } from 'ramda'

export const applyMemberSpec = applySpec({
  id: prop('id'),
  name: prop('display_name'),
  profile_image: prop('profile_image_url'),
  description: prop('description'),
  isLive: F,
})
