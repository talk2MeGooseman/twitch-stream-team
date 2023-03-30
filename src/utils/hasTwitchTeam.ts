import { isEmpty, isNil } from 'ramda'

export const hasTwitchTeam = (twitchTeams: Maybe<HelixChannelTeam[]>) => !isEmpty(twitchTeams) && !isNil(twitchTeams)
