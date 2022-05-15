import { head, mergeRight, prop } from 'ramda';
import { requestTeamInfo } from 'services/TwitchAPI';
import { applyTwitchTeamSpec, fetchTwitchTeamMemberInfo } from 'utils';


export const buildTwitchTeamDetails = async (twitchTeam) => {
  const teamSpec = await requestTeamInfo(twitchTeam)
    .then(prop('data'))
    .then(head)
    .then(applyTwitchTeamSpec);

  return fetchTwitchTeamMemberInfo(teamSpec.channels)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(teamSpec));
};
