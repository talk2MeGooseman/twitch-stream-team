import { any, propEq } from 'ramda'

export const stillTeamMember = (currentTeam: Maybe<string>, twitchTeams: TwitchTeam[]) => any(propEq('team_name', currentTeam))(twitchTeams || [])
