import { isEmpty, isNil } from 'ramda'

export const hasTwitchTeam = twitchTeams => !isEmpty(twitchTeams) && !isNil(twitchTeams)
