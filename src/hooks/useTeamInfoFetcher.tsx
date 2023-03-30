import { useQuery } from '@apollo/client'
import { isNil } from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { ChannelTeamQuery } from 'services/graphql'
import { getStreamTeamProp } from 'utils'
import { AuthContext } from 'utils/AuthContext'
import { buildCustomTeamDetails } from 'utils/buildCustomTeamDetails'
import { buildTwitchTeamDetails } from 'utils/buildTwitchTeamDetails'

export const useTeamInfoFetcher = () => {
  const [teamInfo, setTeamInfo] = useState<TeamSpecType>()
  const [teamInfoLoading, setTeamInfoLoading] = useState(true)
  const authInfo = useContext(AuthContext)

  const { data, loading, error } = useQuery<RootQueryType>(ChannelTeamQuery)

  useEffect(() => {
    if (!loading && !isNil(authInfo) && !isNil(data)) {
      const streamTeam = getStreamTeamProp(data)

      if (streamTeam.customActive && !isNil(streamTeam.customTeam)) {
        buildCustomTeamDetails(authInfo.helixToken, streamTeam.customTeam)
          .then(setTeamInfo)
          .then(() => setTeamInfoLoading(false))
      } else if(!isNil(streamTeam.twitchTeam)) {
        buildTwitchTeamDetails(authInfo.helixToken, streamTeam.twitchTeam)
          .then(setTeamInfo)
          .then(() => setTeamInfoLoading(false))
      }
    }
  }, [authInfo, data, loading, setTeamInfoLoading])

  return { teamInfo, loading: teamInfoLoading, error }
}
