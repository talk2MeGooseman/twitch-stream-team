import { path, pipe } from 'ramda'

import { applyStreamTeamSpec } from './applyStreamTeamSpec'

export const getStreamTeamProp = pipe(
  path(['channel', 'streamTeam']),
  applyStreamTeamSpec
)
