import { any, propEq } from 'ramda'

export const stillTeamMember = (currentTeam: Maybe<string>, twitchTeams: TwitchTeam[]) => any(propEq(currentTeam, 'team_name'))(twitchTeams || [])
