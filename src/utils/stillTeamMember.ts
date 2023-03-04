import { any, propEq } from 'ramda'

export const stillTeamMember = (currentTeam: CurrentTeam, twitchTeams: TwitchTeams) => any(propEq('team_name', currentTeam))(twitchTeams || [])
