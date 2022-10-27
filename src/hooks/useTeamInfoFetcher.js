import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ChannelTeamQuery } from 'services/graphql'
import { getStreamTeamProp } from 'utils'
import { buildCustomTeamDetails } from 'utils/buildCustomTeamDetails'
import { buildTwitchTeamDetails } from 'utils/buildTwitchTeamDetails'

export const useTeamInfoFetcher = () => {
  const [teamInfo, setTeamInfo] = useState()
  const [teamInfoLoading, setTeamInfoLoading] = useState(true)

  const { data, loading, error } = useQuery(ChannelTeamQuery)

  useEffect(() => {
    if (!loading) {
      const streamTeam = getStreamTeamProp(data)

      if (streamTeam.customActive) {
        buildCustomTeamDetails(streamTeam.customTeam).then(setTeamInfo).then(() => setTeamInfoLoading(false))
      } else {
        buildTwitchTeamDetails(streamTeam.twitchTeam).then(setTeamInfo).then(() => setTeamInfoLoading(false))
      }
    }
  }, [data, loading, setTeamInfoLoading])

  return { teamInfo, loading: teamInfoLoading, error }
}
