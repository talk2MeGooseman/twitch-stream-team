import { any, propEq } from 'ramda'

export const stillTeamMember = (currentTeam, twitchTeams) => any(propEq('team_name', currentTeam))(twitchTeams)
